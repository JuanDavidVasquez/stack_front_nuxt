import Aura from '@primevue/themes/aura'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/ui",
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    [
      "@nuxtjs/i18n",
      {
        locales: [
          { code: "es", language: "es-ES", file: "es.ts", name: "Español" },
        ],
        defaultLocale: "es",
        lazy: true,
        langDir: "lang",
        strategy: "prefix_except_default",
      },
    ],
  ],
  app: {
    baseURL: "/stack_front/",
    buildAssetsDir: "/assets/",
  },
    // config envs
  runtimeConfig: {
    public: {
      secret: process.env.SECRET_KEY,
      API_BASE_URL: process.env.API_URL,
      SHORT_NAME: process.env.SHORT_NAME,
    },
  },
  css: [
    "@/assets/scss/main.scss",
    'primeicons/primeicons.css',
  ],
  
  
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "./assets/scss/utils/_variables.scss" as *;
          `,
        },
      },
    },
  },
  experimental: {
    payloadExtraction: false,
  },
});
