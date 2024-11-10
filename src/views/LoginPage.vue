<!-- src/pages/LoginPage.vue -->
<template>
	<div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-10">
		<!-- 언어 선택 -->
		<div class="absolute top-4 right-4">
			<select v-model="currentLocale" 
				@change="changeLocale" 
				class="block w-32 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-[1px] ring-inset ring-gray-300 focus:ring-[1px] focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
			>
				<option value="ko">한국어</option>
				<option value="en">English</option>
				<option value="zh">中文</option>
			</select>
		</div>

		<div class="sm:mx-auto sm:w-full sm:max-w-sm">
			<img class="mx-auto h-10 w-auto cursor-pointer" src="@/assets/images/logo.png" alt="Your Company" @click="router.push('/')" />
		</div>

		<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
			<div>
				<label for="email" class="block text-sm/6 font-medium text-gray-900">{{ t('login.email') }}</label>
				<div class="mt-2">
					<input @keyup.enter="login" v-model="email" :placeholder="t('login.emailPlaceholder')" type="email" autocomplete="email"
						class="pl-2 block w-full border-0 py-4 text-gray-900 shadow-sm ring-[1px] ring-inset ring-gray-300 focus:ring-[1px] focus:ring-inset focus:ring-gray-900 placeholder:text-gray-400 sm:text-sm/6" />
				</div>
			</div>

			<div class="mt-6">
				<div class="flex items-center justify-between">
					<label for="password" class="block text-sm/6 font-medium text-gray-900">{{ t('login.password') }}</label>
				</div>
				<div class="mt-2">
					<input @keyup.enter="login" v-model="password" :placeholder="t('login.passwordPlaceholder')" id="password" name="password" type="password" autocomplete="current-password" required=""
						class="pl-2 block w-full border-0 py-4 text-gray-900 shadow-sm ring-[1px] ring-inset ring-gray-300 focus:ring-[1px] focus:ring-inset focus:ring-gray-900 placeholder:text-gray-400 sm:text-sm/6" />
				</div>
			</div>

			<div class="mt-6">
				<button type="submit" @click="login"
					class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-4 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
					{{ t('login.signIn') }}
				</button>
			</div>

			

			<p class="mt-8 text-center text-sm/6 text-gray-500">
				{{ t('login.notAMember') }}
				{{ ' ' }}
				<a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">{{ t('login.startTrial') }}</a>
			</p>
			<div class="text-sm text-center">
				<a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">{{ t('login.forgotPassword') }}</a>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { loginByEmail } from '@/api/member';
import { useAuthStore } from '@/stores/auth';
import { useToastStore } from '@/stores/toast';
import { useRouter, useRoute } from 'vue-router';
import { isEmpty } from '@/util/util';
import { useI18n } from 'vue-i18n';

const router = useRouter();
const route = useRoute();
const { t, locale } = useI18n();
const currentLocale = ref(locale.value);
const authStore = useAuthStore();
const toastStore = useToastStore();

const email = ref('');
const password = ref('');

const changeLocale = () => {
    locale.value = currentLocale.value;
    localStorage.setItem('locale', currentLocale.value);
};

const login = () => {
    var params = {		
        email: email.value,
        password: password.value
    }
    if (isEmpty(params.email)) {
        toastStore.showToast('warn', t('toast.email.empty'), 2000);
        return;
    }
    if (isEmpty(params.password)) {
        toastStore.showToast('warn', t('toast.password.empty'), 2000);
        return;
    }

    loginByEmail(params)
        .then(res => {
            if (res.code === 0) {
                authStore.setLoginState(res.data.accessToken);
                
                toastStore.showToast('success', t('toast.success.login'), 1000, () => {
                    const redirectUrl = route.query.redirect || '/';
                    router.push(redirectUrl);
                });
            } else {
                toastStore.showToast('error', res.msg, 2000);
                email.value = '';
                password.value = '';
            }
        });
}
</script>
