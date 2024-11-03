export const LINKS = {
  instagram: "https://www.instagram.com/coachkito/",
  xing: "https://www.xing.com/profile/Kito_Danylo",
  email: "mailto:mail@kito-coaching.com",
};

export const loaderAnimation = [
  ".loader",
  { opacity: [1, 0], pointerEvents: "none" },
  { easing: "ease-out" },
];

export const AUTHOR_GITHUB_PROFILE = "https://github.com/janmagnusdev/";

const SUPPORTED_LANGUAGES_ARRAY = ["de", "en"] as const;
export type SUPPORTED_LANGUAGES = (typeof SUPPORTED_LANGUAGES_ARRAY)[number];
