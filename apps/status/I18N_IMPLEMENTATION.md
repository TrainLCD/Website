# Internationalization (i18n) Implementation

## Overview

The status application now supports Japanese (ja) and English (en) languages based on the browser's Accept-Language header.

## How It Works

### 1. Language Detection

The `detectLocale()` function in `app/server/lib/locale.ts` detects the user's preferred language:

```typescript
import { detectLocale } from '@/server/lib/locale';

const locale = await detectLocale(); // Returns 'ja' or 'en'
```

Detection rules:
- If Accept-Language header starts with 'en' (e.g., 'en-US', 'en-GB'), returns 'en'
- For all other languages or no header, returns 'ja' (default)
- Respects quality values (q) in Accept-Language header

### 2. Using Locale in Components

Server components receive the locale and pass it to client components:

```typescript
// Server component
export default async function HomePage() {
  const locale = await detectLocale();
  
  return <StatusContent locale={locale} />;
}

// Client component
export default function StatusContent({ locale }: { locale: Locale }) {
  // Use locale to display localized text
}
```

### 3. Displaying LocaleText

All database text fields use the `LocaleText` type:

```typescript
type LocaleText = {
  ja: string;
  en: string;
};

// Usage
<h1>{incident.title[locale]}</h1>
<p>{service.description[locale]}</p>
```

### 4. Static Text Localization

For static text, use conditional rendering:

```typescript
const headerText = locale === 'ja' ? '障害履歴' : 'Incident History';
```

Or use utility functions:

```typescript
import { getStatusLabel } from '@/server/lib/i18n';

const label = getStatusLabel(status, locale);
```

## Cache Considerations

Redis cache keys include the locale to prevent language mixing:

```typescript
// Services cache keys
'services:all:ja'
'services:all:en'

// Incidents cache keys
'incidents:all:ja'
'incidents:all:en'

// Individual incident
'incident:example-slug:ja'
'incident:example-slug:en'
```

## Testing

Test locale detection with different Accept-Language headers:

```bash
# Japanese
curl -H "Accept-Language: ja" http://localhost:3000

# English
curl -H "Accept-Language: en-US" http://localhost:3000

# Default (no header)
curl http://localhost:3000
```

## Files Modified

### Core Implementation
- `app/server/lib/locale.ts` - Language detection
- `app/server/lib/i18n.ts` - i18n utilities
- `app/server/repo/serviceRepository.ts` - Locale-aware caching
- `app/server/repo/incidentRepository.ts` - Locale-aware caching

### Pages
- `app/layout.tsx` - Dynamic lang attribute
- `app/page.tsx` - Locale detection and display
- `app/incidents/[slug]/page.tsx` - Incident detail with locale

### Components
- `app/components/client/StatusContent.tsx` - Pass locale to children
- `app/components/client/Overview.tsx` - Localized status messages
- `app/components/client/ServicesTable.tsx` - Localized service info
- `app/components/client/IncidentsTable.tsx` - Localized incident info

### Tests
- `app/server/lib/__tests__/locale.test.ts` - Locale detection tests

## Future Enhancements

Potential improvements not included in this implementation:

1. **Manual Language Switcher**: Add UI to let users override browser settings
2. **More Languages**: Support additional languages beyond ja/en
3. **Cookie Persistence**: Remember user's language choice
4. **Dynamic Metadata**: Localize OpenGraph and meta tags based on locale
