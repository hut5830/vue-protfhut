<template>
    <div>
        <a-row>
            <a-col :xs="24" :sm="24" :md="24" :lg="4" :xl="4" class="shadow-xl">
                <a-layout-sider :class="{ 'fade-in-image': activeApple, 'fade-out-image': !activeApple }" width="100%">
                    <div class="img">
                        <img src="/image/436464547_25506951142252229_7027954772834418892_n.jpg" class="img-profile"
                            alt="User Image" />
                    </div>
                    <div class="pt-2">
                        <a-input-group compact>
                            <a-input style="width: 70%;" placeholder="Basic usage" @keyup.enter="getCongrat()"
                                v-model:value="Username" />
                            <a-button style="width: 30%;" type="primary"
                                @click="activeApple = true; getCongrat()">Apply</a-button>
                        </a-input-group>
                        <fieldset v-if="dataMyself.length > 0" class="border p-2">
                            <legend class="px-2">My Profile</legend>
                            <p v-for="dm in dataMyself">{{ dm }}</p>
                        </fieldset>
                    </div>
                </a-layout-sider>
            </a-col>
            <a-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                <a-row v-if="dataMyselfProgram.length > 0">
                    <a-col v-for="dmp in dataMyselfProgram" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <div class="p-2">
                            <a-card @click="getDetail(PinCode, dmp.ID_Auto)" class="shadow-md edit-card" hoverable>
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
                <a-divider v-if="dataMyselfDetail.length > 0" class="mt-5">Skill More</a-divider>
                <div class="p-2" v-if="dataMyselfDetail.length > 0">
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
            </a-col>
        </a-row>
    </div>
</template>

<script setup lang="ts">
import { CheckCircleFilled, StarOutlined } from '@ant-design/icons-vue';

const dataMyself = ref<any>([])
const dataMyselfProgram = ref<any>([])
const dataMyselfDetail = ref<any>([])
const Username = ref<string>('Hut5830')
const activeKey = ref<string>('0')
const PinCode = ref<string>('')
const activeApple = ref<boolean>(false)

async function getCongrat() {
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
}

onMounted(() => {

})
</script>

<style scoped>
.img-profile {
    width: 200px;
    height: 200px;
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

:deep(.ant-card-head){
    background: linear-gradient(to right, rgb(63, 63, 63), rgb(75, 134, 75)) !important;
    color: white !important;
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
</style>