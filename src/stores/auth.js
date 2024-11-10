import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isLoggedIn: false,
        accessToken: null,
        user: null
    }),
    
    actions: {
        setLoginState(token) {
            this.isLoggedIn = true;
            this.accessToken = token;
            localStorage.setItem('accessToken', token);
        },
        
        logout() {
            this.isLoggedIn = false;
            this.accessToken = null;
            this.user = null;
            localStorage.removeItem('accessToken');
        },
        
        checkLoginState() {
            const token = localStorage.getItem('accessToken');
            if (token && token !== 'undefined' && token !== null && token !== '') {
                this.isLoggedIn = true;
                this.accessToken = token;
            }
        }
    }
}) 