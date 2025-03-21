<template>
    <div>
    <a-modal :open="isLoading" :closable="false" :maskClosable="false" :centered="true" :footer="null">
        <div class="loading-spinner">
            <a-spin size="large" />
            <p>Loading...</p>
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

</style>