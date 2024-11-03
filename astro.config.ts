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
  site: "https://kito-coaching.com/",
  trailingSlash: "ignore",
  i18n: {
    defaultLocale: "de",
    locales: ["de", "en"],
    routing: "manual",
    fallback: {
      en: "de",
    },
  },
  integrations: [
    sitemap(),
    robotsTxt({
      sitemap: [
        "https://kito-coaching.com/sitemap-index.xml",
        "https://kito-coaching.com/sitemap-0.xml",
      ],
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
