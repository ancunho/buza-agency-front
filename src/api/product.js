import request from '@/util/request';

export const getSpuPage = async (params) => {
    const response = await request({
        url: '/product/spu/page',
        method: 'get',
        params: params
    });
    return response;
}

export const getCategoryList = async (params) => {
    const response = await request({
        url: '/product/category/list',
        method: 'get',
        params: params
    });
    return response;
}

export const getCategoryListByIds = async (ids) => {
    const response = await request({
        url: '/product/category/list-by-ids',
        method: 'get',
        params: { ids }
    });
    return response;
}

export const getSpuDetail = async (id) => {
    const response = await request({
        url: `/product/spu/get-detail?id=${id}`,
        method: 'get'
    });
    return response;
}