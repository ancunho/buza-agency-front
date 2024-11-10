import { createI18n } from 'vue-i18n';
import ko from '@/locales/ko';
import en from '@/locales/en';
import zh from '@/locales/zh';
const i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem('locale') || 'ko', // 기본 언어
    fallbackLocale: 'en',  // 번역이 없을 경우 영어로 폴백
    messages: {
        ko,
        en,
        zh
    }
});

export default i18n; 