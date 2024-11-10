// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import i18n from './plugins/i18n'
import './assets/tailwind.css'
import { setToastFunction } from './util/request'
import { useToastStore } from './stores/toast'


// 앱과 pinia 생성
const app = createApp(App)

const pinia = createPinia()


// pinia를 먼저 설치
app.use(pinia)
app.use(router)
app.use(i18n)

// 앱 마운트
app.mount('#app')

// toast store 초기화 및 토스트 함수 설정
const toastStore = useToastStore()
setToastFunction((messageKey) => toastStore.showToast('error', messageKey))

// auth store 초기화는 앱 마운트 후에
import { useAuthStore } from './stores/auth'
const authStore = useAuthStore()
authStore.checkLoginState()
