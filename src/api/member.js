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
    return response;
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