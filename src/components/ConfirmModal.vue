<template>
    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" class="relative z-50">
            <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div class="fixed inset-0 bg-black bg-opacity-20"></div>
            </TransitionChild>

            <div class="fixed inset-0">
                <div class="flex min-h-full items-center justify-center p-4">
                    <TransitionChild
                        as="template"
                        enter="duration-300 ease-out"
                        enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100"
                        leave="duration-200 ease-in"
                        leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95"
                    >
                        <DialogPanel class="relative w-full max-w-md transform overflow-hidden rounded shadow-2xl bg-white border border-gray-200 p-6 text-left align-middle transition-all">
                            <!-- Close button -->
                            <button 
                                @click="closeModal"
                                class="absolute top-2 right-2 text-gray-700 hover:text-gray-900 focus:outline-none"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <DialogTitle v-if="title" as="h3" class="text-xl py-2 text-center font-medium leading-6 text-gray-900">
                                {{ title }}
                            </DialogTitle>
                            <div class="mt-2">
                                <p class="text-lg py-2 text-gray-700 text-center">
                                    {{ message }}
                                </p>
                            </div>

                            <div class="mt-4 flex justify-center space-x-3">
                                <button v-if="cancelText"
                                    type="button"
                                    class="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-6 py-2 text-sm hover:transition-colors duration-500 font-medium text-gray-900 hover:bg-gray-200 focus:outline-none"
                                    @click="onCancel"
                                >
                                    {{ cancelText }}
                                </button>
                                <button
                                    type="button"
                                    class="inline-flex justify-center rounded-md border border-transparent bg-gray-900 px-6 py-2 text-sm font-medium text-white hover:bg-gray-900 hover:transition-colors duration-500 focus:outline-none"
                                    @click="onConfirm"
                                >
                                    {{ confirmText }}
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { storeToRefs } from 'pinia'
import { useModalStore } from '@/stores/modal'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const modalStore = useModalStore()
const { isOpen, title, message, confirmText, cancelText } = storeToRefs(modalStore)

const closeModal = () => {
    modalStore.close()
}

const onConfirm = () => {
    modalStore.confirm()
}

const onCancel = () => {
    modalStore.cancel()
}
</script>

<style>
/* 스타일 제거 - 스크롤 관련 스타일이 필요 없음 */
</style> 