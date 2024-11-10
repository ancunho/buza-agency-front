import { defineStore } from 'pinia'
import { ref } from 'vue';
import { useToastStore } from './toast';

export const useModalStore = defineStore('modal', () => {
    const isOpen = ref(false)
    const title = ref('')
    const message = ref('')
    const confirmText = ref('확인')
    const cancelText = ref('취소')
    let resolvePromise = null

    const show = ({ title: titleText, message: messageText, confirm = '확인', cancel = '취소' }) => {
        title.value = titleText
        message.value = messageText
        confirmText.value = confirm
        cancelText.value = cancel
        isOpen.value = true

        return new Promise((resolve) => {
            resolvePromise = resolve
        })
    }

    const confirm = () => {
        isOpen.value = false
        if (resolvePromise) {
            resolvePromise(true)
            resolvePromise = null
        }
    }

    const cancel = () => {
        isOpen.value = false
        if (resolvePromise) {
            resolvePromise(false)
            resolvePromise = null
        }
    }

    const close = () => {
        cancel()
    }

    return {
        isOpen,
        title,
        message,
        confirmText,
        cancelText,
        show,
        confirm,
        cancel,
        close
    }
})

// 모달 컴포넌트에서 사용예시
// import { useModalStore } from '@/stores/modal'
// const modalStore = useModalStore()
// const { isOpen, title, message, confirmText, cancelText } = storeToRefs(modalStore);
// modalStore.show({ title: '제목', message: '내용', confirm: '확인', cancel: '취소' });
// modalStore.confirm();
// modalStore.cancel();
// modalStore.close();

