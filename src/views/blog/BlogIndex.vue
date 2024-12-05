<template>
    <div>
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="sm:hidden">
                <label for="tabs" class="sr-only">Select a tab</label>
                <select id="tabs" name="tabs" v-model="selectedTab"
                    class="block w-full rounded-md border-gray-400 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm sm:border-gray-300">
                    <option v-for="tab in tabs" :key="tab.name" :value="tab.name">{{ tab.name }}</option>
                </select>
            </div>
            <div class="hidden sm:block">
                <div class="border-b border-gray-200">
                    <nav class="-mb-px flex space-x-8" aria-label="Tabs">
                        <a v-for="tab in tabs" :key="tab.name" href="#"
                            :class="[tab.current ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700', 'flex whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium']"
                            :aria-current="tab.current ? 'page' : undefined" @click="selectedTab = tab.name">
                            {{ tab.name }}
                            <span v-if="tab.count"
                                :class="[tab.current ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-900', 'ml-3 hidden rounded-full px-2.5 py-0.5 text-xs font-medium md:inline-block']">{{
                                tab.count }}</span>
                        </a>
                    </nav>
                </div>
            </div>
        </div>



        <div class="bg-white py-12 sm:py-20">
            <div class="mx-auto max-w-7xl px-6 lg:px-8">
                <div class="mx-auto max-w-2xl">
                    <h2 class="text-pretty text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                        ------.
                    </h2>
                    <p class="mt-2 text-md text-gray-400">Learn how to grow your business with our expert advice.</p>
                    <div class="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
                        <article v-for="post in posts" :key="post.id"
                            class="flex max-w-xl flex-col items-start justify-between">
                            <div class="flex items-center gap-x-4 text-xs">
                                <time :datetime="post.datetime" class="text-gray-500">{{ post.date }}</time>
                                <a :href="post.category.href"
                                    class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                                    {{ post.category.title }}</a>
                            </div>
                            <div class="group relative">
                                <h3 class="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                                    <a :href="post.href">
                                        <span class="absolute inset-0" />
                                        {{ post.title }}
                                    </a>
                                </h3>
                                <p class="mt-5 line-clamp-3 text-sm/6 text-gray-600">{{ post.description }}</p>
                            </div>
                            <div class="relative mt-8 flex items-center gap-x-4">
                                <img :src="post.author.imageUrl" alt="" class="size-10 rounded-full bg-gray-50" />
                                <div class="text-sm/6">
                                    <p class="font-semibold text-gray-900">
                                        <a :href="post.author.href">
                                            <span class="absolute inset-0" />
                                            {{ post.author.name }}
                                        </a>
                                    </p>
                                    <p class="text-gray-600">{{ post.author.role }}</p>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToastStore } from '@/stores/toast';
import { useI18n } from 'vue-i18n';
import { getArticleCategoryList } from '@/api/promotion';

const route = useRoute();
const router = useRouter();
const toastStore = useToastStore();
const { t } = useI18n();

const posts = ref([]);
const tabs = ref([
    { name: 'Applied', href: '#', count: '52', current: false },
    { name: 'Phone Screening', href: '#', count: '6', current: false },
    { name: 'Interview', href: '#', count: '4', current: false },
    { name: 'Offer', href: '#', current: false },
    { name: 'Disqualified', href: '#', current: false },
]);

const selectedTab = ref('Applied');

const handleTabChange = () => {
    tabs.value.forEach(tab => {
        tab.current = tab.name === selectedTab.value;
    });
};

// 초기 탭 설정
handleTabChange();

watch(selectedTab, () => {
    handleTabChange();
});

const blogCategories = ref([]);

onMounted(async () => {
    blogCategories.value = await getArticleCategoryList();
    console.log(blogCategories.value);
    console.log(blogCategories);
    posts.value = [
        {
            id: 1,
            title: 'Boost your conversion rate',
            href: '#',
            description:
                'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel iusto corrupti dicta laboris incididunt.',
            date: 'Mar 16, 2020',
            datetime: '2020-03-16',
            category: { title: 'Marketing', href: '#' },
            author: {
                name: 'Michael Foster',
                role: 'Co-Founder / CTO',
                href: '#',
                imageUrl:
                    'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
        },
    ];
});

</script>
