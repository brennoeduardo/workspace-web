import vuetify from "vite-plugin-vuetify";

export default defineNuxtConfig({
  ssr: false,
  components: true,

  typescript: {
    strict: true
  },

  srcDir: "src/",
  css: ["@/assets/css/main.scss"],

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
      'process.env.DEBUG': false,
    }
  },

  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL,
      OPENWEATHERMAP_API_KEY: process.env.OPENWEATHERMAP_API_KEY
    }
  },

  compatibilityDate: "2024-11-02",
});