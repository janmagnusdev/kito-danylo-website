import i18next from "i18next";
import type { AstroIntegration } from "astro";
import * as TranslationsDE from "./translations.de.json";
import * as TranslationsEN from "./translations.en.json";

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
