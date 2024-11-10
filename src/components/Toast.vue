<template>
    <div class="fixed top-1/4 left-1/2 transform -translate-x-1/2 z-50">
        <TransitionGroup name="toast">
            <div v-for="toast in toasts" :key="toast.id"
                class="mb-2 px-6 py-3 rounded-lg shadow-lg text-sm font-medium backdrop-blur-sm text-center min-w-[200px]"
                :class="{
                    'bg-gray-800 bg-opacity-90 text-black': toast.type === 'success',
                    'bg-amber-500 bg-opacity-90 text-black': toast.type === 'warn',
                    'bg-rose-600 bg-opacity-90 text-white': toast.type === 'error',
                    'bg-gray-800 bg-opacity-90 text-black': !toast.type
                }">
                <div class="flex items-center justify-center gap-2">
                    <!-- Success Icon -->
                    <svg v-if="toast.type === 'success'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    <!-- Warning Icon -->
                    <svg v-if="toast.type === 'warn'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                    <!-- Error Icon -->
                    <svg v-if="toast.type === 'error'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                    </svg>
                    {{ toast.message }}
                </div>
            </div>
        </TransitionGroup>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useToastStore } from '@/stores/toast';

const { toasts } = storeToRefs(useToastStore());
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.toast-enter-from {
    opacity: 0;
    transform: translateY(-20px);
}

.toast-enter-to {
    opacity: 1;
    transform: translateY(0);
}

.toast-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}

.toast-move {
    transition: transform 0.3s ease;
}
</style> 