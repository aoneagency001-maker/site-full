export const locales = ["ru", "kk", "en"] as const;
export const defaultLocale = "ru" as const;

export type Locale = (typeof locales)[number];
