<template>
    <div class="WelcomeStart"
        style="position: fixed; top: -3%; left: 0%; z-index: 9999;">
        <p class="WelcomeStartText">ยินดีต้อนรับเข้าสู่เว็บไซต์ (Portfolio)</p>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.WelcomeStart {
    font-size: 2rem;
    font-weight: bold;
    color: #ffffff;

    margin-top: 20px;
    margin-bottom: 20px;
    background-color: #909090ac;
    /* Gray-100 */
    display: flex;
    justify-content: center;
    z-index: 1000;
    width: 100%;
    height: 100%;
    place-items: center;
    background: rgba(186, 186, 186, 0.411);
    /* พื้นหลังจาง */
    border-radius: 12px;
    /* ทำให้มุมกลม */
    box-shadow: 0 0 30px rgba(186, 186, 186, 0.1), 0 0 10px rgba(186, 186, 186, 0.411);
    /* เงานุ่มๆ รอบๆ */
}

.WelcomeStart {
    animation: fadeInWelcome 1s ease-in-out, fadeOutWelcome 1s ease-in-out 1s;
    animation-delay: 0s, 2s;
    animation-fill-mode: forwards, forwards;
    pointer-events: none;
    /* Disable interactions while animating */
}
.WelcomeStartText{
    animation: fadeInWelcomeText 1s ease-in-out, fadeOutWelcomeText 1s ease-in-out 1s;
    animation-delay: 0s, 2s;
    animation-fill-mode: forwards, forwards;
    pointer-events: none;
    /* Disable interactions while animating */
}


@keyframes fadeInWelcome {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@keyframes fadeOutWelcome {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}

@keyframes fadeInWelcomeText {
    0% {
        opacity: 0;
        transform: translateX(-450px);
    }

    100% {
        opacity: 1;
        transform: translateX(0px);
    }
}

@keyframes fadeOutWelcomeText {
    0% {
        opacity: 1;
        transform: translateX(0px);
    }

    100% {
        opacity: 0;
        transform: translateX(450px);
    }
}
</style>
