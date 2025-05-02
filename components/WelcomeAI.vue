<template>
    <div v-if="checkCssAI === false" class="WelcomeStart" @animationend="handleAnimationEnd">
        <div class="WelcomeStartText">
            <div class="star-wrapper right-3">
                <span class="sparkle delay-0">&#9733;</span>
                <span class="sparkle delay-1">&#9733;</span>
                <span class="sparkle delay-2">&#9733;</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
const emit = defineEmits(['animationCompleted']);
const checkCssAI = ref(false);
function handleAnimationEnd(event: any) {
    if (event.animationName === 'fadeOutWelcome-ba07ba0d') {
        checkCssAI.value = true;
        emit('animationCompleted');
    }
}
</script>

<style scoped>
.WelcomeStartWithAI {
    background: linear-gradient(90deg, #FFD700, #FFFFFF, #FFD700);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 1.5rem;
    animation: gradientMove 2s infinite linear;
}

.WelcomeStart {
    font-weight: bold;
    color: #ffffff;

    /* Gray-100 */
    display: flex;
    justify-content: center;
    z-index: 1000;
    width: 100%;
    height: 100%;
    place-items: center;
}

.WelcomeStart {
    animation: fadeInWelcome 1s ease-in-out, fadeOutWelcome 1s ease-in-out 1s;
    animation-delay: 0s, 2s;
    animation-fill-mode: forwards, forwards;
    pointer-events: none;
    /* Disable interactions while animating */
}

.WelcomeStartText {
    /* animation: fadeInWelcomeText 1s ease-in-out, fadeOutWelcomeText 1s ease-in-out 1s; */
    animation-delay: 0s, 2s;
    animation-fill-mode: forwards, forwards;
    pointer-events: none;
    place-items: anchor-center;
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

.star-wrapper {
    display: inline-block;
    position: relative;
}

@keyframes sparkleMove {
    0% {
        opacity: 0;
        transform: translateX(0px) scale(0.8);
    }

    30% {
        opacity: 1;
        transform: translateX(10px) scale(1.2);
    }

    60% {
        opacity: 0.8;
        transform: translateX(20px) scale(1);
    }

    100% {
        opacity: 0;
        transform: translateX(30px) scale(0.8);
    }
}

.sparkle {
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 1.2rem;
    color: gold;
    text-shadow: 0 0 6px gold;
    animation: sparkleMove 1.5s ease-in-out infinite;
}

.delay-0 {
    animation-delay: 0s;
    top: 0;
    left: 0;
}

.delay-1 {
    animation-delay: 0.3s;
    top: 0;
    left: 0;
}

.delay-2 {
    animation-delay: 0.6s;
    top: 0;
    left: 0;
}


@keyframes gradientMove {
    0% {
        background-position: -100% 50%;
    }

    50% {
        background-position: 50% 50%;
    }

    100% {
        background-position: 200% 50%;
    }
}
</style>
