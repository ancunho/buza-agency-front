import { defineStore } from 'pinia'


import { ref } from 'vue';
import { addToCartApi } from '@/api/trade';

export const useCartStore = defineStore('cart', () => {
    // 장바구니에 담긴 총 상품 개수
    const totalCount = ref(0);

    // 장바구니에 상품 추가
    const addToCart = async (skuId, count) => {
        try {
            const params = {
                skuId: skuId,
                count: count
            };
            
            // API 호출하여 장바구니에 추가
            const response = await addToCartApi(params);
            if (response.code === 0) {
                // 성공적으로 추가되면 totalCount 증가
                totalCount.value += count;
                return true;
            }
            return false;
        } catch (error) {
            console.error('장바구니 추가 실패:', error);
            return false;
        }
    };

    return {
        totalCount,
        addToCart
    };
});
