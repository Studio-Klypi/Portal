import fr from "~/assets/i18n/fr.json";
import en from "~/assets/i18n/en.json";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "fr",
  messages: {
    fr,
    en,
  },
}));
