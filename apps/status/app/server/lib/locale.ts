import { headers } from 'next/headers';

export type Locale = 'ja' | 'en';

/**
 * Detects the user's preferred locale from the Accept-Language header.
 * Returns 'ja' as default, 'en' for English locales.
 */
export async function detectLocale(): Promise<Locale> {
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language');

  if (!acceptLanguage) {
    return 'ja';
  }

  // Parse Accept-Language header (e.g., "en-US,en;q=0.9,ja;q=0.8")
  const languages = acceptLanguage
    .split(',')
    .map((lang) => {
      const parts = lang.trim().split(';');
      const code = parts[0] || '';
      const qValue = parts[1];
      const q = qValue ? parseFloat(qValue.split('=')[1] || '1.0') : 1.0;
      return { code: code.toLowerCase(), q };
    })
    .filter((lang) => lang.code) // Remove empty codes
    .sort((a, b) => b.q - a.q); // Sort by preference (highest q first)

  // Check if any preferred language is English
  for (const lang of languages) {
    if (lang.code.startsWith('en')) {
      return 'en';
    }
  }

  // Default to Japanese for all other cases
  return 'ja';
}
