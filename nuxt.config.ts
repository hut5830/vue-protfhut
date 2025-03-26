// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@ant-design-vue/nuxt', '@nuxtjs/tailwindcss'],
  css: ['/asset/css/main.css'],

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL
    }
  },
  ssr: false

})