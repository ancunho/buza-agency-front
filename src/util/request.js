import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import { getRefreshTokenApi } from '@/api/member';

const getAuthToken = () => {
    const token = localStorage.getItem('accessToken');
    return token;
};

const request = axios.create({
    baseURL: 'http://localhost:48080/app-api',
    timeout: 5000
});

let showToast = null;
export const setToastFunction = (toastFn) => {
    showToast = toastFn;
};

request.interceptors.request.use(
    config => {
        const token = getAuthToken();
        config.headers['Content-Type'] = 'application/json';
        config.headers['tenant-id'] = '1';
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

request.interceptors.response.use(
    (response) => {
        if (response.config.url.indexOf('/member/auth') >= 0 && response.data?.data?.accessToken) {
            const authStore = useAuthStore();
            authStore.setLoginState(response.data.data.accessToken, response.data.data.refreshToken);
        }
        if (response.data.code === 401) {
            return setRefreshToken(response.config);
        }

        return response;
    },
    error => {
        // 네트워크 에러 처리
        if (error.code === 'ERR_NETWORK') {
            if (showToast) {
                showToast('서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.', 2000);
            }
            return Promise.reject(error);
        }

        // 서버 응답 에러 처리
        if (error.response) {
            const status = error.response.status;
            if (status === 401) {
                if (showToast) {
                    showToast('로그인이 필요합니다.', 2000);
                }
            } else if (status === 403) {
                if (showToast) {
                    showToast('접근 권한이 없습니다.', 2000);
                }
            } else {
                if (showToast) {
                    showToast(error.response.data?.message || '오류가 발생했습니다.', 2000);
                }
            }
        }
        
        return Promise.reject(error);
    }
);

let requestList = []; // 请求队列
let isRefreshToken = false; // 是否正在刷新中
const setRefreshToken = async (config) => {
    console.log('setRefreshToken 진입');
    if (config.url.indexOf('/member/auth/refresh-token') >= 0) {
        return Promise.reject('error');
    }

    if (!isRefreshToken) {
        isRefreshToken = true;
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
            console.log('refreshToken is null');
            return Promise.reject('error');
        }

        try {
            const refreshTokenResult = await getRefreshTokenApi(refreshToken);
            console.log(refreshTokenResult);
            if (refreshTokenResult.code !== 200) {
                throw new Error('refreshToken error');
            }

            config.headers['Authorization'] = 'Bearer ' + getAccessToken();
            requestList.forEach((cb) => {
                cb();
            });
            requestList = [];
            return request(config);
        } catch(error) {
            console.log(error);
        } finally { 
            isRefreshToken = false;
            requestList = [];
        }


        
    } else {
        requestList.forEach((cb) => {
            cb();
        });
        const userStore = useAuthStore();
        userStore.logout();

    }
};

const getRefreshToken = () => {
    const refreshToken = localStorage.getItem('refreshToken');
    return refreshToken;
};

const getAccessToken = () => {
    const accessToken = localStorage.getItem('accessToken');
    return accessToken;
};


export default request;