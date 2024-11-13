<template>
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <!-- 프로필 섹션 -->
        <div class="flex items-center justify-between mb-8">
            <div class="flex items-center gap-6">
                <div class="relative">
                    <img :src="memberInfo.avatar || '/default-avatar.png'" 
                        alt="프로필 이미지" 
                        class="w-24 h-24 rounded-full object-cover border-2 border-gray-100"
                    />
                    <input type="file" 
                        ref="fileInput" 
                        @change="handleImageChange" 
                        accept="image/*" 
                        class="hidden"
                        :disabled="!isEditing"
                    />
                    <button @click="$refs.fileInput.click()" 
                        v-if="isEditing"
                        class="absolute bottom-0 right-0 bg-gray-900 text-white p-2 rounded-full hover:bg-gray-700 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </button>
                </div>
                <div>
                    <h2 class="text-2xl font-bold text-gray-900">{{ memberInfo.nickname }}</h2>
                    <p class="text-sm text-gray-500">{{ memberInfo.email }}</p>
                </div>
            </div>
            <button @click="toggleEdit" 
                class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                :class="isEditing ? 'bg-gray-100 text-gray-700' : 'bg-gray-900 text-white'">
                {{ isEditing ? '취소' : '수정하기' }}
            </button>
        </div>

        <!-- 회원 정보 폼 -->
        <div class="space-y-6">
            <!-- 닉네임 -->
            <div class="grid grid-cols-3 gap-4 items-center">
                <label class="text-sm font-medium text-gray-700">닉네임</label>
                <input type="text" 
                    v-model="editedInfo.nickname" 
                    :disabled="!isEditing"
                    class="col-span-2 px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-200 focus:outline-none disabled:bg-gray-50 disabled:text-gray-500"
                />
            </div>

            <!-- 이메일 -->
            <div class="grid grid-cols-3 gap-4 items-center">
                <label class="text-sm font-medium text-gray-700">이메일</label>
                <input type="email" 
                    v-model="editedInfo.email" 
                    disabled
                    class="col-span-2 px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-500"
                />
            </div>

            <!-- 휴대폰 번호 -->
            <div class="grid grid-cols-3 gap-4 items-center">
                <label class="text-sm font-medium text-gray-700">휴대폰 번호</label>
                <input type="tel" 
                    v-model="editedInfo.phoneNumber" 
                    :disabled="!isEditing"
                    class="col-span-2 px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-200 focus:outline-none disabled:bg-gray-50 disabled:text-gray-500"
                />
            </div>

            <!-- 성별 -->
            <div class="grid grid-cols-3 gap-4 items-center">
                <label class="text-sm font-medium text-gray-700">성별</label>
                <div class="col-span-2 flex gap-4">
                    <label class="flex items-center gap-2">
                        <input type="radio" 
                            v-model="editedInfo.gender" 
                            value="male"
                            :disabled="!isEditing"
                            class="text-gray-900 focus:ring-gray-700"
                        />
                        <span :class="!isEditing && 'text-gray-500'">남성</span>
                    </label>
                    <label class="flex items-center gap-2">
                        <input type="radio" 
                            v-model="editedInfo.gender" 
                            value="female"
                            :disabled="!isEditing"
                            class="text-gray-900 focus:ring-gray-700"
                        />
                        <span :class="!isEditing && 'text-gray-500'">여성</span>
                    </label>
                </div>
            </div>

            <!-- 회원 등급 -->
            <div class="grid grid-cols-3 gap-4 items-center">
                <label class="text-sm font-medium text-gray-700">회원 등급</label>
                <div class="col-span-2">
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                        :class="{
                            'bg-yellow-100 text-yellow-800': memberInfo.grade === 'GOLD',
                            'bg-gray-100 text-gray-800': memberInfo.grade === 'SILVER',
                            'bg-orange-100 text-orange-800': memberInfo.grade === 'BRONZE'
                        }">
                        {{ memberInfo.grade }}
                    </span>
                </div>
            </div>

            <!-- 포인트 -->
            <div class="grid grid-cols-3 gap-4 items-center">
                <label class="text-sm font-medium text-gray-700">포인트</label>
                <div class="col-span-2">
                    <span class="text-lg font-semibold text-gray-900">{{ memberInfo.point?.toLocaleString() }} P</span>
                </div>
            </div>
        </div>

        <!-- 저장 버튼 -->
        <div class="mt-8 flex justify-end" v-if="isEditing">
            <button @click="saveChanges"
                class="px-6 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                저장하기
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useToastStore } from '@/stores/toast';
import { getMemberInfo } from '@/api/member';
// import { updateMemberInfo } from '@/api/member';

const toastStore = useToastStore();
const isEditing = ref(false);
const fileInput = ref(null);

// 회원 정보 상태
const memberInfo = ref({
    email: '',
    nickname: '',
    avatar: '',
    phoneNumber: '',
    gender: '',
    grade: 'SILVER',
    point: 0
});

// 수정용 임시 데이터
const editedInfo = ref({});

// 수정 모드 토글
const toggleEdit = () => {
    if (isEditing.value) {
        // 수정 취소 시 원래 데이터로 복구
        editedInfo.value = { ...memberInfo.value };
    } else {
        // 수정 시작 시 현재 데이터 복사
        editedInfo.value = { ...memberInfo.value };
    }
    isEditing.value = !isEditing.value;
};

// 이미지 변경 처리
const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            editedInfo.value.avatar = e.target.result;
        };
        reader.readAsDataURL(file);
    }
};

// 변경사항 저장
const saveChanges = async () => {
    try {
        // await updateMemberInfo(editedInfo.value);
        memberInfo.value = { ...editedInfo.value };
        isEditing.value = false;
        toastStore.showToast('success', '회원정보가 수정되었습니다.', 2000);
    } catch (error) {
        toastStore.showToast('error', '회원정보 수정에 실패했습니다.', 2000);
    }
};

// 컴포넌트 마운트 시 회원 정보 로드
onMounted(() => {
    // API 호출로 회원 정보를 가져와서 memberInfo.value에 설정
    getMemberInfo()
        .then(res => {
            memberInfo.value = res.data.data;
        });	
    // 임시 데이터
    memberInfo.value = {
        email: 'example@email.com',
        nickname: '홍길동',
        avatar: 'https://example.com/avatar.jpg',
        phoneNumber: '010-1234-5678',
        gender: 'male',
        grade: 'GOLD',
        point: 1250
    };
    editedInfo.value = { ...memberInfo.value };
});
</script>