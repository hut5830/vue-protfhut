<template>
    <div>
        <h1 class="text-green-600">Hello I'm Tatchakorn</h1>
        <p class="back">Hi, I'm [Your Name], a [Your Profession].</p>
        <a-input placeholder="Basic usage" />
        <a-button type="primary">Primary Button</a-button>
    </div>
</template>

<script setup lang="ts">

async function getCongrat() {
    await $fetch('https://port-hut.onrender.com/portfolio/mySelf', {
        method:'POST'
    })
    .then((res) => {
        console.log(res)
    })
}

onMounted(() => {
    getCongrat()  
})
</script>

<style scoped>

</style>