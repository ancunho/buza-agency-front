import request from '@/util/request';

/**
 * 이메일 로그인
 * @param {Object} params 
 * @returns 
 */
export const loginByEmail = async (params) => {
    const response = await request({
        url: '/member/auth/login-by-email',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'tenant-id': '1',
        },
        data: params
    });
    return response.data;
}

/**
 * Refresh Token
 */
export const getRefreshTokenApi = async () => {
    const response = await request({
        url: '/member/auth/refresh-token',
        method: 'post',
    });
    return response.data;
}

/**
 * 로그아웃
 * @returns 
 */
export const logout = async () => {
    const response = await request({
        url: '/member/auth/logout',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'tenant-id': '1',
        },
    });
    return response.data;
}

/**
 * 회원 정보 조회
 * @returns 
 */
export const getMemberInfo = async () => {
    const response = await request({
        url: '/member/user/get',
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'tenant-id': '1',
        },
    });
    return response;
}

/**
 * 회원 정보 수정   
 * @param {Object} params 
 * @returns 
 */
export const updateMemberInfo = async (params) => {
    const response = await request({
        url: '/member/user/update',
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'tenant-id': '1',
        },
        data: params
    });
    return response.data;
}