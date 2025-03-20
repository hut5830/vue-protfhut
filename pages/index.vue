<template>
    <div>
        <a-row class="shadow-md">
            <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <a-page-header>
                    <template #title>
                        <h1 class="text-2xl font-bold">{{ `Portfolio` }}</h1>
                    </template>
                    <template #subTitle>
                        <span class="text-sm typing-text">{{ displayText }}</span>
                    </template>
                    <template #tags>
                        <a-tag color="green">Fullstack Develops</a-tag>
                    </template>
                    <template #avatar>
                        <a-avatar size="large" icon="user" />
                    </template>
                </a-page-header>
            </a-col>
        </a-row>

        <a-divider class="mt-5">Website Develops</a-divider>

        <a-row>
            <a-col :xs="24" :sm="24" :md="24" :lg="4" :xl="4" class="shadow-xl">
                <a-layout-sider :class="{ 'fade-in-image': activeApple, 'fade-out-image': !activeApple }" width="100%">
                    <div class="img">
                        <img src="/image/436464547_25506951142252229_7027954772834418892_n.jpg" class="img-profile"
                            alt="User Image" />
                    </div>
                    <div class="pt-2">
                        <a-input-group compact>
                            <a-input style="width: 60%;" placeholder="Basic usage" @keyup.enter="getCongrat()"
                                v-model:value="Username" />
                            <a-button style="width: 40%;" type="primary"
                                @click="activeApple = true; getCongrat()">Connect</a-button>
                        </a-input-group>
                        <fieldset v-if="dataMyself.length > 0" class="border p-2">
                            <legend class="px-2">My Profile</legend>
                            <p>
                                <a-tag color="green" class="m-1">Fullstack Develops</a-tag>
                                <a-tag color="red" class="m-1">API</a-tag>
                                <a-tag color="blue" class="m-1">Frontend</a-tag>
                                <a-tag color="orange" class="m-1">Backend</a-tag>
                                <a-tag color="cyan" class="m-1">SQL</a-tag>
                            </p>
                            <p v-for="dm in dataMyself">
                                {{ dm }}
                                <a-divider v-if="dataMyselfProgram.length > 0" class="mt-5">ติดต่อ</a-divider>
                                <a-row>
                                    <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex items-center">
                                        <PhoneOutlined class="text-blue-500" />&nbsp; เบอร์โทร: <span class="text-gray-700">
                                            {{ dm.Phone }}
                                        </span>
                                    </a-col>
                                    <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex items-center">
                                        <MessageOutlined class="text-green-500" />&nbsp; ไอดีไลน์: <span
                                            class="text-gray-700">
                                            {{ dm.Line }}
                                        </span>
                                    </a-col>
                                    <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex items-center">
                                        <MailOutlined class="text-red-500" />&nbsp; อีเมล: <span class="text-gray-700">
                                            {{ dm.Email }}
                                        </span>
                                    </a-col>
                                </a-row>
                            </p>
                        </fieldset>
                    </div>
                </a-layout-sider>
            </a-col>
            <a-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                <a-row v-if="dataMyselfProgram.length > 0">
                    <a-col v-for="dmp in dataMyselfProgram" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <div class="p-2">
                            <a-card
                                @click="isLoading = true; moreDetail = dmp.ID_Auto; handleCardClick(PinCode, dmp.ID_Auto)"
                                class="shadow-md edit-card" hoverable>
                                <template #title>
                                    <div class="card-title">
                                        Web {{ dmp.Program_Name }} (<span class="env-production">Production</span>)
                                    </div>
                                </template>
                                <div class="edit-card-content">
                                    {{ dmp.Program_Description }}
                                </div>
                            </a-card>
                        </div>
                    </a-col>
                </a-row>
                <a-row v-else-if="dataMyselfProgram.length == 0 && activeApple">
                    <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <a-skeleton active />
                    </a-col>
                    <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <a-skeleton active />
                    </a-col>
                </a-row>

                <a-divider v-if="moreDetail > 0" class="mt-5">Detail More</a-divider>

                <div v-for="dmp in dataMyselfProgram" :key="dmp.ID_Auto" class="p-2">
                    <a-row v-if="moreDetail == dmp.ID_Auto" class="detail-more-fadein">
                        <a-col :xs="24" :sm="12" :md="12" :lg="10" :xl="10" style="align-content: center;">
                            <div class="img-program-detail-main">
                                <img :src="dmp.Program_Image" class="img-program-detail" alt="User Image" />
                            </div>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="12" :lg="14" :xl="14">
                            <h1 class="text-xl font-bold flex items-center">
                                {{ dmp.Program_Name }}
                                <CheckCircleFilled class="text-green-500 ml-2" />
                            </h1>
                            <span>
                                {{ dmp.Program_Description }}
                            </span>
                            <div>
                                <a-divider v-if="moreDetail > 0" class="mt-5">Skill More</a-divider>

                                <div class="p-2" v-if="moreDetail > 0">
                                    <a-collapse v-model:activeKey="activeKey">
                                        <a-collapse-panel v-for="dmd, i in dataMyselfDetail" :key="i">
                                            <template #header>
                                                <div class="flex items-center">
                                                    <StarOutlined class="text-amber-600" />&nbsp;
                                                    <span>{{ dmd.User_Detail }}</span>
                                                </div>
                                            </template>
                                            <div>
                                                {{ i + 1 + '. ' + dmd.User_Description }}
                                            </div>
                                        </a-collapse-panel>
                                    </a-collapse>
                                </div>
                            </div>
                        </a-col>
                    </a-row>
                </div>
            </a-col>
        </a-row>
        <Loading :isLoading="isLoading" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { CheckCircleFilled, StarOutlined } from '@ant-design/icons-vue';

const dataMyself = ref<any>([])
const dataMyselfProgram = ref<any>([])
const dataMyselfDetail = ref<any>([])
const Username = ref<string>('Hut5830')
const activeKey = ref<string>('0')
const PinCode = ref<string>('')
const displayText = ref('');
const message = 'ยินดีต้อนรับสู่ Portfolio ของ Tatchakorn...';
const activeApple = ref<boolean>(false)
const isLoading = ref<boolean>(false)
const moreDetail = ref<number>(0)

async function getCongrat() {
    isLoading.value = true
    dataMyself.value = []
    dataMyselfProgram.value = []
    dataMyselfDetail.value = []
    await $fetch(`https://port-hut.onrender.com/portfolio/mySelf`, {
        method: 'POST',
        body: {
            Username: Username.value
        }
    }).then(async (res: any) => {
        dataMyself.value = res
        for (const ms of res) {
            PinCode.value = ms.PinCode
        }
        if (!!PinCode.value) {
            await getProgram(PinCode.value);
            await getDetail(PinCode.value);
        }
    })
}
async function getProgram(PinCode: string) {
    await $fetch(`https://port-hut.onrender.com/portfolio/mySelfPrograms`, {
        method: 'POST',
        body: {
            PinCode: PinCode
        }
    }).then((res) => {
        dataMyselfProgram.value = res
    })
}
async function getDetail(PinCode: string, IdMore: number = 1) {
    await $fetch(`https://port-hut.onrender.com/portfolio/mySelfDetail`, {
        method: 'POST',
        body: {
            ID_Auto: IdMore,
            Username: PinCode
        }
    }).then(async (res) => {
        dataMyselfDetail.value = res
    })
    isLoading.value = false
}
const handleCardClick = (PinCode: string, id: number) => {
    getDetail(PinCode, id).then(() => {
        window.scrollBy({
            top: 400,
            behavior: 'smooth'
        });
    })
}

onMounted(() => {
    let i = 0;
    const interval = setInterval(() => {
        displayText.value += message[i];
        i++;
        if (i >= message.length) clearInterval(interval);
    }, 100); // speed
})
</script>

<style scoped>
.img-profile {
    width: 200px;
    height: 200px;
    border-radius: 50%;
}

.img-program-detail {
    width: 300px;
    height: 300px;
    border-radius: 50%;
}

.edit-card {
    /* background-color: #f0f2f5; */
    height: 180px;
}

.edit-card-content {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    /* จำนวนบรรทัดที่ต้องการ */
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.img {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    /* ปรับขนาดตามต้องการ */
    position: relative;
    overflow: hidden;
}

.img-program-detail-main {
    display: flex;
    justify-content: center;
    align-items: center;
    /* ปรับขนาดตามต้องการ */
    position: relative;
    overflow: hidden;
}

.img-profile {
    /* ขนาดตอนปกติ */
    transition: all 0.5s ease;
}

.fade-in-image .img-profile {
    transform: scale(1);
    opacity: 1;
}

.fade-out-image .img-profile {
    transform: scale(0.5);
    opacity: 0.5;
}

.fade-out-image,
.fade-in-image {
    width: 100%;
    height: 100%;
}

:deep(.ant-card-head) {
    background: linear-gradient(to right, rgb(63, 63, 63), rgb(75, 134, 75)) !important;
    color: white !important;
}

.detail-more-fadein {
    animation: fadeIn 0.7s ease-in-out;
    opacity: 1;
}

.detail-more-fadeout {
    animation: fadeOut 0.7s ease-in-out;
    opacity: 0;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes fadeOut {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}


.typing-text {
    overflow: hidden;
    white-space: nowrap;
    border-right: 2px solid black;
    /* ตัวเคอร์เซอร์ */
    animation: typing 3s steps(30), blink 0.75s step-end infinite;
}

@keyframes typing {
    from {
        width: 0
    }

    to {
        width: 100%
    }
}

@keyframes blink {
    50% {
        border-color: transparent
    }
}
</style>