import i18next from "i18next";
import type { AstroIntegration } from "astro";
import TranslationsDE from "./translations.de.ts";
import TranslationsEN from "./translations.en.ts";
import GlobalTranslations from "./translations.global.ts";

const initI18n = () => {
  i18next.t;
  i18next.init({
    fallbackLng: "en",
    lng: "de", // if you're using a language detector, do not define the lng option
    supportedLngs: ["de", "en"],
    ns: ["translation"],
    fallbackNS: "translation",
    defaultNS: "translation",
    debug: true,
    resources: {},
  });
  i18next.addResourceBundle("de", "translation", TranslationsDE, true);
  i18next.addResourceBundle("en", "translation", TranslationsEN, true);
  i18next.addResourceBundle("de", "global", GlobalTranslations);
  i18next.addResourceBundle("en", "global", GlobalTranslations);
};

export default function myI18nextIntegration(): AstroIntegration {
  return {
    name: "@my/i18next-integration",
    hooks: {
      "astro:config:setup": async () => {
        initI18n();
      },
    },
  };
}
