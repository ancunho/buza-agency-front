import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isLoggedIn: false,
        accessToken: null,
        refreshToken: null,
        user: null
    }),
    
    actions: {
        setLoginState(token, refreshToken) {
            this.isLoggedIn = true;
            this.accessToken = token;
            this.refreshToken = refreshToken;
            localStorage.setItem('accessToken', token);
            localStorage.setItem('refreshToken', refreshToken);
        },
        
        logout() {
            this.isLoggedIn = false;
            this.accessToken = null;
            this.user = null;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        },
        
        checkLoginState() {
            const token = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');
            if (token && token !== 'undefined' && token !== null && token !== '') {
                this.isLoggedIn = true;
                this.accessToken = token;
                this.refreshToken = refreshToken;
            }
        }
    }
}) 