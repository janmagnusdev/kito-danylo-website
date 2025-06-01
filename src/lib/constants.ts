const EMAIL_ONLY = "training@kitocoaching.de";

export const LINKS = {
  instagram: "https://www.instagram.com/coachkito/",
  xing: "https://www.xing.com/profile/Kito_Danylo",
  linkedin: "https://www.linkedin.com/in/kito-danylo-9271a2351",
  email: `mailto:${EMAIL_ONLY}`,
  emailOnly: EMAIL_ONLY,
};

export const loaderAnimation = [
  ".loader",
  { opacity: [1, 0], pointerEvents: "none" },
  { easing: "ease-out" },
];

export const AUTHOR_GITHUB_PROFILE = "https://github.com/janmagnusdev/";

const SUPPORTED_LANGUAGES_ARRAY = ["de", "en"] as const;
export type SUPPORTED_LANGUAGES = (typeof SUPPORTED_LANGUAGES_ARRAY)[number];
