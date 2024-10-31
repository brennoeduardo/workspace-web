import vuetify from "vite-plugin-vuetify";

export default defineNuxtConfig({
  ssr: false,
  components: true,

  typescript: {
    strict: true
  },

  srcDir: "src/",
  css: ["@/assets/css/main.scss"],
  modules: ["nuxt-electron"],

  build: {
    transpile: ["vuetify"],
  },

  hooks: {
    "vite:extendConfig": (config) => {
      config.plugins!.push(vuetify());
    },
  },

  vite: {
    define: {
      'process.env.DEBUG': false
    }
  },

  electron: {
    build: [
      {
        entry: 'electron/main.ts',
      },
    ],
  },

  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL
    }
  },

  compatibilityDate: "2024-10-19",
});