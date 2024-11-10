import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import HomePage from '@/views/Main.vue';
import LoginPage from '@/views/LoginPage.vue';
import MyPage from '@/views/MyPage.vue';
import ProductDetailPage from '@/views/ProductDetailPage.vue';
import { useAuthStore } from '@/stores/auth';

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
                component: MyPage
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
            next('/login');
        }
    } else {
        next();
    }
});

export default router;
