<template>
    <div>
        <a-row :class="{ 'shadow-md': dataMyself.length > 0, 'fadein-to-header': dataMyself.length == 0 }">
            <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <a-page-header v-if="dataMyself.length > 0" style="border-bottom: 2px solid aliceblue;
                border-bottom-right-radius: 15%;">
                    <template #title>
                        <h1 class="text-2xl font-bold dark:text-white">{{ `Portfolio` }}</h1>
                    </template>
                    <template #subTitle>
                        <span class="text-sm typing-text dark:text-white">{{ displayText }}</span>
                    </template>
                    <template #avatar>
                        <img src="https://cdn-icons-png.flaticon.com/512/2210/2210153.png" alt="Avatar"
                            class="img-headbar" />
                    </template>
                </a-page-header>
                <a-page-header v-else class="pt-[6.75rem]">

                </a-page-header>
            </a-col>
        </a-row>

        <a-row class="justify-center">
            <a-col :xs="24" :sm="24" :md="24" :lg="15" :xl="15" v-if="!isHidden">
                <a-page-header style="align-content: center;width: 100%;" :class="{ 'hidden': isHidden }">
                    <template #title>
                        <h1 class="text-2xl font-bold dark:text-white">{{ `Portfolio` }}</h1>
                    </template>
                    <template #subTitle>
                        <span class="text-sm typing-text dark:text-white">{{ displayText }}</span>
                    </template>
                    <template #avatar>
                        <img @animationend="hideElement" src="https://cdn-icons-png.flaticon.com/512/2210/2210153.png"
                            alt="Avatar" class="img-headbars" :class="{ 'fadeout-to-header': dataMyself.length > 0 }" />
                    </template>
                </a-page-header>
            </a-col>

            <a-col :xs="24" :sm="24" :md="24" :lg="5" :xl="5" class="shadow-xl"
                :class="{ 'fade-in-connect': dataMyself.length > 0 }">
                <a-layout-sider class="dark:text-white hover:bg-lime-900" style="border-right: 2px solid aliceblue;
                    border-top-right-radius:5%;"
                    :class="{ 'fade-in-image': activeApple, 'fade-out-image bg-lime-950': !activeApple }" width="100%">
                    <div class="img">
                        <div v-if="activeApple"
                            class="fade-in-active-profile z-[2] absolute top-[-80px] left-[-70px] animate-pulse w-full h-full flex items-center justify-center">
                            <CheckCircleFilled class="text-green-500 bg-green-500 text-3xl"
                                style="border-radius: 100%;" />
                        </div>
                        <img src="/image/436464547_25506951142252229_7027954772834418892_n.jpg" class="img-profile"
                            alt="User Image" />
                    </div>
                    <p class="text-white text-center text-2xl font-bold">
                        Tatchakorn Chomyong
                    </p>
                    <p class="text-center">
                        <LoginOutlined /> {{ dataMyself.length > 0 ? 'เชื่อมต่อโปรไฟล์แล้ว' : 'เชื่อมต่อโปรไฟล์' }}
                    </p>

                    <div class="m-5">
                        <a-input-group compact>
                            <a-button style="width: 100%;" type="primary"
                                :class="{ 'bg-green-600': dataMyself.length > 0 }" :loading="isLoading"
                                @click="activeApple = true; getCongrat()">
                                {{ dataMyself.length > 0 ? 'เชื่อมต่อสำเร็จ (Reconnect..)' : 'เชื่อมต่อ..' }}</a-button>
                        </a-input-group>
                    </div>

                    <a-row :gutter="[0, 15]" class="m-5" v-if="isLoading === true && dataMyself.length == 0">
                        <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <a-skeleton active />
                        </a-col>
                        <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <a-skeleton active />
                        </a-col>
                        <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <a-skeleton active />
                        </a-col>
                    </a-row>

                    <div class="m-5" :class="{ 'fade-in-myself': dataMyself.length > 0 }">
                        <div v-for="dm in dataMyself">
                            <legend class="px-2 pt-5">My Profile</legend>
                            <a-divider v-if="dataMyself.length > 0" class="mt-5">
                                <span class="text-sm dark:text-white">ข้อมูลส่วนตัว</span>
                            </a-divider>
                            <a-row :gutter="[10, 10]">
                                <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex items-center">
                                    <UserOutlined class="text-purple-500" />&nbsp; ชื่อผู้ใช้: <span>
                                        {{ dm.Username }}
                                    </span>
                                </a-col>
                                <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex items-center">
                                    <IdcardOutlined class="text-orange-500" />&nbsp; ชื่อจริง: <span>
                                        {{ dm.Firstname }} {{ dm.Lastname }}
                                    </span>
                                </a-col>
                                <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex items-center">
                                    <SmileOutlined class="text-yellow-500" />&nbsp; ชื่อเล่น: <span>
                                        {{ dm.Nickname }}
                                    </span>
                                </a-col>
                                <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex items-center">
                                    <CalendarOutlined class="text-blue-500" />&nbsp; วันเกิด: <span>
                                        {{ new Date(dm.BirthDay).toLocaleDateString('en-GB') }}
                                    </span>
                                </a-col>
                                <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex items-center">
                                    <CreditCardOutlined class="text-green-500" />&nbsp; บัตรประชาชน: <span>
                                        {{ dm.IDCard }}
                                    </span>
                                </a-col>
                            </a-row>

                            <a-divider v-if="dataMyselfProgram.length > 0" class="mt-5">
                                <span class="text-sm dark:text-white">พื้นฐานความสามารถ</span>
                            </a-divider>

                            <div>
                                <a-tag color="green" class="m-1">Fullstack Develops</a-tag>
                                <a-tag color="red" class="m-1">API</a-tag>
                                <a-tag color="blue" class="m-1">Frontend</a-tag>
                                <a-tag color="orange" class="m-1">Backend</a-tag>
                                <a-tag color="cyan" class="m-1">MySQL</a-tag>
                            </div>
                            <a-divider v-if="dataMyselfProgram.length > 0" class="mt-5">
                                <span class="text-sm dark:text-white">Framework&UI ที่ใช้ในการพัฒนา</span>
                            </a-divider>
                            <a-tag color="green" class="m-1">
                                Nuxt.JS
                            </a-tag>
                            <a-tag color="green" class="m-1">
                                Nuxt UI
                            </a-tag>
                            <br />
                            <a-tag color="blue" class="m-1">
                                Vue.JS
                            </a-tag>
                            <a-tag color="blue" class="m-1">
                                Vuetify 2 & 3
                            </a-tag>
                            <a-tag color="red" class="m-1">
                                Ant Design
                            </a-tag>
                            <a-tag color="blue" class="m-1">
                                Tailwind CSS
                            </a-tag>
                            <a-divider v-if="dataMyselfProgram.length > 0" class="mt-5">
                                <span class="text-sm dark:text-white">ภาษาที่ใช้ในการพัฒนา (FrontEnd)</span>
                            </a-divider>
                            <div>
                                <a-tag color="black" class="m-1 !text-white">
                                    <CodeOutlined /> HTML
                                </a-tag>
                                <a-tag color="black" class="m-1 !text-white">
                                    <CodeOutlined /> CSS
                                </a-tag>
                                <a-tag color="black" class="m-1 !text-yellow-300">
                                    <CodeOutlined /> Java Script
                                </a-tag>
                                <a-tag color="black" class="m-1 !text-blue-200">
                                    <CodeOutlined /> Type Script
                                </a-tag>
                            </div>
                            <a-divider v-if="dataMyselfProgram.length > 0" class="mt-5">
                                <span class="text-sm dark:text-white">ภาษาที่ใช้ในการพัฒนา (BackEnd)</span>
                            </a-divider>
                            <div>
                                <a-tag color="black" class="m-1 !text-yellow-300">
                                    <CodeOutlined /> Java Script
                                </a-tag>
                                <a-tag color="black" class="m-1 !text-blue-200">
                                    <CodeOutlined /> Type Script
                                </a-tag>
                                <a-tag color="black" class="m-1 !text-red-200">
                                    <DatabaseOutlined /> SQL
                                </a-tag>
                            </div>

                            <a-divider v-if="dataMyselfProgram.length > 0" class="mt-5">
                                <span class="dark:text-white">ติดต่อ</span></a-divider>

                            <a-row :gutter="[10, 10]">
                                <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex items-center">
                                    <PhoneOutlined class="text-blue-500" />&nbsp; เบอร์โทร: &nbsp;
                                    <a :href="`tel:${dm.Phone}`" class="text-blue-500">
                                        {{ dm.Phone }}
                                    </a>
                                </a-col>
                                <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex items-center">
                                    <MessageOutlined class="text-green-500" />&nbsp; ไอดีไลน์: &nbsp;
                                    <a :href="`https://line.me/ti/p/~${dm.Line}`" target="_blank" class="text-blue-500">
                                        {{ dm.Line }}
                                    </a>
                                </a-col>
                                <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex items-center">
                                    <MailOutlined class="text-red-500" />&nbsp; อีเมล: &nbsp;
                                    <a class="text-blue-500" href="mailto:{{ dm.Email }}">
                                        {{ dm.Email }}
                                    </a>
                                </a-col>
                            </a-row>

                            <a-divider v-if="dataMyselfProgram.length > 0" class="mt-5">
                                <span class="dark:text-white">Resume</span>
                            </a-divider>

                            <a-row>
                                <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24"
                                    class="flex justify-left items-left">
                                    <FilePdfOutlined class="text-red-500" />&nbsp; เปิด: &nbsp;
                                    <a href="https://drive.google.com/file/d/1g9vF_agYfRR7j3m3KKKkexK5euMXMHmr/view?usp=sharing"
                                        target="_blank" class="text-red-500">
                                        Resume (PDF)
                                    </a>
                                </a-col>
                            </a-row>

                        </div>
                    </div>
                </a-layout-sider>
            </a-col>

            <a-col v-if="dataMyself.length > 0" :xs="24" :sm="24" :md="19" :lg="19" :xl="19"
                :class="{ 'fade-in-myprogram': dataMyself.length > 0 }">
                <a-row v-if="dataMyselfProgram.length > 0">
                    <a-col v-for="dmp in dataMyselfProgram" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <div class="p-2">
                            <a-card
                                @click="isLoading = true; moreDetail = dmp.ID_Auto; handleCardClick(PinCode, dmp.ID_Auto)"
                                class="shadow-md edit-card" style="border-right: 5px solid #ff0000a3;" hoverable>
                                <template #title>
                                    <div class="card-title justify-items-center">
                                        <img :src="dmp.Program_Image" class="w-32 my-2 mr-2"
                                            style="border-radius: 50%;" />
                                    </div>
                                </template>
                                <!-- <template #extra>
                                    <a-button type="primary" shape="round" size="small">
                                        ดูรายละเอียด
                                    </a-button>
                                </template> -->
                                <template #default>
                                    <p class="text-base font-bold">
                                        Web {{ dmp.Program_Name }}
                                    </p>
                                    <span class="edit-card-content mt-5" style="text-indent: 1rem;">
                                        {{ dmp.Program_Description }}
                                    </span>
                                </template>
                            </a-card>
                        </div>
                    </a-col>
                </a-row>

                <a-row :gutter="[0, 15]" class="m-5" v-else-if="dataMyselfProgram.length == 0 && activeApple">
                    <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <a-skeleton active />
                    </a-col>
                    <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <a-skeleton active />
                    </a-col>
                </a-row>

                <a-divider v-if="moreDetail > 0"><span class="dark:text-white">ข้อมูลระบบ</span></a-divider>

                <div v-for="dmp, i in dataMyselfProgram" :key="dmp.ID_Auto">
                    <a-row v-if="moreDetail == dmp.ID_Auto" class="detail-more-fadein text-white">
                        <a-col :xs="24" :sm="12" :md="12" :lg="10" :xl="10" style="align-content: center;">
                            <div class="img-program-detail-main">
                                <img :src="dmp.Program_Image" class="img-program-detail" alt="User Image" />
                            </div>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="12" :lg="14" :xl="14">
                            <h1 class="text-xl font-bold flex items-center">
                                เว็บไซต์: {{ dmp.Program_Name }}
                                <CheckCircleFilled class="text-green-500 ml-2" />
                            </h1>
                            <span>
                                <p style="text-indent: 2em;">{{ dmp.Program_Description }}</p>
                            </span>
                            <div>
                                <a-divider v-if="moreDetail > 0" class="mt-5"><span
                                        class="dark:text-white">ส่วนเสริมที่ใช้ในระบบ</span></a-divider>

                                <div class="p-2" v-if="moreDetail > 0">
                                    <a-collapse v-model:activeKey="activeKey" class="dark:bg-gray-500">
                                        <a-collapse-panel v-for="dmd, i in dataMyselfDetail" :key="i">
                                            <template #header>
                                                <div class="flex items-center">
                                                    <StarOutlined class="text-amber-600" />&nbsp;
                                                    <span class="dark:text-white">{{ dmd.User_Detail }}</span>
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

                <!-- <a-divider v-if="moreDetail > 0" class="mt-5"></a-divider> -->

                <!-- <div>
                    <a-row>
                        <a-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" class="flex justify-center items-center">
                            <h1 class="text-3xl font-bold">this.Resume();</h1>
                        </a-col>
                        <a-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16" class="flex justify-center">
                            <img src="/image/pdf-svgrepo-com.png" class="resume-pdf" alt="User Image" />
                        </a-col>
                    </a-row>
                </div> -->
                <!-- <div>
                    <a-row>
                        <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <a-timeline>
                                <a-timeline-item v-for="(event, index) in dataMyselfDetail" :key="index"
                                    v-if="moreDetail">
                                    <template #dot>
                                        <CheckCircleFilled class="text-green-500" />
                                    </template>
                                    <h3 class="font-bold">{{ event.User_Detail }}</h3>
                                    <p>{{ event.User_Description }}</p>
                                </a-timeline-item>
                            </a-timeline>
                        </a-col>
                    </a-row>
                </div> -->
            </a-col>
        </a-row>

        <a-row class="mt-5"></a-row>

        <a-col v-if="isHidden" :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="text-center fade-in-connect">
            <footer class="py-5 bg-gray-800 text-white">
                <div>
                    <p class="text-sm">© {{ new Date().getFullYear() }} Tatchakorn Chomyong Portfolio.</p>
                    <p class="text-sm">
                        Built with <a href="https://vuejs.org/" target="_blank" class="text-blue-400">Vue.js</a>
                        and <a href="https://antdv.com/" target="_blank" class="text-blue-400">Ant Design Vue</a>.
                        <span class="text-sm">
                            Frontend deployed on <a href="https://vercel.com/" target="_blank"
                                class="text-blue-400">Vercel</a>,
                            Backend API deployed on <a href="https://render.com/" target="_blank"
                                class="text-blue-400">Render</a>,
                            Database powered by <a href="https://www.pingcap.com/tidb/" target="_blank"
                                class="text-blue-400">TiDB</a>.
                        </span>
                    </p>
                </div>
            </footer>
        </a-col>
        <Analytics />
        <Loading :isLoading="isLoading" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Analytics } from '@vercel/analytics/nuxt';
import { CheckCircleFilled, StarOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

const dataMyself = ref<any>([])
const dataMyselfProgram = ref<any>([])
const dataMyselfDetail = ref<any>([])
const Username = ref<string>('Hut5830')
const activeKey = ref<string>('0')
const PinCode = ref<string>('')
const displayText = ref('');
const intervalMessage = 'ยินดีต้อนรับสู่ Portfolio ของ Tatchakorn...';
const activeApple = ref<boolean>(false)
const isLoading = ref<boolean>(false)
const moreDetail = ref<number>(0)
const isHidden = ref(false);


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
        message.success('เชื่อมต่อโปรไฟล์สำเร็จ!');
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
function hideElement() {
    isHidden.value = true;
}
onMounted(() => {
    let i = 0;
    const interval = setInterval(() => {
        displayText.value += intervalMessage[i];
        i++;
        if (i >= intervalMessage.length) clearInterval(interval);
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
    height: 300px;
    max-height: 300px;
    overflow: hidden;
}

.edit-card-content {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    /* จำนวนบรรทัดที่ต้องการ */
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.img-headbar {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
}

.img-headbars {
    width: 15rem;
    height: 15rem;
    border-radius: 50%;
}

.fadein-to-header {
    animation: fadeIn 0.7s ease-in-out;
}

.fadeout-to-header {
    width: 15rem;
    height: 15rem;
    animation: fadeOut 0.5s ease-in-out;
}

@keyframes transtoheader {
    0% {
        transform: translateY(70%);
        width: 16%;
        height: 30%;
        left: 11%;
    }

    100% {
        transform: translateY(-0%);
        width: 5.5%;
        height: 12%;
    }
}

.img {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    /* ปรับขนาดตามต้องการ */
    position: relative;
    overflow: hidden;
    margin-top: 15px;
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

.resume-pdf {
    width: 200px;
    height: 200px;
}

.fade-in-active-profile {
    animation: fadeIn 1.5s ease-in-out;
}

:deep(.ant-card-head) {
    /* background: linear-gradient(to right, rgb(63, 63, 63), rgb(75, 134, 75)) !important; */
    /* color: white !important; */
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
        opacity: 1;
    }

    to {
        opacity: 0;
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

.fade-in-myself {
    animation: fadeInTopDown 1s ease-in-out;
    opacity: 1;
}

.fade-in-myprogram {
    animation: fadeInLeft 2s ease-in-out;
    opacity: 1;
}

@keyframes fadeInTopDown {
    from {
        opacity: 0;
        transform: translateY(-50px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeInLeft {
    from {
        opacity: 0;
        transform: translateX(20px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.fade-in-connect {
    animation: fadeConnect 1s ease-in-out;
    opacity: 1;
}

@keyframes fadeConnect {
    0% {
        opacity: 1;
        transform: translateX(340%);
    }

    100% {
        opacity: 1;
        transform: translateX(0%);
    }

}
</style>