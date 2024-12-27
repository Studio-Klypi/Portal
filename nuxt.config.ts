// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
  ],
  devtools: { enabled: true },
  compatibilityDate: "2024-11-01",
  eslint: {
    checker: true,
    config: {
      stylistic: {
        indent: 2,
        semi: true,
        quotes: "double",
      },
    },
  },
  tailwindcss: {
    cssPath: ["assets/css/tailwind.css", { injectPosition: "first" }],
    configPath: "tailwind.config",
    exposeConfig: false,
    viewer: false,
  },
  colorMode: {
    classSuffix: "",
  },
});
