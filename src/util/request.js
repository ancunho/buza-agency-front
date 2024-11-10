import axios from 'axios';

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
    response => response,
    error => {
        // 네트워크 에러 처리
        if (error.code === 'ERR_NETWORK') {
            if (showToast) {
                showToast('서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.', 2000);
            }
            console.error('Network Error:', error);
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

export default request;