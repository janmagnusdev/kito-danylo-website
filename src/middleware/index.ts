import { defineMiddleware, sequence } from "astro:middleware";
import { middleware } from "astro:i18n";
import i18next from "i18next";
import AstroConfig from "astro.config.ts";

// example for a user defined middleware
export const userMiddleware = defineMiddleware(async (context, next) => {
  // this response might come from Astro's i18n middleware, and it might return a 404
  const response = await next();
  // the /about page is an exception and we want to render it
  if (context.url.toString().startsWith("/about")) {
    return new Response("About page", {
      status: 200,
    });
  } else {
    return response;
  }
});

const getLocale = (url: string) => {
  const match = url.match(/\/([a-z]{2})\//);
  return match ? match[1] : null;
};

export const localizationMiddleWare = defineMiddleware(
  async (context, next) => {
    const locale = getLocale(context.url.toString());
    if (locale === null) {
      // default locale is set in config
      const defaultConfig = await i18next.changeLanguage(
        AstroConfig.i18n!.defaultLocale,
      );
      return next();
    }
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
    prefixDefaultLocale: true,
    fallbackType: "rewrite",
  }),
);
