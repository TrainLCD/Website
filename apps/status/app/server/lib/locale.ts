import { headers, cookies } from 'next/headers';

export type Locale = 'ja' | 'en';

/**
 * Detects the user's preferred locale.
 * Priority: 1. Cookie preference, 2. Accept-Language header
 * Returns 'ja' as default, 'en' for English locales.
 */
export async function detectLocale(): Promise<Locale> {
  // First, check if user has set a preference via cookie
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('locale');
  
  if (localeCookie && (localeCookie.value === 'ja' || localeCookie.value === 'en')) {
    return localeCookie.value as Locale;
  }

  // Fall back to Accept-Language header
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

  // Check the highest preference language
  // If it's English (starts with 'en'), return 'en'
  // Otherwise, return 'ja' as default
  const topLanguage = languages[0];
  if (topLanguage && topLanguage.code.startsWith('en')) {
    return 'en';
  }

  // Default to Japanese for all other cases
  return 'ja';
}
