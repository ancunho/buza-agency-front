import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

export const useToastStore = defineStore('toast', () => {
    const toasts = ref([]);
    let nextId = 0;
    const { t } = useI18n();

    const showToast = (type, messageKey, duration = 2000, callback = null) => {
        const id = nextId++;
        
        // messageKey를 사용하여 다국어 메시지 가져오기
        const message = t(messageKey);
        
        // 새로운 토스트 추가
        toasts.value.push({
            id,
            type,    // 'success', 'warn', 'error' 중 하나
            message
        });

        // duration 후 토스트 제거 및 콜백 실행
        setTimeout(() => {
            removeToast(id);
            // 콜백 함수가 있으면 실행
            if (callback && typeof callback === 'function') {
                callback();
            }
        }, duration);
    };

    const removeToast = (id) => {
        const index = toasts.value.findIndex(toast => toast.id === id);
        if (index > -1) {
            toasts.value.splice(index, 1);
        }
    };

    return {
        toasts,
        showToast
    };
}); 