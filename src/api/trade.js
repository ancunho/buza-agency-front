import request from '@/util/request';



export const addToCartApi = async (params) => {
    const response = await request({
        url: '/trade/cart/add',
        method: 'post',
        data: params
    });
    return response.data;
}

export const getCartListApi = async () => {
    const response = await request({
        url: '/trade/cart/list',
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'tenant-id': '1',
        }
    });
    return response.data;
}