// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@nuxtjs/i18n",
    "nuxt-scheduler",
    "shadcn-nuxt",
    "@nuxtjs/google-fonts",
    "nuxt-mailer",
  ],
  devtools: { enabled: true },
  colorMode: {
    classSuffix: "",
  },
  runtimeConfig: {
    mailerHost: "",
    mailerPort: "",
    mailerUser: "",
    mailerPass: "",
    mailerFromAddress: "",
    mailerFromName: "",
  },
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
  googleFonts: {
    families: {
      "Barlow": [400, 500, 600, 700, 800, 900],
      "Barlow Condensed": [700, 800, 900],
    },
  },
  i18n: {
    vueI18n: "./i18n.config.ts",
    defaultLocale: "fr",
    locales: ["fr", "en", "de"],
  },
  tailwindcss: {
    cssPath: ["assets/css/tailwind.css", { injectPosition: "first" }],
    configPath: "tailwind.config",
    exposeConfig: false,
    viewer: false,
  },
});
