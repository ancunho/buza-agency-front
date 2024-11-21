<template>
    <div class="bg-white">
        <!-- Header, Navigation 등 공통 요소 -->
        <BlogHeader />

        <!-- 실제 페이지 내용이 들어갈 자리 -->
        <div class="pt-20">
            <router-view />
        </div>

        <!-- Footer -->
        <BlogFooter />
    </div>
</template>


<script setup>
import BlogHeader from './BlogHeader.vue';
import BlogFooter from './BlogFooter.vue';



</script>