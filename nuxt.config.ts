// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@ant-design-vue/nuxt', '@nuxtjs/tailwindcss'],
  css: ['/asset/css/main.css'],

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
      CHAT_BOT_API_KEY: process.env.CHAT_BOT_API_KEY,
      CHAT_BOT_AUTH: process.env.CHAT_BOT_AUTH
    }
  },
  ssr: false

})