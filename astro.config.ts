// noinspection ES6PreferShortImport

import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import UnoCSS from "@unocss/astro";
import icon from "astro-icon";

import solidJs from "@astrojs/solid-js";
import { remarkReadingTime } from "./src/lib/remark-reading-time.mjs";

import svelte from "@astrojs/svelte";
import myI18nextIntegration from "./src/lib/my-i18next-integration";

// https://astro.build/config
export default defineConfig({
  site: "https://kitocoaching.de/",
  trailingSlash: "ignore",
  i18n: {
    defaultLocale: "de",
    locales: ["de", "en"],
    routing: "manual",
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "de",
        locales: {
          de: "de",
          en: "en",
        },
      },
    }),
    robotsTxt({
      sitemap: [
        "https://kitocoaching.de/sitemap-index.xml",
        "https://kitocoaching.de/sitemap-0.xml",
      ],
      host: true,
    }),
    solidJs(),
    UnoCSS({ injectReset: true }),
    icon(),
    svelte(),
    myI18nextIntegration(),
  ],
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
  output: "static",
});
