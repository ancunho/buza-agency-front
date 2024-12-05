import request from '@/util/request';

export const getArticleCategoryList = async () => {
    const response = await request({
        url: '/promotion/article-category/list',
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'tenant-id': '1',
        }
    });
    return response;
}

export const getArticles = async (params) => {
    const response = await request({
        url: '/promotion/article/page',
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'tenant-id': '1',
        },
        params: params
    });
    return response;
}

export const getArticleDetail = async (id) => {
    const response = await request({
        url: `/promotion/article/get-detail?id=${id}`,
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'tenant-id': '1',
        }
    });
    return response;
}