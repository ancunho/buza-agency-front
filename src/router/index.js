import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import HomePage from '@/views/Main.vue';
import LoginPage from '@/views/LoginPage.vue';
import MyPage from '@/views/MyPage.vue';
import OrderList from '@/views/mypage/OrderList.vue';
import CancelExchangeRequest from '@/views/mypage/CancelExchangeRequest.vue';
import CouponList from '@/views/mypage/CouponList.vue';
import WishList from '@/views/mypage/WishList.vue';
import DeliveryAddress from '@/views/mypage/DeliveryAddress.vue';
import MemberInfo from '@/views/mypage/MemberInfo.vue';
import ProductDetailPage from '@/views/product/ProductDetailPage.vue';
import NotFound from '@/views/NotFound.vue';
import CartPage from '@/views/CartPage.vue';
import { useAuthStore } from '@/stores/auth';

const routes = [
    {
        path: '/store',
        component: DefaultLayout,
        children: [
            {
                path: '',
                name: 'Home',
                meta: {
                    requiresAuth: false
                },
                component: HomePage
            },
            {
                path: '/store/mypage',
                name: 'MyPage',
                meta: {
                    requiresAuth: true
                },
                component: MyPage,
                children: [
                    {
                        path: '',
                        redirect: '/store/mypage/order-list',
                        meta: {
                            requiresAuth: true
                        }
                    },
                    {
                        path: '/store/mypage/order-list',
                        name: 'OrderList',
                        meta: {
                            requiresAuth: true
                        },
                        component: OrderList
                    },
                    {
                        path: '/store/mypage/cancel-exchange-request',
                        name: 'CancelExchangeRequest',
                        meta: {
                            requiresAuth: true
                        },
                        component: CancelExchangeRequest
                    },
                    {
                        path: '/store/mypage/coupon-list',
                        name: 'CouponList',
                        meta: {
                            requiresAuth: true
                        },
                        component: CouponList
                    },
                    {
                        path: '/store/mypage/wishlist',
                        name: 'WishList',
                        meta: {
                            requiresAuth: true
                        },
                        component: WishList
                    },
                    {
                        path: '/store/mypage/delivery-address',
                        name: 'DeliveryAddress',
                        meta: {
                            requiresAuth: true
                        },
                        component: DeliveryAddress
                    },
                    {
                        path: '/store/mypage/member-info',
                        name: 'MemberInfo',
                        meta: {
                            requiresAuth: true
                        },
                        component: MemberInfo
                    },
                ]
            },
            {
                path: '/store/cart',
                name: 'Cart',
                meta: {
                    requiresAuth: true
                },
                component: CartPage
            },
            {
                path: '/store/product/detail/:id',
                name: 'ProductDetail',
                meta: {
                    requiresAuth: false
                },
                component: ProductDetailPage
            }
        ]
    },
    {
        path: '/store/login',
        name: 'Login',
        meta: {
            requiresAuth: false
        },
        component: LoginPage
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: DefaultLayout,
        children: [
            {
                path: '',
                component: NotFound
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (to.path === '/login') {
            next();
        } else if (authStore.isLoggedIn) {
            next();
        } else {
            alert('로그인이 필요합니다.');
            authStore.logout();
            window.location.href = '/login';
        }
    } else {
        next();
    }
});

export default router;
