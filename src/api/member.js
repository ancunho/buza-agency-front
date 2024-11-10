import request from '@/util/request';

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