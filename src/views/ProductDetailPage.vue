<template>
	<div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
		<div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12">
			<!-- Image gallery -->
			<div class="relative">
				<LoadingSpinner v-if="loadingStates.images" />
				<TabGroup v-else as="div" class="flex flex-col-reverse bg-white rounded-2xl p-6 shadow-sm" :selected-index="selectedTab" @change="handleTabChange">
					<div class="relative mx-auto mt-8 w-full max-w-2xl sm:block lg:max-w-none">
						<!-- 좌우 버튼 -->
						<button @click="prevImage" 
							class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2.5 shadow-lg hover:bg-gray-50 transition-all duration-200 border border-gray-100">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-gray-600">
								<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
							</svg>
						</button>
						<button @click="nextImage"
							class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2.5 shadow-lg hover:bg-gray-50 transition-all duration-200 border border-gray-100">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-gray-600">
								<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
							</svg>
						</button>

						<!-- 이미지 리스트 -->
						<div class="overflow-hidden py-3">
							<TabList class="flex gap-3 transition-transform duration-300" 
								:style="{ transform: `translateX(-${currentTranslate}px)` }">
								<Tab v-for="(image, index) in allImages" :key="index"
									class="relative flex-shrink-0 w-16 h-16 cursor-pointer rounded-lg bg-white border border-gray-100 hover:border-gray-200 transition-all duration-200"
									v-slot="{ selected }">
									<span class="sr-only">Image {{ index + 1 }}</span>
									<span class="absolute inset-0 overflow-hidden rounded-lg">
										<img :src="image" alt="" 
											class="h-full w-full object-contain p-1" />
									</span>
									<span
										:class="[selected ? 'ring-2 ring-indigo-500' : 'ring-transparent', 'pointer-events-none absolute inset-0 rounded-lg']"
										aria-hidden="true" />
								</Tab>
							</TabList>
						</div>
					</div>

					<TabPanels class="w-full mb-6 relative overflow-hidden">
						<div class="flex transition-transform duration-300 ease-in-out"
							:style="{ transform: `translateX(-${selectedTab * 100}%)` }">
							<div v-for="(image, index) in allImages" :key="index"
								class="w-full flex-shrink-0">
								<div class="aspect-square overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center max-w-[500px] mx-auto">
									<img :src="image" alt="Product Image" 
										class="max-h-[500px] w-auto object-contain" />
								</div>
							</div>
						</div>
					</TabPanels>
				</TabGroup>
			</div>

			<!-- Product info -->
			<div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
				<LoadingSpinner v-if="loadingStates.productInfo" />
				<div v-else>
					<h1 class="text-2xl font-bold tracking-tight text-gray-900">{{ productItem.name }}</h1>

					<!-- 상품속성 시작 -->
					<div class="product-properties mt-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
						<div v-if="!productItem.specType">
							<div class="flex items-center justify-between">
								<div class="flex items-baseline gap-2">
									<p class="text-2xl font-semibold text-gray-900">￦{{ (selectedSku.price / 100).toFixed(2) }}</p>
									<p class="text-xs text-gray-500">부가세 포함</p>
								</div>
								<div class="px-3 py-1 rounded-full" :class="[productItem.stock > 0 ? 'bg-gray-50 border-gray-200' : 'bg-red-50 border-red-200']">
									<p class="text-xs" :class="[productItem.stock > 0 ? 'text-gray-600' : 'text-red-600']">
										{{ productItem.stock > 0 ? `재고: ${productItem.stock}` : '품절' }}
									</p>
								</div>
							</div>
						</div>
						<div v-else>
							<div class="flex items-center justify-between mb-4">
								<div class="flex items-baseline gap-2">
									<p class="text-2xl font-semibold text-gray-900">￦{{ (selectedSku.price / 100).toFixed(2) }}</p>
									<p class="text-xs text-gray-500">부가세 포함</p>
								</div>
								<div class="px-3 py-1 rounded-full" :class="[selectedSku.stock > 0 ? 'bg-gray-50 border-gray-200' : 'bg-red-50 border-red-200']">
									<p class="text-xs" :class="[selectedSku.stock > 0 ? 'text-gray-600' : 'text-red-600']">
										{{ selectedSku.stock > 0 ? `재고: ${selectedSku.stock}` : '품절' }}
									</p>
								</div>
							</div>
							<div class="space-y-4">
								<div v-for="(property, index) in uniqueProperties" :key="index" 
									class="bg-gray-50 p-4 rounded-lg">
									<div class="flex items-center gap-4">
										<dt class="w-20 text-sm text-right font-medium text-gray-700 shrink-0">{{ property.propertyName }} : </dt>
										<dd class="flex-1">
											<div class="flex flex-wrap gap-2">
												<button v-for="value in property.values" :key="value.valueId"
													:class="[
														'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border', 
														isValueDisabled(property.propertyName, value.valueName) 
															? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-100' 
															: selectedProperties[property.propertyName] === value.valueName 
																? 'bg-gray-900 text-white border-gray-900' 
																: 'bg-white text-gray-700 hover:bg-gray-100 border-gray-200'
													]"
													@click="selectProperty(property.propertyName, value.valueName)"
													:disabled="isValueDisabled(property.propertyName, value.valueName)">
													{{ value.valueName }}
												</button>
											</div>
										</dd>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- 상품속성 끝 -->

					<!-- 수량선택 부분 수정 -->
					<div class="mt-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
						<div class="bg-gray-50 p-4 rounded-lg">
							<div class="flex items-center gap-4">
								<dt class="w-20 text-sm text-right font-medium text-gray-700 shrink-0">수량 : </dt>
								<dd class="flex-1">
									<div class="flex items-center gap-2">
										<button @click="decreaseQuantity" 
											class="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-100 hover:bg-gray-200 border border-gray-200 transition-all duration-200 active:scale-95">
											<MinusIcon class="h-5 w-5 text-gray-700" />
										</button>
										<input type="number" min="1" max="99" v-model="quantity" 
											class="w-16 text-center text-gray-900 no-spinners border border-gray-200 rounded-lg py-1.5 bg-white focus:ring-2 focus:ring-gray-200 focus:outline-none text-sm font-medium" />
										<button @click="increaseQuantity"
											class="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-100 hover:bg-gray-200 border border-gray-200 transition-all duration-200 active:scale-95">
											<PlusIcon class="h-5 w-5 text-gray-700" />
										</button>
										<span class="text-xs" :class="[selectedSku.stock > 0 ? 'text-gray-600' : 'text-red-600']">
											{{ selectedSku.stock > 0 ? `재고: ${selectedSku.stock}` : '품절' }}
										</span>
									</div>
								</dd>
							</div>
						</div>
					</div>
					<!-- 수량선택 끝 -->

					<!-- 버튼 그룹 -->
					<div class="mt-6 flex gap-3">
						<button @click="addToCart" 
							class="flex-1 bg-white text-gray-700 px-4 py-2.5 rounded-lg font-medium transition-colors duration-200 shadow-sm border border-gray-200 flex items-center justify-center gap-2"
							:class="[isOutOfStock ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50']"
							:disabled="isOutOfStock">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
								<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
							</svg>
							장바구니
						</button>
						<button class="flex-1 px-4 py-2.5 rounded-lg font-medium transition-colors duration-200 shadow-sm flex items-center justify-center gap-2"
							:class="[isOutOfStock ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-900 hover:bg-gray-800 text-white']"
							:disabled="isOutOfStock">
							{{ isOutOfStock ? '품절' : '구매하기' }}
						</button>
						<button class="bg-white p-2.5 rounded-lg hover:bg-gray-50 transition-colors duration-200 border border-gray-200">
							<HeartIcon class="h-5 w-5 text-gray-600" />
						</button>
					</div>
				</div>
			</div>
		</div>

		<!-- Description -->
		<div class="mt-16 border-t border-gray-200 pt-10">
			<LoadingSpinner v-if="loadingStates.description" />
			<div v-else>
				<h3 class="text-lg font-medium text-gray-900 mb-6">상품 설명</h3>
				<div class="prose prose-sm max-w-none text-gray-500" v-html="productItem.description" />
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
	RadioGroup,
	RadioGroupOption,
	Tab,
	TabGroup,
	TabList,
	TabPanel,
	TabPanels,
} from '@headlessui/vue'
import { StarIcon } from '@heroicons/vue/20/solid'
import { HeartIcon, MinusIcon, PlusIcon } from '@heroicons/vue/24/outline';
import { getSpuDetail } from '@/api/product';
import { useAuthStore } from '@/stores/auth';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { useToastStore } from '@/stores/toast';
import { useI18n } from 'vue-i18n';	

// i18n 사용
const { t } = useI18n();

// 상품 정보를 저장하는 반응형 변수
const productItem = ref({});
// 선택된 속성들을 저장하는 반응형 변수 (예: {"색상": "빨강", "사이즈": "L"})
const selectedProperties = ref({});
// 현재 선택된 SKU 정보를 저장하는 반응형 변수
const selectedSku = ref({});
// 수량 선택 변수
const quantity = ref(1);
// 라우터 객체
const router = useRouter();

// auth store 사용
const authStore = useAuthStore();

// toast store 사용
const toastStore = useToastStore();

/**
 * 수량 감소 함수
 */
const decreaseQuantity = () => {
	quantity.value--;
	if (quantity.value < 1) {
		quantity.value = 1;
	}
};

/**
 * 수량 증가 함수
 */
const increaseQuantity = () => {
	quantity.value++;
};

/**
 * 상품의 모든 고유한 속성들을 계산하여 반환하는 computed 속성
 * @returns {Array} 속성 목록 (예: [{propertyName: "색상", values: [{valueId: 1, valueName: "빨강"}, ...]}, ...])
 */
const uniqueProperties = computed(() => {
	if (!productItem.value.skus) return [];
	const propertiesMap = {};
	productItem.value.skus.forEach(sku => {
		sku.properties.forEach(prop => {
			if (!propertiesMap[prop.propertyName]) {
				propertiesMap[prop.propertyName] = { propertyName: prop.propertyName, values: [] };
			}
			if (!propertiesMap[prop.propertyName].values.some(v => v.valueName === prop.valueName)) {
				propertiesMap[prop.propertyName].values.push({ valueId: prop.valueId, valueName: prop.valueName });
			}
		});
	});
	return Object.values(propertiesMap);
});

/**
 * 속성 선택 시 호출되는 함수
 * @param {string} propertyName - 속성 이름 (예: "색상")
 * @param {string} valueName - 선택된 값 (예: "빨강")
 */
const selectProperty = (propertyName, valueName) => {
	if (isValueDisabled(propertyName, valueName)) return;
	selectedProperties.value[propertyName] = valueName;
	updateSelectedSku();
};

/**
 * 선택된 속성들에 맞는 SKU를 찾아 업데이트하는 함수
 */
const updateSelectedSku = () => {
	const matchingSku = productItem.value.skus.find(sku => {
		return sku.properties.every(prop => selectedProperties.value[prop.propertyName] === prop.valueName);
	});
	if (matchingSku) {
		selectedSku.value = matchingSku;
	}
};

/**
 * 재고가 있는 첫 번째 SKU를 찾는 함수
 * @returns {Object|null} 재고가 있는 첫 번째 SKU 또는 null
 */
const findFirstAvailableSku = () => {
	if (!productItem.value.skus) return null;
	
	// 재고가 있는 첫 번째 SKU를 찾음
	return productItem.value.skus.find(sku => sku.stock > 0);
};

/**
 * 상품 첫 로딩 시 기본 선택될 속성들을 초기화하는 함수
 * 재고가 있는 SKU를 우선적으로 선택
 */
const initializeSelectedProperties = () => {
	const firstAvailableSku = findFirstAvailableSku();
	
	if (firstAvailableSku) {
		// 재고가 있는 SKU의 속성들을 선택
		firstAvailableSku.properties.forEach(prop => {
			selectedProperties.value[prop.propertyName] = prop.valueName;
		});
	} else {
		// 재고가 있는 SKU가 없는 경우 첫 번째 SKU의 속성들을 택
		uniqueProperties.value.forEach(property => {
			selectedProperties.value[property.propertyName] = property.values[0].valueName;
		});
	}
	updateSelectedSku();
};

/**
 * 상품의 모든 이미지(대표 이미지 + 추가 이미지)를 반환하는 computed 속성
 * 중복 이미지는 제거됨
 */
const allImages = computed(() => {
	if (!productItem.value) return [];
	
	const mainImage = productItem.value.picUrl;
	const sliderImages = productItem.value.sliderPicUrls || [];
	
	return [mainImage, ...sliderImages].filter((image, index, self) => 
		self.indexOf(image) === index
	);
});

// 현재 선택된 이미지 탭 인덱스
const selectedTab = ref(0);
// 이미지 슬라이드의 현재 이동 거리
const currentTranslate = ref(0);

/**
 * 이미지 탭 변경 시 호출되는 함수
 * @param {number} index - 선택된 이미지의 인덱스
 */
const handleTabChange = (index) => {
	selectedTab.value = index;
	updateTranslate();
};

/**
 * 다음 이미지로 이동하는 함수
 */
const nextImage = () => {
	if (selectedTab.value < allImages.value.length - 1) {
		selectedTab.value++;
		handleTabChange(selectedTab.value);
	} else {
		selectedTab.value = 0;
		handleTabChange(selectedTab.value);
	}
};

/**
 * 이전 이미지로 이동하는 함수
 */
const prevImage = () => {
	if (selectedTab.value > 0) {
		selectedTab.value--;
		handleTabChange(selectedTab.value);
	} else {
		selectedTab.value = allImages.value.length - 1;
		handleTabChange(selectedTab.value);
	}
};

/**
 * 이미지 슬라이드의 이동 거리를 계산하는 수
 * 선택된 이미지가 가능한 중앙에 위치하도록 조정
 */
const updateTranslate = () => {
	const itemWidth = 72;
	const visibleItems = 8;
	const maxTranslate = Math.max(0, (allImages.value.length - visibleItems) * itemWidth);
	
	let newTranslate = (selectedTab.value * itemWidth) - (itemWidth * (visibleItems / 2 - 1));
	newTranslate = Math.max(0, Math.min(newTranslate, maxTranslate));
	currentTranslate.value = newTranslate;
};

/**
 * 현재 선택된 상품/SKU의 재고 상태를 반환하는 computed 속성
 * @returns {boolean} true: 품절, false: 재고 있음
 */
const isOutOfStock = computed(() => {
	if (!productItem.value.specType) {
		return productItem.value.stock <= 0;
	}
	return selectedSku.value?.stock <= 0;
});

/**
 * 특정 속성 값의 선택 가능 여부를 확인하는 함수
 * @param {string} propertyName - 속성 이름
 * @param {string} valueName - 속성 값
 * @returns {boolean} true: 선택 불가능(비활성화), false: 선택 가능
 */
const isValueDisabled = (propertyName, valueName) => {
	if (!productItem.value.skus) return true;
	
	// 현재 선택된 속성들의 복사본 생성
	const testProperties = { ...selectedProperties.value };
	testProperties[propertyName] = valueName;

	// 해당 속성 조합으로 가능한 SKU가 있는지 확인
	const possibleSkus = productItem.value.skus.filter(sku => {
		const matchingProps = sku.properties.filter(prop => 
			testProperties[prop.propertyName] === prop.valueName
		);
		
		// 현재까지 선택된 속성들과 일치하는 SKU 중에서
		// 재고가 있는 SKU가 하나라도 있으면 선택 가능
		return matchingProps.length === Object.keys(testProperties).length;
	});

	// 가능한 SKU들 중 재고가 있는 것이 하나라도 있으면 선택 가능
	return !possibleSkus.some(sku => sku.stock > 0);
};

/**
 * 장바구니에 상품을 추가하는 함수
 * 로그인이 되어있지 않으면 로그인페이지로 유도함
 */
const addToCart = () => {
	// 로그인 여부 확인 (전역 상태 사용)
	if (!authStore.isLoggedIn) {
		if (window.confirm('로그인 페이지로 이동하시겠습니까?')) {
			router.push('/login');
		}
		return;
	}

	// 장바구니에 추가할 상품 정보 구성
	const cartItem = {
		spuId: productItem.value.id,
		spuName: productItem.value.name,
		picUrl: productItem.value.picUrl,
		price: selectedSku.value.price,
		quantity: quantity.value,  // 수량 선택 변수
		// 단일 상품인 경우
		...((!productItem.value.specType) && {
			skuId: selectedSku.value.id
		}),
		// 다중 속성 상품인 경우
		...(productItem.value.specType && {
			skuId: selectedSku.value.id,
			properties: selectedSku.value.properties,
			selectedProperties: { ...selectedProperties.value }
		})
	};

	// 로컬 스토리지에서 현재 장바구니 정보 가져오기
	const currentCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
	
	// 동일한 상품이 있는지 확인
	const existingItemIndex = currentCart.findIndex(item => 
		item.skuId === cartItem.skuId
	);

	if (existingItemIndex !== -1) {
		// 이미 있는 상품이면 수량만 증가
		currentCart[existingItemIndex].quantity += 1;
	} else {
		// 새로운 상품이면 추가
		currentCart.push(cartItem);
	}

	// 장바구니 정보 저장
	localStorage.setItem('cartItems', JSON.stringify(currentCart));

	// toast 사용
	toastStore.showToast('success', t('toast.success.addToCart'), 2000);
};

// 영역별 로딩 상태 관리
const loadingStates = ref({
	images: true,
	productInfo: true,
	description: true
});

/**
 * 컴포넌트 마운트 시 실행되는 함수
 * 상품 상세 정보를 불러오고 초기 속성을 설정
 */
onMounted(() => {
	const route = useRoute();
	const id = route.params.id;
	
	// 이미지 영역 로딩
	loadingStates.value.images = true;
	// 상품 정보 영역 로딩
	loadingStates.value.productInfo = true;
	// 설명 영역 로딩
	loadingStates.value.description = true;

	getSpuDetail(id).then(res => {
		productItem.value = res.data.data;
		if (!productItem.value.specType) {
			selectedSku.value = productItem.value.skus[0];
		} else {
			initializeSelectedProperties();
		}
		
		// 모든 영역 로딩 완료
		loadingStates.value.images = false;
		loadingStates.value.productInfo = false;
		loadingStates.value.description = false;
	})
})
</script>

<style scoped>
.overflow-hidden {
	mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}

/* 이미지 슬라이드 애니메이션을 부드럽게 만들기 위한 추가 스타일 */
.transition-transform {
	will-change: transform;
}

/* Chrome, Safari, Edge, Opera에서 number input의 화살표 제거 */
.no-spinners::-webkit-outer-spin-button,
.no-spinners::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox에서 number input의 화살표 제거 */
/* .no-spinners {
    -moz-appearance: textfield;
} */
</style>
