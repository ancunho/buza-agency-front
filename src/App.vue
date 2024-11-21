<template>
  <router-view />
  <Toast />
  <ConfirmModal />
</template>

<script setup>
import { onMounted } from 'vue';
import Toast from '@/components/Toast.vue';
import ConfirmModal from '@/components/ConfirmModal.vue';

onMounted(() => {
	document.title = 'Buza System';
  	console.log('App mounted');
});
</script>