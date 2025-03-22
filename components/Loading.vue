<template>
    <div>
        <a-modal :open="isLoading" :closable="false" :centered="true" :footer="null"
            :maskStyle="{ backgroundColor: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }"
            :bodyStyle="{ backgroundColor: 'transparent', boxShadow: 'none' }"
            :style="{ backgroundColor: 'transparent', boxShadow: 'none' }" class="custom-loading-modal">
            <div class="loading-container">
                <div class="spinner"></div>
                <p class="loading-text">Loading...</p>
            </div>
        </a-modal>
    </div>
</template>

<script setup lang="ts">
defineProps({
    isLoading: {
        type: Boolean,
        required: true
    }
});
</script>

<style scoped>
::v-deep(.custom-loading-modal) .ant-modal-content,
::v-deep(.custom-loading-modal) .ant-modal,
::v-deep(.custom-loading-modal) .ant-modal-wrap {
    background: transparent !important;
    box-shadow: none !important;
    border: none !important;
}

::v-deep(.custom-loading-modal) .ant-modal-header,
::v-deep(.custom-loading-modal) .ant-modal-footer {
    display: none !important;
}

::v-deep(.custom-loading-modal) .ant-modal-body {
    padding: 0 !important;
}

/* Loading spinner */
.loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 150px;
}

.spinner {
    width: 60px;
    height: 60px;
    border: 6px solid rgba(255, 255, 255, 0.2);
    border-top: 6px solid #409EFF;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

.loading-text {
    color: #409EFF;
    margin-top: 15px;
    font-weight: 500;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
