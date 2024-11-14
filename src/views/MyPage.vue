<template>
	<main class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">

		<div class="flex flex-col lg:flex-row gap-x-8">
			<!-- PC 버전 사이드바 -->
			<div class="hidden lg:block w-64 shrink-0">
				<!-- 사이드바 타이틀 시작 -->
				<div class="mb-4 text-md pb-2"> 
					<!-- 프로필 정보 시작 -->
					<div class="flex items-center gap-x-3">
						<img :src="memberInfo.avatar" alt="프로필 이미지" class="w-16 h-16 rounded">
						<div class="text-xs">
							<div class="text-gray-900 font-semibold">{{ memberInfo.nickname }}</div>
							<div class="text-gray-500">{{ memberInfo.email }}</div>
						</div>
					</div>
					<!-- 프로필 정보 끝 -->
				</div>
				<!-- 사이드바 타이틀 끝 -->

				<!-- 사이드바 네비게이션 시작 -->
				<nav class="flex flex-1 flex-col" aria-label="Sidebar">
					<ul role="list" class="-mx-2 space-y-1">
						<li v-for="item in navigation" :key="item.name">
							<router-link :to="item.path"
								:class="[item.current ? 'bg-gray-100 text-gray-900 font-semibold' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900', 
								'group flex gap-x-3 rounded-md p-2 text-sm/6']">
								<component :is="item.icon" 
									:class="[item.current ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-900', 
									'h-4 w-4 shrink-0 mt-1']" 
									aria-hidden="true" />
								{{ item.name }}
							</router-link>
						</li>
					</ul>
				</nav>
				<!-- 사이드바 네비게이션 끝 -->
			</div>

			<!-- 모바일 버전 드롭다운 메뉴 -->
			<div class="lg:hidden w-48 shrink-0 mb-6 float-left">
				<Menu v-slot="{ open }" as="div" class="relative">
					<MenuButton class="w-full flex items-center justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
						메뉴 선택
						<ChevronDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
					</MenuButton>

					<transition
						enter-active-class="transition ease-out duration-100"
						enter-from-class="transform opacity-0 scale-95"
						enter-to-class="transform opacity-100 scale-100"
						leave-active-class="transition ease-in duration-75"
						leave-from-class="transform opacity-100 scale-100"
						leave-to-class="transform opacity-0 scale-95"
					>
						<MenuItems class="absolute left-0 right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
							<div class="py-1">
								<MenuItem v-for="item in navigation" :key="item.name" v-slot="{ active, close }">
									<router-link :to="item.path"
										:class="[
											active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
											item.current ? 'bg-gray-50' : '', 
											'group flex items-center px-4 py-2 text-sm'
										]"
										@click="close">
										<component :is="item.icon"
											:class="[
												item.current ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-900',
												'mr-3 h-5 w-5'
											]"
											aria-hidden="true" />
										{{ item.name }}
									</router-link>
								</MenuItem>
							</div>
						</MenuItems>
					</transition>
				</Menu>
			</div>

			<!-- 컨텐츠 영역 -->
			<div class="flex-1">
				<div class="mb-4 text-lg font-semibold pb-2 border-b border-gray-700"> {{ title }} </div>
				<router-view />
			</div>
		</div>
	</main>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
import { CalendarIcon, ChartPieIcon, DocumentDuplicateIcon, FolderIcon, HomeIcon, UsersIcon } from '@heroicons/vue/24/outline';
import { useRoute, useRouter } from 'vue-router';
import { ref, watch, onMounted } from 'vue';
import { getMemberInfo } from '@/api/member';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const router = useRouter();
const route = useRoute();
const navigation = ref([
	{ 
		name: '주문/배송 내역', 
		path: '/mypage/order-list',
		icon: HomeIcon, 
		current: route.path === '/mypage/order-list' 
	},
	{ 
		name: '취소/반품/교환 신청', 
		path: '/mypage/cancel-exchange-request',
		icon: UsersIcon, 
		current: route.path === '/mypage/cancel-exchange-request' 
	},
	{ 
		name: '쿠폰조회', 
		path: '/mypage/coupon-list',
		icon: FolderIcon, 
		current: route.path === '/mypage/coupon-list' 
	},
	{ 
		name: '위시리스트', 
		path: '/mypage/wishlist',
		icon: CalendarIcon, 
		current: route.path === '/mypage/wishlist' 
	},
	{ 
		name: '배송지 관리', 
		path: '/mypage/delivery-address',
		icon: DocumentDuplicateIcon, 
		current: route.path === '/mypage/delivery-address' 
	},
	{ 
		name: '회원정보', 
		path: '/mypage/member-info',
		icon: ChartPieIcon, 
		current: route.path === '/mypage/member-info' 
	},
]);

const memberInfo = ref({
	email: '',
	nickname: '',
	profileImageUrl: '',
	phoneNumber: '',
	birthday: '',
	gender: '',
	createdAt: '',
});

onMounted(() => {
	getMemberInfo()
		.then(res => {
			if (res.data.code === 401) {
				authStore.logout();
				router.push('/login');
			} else {
				memberInfo.value = res.data.data;
			}
		});

});

const title = ref('');

watch(() => route.path, (newPath) => {
    navigation.value = navigation.value.map(item => ({
        ...item,
        current: item.path === newPath
    }));
	title.value = navigation.value.find(item => item.path === newPath)?.name || 'My Page';
}, { immediate: true });
</script>
