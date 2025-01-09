import fr from "~/assets/i18n/fr.json";
import en from "~/assets/i18n/en.json";
import de from "~/assets/i18n/de.json";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "fr",
  messages: {
    fr,
    en,
    de,
  },
}));
