export type LocaleType = keyof typeof localeMap;

export const localeMap = {
  tr: "tr",
  en: "en",
} as const;

export const localeList = [
  {
    lang: localeMap.en,
    label: "English",
    icon: "🇺🇸",
    title: "Language",
  },
  {
    lang: localeMap.tr,
    label: "Türkçe",
    icon: "🇹🇷",
    title: "Dil",
  },
] as const;
