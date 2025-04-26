<template>
    <div>
        <p class="text-xl font-bold text-white">
            AI ข้อความตอบกลับ (เฉพาะข้อมูลบุคคล)
        </p>
        <div class="m-2"
            style="border: 1px solid #ccc; border-radius: 10px;  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <div v-if="messageChatbotArray.length > 0"
                style="height: 400px; overflow-y: auto; border-bottom: 1px solid #ccc; padding: 10px; margin-bottom: 10px;"
                ref="chatContainer">
                <div v-for="(message, index) in messageChatbotArray" :key="index">
                    <div v-if="message.question" class="message-box user-message">
                        <strong>You: </strong> <span>{{ message.question }}</span> <span style="font-size: 0.6rem;"> {{
                            message.time }}</span>
                    </div>
                    <div v-if="message.answer" class="message-box ai-message">

                        <!-- <strong>AI:</strong> -->
                        <span v-html="formatText(message.answer)" />
                    </div>
                </div>
            </div>
            <div v-else
                style="height: 400px; overflow-y: auto; border-bottom: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
                <div class="message-box ai-message">
                    <strong>AI:</strong> คุณต้องการสอบถามข้อมูลบุคคลหรือไม่ เช่น (<a-button size="small"
                        @click="messageChatbot = 'ข้อมูลส่วนตัว', chatbot()">ข้อมูลส่วนตัว</a-button>, <a-button
                        size="small"
                        @click="messageChatbot = 'ประวัติการทำงาน', chatbot()">ประวัติการทำงาน</a-button>,<a-button
                        size="small" @click="messageChatbot = 'การศึกษา', chatbot()">การศึกษา</a-button> และอื่นๆ)
                    หรือไม่?
                </div>
            </div>
            <div style="display: flex; gap: 10px; padding: 10px;">
                <a-input type="text" @keyup.enter="chatbot" v-model:value="messageChatbot"
                    placeholder="เริ่มต้นพิมพ์สอบถามข้อมูล..."
                    style="flex: 1; padding: 10px; border: 1px solid #ccc; border-radius: 5px;" />
                <button @click="chatbot" class="color-ai">
                    Send
                </button>
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
const index: any = ref(0);
async function chatbot() {
    if (!messageChatbot.value || messageChatbot.value.trim() === '') return;

    const timeHH = new Date().toLocaleTimeString('th-TH', { hour12: false });
    messageChatbotArray.value.push({ answer: '', question: '', time: timeHH });
    messageChatbotArray.value[index.value]['question'] = messageChatbot.value;
    messageChatbot.value = '';

    messageChatbotArray.value[index.value]['answer'] = 'AI:' + ' กำลังตอบกลับ...';

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
        messageChatbotArray.value[index.value]['answer'] = 'AI: ' + 'เกิดข้อผิดพลาดในการเชื่อมต่อกับ AI';
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
                            if (messageChatbotArray.value[index.value]['answer'] === '') {
                                messageChatbotArray.value[index.value]['answer'] = 'AI: ';
                            }
                            console.log(json.data);
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
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.color-ai:hover {
    background: linear-gradient(90deg, #6f42c1, #d63384, #6f42c1, #d63384);
    background-size: 400% 400%;
    animation: rainbow 5s ease infinite;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.color-ai:active {
    background: linear-gradient(90deg, #d63384, #6f42c1, #d63384, #6f42c1);
    background-size: 400% 400%;
    animation: rainbow 5s ease infinite;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
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
    background-color: #f1f1f1;
    color: #333;
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