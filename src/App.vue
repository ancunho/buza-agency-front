<template>
  <router-view />
  <Toast />
  <ConfirmModal />
</template>

<script setup>
import Toast from '@/components/Toast.vue';
import ConfirmModal from '@/components/ConfirmModal.vue';

</script>
