<template>
    <!-- Mobile menu -->
    <TransitionRoot as="template" :show="mobileMenuOpen">
        <Dialog class="relative z-40 lg:hidden" @close="mobileMenuOpen = false">
            <TransitionChild as="template" enter="transition-opacity ease-linear duration-300"
                enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300"
                leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div class="fixed inset-0 z-40 flex">
                <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
                    enter-from="-translate-x-full" enter-to="translate-x-0"
                    leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
                    leave-to="-translate-x-full">
                    <DialogPanel
                        class="relative flex w-full max-w-sm flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                        <div class="flex px-4 pb-2 pt-5">
                            <button type="button"
                                class="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                                @click="mobileMenuOpen = false">
                                <span class="sr-only">{{ t('header.closeMenu') }}</span>
                                <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>

                        <div class="space-y-6 border-t border-gray-200 px-4 py-6">
                            <div v-for="category in categoryTree" :key="category.id" class="flow-root">
                                <a :href="`/product/list/${category.id}`" class="-m-2 block p-2 font-medium text-gray-900">
                                    {{ category.name }}
                                </a>
                                <div>
                                    <ul role="list" aria-labelledby="mobile-categories-heading"
                                        class="mt-2 space-y-4">
                                        <li v-for="item in category.children" :key="item.name"
                                            class="inline-block">
                                            <a :href="`/product/list/${item.id}`" class="inline-block mr-4 border border-gray-300 rounded-lg px-5 py-3 text-gray-800 transition-colors duration-300 ease-out hover:text-indigo-600 hover:bg-indigo-600 hover:text-white">
                                                {{ item.name }}
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="space-y-6 border-t border-gray-200 px-4 py-6">
                            <div v-for="page in navigation.pages" :key="page.name" class="flow-root">
                                <a :href="page.href" class="-m-2 block p-2 font-medium text-gray-900">{{ page.name
                                    }}</a>
                            </div>
                        </div>

                        <div v-if="!authStore.isLoggedIn"  class="space-y-6 border-t border-gray-200 px-4 py-6">
                            <div class="flow-root">
                                <a href="#" class="-m-2 block p-2 font-medium text-gray-900">{{ t('header.createAccount') }}</a>
                            </div>
                            <div class="flow-root">
                                <a href="/login" class="-m-2 block p-2 font-medium text-gray-900">{{ t('header.signIn') }}</a>
                            </div>
                        </div>

                        <div v-else class="space-y-6 border-t border-gray-200 px-4 py-6">
                            <div class="flow-root">
                                <a href="/mypage" class="-m-2 block p-2 font-medium text-gray-900">{{ t('header.myPage') }}</a>
                            </div>
                            <div class="flow-root">
                                <a @click="handleLogout" class="cursor-pointer -m-2 block p-2 font-medium text-gray-900">{{ t('header.logout') }}</a>
                            </div>
                        </div>

                        <div class="space-y-6 border-t border-gray-200 px-4 py-6">
                            <!-- Currency selector -->
                            <form>
                                <div class="inline-block">
                                    <label for="mobile-currency" class="sr-only">{{ t('header.currency') }}</label>
                                    <div
                                        class="group relative -ml-2 rounded-md border-transparent focus-within:ring-2 focus-within:ring-white">
                                        <select id="locale-language" name="language" 
                                            v-model="currentLocale" 
                                            @change="changeLocale" 
                                            class="flex items-center rounded-md border-transparent bg-none py-0.5 pl-2 pr-5 text-sm font-medium text-gray-700 focus:border-transparent focus:outline-none focus:ring-0 group-hover:text-gray-800">
                                            <option value="ko">한국어</option>
                                            <option value="en">English</option>
                                            <option value="zh">中文</option>
                                        </select>
                                        <div
                                            class="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                                            <ChevronDownIcon class="h-5 w-5 text-gray-500" aria-hidden="true" />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </DialogPanel>
                </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>

    <header class="z-10 fixed top-0 left-0 right-0">
        <nav aria-label="Top">
            <!-- Top navigation -->
            <div class="bg-gray-900">
                <div class="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <!-- Currency selector -->
                    <form class="hidden lg:block lg:flex-1">
                        <div class="flex">
                            <label for="desktop-currency" class="sr-only">{{ t('header.currency') }}</label>
                            <div
                                class="group relative -ml-2 rounded-md border-transparent bg-gray-900 focus-within:ring-2 focus-within:ring-white">
                                <select id="locale-language" name="language" 
                                    v-model="currentLocale" 
                                    @change="changeLocale" 
                                    class="flex items-center rounded-md bg-gray-900 text-white border-transparent py-0.5 pl-2 pr-5 text-sm font-medium text-gray-700 focus:border-transparent focus:outline-none focus:ring-0 ">
                                    <option value="ko">한국어</option>
                                    <option value="en">English</option>
                                    <option value="zh">中文</option>
                                </select>
                            </div>
                        </div>
                    </form>

                    <!-- 광고배너 시작 -->
                    <p class="flex-1 text-center text-sm font-medium text-white lg:flex-none">Get asdffree delivery on
                        {{ t('header.freeDelivery') }}
                    </p>
                    <!-- 광고배너 끝 -->

                    <!-- 로그인 상태에 따른 버튼 표시 시작 -->
                    <div v-if="!authStore.isLoggedIn" 
                        class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6" >
                        
                        <a href="#" class="text-sm font-medium text-white hover:text-gray-100">{{ t('header.createAccount') }}</a>
                        <span class="h-6 w-px bg-gray-600" aria-hidden="true" />
                        <a href="/login" class="text-sm font-medium text-white hover:text-gray-100">{{ t('header.signIn') }}</a>
                    </div>

                    <div v-else
                        class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                        <a href="/mypage" class="flex items-center text-sm font-medium text-white hover:text-gray-100">
                            <UserIcon class="h-4 w-4" aria-hidden="true" />
                            <span class="ml-1">{{ t('header.myPage') }}</span>
                        </a>
                        <span class="h-6 w-px bg-gray-600" aria-hidden="true" />
                        <a @click="handleLogout" class="flex items-center cursor-pointer text-sm font-medium text-white hover:text-gray-100">
                            <ArrowRightStartOnRectangleIcon class="h-4 w-4" aria-hidden="true" />
                            <span class="ml-1">{{ t('header.logout') }}</span>
                        </a>
                    </div>
                    <!-- 로그인 상태에 따른 버튼 표시 끝 -->
                </div>
            </div>

            <!-- Secondary navigation -->
            <div class="bg-white">
                <div class="border-b border-gray-200">
                    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div class="flex h-16 items-center justify-between">
                            <!-- Logo (lg+) -->
                            <div class="hidden lg:flex lg:items-center">
                                <a href="/">
                                    <span class="sr-only">{{ t('header.company') }}</span>
                                    <img class="h-8 w-auto"
                                        src="@/assets/images/logo.png"
                                        alt="" />
                                </a>
                            </div>

                            <div class="hidden h-full lg:flex">
                                <!-- Mega menus -->
                                <PopoverGroup class="ml-8">
                                    <div class="flex h-full justify-center space-x-8">
                                        <Popover v-for="(category, categoryIdx) in categoryTree"
                                            :key="category.name" class="flex" v-slot="{ open }">
                                            <div class="relative flex">
                                                <PopoverButton
                                                    :class="[open ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-700 hover:text-gray-800', 'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out']">
                                                    {{ category.name }}</PopoverButton>
                                            </div>

                                            <transition enter-active-class="transition ease-out duration-200"
                                                enter-from-class="opacity-0" enter-to-class="opacity-100"
                                                leave-active-class="transition ease-in duration-150"
                                                leave-from-class="opacity-100" leave-to-class="opacity-0">
                                                <PopoverPanel
                                                    class="absolute inset-x-0 top-full text-gray-500 sm:text-sm">
                                                    <!-- Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow -->
                                                    <div class="absolute inset-0 top-1/2 bg-white shadow-2xl"
                                                        aria-hidden="true" />

                                                    <div class="relative bg-white">
                                                        <div class="mx-auto max-w-7xl px-8 py-4">
                                                            <div class="grid grid-cols-1 items-start gap-x-2 gap-y-2 pb-4 pt-2">
                                                                <div class="grid grid-cols-1 gap-x-8 gap-y-10">
                                                                    <div>
                                                                        <ul role="list"
                                                                            :aria-labelledby="`desktop-featured-heading-${categoryIdx}`"
                                                                            class="mt-2">
                                                                            <li v-for="item in category.children"
                                                                                :key="item.name" class="inline-block mr-4">
                                                                                <a :href="`/product/detail/${item.id}`"
                                                                                    class="border border-gray-300 rounded-lg px-5 py-3 text-gray-800 duration-300 transition-colors ease-in-out hover:text-black hover:border-black">
                                                                                    {{ item.name }}
                                                                                </a>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </PopoverPanel>
                                            </transition>
                                        </Popover>

                                        <a v-for="page in navigation.pages" :key="page.name" :href="page.href"
                                            class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">{{
                                            page.name
                                            }}</a>
                                    </div>
                                </PopoverGroup>
                            </div>

                            <!-- Mobile menu and search (lg-) -->
                            <div class="flex flex-1 items-center lg:hidden">
                                <button type="button" class="-ml-2 rounded-md bg-white p-2 text-gray-400"
                                    @click="mobileMenuOpen = true">
                                    <span class="sr-only">Open menu</span>
                                    <Bars3Icon class="h-6 w-6" aria-hidden="true" />
                                </button>

                                <!-- Search -->
                                <a href="#" class="ml-2 p-2 text-gray-400 hover:text-gray-500">
                                    <span class="sr-only">Search</span>
                                    <MagnifyingGlassIcon class="h-6 w-6" aria-hidden="true" />
                                </a>
                            </div>

                            <!-- Logo (lg-) -->
                            <a href="#" class="lg:hidden">
                                <span class="sr-only">Your Company</span>
                                <img src="@/assets/images/logo.png"
                                    alt="" class="h-8 w-auto" />
                            </a>

                            <div class="flex flex-1 items-center justify-end">
                                <div class="flex items-center lg:ml-8">
                                    <div class="flex space-x-8">
                                        <div class="hidden lg:flex">
                                            <a href="#" class="-m-2 p-2 text-gray-700 hover:text-gray-900 flex items-center">
                                                <MagnifyingGlassIcon class="h-4 w-4" aria-hidden="true" />
                                                <span class="text-sm ml-1">{{ t('common.search') }}</span>
                                            </a>
                                        </div>
                                    </div>

                                    <span class="mx-4 h-6 w-px bg-gray-200 lg:mx-6" aria-hidden="true" />

                                    <div class="flow-root">
                                        <a href="#" class="group -m-2 flex items-center p-2">
                                            <ShoppingCartIcon
                                                class="h-4 w-4 flex-shrink-0 text-gray-700 group-hover:text-gray-900"
                                                aria-hidden="true" />
                                            <span class="text-sm ml-1">{{ t('common.cart') }}</span>
                                            <span class="ml-2 text-sm font-bold underline underline-offset-4 text-gray-700 group-hover:text-gray-900">0</span>
                                            <span class="sr-only">items in cart, view bag</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getCategoryList } from '@/api/product';
import { logout } from '@/api/member';
import { handleTree } from '@/util/util';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import {
    Dialog,
    DialogPanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
    TransitionChild,
    TransitionRoot
} from '@headlessui/vue'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingCartIcon, UserIcon, XMarkIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/vue/24/outline'
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
import { useToastStore } from '@/stores/toast';
import { useModalStore } from '@/stores/modal';
import { useAuthStore } from '@/stores/auth';

// i18n 사용
const { t } = useI18n();

// toast store 사용
const toastStore = useToastStore();
// modal store 사용
const modalStore = useModalStore();
// auth store 사용
const authStore = useAuthStore();

// router 사용
const router = useRouter();

const currentLocale = ref(localStorage.getItem('locale') || 'ko');
const changeLocale = () => {
    localStorage.setItem('locale', currentLocale.value);
    //router 새로고침
    router.go(0);

}


const navigation = {
    pages: [
        { name: 'Company', href: '#' },
        { name: 'Stores', href: '#' },
    ],
}

const mobileMenuOpen = ref(false);

const categoryTree = ref([]);

const handleLogout = () => {
    modalStore.show({
        title: null,
        message: t('header.logoutConfirm'),
        confirm: t('common.confirm'),
        cancel: t('common.cancel')
    }).then((result) => {
        if (result) {
            logout_process();
        }
    });
}

const logout_process = async () => {
    const res = await logout();
    console.log(res);

    if (res.code === 0) {
        authStore.logout();
        toastStore.showToast('success', t('toast.success.logout'), 1500);
    } else {
        toastStore.showToast('error', t('common.error'), 1500);
    }
}


onMounted(async () => {
    const res = await getCategoryList();
    const tree = handleTree(res.data.data);
    categoryTree.value = tree;

})
</script>
