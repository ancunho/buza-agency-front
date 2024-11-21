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
                                    <select id="locale-language" name="language" 
                                        v-model="currentLocale" 
                                        @change="changeLocale" 
                                        class="flex items-center rounded-md border-transparent bg-none py-0.5 pl-2 pr-5 text-sm font-medium text-gray-700 focus:border-transparent focus:outline-none focus:ring-0 group-hover:text-gray-800">
                                        <option value="ko">한글</option>
                                        <option value="en">English</option>
                                        <option value="zh">中文</option>
                                    </select>
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

import { Dialog, DialogPanel, Popover, PopoverButton, PopoverGroup, PopoverPanel, Tab, TabGroup, TabList, TabPanel, TabPanels, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingCartIcon, UserIcon, XMarkIcon, ArrowRightStartOnRectangleIcon, ShoppingBagIcon } from '@heroicons/vue/24/outline'
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
import { useToastStore } from '@/stores/toast';
import { useModalStore } from '@/stores/modal';
import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/cart';
// i18n 사용
const { t } = useI18n();

// toast store 사용
const toastStore = useToastStore();
// modal store 사용
const modalStore = useModalStore();
// auth store 사용
const authStore = useAuthStore();
// cart store 사용
const cartStore = useCartStore();

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
        { name: 'Stores', href: '/store' },
    ],
}

const mobileMenuOpen = ref(false);

const categoryTree = ref([]);

const handleToCart = () => {
    router.push('/store/cart');
}



const handleLogout = () => {
    modalStore.show({
        title: null,
        message: t('header.logoutConfirm'),
        confirmText: t('common.confirm'),
        cancelText: t('common.cancel')
    }).then((result) => {
        if (result) {
            logout_process();
        }
    });
}

const logout_process = async () => {
    const res = await logout();

    if (res.code === 0) {
        authStore.logout();
        toastStore.showToast('success', t('toast.success.logout'), 500, () => {
            router.push('/store');
        });
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
