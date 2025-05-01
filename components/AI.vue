<template>
    <div>
        <div class="mr-2"
            style="border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);background-color: #0d4560;">
            <div class="text-center text-lg font-bold text-white p-1 mb-2 shadow-lg">{{ iconChatAI }} AI Chatbot</div>
            <div v-if="messageChatbotArray.length > 0"
                style="height: 400px; overflow-y: auto; border-bottom: 1px solid #ccc; padding: 10px; margin-bottom: 10px;background-color: #0d4560;"
                ref="chatContainer">
                <div v-for="(message, index) in messageChatbotArray" :key="index">
                    <!-- คน สอบถาม -->
                    <div v-if="message.question">
                        <div style="display: flex; gap: 10px;">
                            <div class="message-box user-message text-end">
                                <span>{{ message.question }}</span>
                                <br />
                                <span style="font-size: 0.7rem;">{{ message.time }}</span>
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
            <div v-else
                style="height: 400px; overflow-y: auto; border-bottom: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span class="text-2xl">{{ iconChatAI }}</span>
                    <div class="message-box ai-message">
                        คุณต้องการสอบถามข้อมูลบุคคลหรือไม่ เช่น (<a-button size="small"
                            @click="messageChatbot = 'สอบถามเรื่อง ข้อมูลส่วนตัว', chatbot()">ข้อมูลส่วนตัว</a-button>,
                        <a-button size="small"
                            @click="messageChatbot = 'สอบถามเรื่อง ประวัติการทำงาน', chatbot()">ประวัติการทำงาน</a-button>,<a-button
                            size="small"
                            @click="messageChatbot = 'สอบถามเรื่อง การศึกษา', chatbot()">การศึกษา</a-button>
                        และอื่นๆ)
                        หรือไม่?
                    </div>
                </div>
            </div>
            <div style="display: flex; gap: 10px; padding: 10px;">
                <a-input type="text" @keyup.enter="chatbot" v-model:value="messageChatbot"
                    placeholder="เริ่มต้นพิมพ์สอบถามข้อมูล..." />
                <a-button @click="chatbot" class="color-ai">
                    ส่ง
                </a-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const publicEnv = useRuntimeConfig().public;

const messageChatbotArray: any = ref([]);
const messageChatbot: any = ref('');
const chatContainer = ref<HTMLElement | null | any>(null);
const iconChatAI = '🤖'
const iconUser = '👩‍💻'
const index: any = ref(0);

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
</style>