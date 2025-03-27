<template>
    <div>
        <a-card class="mb-4">
            <template #title>
                <p>หน้าแสดงข้อมูลทรัพย์</p>
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
                            <img src="https://static.vecteezy.com/system/resources/previews/049/514/749/non_2x/beautiful-suburban-family-house-front-view-transparent-png.png"
                                alt="ภาพทรัพย์" class="w-80" style="height: auto; margin-bottom: 16px;" />
                            <a-row class="justify-start">
                                <a-col>
                                    <p><strong>รายละเอียดเพิ่มเติม:</strong> {{ name }}</p>
                                    <p><strong>ราคาขาย:</strong> {{ price?.toLocaleString(undefined) }} บาท</p>
                                    <p><strong>ที่อยู่:</strong> 123/45 หมู่บ้านตัวอย่าง ถนนตัวอย่าง เขตตัวอย่าง
                                        จังหวัดตัวอย่าง
                                    </p>
                                    <p><strong>ขนาดพื้นที่:</strong> 50 ตารางวา</p>
                                    <p><strong>จำนวนห้อง:</strong> 3 ห้องนอน, 2 ห้องน้ำ</p>
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
                                    <a-form-item label="ชื่อทรัพย์">
                                        <a-input v-model:value="nameUpdate" />
                                    </a-form-item>
                                </a-col>
                                <a-col :xs="24" :sm="24" :md="24" :lg="24">
                                    <a-form-item label="ราคาขาย">
                                        <a-input-number type="number" v-model:value="priceUpdate" style="width: 100%" />
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
const name = ref<string>('บ้านเดี่ยวพร้อมอยู่ ใกล้โรงเรียนและห้างสรรพสินค้า');
const nameUpdate = ref<string>('');
const price = ref<number>(3500000);
const priceUpdate = ref<number>(0);

function getData() {
    nameUpdate.value = name.value;
    priceUpdate.value = price.value;
}
function saveData() {
    name.value = nameUpdate.value;
    price.value = priceUpdate.value;

    nameUpdate.value = '';
    priceUpdate.value = 0;
    message.success('บันทึกข้อมูลเรียบร้อยแล้ว');
}
</script>

<style scoped></style>