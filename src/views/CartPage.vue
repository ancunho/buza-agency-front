<template>
    <main class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div class="flex flex-col lg:flex-row gap-8">
            <!-- 장바구니 상품 리스트 (3/4) -->
            <div class="lg:w-3/4">
                <div class="bg-white shadow-sm rounded-lg">
                    <!-- 전체선택 헤더 -->
                    <div class="px-6 py-4 border-b border-gray-200">
                        <div class="flex items-center">
                            <input
                                type="checkbox"
                                v-model="selectAll"
                                @change="handleSelectAll"
                                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            >
                            <span class="ml-3 text-sm font-medium text-gray-700">전체선택</span>
                            <button
                                type="button"
                                @click="clearSelection"
                                class="ml-4 text-sm font-medium text-red-600 hover:text-red-500"
                            >
                                선택삭제
                            </button>
                        </div>
                    </div>

                    <!-- 상품 리스트 -->
                    <ul role="list" class="divide-y divide-gray-200">
                        <li v-for="item in cartList" :key="item.id" class="flex py-6 px-6">
                            <input
                                type="checkbox"
                                v-model="selectedItems"
                                :value="item.id"
                                @change="handleItemSelect"
                                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 mr-4 mt-6"
                            >
                            <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                    :src="item.spu.picUrl"
                                    :alt="item.spu.name"
                                    class="h-full w-full object-cover object-center"
                                >
                            </div>

                            <div class="ml-4 flex flex-1 flex-col">
                                <div>
                                    <div class="flex justify-between text-base font-medium text-gray-900">
                                        <h3>{{ item.spu.name }}</h3>
                                        <p class="ml-4">￦{{ item.price }}</p>
                                    </div>
                                    <p class="mt-1 text-sm text-gray-500">{{ item.properties }}</p>
                                </div>
                                <div class="flex flex-1 items-end justify-between text-sm">
                                    <div class="flex items-center">
                                        <button class="px-2 py-1 border rounded-l">-</button>
                                        <span class="px-4 py-1 border-t border-b">{{ item.count }}</span>
                                        <button class="px-2 py-1 border rounded-r">+</button>
                                    </div>
                                    <button
                                        type="button"
                                        class="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                        삭제
                                    </button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- 정산 및 주문하기 (1/4) -->
            <div class="lg:w-1/4">
                <div class="bg-white shadow-sm rounded-lg p-6">
                    <h2 class="text-lg font-medium text-gray-900 mb-4">주문 요약</h2>
                    <div class="space-y-4">
                        <div class="flex justify-between">
                            <span class="text-gray-600">상품금액</span>
                            <span class="font-medium">￦0</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">배송비</span>
                            <span class="font-medium">￦0</span>
                        </div>
                        <div class="border-t pt-4">
                            <div class="flex justify-between">
                                <span class="text-gray-900 font-medium">총 결제금액</span>
                                <span class="text-gray-900 font-medium">￦0</span>
                            </div>
                        </div>
                        <button
                            type="button"
                            class="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            주문하기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { getCartListApi } from '@/api/trade';
import { useToastStore } from '@/stores/toast';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const toastStore = useToastStore();
const cartList = ref([]);
const selectedItems = ref([]); // 선택된 아이템들의 ID를 저장
const selectAll = ref(false); // 전체 선택 상태

// 전체 선택/해제 처리
const handleSelectAll = () => {
    if (selectAll.value) {
        // 전체 선택
        selectedItems.value = cartList.value.map(item => item.id);
    } else {
        // 전체 해제
        selectedItems.value = [];
    }
};

// 개별 아이템 선택/해제 시 전체 선택 상태 업데이트
const handleItemSelect = () => {
    selectAll.value = selectedItems.value.length === cartList.value.length;
};

// 선택된 아이템 삭제
const clearSelection = () => {
    if (selectedItems.value.length === 0) {
        toastStore.showToast('warn', t('cart.noItemSelected'), 1500);
        return;
    }

    // 여기에 선택된 아이템 삭제 API 호출 로직 추가
    cartList.value = cartList.value.filter(item => !selectedItems.value.includes(item.id));
    selectedItems.value = [];
    selectAll.value = false;
    toastStore.showToast('success', t('cart.itemsDeleted'), 1500);
};

// cartList가 변경될 때마다 전체 선택 상태 업데이트
watch(cartList, () => {
    handleItemSelect();
}, { deep: true });

// 선택된 아이템 수가 변경될 때마다 전체 선택 상태 업데이트
watch(selectedItems, () => {
    handleItemSelect();
}, { deep: true });

onMounted(async () => {
    try {
        const response = await getCartListApi();
        console.log(response);
        if (response.code === 0) {  
            cartList.value = response.data.validList;
        } else {
            toastStore.showToast('error', t('common.error'), 1500);
        }
    } catch (error) {
        toastStore.showToast('error', t('common.error'), 1500);
    }
});
</script>