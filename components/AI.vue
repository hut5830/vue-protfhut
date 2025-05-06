<template>
    <div class="text">
        <div :class="{ 'hidden': activeAI === false }" class="z-[99] fixed right-[1rem] 
        w-[18rem] 
        sm:w-[18rem] sm:top-[1rem] md:top-[5.5rem] lg:top-[5.5rem] xl:top-[5.5rem] 2xl:top-[16rem] 
        md:w-[30rem] lg:w-[30rem] xl:w-[30rem] 2xl:w-[30rem] 
        bottom-[6.5rem] self-end">
            <div class="mr-2"
                style="border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);background-color: #0d4560;">
                <div class="flex justify-between">
                    <p class="text-center text-lg text-white p-1 mb-2 shadow-lg">💬 AI Assistant
                        <span class="text-xs">(ข้อมูลส่วนตัว) </span>
                    </p>
                    <span class="text-center text-sm font-bold text-white p-1 mb-2 shadow-lg"><span
                            class="text-lg w-[10rem] mx-2 px-2 text-white cursor-pointer"
                            @click="activeAI = !activeAI">-</span></span>
                </div>
                <div v-if="messageChatbotArray.length > 0"
                    class="md:h-[100px] lg:h-[100px] xl:h-[400px] 2xl:h-[400px] sm:h-[12rem] h-[400px]"
                    style="overflow-y: auto; padding: 10px; margin-bottom: 10px;background-color: #0d4560;"
                    ref="chatContainer">
                    <div v-for="(message, index) in messageChatbotArray" :key="index">
                        <!-- คน สอบถาม -->
                        <div v-if="message.question">
                            <div style="display: flex; gap: 10px;">
                                <div class="message-box user-message text-end">
                                    <span>{{ message.question }}</span>
                                    <br />
                                    <span style="font-size: 0.6rem;">{{ message.time }}</span>
                                </div>
                                <span class="text-2xl">{{ iconUser }}</span>
                            </div>
                        </div>
                        <!-- AI ตอบกลับ -->
                        <div v-if="message.answer" style="display: flex; gap: 10px;">
                            <span class="text-2xl">{{ iconChatAI }}</span>
                            <div class="message-box ai-message">
                                <span v-html="formatText(message.answer)" />
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="md:h-[100px] lg:h-[100px] xl:h-[400px] 2xl:h-[400px] sm:h-[12rem] h-[400px]"
                    style="overflow-y: auto; margin-bottom: 10px;">
                    <WelcomeAI v-if="checkCssAI === false" @animationend="handleAnimationCompleted" />
                    <div v-else style="display: flex; align-items: center; gap: 10px;">
                        <span class="text-2xl">{{ iconChatAI }}</span>
                        <div class="message-box ai-message">
                            คุณต้องการสอบถามข้อมูลบุคคลหรือไม่ เช่น <br />
                            <a-button size="small" class="chatStyleAI"
                                @click="messageChatbot = 'สอบถามเรื่อง ข้อมูลส่วนตัว', chatbot()">ข้อมูลส่วนตัว</a-button>,
                            <a-button size="small" class="chatStyleAI"
                                @click="messageChatbot = 'สอบถามเรื่อง ประวัติการทำงาน', chatbot()">ประวัติการทำงาน</a-button>,
                            <a-button size="small" class="chatStyleAI"
                                @click="messageChatbot = 'สอบถามเรื่อง การศึกษา', chatbot()">การศึกษา</a-button>
                        </div>
                    </div>
                </div>
                <div style="gap: 10px; padding: 10px;">
                    <p class="text-white" style="font-size: 10px;">ข้อความ {{ messageChatbot.length }}/500</p>
                    <div class="flex">
                        <a-input type="text" @keyup.enter="chatbot" :maxlength="500"
                            class="dark:text-white text-white custom-placeholder"
                            style="background-color: #797979;height: 3rem;" v-model:value="messageChatbot"
                            placeholder="เริ่มต้นพิมพ์สอบถามข้อมูล..." />&nbsp;
                        <a-button @click="chatbot" class="color-ai" style="height: 3rem;">
                            ส่ง
                        </a-button>
                    </div>
                </div>
            </div>
        </div>
        <a-float-button @click="activeAI = !activeAI" type="primary" shape="circle" :style="{
            width: '3rem',
            height: '3rem',
        }">
            <template #icon>
                <CommentOutlined />
            </template>
        </a-float-button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const publicEnv = useRuntimeConfig().public;

const messageChatbotArray: any = ref([]);
const messageChatbot: any = ref('');
const chatContainer = ref<HTMLElement | null | any>(null);
const checkCssAI = ref(false);
const iconChatAI = '🤖'
const iconUser = '👩‍💻'
const index: any = ref(0);
const activeAI = ref(false);

async function chatbot() {
    if (!messageChatbot.value || messageChatbot.value.trim() === '') return;

    const timeHH = new Date().toLocaleTimeString('th-TH', { hour12: false });
    messageChatbotArray.value.push({ answer: '', question: '', time: timeHH });
    messageChatbotArray.value[index.value]['question'] = messageChatbot.value;
    messageChatbot.value = '';

    messageChatbotArray.value[index.value]['answer'] = ' กำลังตอบกลับ...';

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `${publicEnv.CHAT_BOT_AUTH}`);

    const raw = JSON.stringify(
        publicEnv.CHAT_BOT_API_KEY == 'workflows/run' ?
            {
                "inputs": {
                    "query": messageChatbotArray.value[index.value]['question']
                },
                "response_mode": "streaming",
                "conversation_id": "",
                "user": "TATH-5830"
            } :
            {
                "inputs": {},
                "query": messageChatbotArray.value[index.value]['question'],
                "response_mode": "streaming",
                "conversation_id": "",
                "user": "TATH-5830"
            }
    );

    const requestOptions: any = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    const baseEndPoint = publicEnv.CHAT_BOT_API_KEY || 'workflows/run'
    const response = await fetch(`https://api.dify.ai/v1/${baseEndPoint}`, requestOptions);
    if (!response.ok) {
        messageChatbotArray.value[index.value]['answer'] = 'เกิดข้อผิดพลาดในการเชื่อมต่อกับ AI';
        return;
    }
    const reader = response.body?.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = '';
    function chunks(value: any) {
        // ถอดข้อมูลที่อ่านได้ TextDecoder
        buffer += decoder.decode(value, { stream: true });
        // Chunk ข้อมูลเป็น Array ของบรรทัด
        let lines = buffer.split('\n');
        buffer = lines.pop() || '';
        return lines;
    }
    messageChatbotArray.value[index.value]['answer'] = '';
    new ReadableStream({
        start(controller) {
            function push() {
                reader!.read().then(({ done, value }) => {
                    if (done) {
                        controller.close();
                        index.value += 1;
                        return;
                    }

                    for (const line of chunks(value)) {
                        if (line.startsWith('data:')) {
                            const jsonString = line.replace('data:', '').trim();
                            if (jsonString === "[DONE]") break;
                            const json = JSON.parse(jsonString);
                            // if (messageChatbotArray.value[index.value]['answer'] === '') {
                            //     messageChatbotArray.value[index.value]['answer'] = iconChatAI + ': ';
                            // }
                            if (baseEndPoint === 'workflows/run') {
                                // Workflow จะตอบกลับเป็น data.text
                                messageChatbotArray.value[index.value]['answer'] += json.data.text ? json.data.text : json.data.outputs && json.data.outputs.text ? json.data.outputs.text : '';
                            } else {
                                // Chatbot จะตอบกลับเป็น answer
                                messageChatbotArray.value[index.value]['answer'] += json.answer ? json.answer : '';
                            }
                        }
                    }
                    controller.enqueue(value);
                    push();
                });
            }
            push();
        }
    });
}

function formatText(input: string): string {
    return input
        .trim() // ตัดช่องว่างหน้าหลังสุด
        .replace(/\r\n|\r|\n/g, '<br>') // เปลี่ยนทุกบรรทัดเป็น <br>
        .replace(/\*([^*]+)\*/g, '<strong>$1</strong>') // *ตัวหนา*
        .replace(/_([^_]+)_/g, '<i>$1</i>') // _ตัวเอียง_
        .replace(/(^|<br>)\s*([^\s<:\n-][^:<]*?):/g, '$1<strong>$2:</strong>') // ครอบหัวข้อ: ที่ไม่ใช่ - list
        .replace(/<br>\s*- /g, '<br>&nbsp;&nbsp;- '); // เพิ่ม indent หน้า list item
}
// ทำให้ไหลลงล่างเมื่อข้อความเพิ่ม

watch(messageChatbotArray.value, async () => {
    await nextTick(); // รอให้ข้อความ render เสร็จก่อน
    if (chatContainer.value) {
        chatContainer.value.scrollTo({
            top: chatContainer.value.scrollHeight,
            behavior: 'smooth',
        });
    }
});

function handleAnimationCompleted() {
    checkCssAI.value = true;
}
onMounted(() => {
    chatbot();
});
</script>


<style scoped>
.color-ai {
    background: linear-gradient(90deg, #d63384, #6f42c1, #d63384, #6f42c1);
    background-size: 400% 400%;
    animation: rainbow 5s ease infinite;
    color: white;
    border: none;
    padding: 0px 30px;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.color-ai:hover {
    background: linear-gradient(90deg, #6f42c1, #d63384, #6f42c1, #d63384);
    background-size: 400% 400%;
    animation: rainbow 5s ease infinite;
    color: white;
    border: none;
    padding: 0px 40px;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.color-ai:active {
    background: linear-gradient(90deg, #d63384, #6f42c1, #d63384, #6f42c1);
    background-size: 400% 400%;
    animation: rainbow 5s ease infinite;
    color: white;
    border: none;
    padding: 0px 30px;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.message-box {
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    max-width: 80%;
    word-wrap: break-word;
}

.user-message {
    background-color: #e7f3ff;
    color: #333;
    align-self: flex-end;
    margin-left: auto;
}

.ai-message {
    background: linear-gradient(90deg, #3498db, #995cb3);
    color: #fff;
    align-self: flex-start;
}

.message-box strong {
    font-weight: bold;
    margin-right: 5px;
}

@keyframes rainbow {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

.custom-placeholder::placeholder {
    color: #ccc;
    /* เปลี่ยนสีตามต้องการ เช่น ขาว, เทาอ่อน */
    opacity: 1;
    /* ทำให้ placeholder มองเห็นได้ชัดเจน */
    font-size: 0.8rem;
    /* ขนาดตัวอักษรของ placeholder */
    font-style: italic;
    /* ทำให้ตัวอักษรเป็นตัวเอียง */
    text-align: start;
    /* จัดตำแหน่งกลาง */
}

.chatStyleAI {
    display: inline-block;
    background: linear-gradient(135deg, #2bb1b8, #367ebd, #9b59b6);
    color: #ffffff;
    border-radius: 999px;
    font-size: 0.9rem;
    padding: 0rem 1rem;
    margin: 0.2rem 0;
    box-shadow: 0 0 8px rgba(79, 172, 254, 0.4), 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    white-space: nowrap;
    position: relative;
    z-index: 1;
    overflow: hidden;
}

.chatStyleAI::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at center, rgba(255, 255, 255, 0.2), transparent 70%);
    transform: rotate(25deg);
    animation: shine 2s infinite linear;
    z-index: 0;
}

.chatStyleAI:hover {
    transform: scale(1.07);
    box-shadow: 0 0 15px rgba(0, 242, 254, 0.6), 0 8px 20px rgba(0, 0, 0, 0.3);
    color: #d5f7ff;
}

.chatStyleAI span {
    position: relative;
    z-index: 2;
}

/* Animation for soft light sweep */
@keyframes shine {
    0% {
        transform: rotate(25deg) translate(-100%, -100%);
    }

    100% {
        transform: rotate(25deg) translate(100%, 100%);
    }
}
</style>