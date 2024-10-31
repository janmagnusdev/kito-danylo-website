import { defineMiddleware, sequence } from "astro:middleware";
import { middleware } from "astro:i18n"; // Astro's own i18n routing config

// example for a user defined middleware
export const userMiddleware = defineMiddleware(async (ctx, next) => {
  // this response might come from Astro's i18n middleware, and it might return a 404
  const response = await next();
  // the /about page is an exception and we want to render it
  if (ctx.url.toString().startsWith("/about")) {
    return new Response("About page", {
      status: 200,
    });
  } else {
    return response;
  }
});

// consumed automatically by astro by declaring this export and the name `onRequest`
export const onRequest = sequence(
  middleware({
    redirectToDefaultLocale: true,
    prefixDefaultLocale: true,
    fallbackType: "rewrite",
  }),
);
