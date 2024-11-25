// uno.config.ts
import { defineConfig, presetUno, presetWebFonts } from "unocss";

export const offerContentLinkColors = [
  "orange-3",
  "blue-3",
  "green-3",
  "red-3",
];

export default defineConfig({
  safelist: [
    ...offerContentLinkColors.flatMap((item) => [
      `text-${item}`,
      `border-${item}`,
    ]),
    "rotate-180",
  ],
  content: {
    filesystem: ["**/*.{html,js,ts,jsx,tsx,vue,svelte,astro}"],
  },
  theme: {
    boxShadow: {
      custom: `2px 2px 0`,
      "custom-hover": `1px 1px 0`,
    },
    fontFamily: {
      sans: ["CabinetGrotesk", "Satoshi"],
    },
    gridTemplateRows: {
      "auto-250": "repeat(auto-fill, 250px)",
    },
    gridTemplateColumns: {
      "4-minmax": "repeat(4, minmax(150px, 1fr))",
    },
    colors: {
      gray: {
        50: "#FAFAFA",
        100: "#F5F5F5",
        200: "#E5E5E5",
        300: "#D4D4D4",
        400: "#A3A3A3",
        500: "#737373",
        600: "#525252",
        700: "#404040",
        800: "#262626",
        900: "#171717",
      },
      darkslate: {
        50: "#3D3D3D",
        100: "#2C2C2C",
        200: "#262626",
        300: "#202020",
        400: "#1A1A1A",
        500: "#171717" /* Exactly your example for the background */,
        600: "#141414",
        700: "#111111",
        800: "#0E0E0E",
        900: "#0B0B0B" /* Deeper and darker */,
      },
      lightslate: {
        50: "#FAFAFA",
        100: "#F5F5F5",
        200: "#EEEEEE",
        300: "#E0E0E0",
        400: "#D6D6D6",
        500: "#CCCCCC" /* Exactly your midpoint */,
        600: "#B3B3B3",
        700: "#999999",
        800: "#808080",
        900: "#666666" /* Deeper shade */,
      },
      primary: {
        100: "#D2F1F9",
        200: "#A4E4F4",
        300: "#77D6EE",
        400: "#49C9E9",
        500: "#1DBCE3",
        600: "#1696B6",
        700: "#117088",
        800: "#0B4B5B",
        900: "#06252D",
      },
    },
  },
  presets: [
    presetUno({ dark: "media" }),
    presetWebFonts({
      provider: "fontshare",
      fonts: {
        sans: ["CabinetGrotesk", "Satoshi"],
        serif: "Zodiak",
      },
    }),
  ],
});
