<template>
    <div>
        <a-row
            :class="{ 'shadow-4xl bg-gray-800 border-b-2 border-aliceblue rounded-b-[25%]': dataMyself.length > 0, 'fadein-to-header': dataMyself.length == 0 }">
            <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <a-page-header v-if="dataMyself.length > 0" style="justify-self: center">
                    <template #title>
                        <h1 class="text-2xl font-bold dark:text-white text-white">{{ `Portfolio` }}</h1>
                        <span class="text-sm typing-text dark:text-white text-white">{{ displayText }}</span>
                    </template>
                    <template #avatar>
                        <img src="https://cdn-icons-png.flaticon.com/512/2210/2210153.png" alt="Avatar"
                            class="img-headbar" />
                    </template>

                    <AI class="text-blue-500" />
                </a-page-header>
                <a-page-header v-else class="pt-[6.75rem]"></a-page-header>
            </a-col>
        </a-row>

        <a-row class="justify-center !overflow-hidden">
            <a-col :xs="24" :sm="24" :md="24" :lg="15" :xl="15" v-if="isHidden">
                <a-page-header style="align-content: center;width: 100%;" :class="{ 'hidden': isHidden }">
                    <template #title>
                        <h1 class="text-2xl font-bold dark:text-white text-white">{{ `Portfolio` }}</h1>
                    </template>
                    <template #subTitle>
                        <span class="text-sm typing-text dark:text-white text-white">{{ displayText }}</span>
                    </template>
                    <template #avatar>
                        <img @animationend="hideElement" src="https://cdn-icons-png.flaticon.com/512/2210/2210153.png"
                            alt="Avatar" class="img-headbars" :class="{ 'fadeout-to-header': dataMyself.length > 0 }" />
                    </template>
                </a-page-header>
            </a-col>

            <a-col :xs="24" :sm="24" :md="9" :lg="5" :xl="5"
                :class="{ 'fade-in-connect shadow-2xl': dataMyself.length > 0 }" style="
                    border-top-right-radius:5%;">
                <a-layout-sider class="dark:text-white text-white"
                    :class="{ 'fade-in-image': activeApple, 'fade-out-image bg-blue-000': !activeApple }" width="100%">
                    <div class="img">
                        <div v-if="activeApple"
                            class="fade-in-active-profile z-[2] absolute top-[-80px] left-[-70px] animate-pulse w-full h-full flex items-center justify-center">
                            <CheckCircleFilled class="text-green-500 bg-green-500 text-[2.1rem]"
                                style="border-radius: 100%;" />
                        </div>
                        <img src="/image/436464547_25506951142252229_7027954772834418892_n.jpg" class="img-profile"
                            alt="User Image" />
                    </div>
                    <p class="text-white text-center text-2xl font-bold">
                        Tatchakorn Chomyong
                    </p>
                    <p class="text-center">
                        <LoginOutlined /> {{ dataMyself.length > 0 ? 'เชื่อมต่อโปรไฟล์แล้ว' : 'เชื่อมต่อโปรไฟล์' }}
                    </p>

                    <div class="m-5">
                        <a-input-group compact>
                            <a-button style="width: 100%;" type="primary" shape="round" size="middle"
                                :class="{ 'bg-green-600': dataMyself.length > 0 }" :loading="isLoading"
                                @click="activeApple = true; getCongrat(); activeAI = false;">
                                {{ dataMyself.length > 0 ? 'เชื่อมต่อสำเร็จ (Reconnect..)' : 'เชื่อมต่อ..' }}</a-button>
                        </a-input-group>
                    </div>

                    <!-- <div class="m-5" v-if="dataMyself.length > 0">
                        <a-input-group compact>
                            <a-button shape="round" size="middle" class="btn-ai" @click="activeAI = !activeAI;">
                                <span v-if="activeAI === false">🤖🚀 AI ติดต่อด้วยข้อความ <span
                                        class="text-red-700 text-base font-bold ml-2">NEW</span></span>
                                <span v-if="activeAI === true">🤖🚀 รายละเอียดข้อมูล</span>
                            </a-button>
                        </a-input-group>
                    </div> -->

                    <a-row :gutter="[0, 15]" class="m-5" v-if="isHidden === true && dataMyself.length == 0">
                        <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <a-skeleton active />
                        </a-col>
                        <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <a-skeleton active />
                        </a-col>
                        <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <a-skeleton active />
                        </a-col>
                    </a-row>

                    <div class="m-5" :class="{ 'fade-in-myself': dataMyself.length > 0 }">
                        <div v-for="dm in dataMyself">
                            <legend class="px-2 pt-5">My Profile</legend>
                            <a-divider v-if="dataMyself.length > 0" class="mt-5">
                                <span class="text-sm dark:text-white text-white">ข้อมูลส่วนตัว</span>
                            </a-divider>
                            <a-row :gutter="[10, 10]">
                                <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex items-center">
                                    <UserOutlined class="text-purple-500" />&nbsp; ชื่อผู้ใช้: <span>
                                        {{ dm.Username }}
                                    </span>
                                </a-col>
                                <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex items-center">
                                    <IdcardOutlined class="text-orange-500" />&nbsp; ชื่อจริง: <span>
                                        {{ dm.Firstname }} {{ dm.Lastname }}
                                    </span>
                                </a-col>
                                <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex items-center">
                                    <SmileOutlined class="text-yellow-500" />&nbsp; ชื่อเล่น: <span>
                                        {{ dm.Nickname }}
                                    </span>
                                </a-col>
                                <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex items-center">
                                    <CalendarOutlined class="text-blue-500" />&nbsp; วันเกิด: <span>
                                        {{ new Date(dm.BirthDay).toLocaleDateString('en-GB') }}
                                    </span>
                                </a-col>
                                <!-- <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex items-center">
                                    <CreditCardOutlined class="text-green-500" />&nbsp; บัตรประชาชน: <span>
                                        {{ dm.IDCard }}
                                    </span>
                                </a-col> -->
                            </a-row>

                            <a-divider v-if="dataMyselfProgram.length > 0" class="mt-5">
                                <span class="text-sm dark:text-white text-white">พื้นฐานความสามารถ</span>
                            </a-divider>

                            <div>
                                <a-tag color="green" class="m-1">Fullstack Develops</a-tag>
                                <a-tag color="red" class="m-1">API</a-tag>
                                <a-tag color="blue" class="m-1">Frontend</a-tag>
                                <a-tag color="orange" class="m-1">Backend</a-tag>
                                <a-tag color="cyan" class="m-1">MySQL</a-tag>
                                <a-tag color="green" class="m-1">MQL(NoSQL)</a-tag>
                                <a-tag color="blue" class="m-1">Docker</a-tag>
                                <a-tag color="geekblue" class="m-1">Kubernetes</a-tag>
                            </div>
                            <a-divider v-if="dataMyselfProgram.length > 0" class="mt-5">
                                <span class="text-sm dark:text-white text-white">Framework&UI ที่ใช้ในการพัฒนา</span>
                            </a-divider>
                            <a-tag color="green" class="m-1">
                                Nuxt.JS
                            </a-tag>
                            <a-tag color="green" class="m-1">
                                Nuxt UI
                            </a-tag>
                            <br />
                            <a-tag color="blue" class="m-1">
                                Vue.JS
                            </a-tag>
                            <a-tag color="blue" class="m-1">
                                Vuetify 2 & 3
                            </a-tag>
                            <a-tag color="red" class="m-1">
                                Ant Design
                            </a-tag>
                            <a-tag color="blue" class="m-1">
                                Tailwind CSS
                            </a-tag>
                            <a-divider v-if="dataMyselfProgram.length > 0" class="mt-5">
                                <span class="text-sm dark:text-white text-white">ภาษาที่ใช้ในการพัฒนา (FrontEnd)</span>
                            </a-divider>
                            <div>
                                <a-tag color="black" class="m-1 !text-white">
                                    <CodeOutlined /> HTML
                                </a-tag>
                                <a-tag color="black" class="m-1 !text-white">
                                    <CodeOutlined /> CSS
                                </a-tag>
                                <a-tag color="black" class="m-1 !text-yellow-300">
                                    <CodeOutlined /> Java Script
                                </a-tag>
                                <a-tag color="black" class="m-1 !text-blue-200">
                                    <CodeOutlined /> Type Script
                                </a-tag>
                            </div>
                            <a-divider v-if="dataMyselfProgram.length > 0" class="mt-5">
                                <span class="text-sm dark:text-white text-white">ภาษาที่ใช้ในการพัฒนา (BackEnd)</span>
                            </a-divider>
                            <div>
                                <a-tag color="black" class="m-1 !text-yellow-300">
                                    <CodeOutlined /> Java Script
                                </a-tag>
                                <a-tag color="black" class="m-1 !text-blue-200">
                                    <CodeOutlined /> Type Script
                                </a-tag>
                                <a-tag color="black" class="m-1 !text-red-200">
                                    <DatabaseOutlined /> SQL
                                </a-tag>
                                <a-tag color="black" class="m-1 !text-green-200">
                                    <DatabaseOutlined /> NoSQL
                                </a-tag>
                            </div>

                            <a-divider v-if="dataMyselfProgram.length > 0" class="mt-5">
                                <span class="dark:text-white text-white">ติดต่อส่วนตัว</span></a-divider>

                            <a-row :gutter="[10, 10]">
                                <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex items-center">
                                    <FacebookOutlined class="text-blue-400" />&nbsp; เฟซบุ๊ก: &nbsp;
                                    <a class="text-blue-400" :href="`https://www.facebook.com/SaHott/`" target="_blank">
                                        {{ dm.Facebook }}
                                    </a>
                                </a-col>
                                <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex items-center">
                                    <MessageOutlined class="text-green-400" />&nbsp; ไอดีไลน์: &nbsp;
                                    <a :href="`https://line.me/ti/p/~${dm.Line}`" target="_blank" class="text-blue-400">
                                        {{ dm.Line }}
                                    </a>
                                </a-col>
                                <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex items-center">
                                    <PhoneOutlined class="text-blue-400" />&nbsp; เบอร์โทร: &nbsp;
                                    <a :href="`tel:${dm.Phone}`" class="text-blue-400">
                                        {{ dm.Phone }}
                                    </a>
                                </a-col>
                                <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex items-center">
                                    <MailOutlined class="text-red-400" />&nbsp; อีเมล: &nbsp;
                                    <a class="text-blue-400" href="mailto:{{ dm.Email }}">
                                        {{ dm.Email }}
                                    </a>
                                </a-col>
                            </a-row>

                            <a-divider v-if="dataMyselfProgram.length > 0" class="mt-5">
                                <span class="dark:text-white text-white">ประวัติ (Resume)</span>
                            </a-divider>

                            <a-row>
                                <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24"
                                    class="flex justify-left items-left">
                                    <FilePdfOutlined class="text-red-500" />&nbsp; เปิด: &nbsp;
                                    <a href="https://drive.google.com/file/d/1oKAlsNxphNDcXYJs8ni_urOxuPWHKHY3/view?usp=drive_link"
                                        target="_blank" class="text-red-500">
                                        Resume (PDF)
                                    </a>
                                </a-col>
                            </a-row>

                        </div>
                    </div>
                </a-layout-sider>
            </a-col>

            <a-col v-if="dataMyself.length > 0" :xs="24" :sm="24" :md="15" :lg="19" :xl="19"
                :class="{ 'fade-in-myprogram': dataMyself.length > 0 }">
                <a-row :gutter="[0, 15]" class="m-5 dark:text-white text-white">
                    <a-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18" class="flex flex-col justify-between">
                        <template #default>
                            <p class="text-lg font-bold pt-2">
                                สิ่งที่ชอบในการเขียนโปรแกรม
                            </p>
                            <span class="mt-5 text-base" style="text-indent: 1rem;">
                                {{ displayTextContain }}
                            </span>
                            <a-divider v-if="dataMyself.length > 0" class="mt-5"><span
                                    class="dark:text-white text-white">RESUME</span></a-divider>

                            <a-row :gutter="[15, 15]" class="pt-5">
                                <a-col :xs="13" :sm="13" :md="13" :lg="6" :xl="6">
                                    <div class="flex justify-end items-center space-x-3 cursor-pointer"
                                        @click="winOpen('https://drive.google.com/file/d/1oKAlsNxphNDcXYJs8ni_urOxuPWHKHY3/view?usp=drive_link')">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/977px-PDF_file_icon.svg.png"
                                            class="resume-pdf" alt="PDF Icon" />
                                    </div>
                                </a-col>
                                <a-col :xs="11" :sm="11" :md="11" :lg="18" :xl="18" class="self-center">
                                    <div class="flex justify-start items-center space-x-3">
                                        <div>
                                            <h1 class="dark:text-white text-white text-4xl font-bold space-y-1">RESUME
                                            </h1>
                                            <br />
                                            <h1 class="dark:text-white text-white text-xl font-bold space-y-1">
                                                TATCHAKORN CHOMYONG
                                            </h1>
                                        </div>
                                    </div>
                                </a-col>
                            </a-row>
                        </template>
                    </a-col>

                    <a-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
                        <a-row :gutter="[0, 15]">
                            <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                <a-card class="shadow-md" hoverable>
                                    <template #title>
                                        <div class="card-title">
                                            <img src="https://kentac.org.uk/wp-content/uploads/2016/10/calendar-icon-blue_sm.png"
                                                class="w-24 my-2 mr-2" style="border-radius: 5%;" />
                                            <span class="text-lg font-bold">Timeline</span>
                                        </div>
                                    </template>
                                    <template #extra>
                                        <a-button type="primary" shape="round" size="middle">
                                            {{ moment.duration(moment(new Date()).diff(moment('2023-05-22'))).years()
                                            }}
                                            ปี
                                            {{ moment.duration(moment(new Date()).diff(moment('2023-05-22'))).months()
                                            }}
                                            เดือน
                                            {{ moment.duration(moment(new Date()).diff(moment('2023-05-22'))).days()
                                            }}
                                            วัน
                                        </a-button>
                                    </template>
                                    <template #default>
                                        <a-timeline>
                                            <a-timeline-item v-for="(event, index) in dataTimeLine" :key="index">
                                                <h3 class="font-bold">{{ event.Year }}</h3>
                                                <p v-for="(dataSub, indexSub) in event.Program_Success">{{ (indexSub +
                                                    1) +
                                                    '. '
                                                    +
                                                    dataSub }}</p>
                                            </a-timeline-item>
                                        </a-timeline>
                                    </template>
                                </a-card>
                            </a-col>
                        </a-row>
                    </a-col>
                </a-row>

                <a-row :gutter="[0, 15]" class="m-5 bg-slate-600 rounded-xl p-5 shadow-md">
                    <a-tabs v-model:activeKey="idDesignTabsCompany" size="middle" type="card"
                        :tabBarStyle="{ color: '#ffffff' }" @tabClick="moreDetail = 0;">
                        <a-tab-pane key="1" tab="JMT Network Services">
                            <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                <a-divider><span
                                        class="dark:text-white text-white">โปรแกรมที่เคยพัฒนา</span></a-divider>
                                <a-row :gutter="[0, 25]">
                                    <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12"
                                        class="flex justify-center items-center">
                                        <a-button class="" type="primary" shape="round" size="middle"
                                            @click="idDesignProgram = 1;">
                                            รูปแบบ 1 (แนวตั้ง)
                                        </a-button>
                                    </a-col>
                                    <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12"
                                        class="flex justify-center items-center">
                                        <a-button class="bg-green-600" type="primary" shape="round" size="middle"
                                            @click="idDesignProgram = 2;">
                                            รูปแบบ 2 (แนวนอน)
                                        </a-button>
                                    </a-col>
                                </a-row>
                                <a-row v-if="dataMyselfProgram.length > 0 && idDesignProgram === 1" :gutter="[15, 15]"
                                    class="pt-5 fade-in-myprogram">
                                    <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8"
                                        v-for="program in dataMyselfProgram.filter((program: any) => program.type == 1)"
                                        :key="program.ID_Auto">
                                        <a-card hoverable class="shadow-md edit-card-horizontal">
                                            <template #cover>
                                                <img :src="program.Program_Image" alt="Program Icon"
                                                    class="w-32 h-72 my-2 mr-2 rounded-md object-cover" />
                                            </template>
                                            <template #default>
                                                <h3 class="text-lg font-bold edit-card-content-head">{{
                                                    program.Program_Name }}</h3>
                                                <p class="text-sm edit-card-content-horizontal ">{{
                                                    program.Program_Description
                                                }}</p>
                                            </template>
                                            <template #actions>
                                                <a class="text-base text-blue-500"
                                                    @click="isLoading = true; moreDetail = program.ID_Auto; handleCardClick(PinCode, program.ID_Auto, program)"
                                                    type="primary" shape="round" size="middle">
                                                    รายละเอียด...
                                                </a>
                                            </template>
                                        </a-card>
                                    </a-col>
                                    <a-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6"
                                        class=" justify-items-center content-center">
                                        <p class="text-2xl dark:text-white text-white edit-card-content-horizontal">
                                            Comming
                                            Soon...</p>
                                    </a-col>
                                </a-row>
                            </a-col>
                            <a-row v-if="dataMyselfProgram.length > 0 && idDesignProgram === 2"
                                class="fade-in-myprogram">
                                <a-col v-for="dmp, i in dataMyselfProgram" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                                    <div class="p-2">
                                        <a-card class="shadow-md edit-card" style="border-top: 5px solid #0064ffa3;"
                                            hoverable>
                                            <template #title>
                                                <div class="card-title justify-items-center">
                                                    <img :src="dmp.Program_Image" class="w-32 my-2 mr-2"
                                                        style="border-radius: 50%;" />
                                                </div>
                                            </template>
                                            <template #extra>
                                                <a-button
                                                    @click="isLoading = true; moreDetail = dmp.ID_Auto; handleCardClick(PinCode, dmp.ID_Auto, dmp)"
                                                    type="primary" shape="round" size="middle">
                                                    ดูรายละเอียด
                                                </a-button>
                                            </template>
                                            <template #default>
                                                <p class="text-base font-bold">
                                                    Web {{ dmp.Program_Name }}
                                                </p>
                                                <span class="edit-card-content mt-5" style="text-indent: 1rem;">
                                                    {{ dmp.Program_Description }}
                                                </span>
                                            </template>
                                        </a-card>
                                    </div>
                                </a-col>
                                <a-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8"
                                    class=" content-center justify-items-center">
                                    <div class="p-2 dark:text-white text-white text-2xl">
                                        <p>CommingSoon...</p>
                                    </div>
                                </a-col>
                            </a-row>

                            <a-row :gutter="[0, 15]" class="m-5"
                                v-else-if="dataMyselfProgram.length == 0 && activeApple">
                                <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                    <a-skeleton active />
                                </a-col>
                                <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                    <a-skeleton active />
                                </a-col>
                            </a-row>
                        </a-tab-pane>
                        <a-tab-pane key="2" tab="PTT Digital">
                            <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                <a-divider><span
                                        class="dark:text-white text-white">โปรแกรมที่เคยพัฒนา</span></a-divider>
                                <a-row :gutter="[0, 25]">
                                    <a-row v-if="dataMyselfProgram.length > 0 && idDesignProgram === 1"
                                        :gutter="[15, 15]" class="pt-5 fade-in-myprogram">
                                        <a-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12"
                                            v-for="program in dataMyselfProgram.filter((program: any) => program.type == 2)"
                                            :key="program.ID_Auto">
                                            <a-card hoverable class="shadow-lg rounded-xl edit-card-horizontal"
                                                style="border-top:4px solid #0ea5e9; overflow:hidden;"
                                                v-if="program.type == 2">
                                                <template #cover>
                                                    <img :src="program.Program_Image" alt="PTT Digital - Logistics"
                                                        style="width:100%; height:300px; object-fit:cover;" />
                                                </template>

                                                <template #title>
                                                    <div style="display:flex; align-items:center; gap:0.5rem;">
                                                        <div style="font-weight:700; font-size:1.05rem;">PTT Logistics
                                                        </div>
                                                        <a-tag color="cyan">PTT Digital</a-tag>
                                                    </div>
                                                </template>

                                                <template #default>
                                                    <h3 class="text-lg font-bold edit-card-content-head">{{
                                                        program.Program_Name }}</h3>
                                                    <p class="text-sm edit-card-content-horizontal ">{{
                                                        program.Program_Description
                                                    }}</p>
                                                    <div
                                                        style="margin-top:0.75rem; display:flex; gap:0.5rem; flex-wrap:wrap;">
                                                        <a-tag color="blue">Backend</a-tag>
                                                        <a-tag color="green">Node.js</a-tag>
                                                        <a-tag color="gold">Express</a-tag>
                                                        <a-tag color="red">Redis</a-tag>
                                                        <a-tag color="green">MongoDB</a-tag>
                                                    </div>
                                                </template>

                                                <template #actions>
                                                    <a-button type="primary" shape="round" size="middle"
                                                        @click="isLoading = true; moreDetail = program.ID_Auto; handleCardClick(PinCode, program.ID_Auto, { Program_Name: 'PTT Logistics', Program_Image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=0b8f0d4b0a6f3f6f2f3b9b6a3b7d8e3a' })">
                                                        ดูรายละเอียด
                                                    </a-button>
                                                </template>
                                            </a-card>
                                            <!-- <a-card hoverable class="shadow-md edit-card-horizontal"
                                                v-if="program.type == 2">
                                                <template #cover>
                                                    <img :src="program.Program_Image" alt="Program Icon"
                                                        class="w-32 h-72 my-2 mr-2 rounded-md object-cover" />
                                                </template>
                                                <template #default>
                                                    <h3 class="text-lg font-bold edit-card-content-head">{{
                                                        program.Program_Name }}</h3>
                                                    <p class="text-sm edit-card-content-horizontal ">{{
                                                        program.Program_Description
                                                    }}</p>
                                                </template>
                                                <template #actions>
                                                    <a class="text-base text-blue-500"
                                                        @click="isLoading = true; moreDetail = program.ID_Auto; handleCardClick(PinCode, program.ID_Auto, program)"
                                                        type="primary" shape="round" size="middle">
                                                        รายละเอียด...
                                                    </a>
                                                </template>
                                            </a-card> -->
                                        </a-col>
                                        <a-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12"
                                            class=" justify-items-center content-center">
                                            <p class="text-2xl dark:text-white text-white edit-card-content-horizontal">
                                                Comming
                                                Soon...</p>
                                        </a-col>
                                    </a-row>
                                </a-row>
                            </a-col>
                        </a-tab-pane>
                    </a-tabs>
                </a-row>

                <a-divider id="scrollTo" v-if="moreDetail > 0">
                    <span class="dark:text-white text-white">ข้อมูลระบบ</span>
                </a-divider>

                <div v-for="dmp, i in dataMyselfProgram" :key="dmp.ID_Auto">
                    <a-row v-if="moreDetail == dmp.ID_Auto" class="detail-more-fadein text-white m-3">
                        <a-col :xs="24" :sm="12" :md="12" :lg="10" :xl="10" style="align-content: center;" class="mb-9">
                            <div class="img-program-detail-main">
                                <img :src="dmp.Program_Image" class="img-program-detail" alt="User Image" />
                            </div>
                            <div id="chart">
                                <apexchart v-if="data.series[0].data.length > 0" type="bar" height="230"
                                    :options="data.chartOptions" :series="data.series">
                                </apexchart>
                            </div>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="12" :lg="14" :xl="14">
                            <h1 class="text-xl font-bold flex items-center">
                                เว็บไซต์: {{ dmp.Program_Name }}
                                <CheckCircleFilled class="text-green-500 ml-2 mr-2" />
                                <a-button v-if="dmp.ID_Auto < 6" @click="openExam = true; idExamJobs = i;" type="primary" shape="round"
                                    size="middle">
                                    ตัวอย่าง
                                </a-button>
                            </h1>
                            <span>
                                <p style="text-indent: 2em;">{{ dmp.Program_Description }}</p>
                            </span>
                            <div>
                                <a-divider v-if="moreDetail > 0" class="mt-5"><span
                                        class="dark:text-white text-white">ส่วนเสริมที่ใช้ในระบบ</span></a-divider>

                                <div class="p-2" v-if="moreDetail > 0">
                                    <a-collapse v-model:activeKey="activeKey" class="dark:bg-gray-500">
                                        <a-collapse-panel v-for="dmd, i in dataMyselfDetail" :key="i">
                                            <template #header>
                                                <div class="flex items-center">
                                                    <StarOutlined class="text-amber-600" />&nbsp;
                                                    <span class="dark:text-white text-white">{{ dmd.User_Detail
                                                        }}</span>
                                                </div>
                                            </template>
                                            <div>
                                                {{ i + 1 + '. ' + dmd.User_Description }}
                                            </div>
                                        </a-collapse-panel>
                                    </a-collapse>
                                </div>
                            </div>
                        </a-col>
                    </a-row>
                </div>

                <a-row :gutter="[0, 15]" class="m-5">
                    <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <a-divider><span class="dark:text-white text-white">เครื่องมือที่ใช้พัฒนา
                                สำหรับเว็บไซต์นี้</span></a-divider>
                    </a-col>
                </a-row>

                <a-row :gutter="[0, 0]" class=" justify-center pb-5">
                    <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="lg:px-4 xl:px-4 md:px-4 sm:px-0 xs:px-0">
                        <div
                            class="bg-white shadow-md rounded-xl pt-5 flex flex-wrap justify-around items-center space-y-4 md:space-y-0">
                            <div class="flex flex-col items-center mx-4">
                                <img src="https://cdn.iconscout.com/icon/free/png-256/free-redis-icon-svg-download-png-1175103.png?f=webp"
                                    class="w-14 h-14 mb-2 rounded-md" />
                                <span class="text-sm font-medium mt-1">Redis</span>
                            </div>

                            <div class="flex flex-col items-center mx-4">
                                <img src="https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png"
                                    class="w-24 h-14 mb-2 rounded-md" />
                                <span class="text-sm font-medium mt-1">Docker</span>
                            </div>

                            <div class="flex flex-col items-center mx-4">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/3/39/Kubernetes_logo_without_workmark.svg"
                                    class="w-20 h-14 mb-2 rounded-md" />
                                <span class="text-sm font-medium mt-1">Kubernetes</span>
                            </div>

                            <div class="flex flex-col items-center mx-4">
                                <img src="https://pngimg.com/uploads/mysql/mysql_PNG17.png"
                                    class="w-24 h-14 mb-2 rounded-md" />
                                <span class="text-sm font-medium mt-1">MySQL</span>
                            </div>

                            <div class="flex flex-col items-center mx-4">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/MongoDB_Logo.svg/2560px-MongoDB_Logo.svg.png"
                                    class="w-40 h-14 mb-2 rounded-md" alt="MongoDB Logo" />
                                <span class="text-sm font-medium mt-1">MongoDB</span>
                            </div>

                            <div class="flex flex-col items-center mx-1">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Vue.png"
                                    class="w-16 h-14 mb-2 rounded-md" />
                                <span class="text-sm font-medium mt-1">Vue.js</span>
                            </div>

                            <div class="flex flex-col items-center mx-1">
                                <img src="https://logos-world.net/wp-content/uploads/2020/11/GitHub-Logo.png"
                                    class="w-32 h-16 mb-2 rounded-md" />
                                <span class="text-sm font-medium mt-1">GitHub</span>
                            </div>
                        </div>
                    </a-col>
                </a-row>
            </a-col>
        </a-row>

        <a-row v-if="dataMyself.length > 0">
            <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="text-center">
                <footer class="py-5 bg-gray-800 text-white">
                    <div>
                        <p class="text-sm">© {{ new Date().getFullYear() }} Tatchakorn Chomyong Portfolio.</p>
                        <p class="text-sm">
                            Built with <a href="https://vuejs.org/" target="_blank" class="text-blue-400">Vue.js</a>
                            and <a href="https://antdv.com/" target="_blank" class="text-blue-400">Ant Design Vue</a>.
                            <span class="text-sm">
                                Frontend deployed on <a href="https://vercel.com/" target="_blank"
                                    class="text-blue-400">Vercel</a>,
                                Backend API deployed on <a href="https://www.heroku.com/" target="_blank"
                                    class="text-blue-400">Heroku</a>,
                                Database powered by <a href="https://www.pingcap.com/tidb/" target="_blank"
                                    class="text-blue-400">TiDB</a>.
                            </span>
                        </p>
                    </div>
                </footer>
            </a-col>
        </a-row>


        <a-modal v-model:visible="openExam" width="750px"
            title="***แสดงเป็นข้อมูลประกอบ ให้เห็นการทำงานบางส่วนของระบบ*** (ข้อมูลเพื่อประกอบเท่านั้น)"
            @cancel="openExam = false">
            <a-row :gutter="[0, 105]">
                <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <a-divider class="m-2" />

                    <ExamJobsMaps v-if="idExamJobs === 0" />
                    <Caldebt v-if="idExamJobs === 1" />
                    <UserEncrypt v-if="idExamJobs === 2" />
                    <JJSaleAsset v-if="idExamJobs === 3" />
                    <WInsurance v-if="idExamJobs === 4" />

                </a-col>
            </a-row>
            <template #footer></template>
        </a-modal>

        <Welcome v-if="dataMyself.length > 0" />
        <Analytics />
        <NotiBasic v-if="activeApple && dataMyself.length > 0" />
        <Loading :isLoading="isLoading" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Analytics } from '@vercel/analytics/nuxt';
import { CheckCircleFilled, StarOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { ExamJobsMaps } from '#components';
import Caldebt from '~/components/ExamJobs/Caldebt.vue';
import UserEncrypt from '~/components/ExamJobs/UserEncrypt.vue';
import JJSaleAsset from '~/components/ExamJobs/JJSaleAsset.vue';
import WInsurance from '~/components/ExamJobs/WInsurance.vue';
import VueApexCharts from "vue3-apexcharts";
import ApexCharts from "apexcharts";
import { RobotOutlined } from '@ant-design/icons-vue';
import moment from 'moment';

const apexchart = VueApexCharts;
const base_url = useRuntimeConfig().public.apiBaseUrl;
const dataMyself = ref<any>([])
const dataMyselfProgram = ref<any>([])
const dataMyselfDetail = ref<any>([])
const idDesignProgram = ref<number>(1)
const idDesignTabsCompany = ref<string>('1')
const dataTimeLine = ref<any>([
    {
        Year: '(PTT Digital) ปัจจุบัน',
        Program_Of_Year: 'เริ่มต้นการทำงานในปีปัจจุบัน',
        Program_Success: [
            'ขนส่ง Logistics (Backend)'
        ]
    },
    {
        Year: '(JMT) ปี 2568 - 2568',
        Program_Of_Year: 'เริ่มต้นการทำงานในปีแรก-ปีสอง (1 ปี 11 เดือน)',
        Program_Success: [
            'กฎหมาย คำนวณหนี้สิน'
        ]
    },
    {
        Year: '(JMT) ปี 2567 - 2568',
        Program_Of_Year: 'เริ่มต้นการทำงานในปีแรก-ปีสอง',
        Program_Success: [
            'UserMonitor', 'Waijai ประกันภัย'
        ]
    },
    {
        Year: '(JMT) ปี 2566 - 2567',
        Program_Of_Year: 'เริ่มต้นการทำงานในปีแรก',
        Program_Success: [
            'Tracking', 'JJ Properties'
        ]
    }

])
const Username = ref<string>('Hut5830')
const activeKey = ref<string>('0')
const PinCode = ref<string>('')
const displayText = ref('');
const displayTextContain = ref('');
const intervalMessage = 'ยินดีต้อนรับสู่ Portfolio ของ Tatchakorn...';
const intervalMessageContain = 'สนใจในการพัฒนาเว็บไซต์ และการเขียนโปรแกรมในส่วนของ Fullstack Develops เพราะชอบการที่จะเรียนรู้สิ่งใหม่ๆ ต้องการความท้าทายในการทำงานที่สนุกกับการทำงานไปด้วย ชอบการเรียนรู้เกี่ยวกับการเขียนโปรแกรมอยู่เสมอ ชอบการวิเคราะห์ปัญหาและแก้ไขปัญหา อยากได้โอกาสที่จะได้เรียนรู้และพัฒนาตัวเองให้ดีขึ้น และเติบโตไปพร้อมๆกับองค์กร...';
const activeApple = ref<boolean>(false)
const isLoading = ref<boolean>(false)
const moreDetail = ref<number>(0)
const isHidden = ref(false);
const openExam = ref(false);
const activeAI = ref(false);
const idExamJobs = ref<number>();
const data: any = {
    series: [{
        data: []
    }],
    chartOptions: {
        chart: {
            type: 'bar',
            height: 300,
            toolbar: {
                show: false
            },
        },
        plotOptions: {
            bar: {
                barHeight: '100%',
                distributed: true,
                horizontal: true,
                dataLabels: {
                    position: 'bottom'
                },
            }
        },
        colors: ['#33b2df', '#d4526e', '#13d8aa', '', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
            '#f48024', '#69d2e7'
        ],
        dataLabels: {
            enabled: true,
            textAnchor: 'start',
            style: {
                colors: ['#fff']
            },
            formatter: function (val: any, opt: any) {
                return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val + '%'
            },
            offsetX: 0,
            dropShadow: {
                enabled: true
            }
        },
        stroke: {
            width: 1,
            colors: ['#fff']
        },
        xaxis: {
            categories: [],
            labels: {
                show: true,
                style: {
                    colors: ['#fff'],
                    fontSize: '12px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 400,
                    cssClass: 'apexcharts-xaxis-label'
                }
            },
        },
        legend: {
            show: false
        },
        yaxis: {
            labels: {
                show: false
            }
        },
        tooltip: {
            enabled: false,
            theme: 'dark',
            x: {
                show: false
            },
            y: {
                title: {
                    formatter: function () {
                        return ''
                    }
                }
            }
        }
    },
}

async function getCongrat() {
    isLoading.value = true
    dataMyself.value = []
    dataMyselfProgram.value = []
    dataMyselfDetail.value = []
    await $fetch(`${base_url}/portfolio/mySelf`, {
        method: 'POST',
        body: {
            Username: Username.value
        }
    }).then(async (res: any) => {
        dataMyself.value = res
        for (const ms of res) {
            PinCode.value = ms.PinCode
        }
        if (!!PinCode.value) {
            await getProgram(PinCode.value);
            await getDetail(PinCode.value);
        }
    })
}
async function getProgram(PinCode: string) {
    await $fetch(`${base_url}/portfolio/mySelfPrograms`, {
        method: 'POST',
        body: {
            PinCode: PinCode
        }
    }).then((res) => {
        dataMyselfProgram.value = res
    })
}
async function getDetail(PinCode: string, IdMore: number = 1) {
    await $fetch(`${base_url}/portfolio/mySelfDetail`, {
        method: 'POST',
        body: {
            ID_Auto: IdMore,
            Username: PinCode
        }
    }).then(async (res) => {
        dataMyselfDetail.value = res
    })
    isLoading.value = false
}
const handleCardClick = async (PinCode: string, id: number, items: any) => {
    await updateTimeLineChart(items);

    await getDetail(PinCode, id).then(() => {
        // const isMobile = window.innerWidth <= 768; // คำสั่งนี้ เอาไว้เช็คขนาดหน้าจอได้
        const element = document.getElementById(`scrollTo`);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    })
}
async function updateTimeLineChart(items: any) {
    data.series[0].data = [100, 100, 100]
    data.chartOptions.xaxis.categories = [items.Program_Name + ': ' + 'DEV', items.Program_Name + ': ' + 'UAT', items.Program_Name + ': ' + 'PRODUCT']
    return data;
}
function hideElement() {
    isHidden.value = true;
}
function winOpen(path: string) {
    window.open(path, '_blank');
}
function setIntervalText() {
    let i = 0;
    const interval = setInterval(() => {
        displayText.value += intervalMessage[i];
        i++;
        if (i >= intervalMessage.length) clearInterval(interval);
    }, 100); // speed
}
function setIntervalTextContain() {
    let i = 0;
    const interval = setInterval(() => {
        displayTextContain.value += intervalMessageContain[i];
        i++;
        if (i >= intervalMessageContain.length) clearInterval(interval);
    }, 25); // speed
}
onMounted(() => {
    setIntervalText();
    setIntervalTextContain();
})
</script>

<style scoped>
.img-profile {
    width: 200px;
    height: 200px;
    border-radius: 50%;
}

.img-program-detail {
    width: 300px;
    height: 300px;
    border-radius: 50%;
}

.edit-card {
    /* background-color: #f0f2f5; */
    height: 300px;
    max-height: 300px;
    overflow: hidden;
}

.edit-card-content {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    /* จำนวนบรรทัดที่ต้องการ */
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.edit-card-horizontal {
    /* background-color: #f0f2f5; */
    /* height: 500px; */
    /* max-height: 500px; */
    overflow: hidden;
}

.edit-card-content-head {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.edit-card-content-horizontal {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    text-indent: 25px;
    /* จำนวนบรรทัดที่ต้องการ */
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.img-headbar {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
}

.img-headbars {
    width: 15rem;
    height: 15rem;
    border-radius: 50%;
}

.fadein-to-header {
    animation: fadeIn 0.7s ease-in-out;
}

.fadeout-to-header {
    width: 15rem;
    height: 15rem;
    animation: fadeOut 0.5s ease-in-out;
}

@keyframes transtoheader {
    0% {
        transform: translateY(70%);
        width: 16%;
        height: 30%;
        left: 11%;
    }

    100% {
        transform: translateY(-0%);
        width: 5.5%;
        height: 12%;
    }
}

.img {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    /* ปรับขนาดตามต้องการ */
    position: relative;
    overflow: hidden;
    margin-top: 15px;
}

.img-program-detail-main {
    display: flex;
    justify-content: center;
    align-items: center;
    /* ปรับขนาดตามต้องการ */
    position: relative;
    overflow: hidden;
}

.img-profile {
    /* ขนาดตอนปกติ */
    transition: all 0.5s ease;
}

.fade-in-image .img-profile {
    transform: scale(1);
    opacity: 1;
}

.fade-out-image .img-profile {
    transform: scale(0.5);
    opacity: 0.5;
}

.fade-out-image,
.fade-in-image {
    width: 100%;
    height: 100%;
}

.resume-pdf {
    width: 200px;
    height: 200px;
}

.fade-in-active-profile {
    animation: fadeIn 1.5s ease-in-out;
}

:deep(.ant-card-head) {
    /* background: linear-gradient(to right, rgb(63, 63, 63), rgb(75, 134, 75)) !important; */
    /* color: white !important; */
}

.detail-more-fadein {
    animation: fadeIn 0.7s ease-in-out;
    opacity: 1;
}

.detail-more-fadeout {
    animation: fadeOut 0.7s ease-in-out;
    opacity: 0;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes fadeOut {
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
}


.typing-text {
    overflow: hidden;
    white-space: nowrap;
    border-right: 2px solid black;
    /* ตัวเคอร์เซอร์ */
    animation: typing 3s steps(30), blink 0.75s step-end infinite;
}

@keyframes typing {
    from {
        width: 0
    }

    to {
        width: 100%
    }
}

@keyframes blink {
    50% {
        border-color: transparent
    }
}

.fade-in-myself {
    animation: fadeInTopDown 1s ease-in-out;
    opacity: 1;
}

.fade-in-myprogram {
    animation: fadeInLeft 2s ease-in-out;
    opacity: 1;
}

@keyframes fadeInTopDown {
    from {
        opacity: 0;
        transform: translateY(-50px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeInLeft {
    from {
        opacity: 0;
        transform: translateX(20px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.fade-in-connect {
    animation: fadeConnect 1s ease-in-out;
    opacity: 1;
}

@keyframes fadeConnect {
    0% {
        opacity: 1;
        transform: translateX(340%);
    }

    100% {
        opacity: 1;
        transform: translateX(0%);
    }

}

a-button:hover {
    transform: scale(1.03);
    box-shadow: 0 6px 20px rgba(0, 201, 255, 0.6);
}

.btn-ai {
    width: 100%;
    background: linear-gradient(135deg, #00c9ff 0%, #92fe9d 100%);
    color: #000;
    font-weight: bold;
    box-shadow: 0 4px 15px rgba(0, 201, 255, 0.4);
    border: none;
    transition: all 0.3s ease;
}
</style>