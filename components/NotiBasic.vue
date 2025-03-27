<template>
    <contextHolder />
</template>
<script lang="ts" setup>
import {
    RadiusBottomleftOutlined,
    RadiusBottomrightOutlined,
    RadiusUpleftOutlined,
    RadiusUprightOutlined,
} from '@ant-design/icons-vue';
import type { NotificationPlacement } from 'ant-design-vue';
import { notification } from 'ant-design-vue';
const [api, contextHolder] = notification.useNotification();
const open = (placement: NotificationPlacement) => openNotification(placement);
const openNotification = (placement: NotificationPlacement) => {
    api.success({
        message: `เชื่อมต่อโปรไฟล์สำเร็จ (No Authen)`,
        description:
            'สามารถดูตัวอย่างโปรเจคกับรายละเอียดเบื้องต้นได้ที่ปุ่ม => (ดูรายละเอียด)',
        placement,
    });
};
onMounted(() => {
    openNotification('topRight');
});
</script>
