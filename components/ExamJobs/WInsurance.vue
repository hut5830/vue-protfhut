<template>
    <div>
        <a-card class="mb-4">
            <template #title>
                <p>หน้าแสดงข้อมูลประกัน</p>
                <p class="pr-2 text-red-500 text-xs" style="text-indent: 10px;">- ข้อมูลจะไม่ถูกเก็บลง Database</p>
            </template>
            <template #extra>
                <a-button v-if="typeSubmit === false" type="primary" @click="typeSubmit = !typeSubmit; getData()"
                    style="background-color: chocolate;">แก้ไขราคา</a-button>
                <a-button v-if="typeSubmit === true" type="primary" @click="typeSubmit = !typeSubmit; saveData()"
                    style="background-color: green;">บันทึก</a-button>
            </template>
            <template #default>
                <div>
                    <a-row>
                        <a-col style="justify-items: center;" :xs="24" :sm="24" :md="typeSubmit ? 12 : 24"
                            :lg="typeSubmit ? 12 : 24">
                            <img src="https://www.roojai.com/wp-content/themes/roojai-kit-3/assets/img/pa/pa-coverage.png"
                                alt="ภาพทรัพย์" class="w-80" style="height: auto; margin-bottom: 16px;" />
                            <a-row class="justify-start">
                                <a-col>
                                    <p><strong>ประเภทประกัน:</strong> {{ name }}</p>
                                    <p><strong>บริษัทประกัน:</strong> บริษัทประกันภัยตัวอย่าง จำกัด</p>
                                    <p><strong>เบี้ยประกัน:</strong> {{ price?.toLocaleString(undefined) }} บาท/ปี</p>
                                    <p><strong>ระยะเวลาคุ้มครอง:</strong> 1 ปี (เริ่มต้น {{ new
                                        Date().toLocaleDateString() }})
                                    </p>
                                    <p><strong>รายละเอียด:</strong> {{ detail }}</p>
                                </a-col>
                            </a-row>
                        </a-col>

                        <a-col v-if="typeSubmit === true" :xs="24" :sm="24" :md="typeSubmit ? 12 : 24"
                            :lg="typeSubmit ? 12 : 24">
                            <a-divider class="m-2" />
                            <h1 class="text-base font-bold">หลังบ้านอัพเดทข้อมูล</h1>
                            <a-divider class="m-2" />
                            <a-row :gutter="16">
                                <a-col :xs="24" :sm="24" :md="24" :lg="24">
                                    <a-form-item label="ประเภทประกัน">
                                        <a-input v-model:value="nameUpdate" />
                                    </a-form-item>
                                </a-col>
                                <a-col :xs="24" :sm="24" :md="24" :lg="24">
                                    <a-form-item label="เบี้ยประกัน">
                                        <a-input-number type="number" v-model:value="priceUpdate" style="width: 100%" />
                                    </a-form-item>
                                </a-col>
                                <a-col :xs="24" :sm="24" :md="24" :lg="24">
                                    <a-form-item label="รายละเอียด">
                                        <a-textarea v-model:value="detailUpdate" style="width: 100%" />
                                    </a-form-item>
                                </a-col>
                            </a-row>
                        </a-col>
                    </a-row>
                </div>
            </template>
        </a-card>
    </div>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue';

const typeSubmit = ref<boolean>(false);
const name = ref<string>('ประกันอัคคีภัย');
const nameUpdate = ref<string>('');
const detail = ref<string>('คุ้มครองความเสียหายจากไฟไหม้ น้ำท่วม และภัยธรรมชาติ');
const detailUpdate = ref<string>('');
const price = ref<number>(800);
const priceUpdate = ref<number>(0);

function getData() {
    nameUpdate.value = name.value;
    detailUpdate.value = detail.value;
    priceUpdate.value = price.value;
}
function saveData() {
    name.value = nameUpdate.value;
    detail.value = detailUpdate.value;
    price.value = priceUpdate.value;

    nameUpdate.value = '';
    detailUpdate.value = '';
    priceUpdate.value = 0;
    message.success('บันทึกข้อมูลเรียบร้อยแล้ว');
}
</script>

<style scoped></style>