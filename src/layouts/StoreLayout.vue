<template>
    <div class="bg-white">
        <!-- Header, Navigation 등 공통 요소 -->
        <Header />

        <!-- 실제 페이지 내용이 들어갈 자리 -->
        <div class="pt-20">
            <router-view />
        </div>

        <!-- Footer -->
        <Footer />
    </div>
</template>


<script setup>
import Header from './Header.vue';
import Footer from './Footer.vue';



</script>