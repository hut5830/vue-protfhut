<template>
    <div class="overflow-auto whitespace-nowrap">
        <table class="table-auto border-solid border border-gray-400 w-full text-left">
            <thead>
                <tr>
                    <th class="text-center">ลำดับ</th>
                    <th class="text-center">วันที่ชำระ</th>
                    <th class="text-center">งวด</th>
                    <th class="text-center">ยอดชำระ</th>
                    <th class="text-center">ยอดค้างชำระ</th>
                </tr>
            </thead>
            <tr v-for="r, i in tableData" :key="i" class="border-solid border-t border-b border-gray-400 text-xs">
                <td class="border-solid border-l border-gray-400">{{ i + 1 }}</td>
                <td class="border-solid border-l border-gray-400">{{ r.date_pay }}</td>
                <td class="border-solid border-l border-r border-gray-400 text-center">{{ r.period }}</td>
                <td class="border-solid border-l border-gray-400 text-end relative">
                    {{ r.payment }}
                    <span class="xs:pl-0 md:pl-3 lg:pl-3 xl:pl-3 absolute top-1/2 left-0 transform -translate-y-1/2 ">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                        </svg>
                    </span>
                </td>
                <td class="border-solid border-l border-gray-400 text-end relative">
                    {{ r.total_payment }}
                    <span class="xs:pl-0 md:pl-3 lg:pl-3 xl:pl-3 absolute top-1/2 left-0 transform -translate-y-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-500" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </span>
                </td>
            </tr>
        </table>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Table, Button, Space, Tooltip } from 'ant-design-vue';

const tableData = ref([
    { "date_pay": "2025-03-25", "period": 1, "payment": "15,000.00", "total_payment": "975,000.00" },
    { "date_pay": "2025-04-25", "period": 2, "payment": "30,000.00", "total_payment": "945,000.00" },
    { "date_pay": "2025-05-25", "period": 3, "payment": "45,000.00", "total_payment": "900,000.00" },
    { "date_pay": "2025-06-25", "period": 4, "payment": "60,000.00", "total_payment": "840,000.00" },
    { "date_pay": "2025-07-25", "period": 5, "payment": "75,000.00", "total_payment": "765,000.00" },
    { "date_pay": "2025-08-25", "period": 6, "payment": "90,000.00", "total_payment": "675,000.00" },
    { "date_pay": "2025-09-25", "period": 7, "payment": "105,000.00", "total_payment": "570,000.00" },
    { "date_pay": "2025-10-25", "period": 8, "payment": "120,000.00", "total_payment": "450,000.00" },
    { "date_pay": "2025-11-25", "period": 9, "payment": "135,000.00", "total_payment": "315,000.00" },
    { "date_pay": "2025-12-25", "period": 10, "payment": "150,000.00", "total_payment": "165,000.00" }
]);
</script>

<style scoped>
table th,
td {
    padding: 5px;
    padding-left: 15px;
}
</style>