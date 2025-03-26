<template>
    <div>
        <a-row :gutter="16">
            <a-col :xs="24" :sm="24" :md="5" :lg="5" class="place-items-center">
                <img src="https://static-00.iconduck.com/assets.00/unlock-icon-512x512-g3tkdh5e.png" alt="Unlock Icon"
                    width="250" height="250">
                <br />
                <div>
                    <a-button class="flex items-center" type="primary" @click="encryptCheck = !encryptCheck">
                        <img src="https://static-00.iconduck.com/assets.00/key-icon-512x510-f5hzglej.png" alt="Key Icon"
                            class="w-4 h-4 mr-2">{{ encryptCheck ? 'Decrypt' : 'Encrypt' }}</a-button>
                </div>
            </a-col>
            <a-col :xs="24" :sm="24" :md="19" :lg="19">
                <h1 class="text-lg">Encrypt User By Crypto (ตัวอย่างข้อมูล)</h1>
                <p>(ตัวอย่างนี้ เป็นตัวอย่างที่เข้ารหัสด้วย Secret Key มาก่อนแล้ว)</p>
                <a-divider class="m-2" />
                <p>Username: admin</p>
                <p>Role: admin</p>
                <p>Password: {{ encryptCheck ? 'fad08ca1637ac15dc20ea19dd6304a0b' : '123' }}</p>
            </a-col>
        </a-row>


    </div>
</template>

<script setup lang="ts">
const encryptCheck = ref<boolean>(false);
</script>

<style scoped></style>