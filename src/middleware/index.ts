import { defineMiddleware, sequence } from "astro:middleware";
import { middleware } from "astro:i18n";
import i18next from "i18next";
import AstroConfig from "astro.config.ts";
import type { SUPPORTED_LANGUAGES } from "@lib/constants.ts";

const prefixDefaultLocale = false;

export const localizationMiddleWare = defineMiddleware(
  async (context, next) => {
    let locale: SUPPORTED_LANGUAGES = (context.currentLocale ??
      AstroConfig.i18n!.defaultLocale) as SUPPORTED_LANGUAGES;
    await i18next.changeLanguage(locale);
    // @ts-ignore
    (context.locals as App.Locals).locale = locale;
    return next();
  },
);

// consumed automatically by astro by declaring this export and the name `onRequest`
export const onRequest = sequence(
  localizationMiddleWare,
  middleware({
    redirectToDefaultLocale: true,
    prefixDefaultLocale,
    fallbackType: "rewrite",
  }),
);
