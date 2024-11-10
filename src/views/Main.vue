<template>
    <main class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div v-if="loading" class="flex justify-center items-center h-full">
            <LoadingSpinner />
        </div>
        <div v-else class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
			<div v-for="product in productList" :key="product.id" class="group">
				<div class="aspect-square w-full overflow-hidden">
					<a :href="`/product/detail/${product.id}`">
						<img :src="product.picUrl" :alt="product.name" class="h-full w-full object-contain group-hover:opacity-75" />
					</a>
				</div>
				<h3 class="mt-4 text-sm text-gray-700">
					<a :href="`/product/detail/${product.id}`" class="hover:underline">{{ product.name }}</a>
				</h3>
				<p class="mt-1 text-lg font-medium text-gray-900">
                    <span class="text-red-500 text-sm pr-2">{{ calculateDiscountRate(product.marketPrice, product.price) }}<span style="font-size: 9px;">%</span>  </span>
                    <span class="text-gray-900 text-xl"><span style="font-size: 9px;">￥</span>{{ (product.price / 100).toFixed(2) }}</span>
                </p>
            </div>
        </div>
		<div v-if="loadMoreBtn" ref="loadMoreTrigger" class="mt-8 flex justify-center">
            <button @click="loadMore" class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500">Load More</button>
        </div>
    </main>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { getSpuPage } from '@/api/product';
import { calculateDiscountRate } from '@/util/util';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
// 상품 리스트
const productList = ref([]);
// 페이지 번호
const pageNo = ref(1);
// 페이지 사이즈
const pageSize = ref(20);
// 더보기 버튼 표시 여부
const loadMoreBtn = ref(true);
// 더보기 트리거
const loadMoreTrigger = ref(null);
// 로딩 상태
const loading = ref(true);

/**
 * 상품 리스트 로드 함수
 */
const loadProducts = () => {
    loading.value = true;
    getSpuPage({
        pageNo: pageNo.value,
        pageSize: pageSize.value
    }).then(res => {
        console.log(res);
        if (res.data.code !== 0) {
            toastStore.showToast('error', res.data.msg, 2000);
            return;
        }

        productList.value = [...productList.value, ...res.data.data.list];
		if (res.data.data.list.length < pageSize.value) {
			loadMoreBtn.value = false;
		}
    }).finally(() => {
        loading.value = false;
    })
}

/**
 * 더보기 함수
 */
const loadMore = () => {
    pageNo.value += 1;
    loadProducts();
}

/**
 * 더보기 트리거 함수
 */
const handleIntersection = (entries) => {
    if (entries[0].isIntersecting && loadMoreBtn.value) {
        loadMore();
    }
}

// 인터섹션 옵저버
let observer;

// 마운트 시 실행
onMounted(() => {
    loadProducts();
    observer = new IntersectionObserver(handleIntersection);
    if (loadMoreTrigger.value) {
        observer.observe(loadMoreTrigger.value);
    }
})

// 언마운트 시 실행
onBeforeUnmount(() => {
    if (observer && loadMoreTrigger.value) {
        observer.unobserve(loadMoreTrigger.value);
    }
})

</script>
