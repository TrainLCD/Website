export type Locale = "ja" | "en";

export const resolveLocale = (acceptLanguageHeader?: string | null): Locale => {
  if (!acceptLanguageHeader) {
    return "en";
  }

  const tokens = acceptLanguageHeader
    .split(",")
    .map((part) => part.trim().toLowerCase());
  if (tokens.some((token) => token.startsWith("ja"))) {
    return "ja";
  }

  return "en";
};

export const pickLocaleText = <T extends Record<Locale, string>>(
  text: T,
  locale: Locale
) => {
  return text[locale] ?? text.ja;
};
