<template>
    <div class="min-h-screen flex items-center justify-center">
        <div class="text-center">
            <p class="text-2xl font-bold text-gray-900">404</p>
            <h1 class="mt-4 text-md font-bold tracking-tight text-gray-900 sm:text-xl">페이지를 찾을 수 없습니다</h1>
            <p class="mt-6 text-base leading-7 text-gray-600">죄송합니다. 요청하신 페이지를 찾을 수 없습니다.</p>
            <div class="mt-10 flex items-center justify-center gap-x-6">
                <router-link to="/"
                    class="rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    홈으로 돌아가기
                </router-link>
            </div>
        </div>
    </div>
</template> 