<template>
    <div>
        <a-modal :open="isLoading" :closable="false" :centered="true" :footer="null" :maskStyle="{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: 'none',
        }" :bodyStyle="{
            backgroundColor: 'transparent',
            boxShadow: 'none',
            padding: '20px',
        }" :style="{
            backgroundColor: 'transparent',
            boxShadow: 'none',
        }" class="loading-modal-profile">
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

<style>
/* Custom modal content to remove background */
.loading-modal-profile .ant-modal-content {
    background: transparent;
    box-shadow: none;
}

/* Optional: Remove border */
.loading-modal-profile .ant-modal {
    background: transparent;
    box-shadow: none;
}

/* Spinner styling example */
.loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
}

.spinner {
    border: 4px solid rgba(255, 255, 255, 0.2);
    border-top: 4px solid white;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
