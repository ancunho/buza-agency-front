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
import ProductDetailPage from '@/views/ProductDetailPage.vue';
import NotFound from '@/views/NotFound.vue';
import { useAuthStore } from '@/stores/auth';
import { useModalStore } from '@/stores/modal';
const routes = [
    {
        path: '/',
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
                path: '/mypage',
                name: 'MyPage',
                meta: {
                    requiresAuth: true
                },
                component: MyPage,
                children: [
                    {
                        path: '',
                        redirect: '/mypage/order-list',
                        meta: {
                            requiresAuth: true
                        }
                    },
                    {
                        path: 'order-list',
                        name: 'OrderList',
                        meta: {
                            requiresAuth: true
                        },
                        component: OrderList
                    },
                    {
                        path: 'cancel-exchange-request',
                        name: 'CancelExchangeRequest',
                        meta: {
                            requiresAuth: true
                        },
                        component: CancelExchangeRequest
                    },
                    {
                        path: 'coupon-list',
                        name: 'CouponList',
                        meta: {
                            requiresAuth: true
                        },
                        component: CouponList
                    },
                    {
                        path: 'wishlist',
                        name: 'WishList',
                        meta: {
                            requiresAuth: true
                        },
                        component: WishList
                    },
                    {
                        path: 'delivery-address',
                        name: 'DeliveryAddress',
                        meta: {
                            requiresAuth: true
                        },
                        component: DeliveryAddress
                    },
                    {
                        path: 'member-info',
                        name: 'MemberInfo',
                        meta: {
                            requiresAuth: true
                        },
                        component: MemberInfo
                    },
                ]
            },
            {
                path: '/product/detail/:id',
                name: 'ProductDetail',
                meta: {
                    requiresAuth: false
                },
                component: ProductDetailPage
            }
        ]
    },
    {
        path: '/login',
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
