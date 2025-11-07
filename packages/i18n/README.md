# @fluxwind/i18n

🌍 **Internationalization system for Fluxwind UI** with signals-based reactivity.

## Features

- ✅ **Signals-based** - Zero re-renders, reactive translations
- ✅ **6 default locales** - English, Spanish, French, German, Chinese, Japanese
- ✅ **Extensible** - Add custom translations or override defaults
- ✅ **Type-safe** - Full TypeScript support with autocomplete
- ✅ **Interpolation** - Dynamic parameter replacement
- ✅ **Pluralization** - Automatic plural form selection
- ✅ **Nested keys** - Dot notation support (`user.profile.name`)
- ✅ **Tree-shakeable** - Only bundle what you use
- ✅ **Framework agnostic** - Works with React, Vue, Svelte, vanilla JS

## Installation

```bash
pnpm add @fluxwind/i18n
# or
npm install @fluxwind/i18n
# or
yarn add @fluxwind/i18n
```

## Quick Start

```typescript
import { t, setLocale, locale } from '@fluxwind/i18n';

// Get a translation (reactive signal)
const loadingText = t('common.loading');
console.log(loadingText.value); // "Loading..."

// Change locale (auto-updates all translations)
setLocale('es');
console.log(loadingText.value); // "Cargando..."

// Current locale
console.log(locale.value); // "es"
```

## Default Locales

Fluxwind i18n comes with 6 built-in locales:

- 🇬🇧 **English** (`en`)
- 🇪🇸 **Spanish** (`es`)
- 🇫🇷 **French** (`fr`)
- 🇩🇪 **German** (`de`)
- 🇨🇳 **Chinese Simplified** (`zh`)
- 🇯🇵 **Japanese** (`ja`)

> 💡 **Fun fact:** These default translations were lovingly crafted by AI because the creator only speaks 2 languages fluently! 😅 If you're a native speaker and spot any issues, or want to add a new language, please [open an issue](https://github.com/mauriciodelrio/fluxwind-ui/issues) or submit a PR. We'd love your help making Fluxwind truly international.

### Default Translation Keys

All locales include these common keys:

```typescript
{
  common: {
    loading, error, success, save, cancel, delete, edit, close,
    confirm, search, filter, reset, apply
  },
  button: {
    submit, cancel, loading, disabled
  },
  form: {
    required, invalid, email, minLength, maxLength
  },
  validation: {
    required, email, min, max
  },
  items: {
    count: { zero, one, other } // Pluralization
  },
  aria: {
    close, menu, search, loading, navigation
  }
}
```

## Usage

### Basic Translation

```typescript
import { t, setLocale } from '@fluxwind/i18n';

// In your component
function MyButton() {
  const submitText = t('button.submit');

  return <button>{submitText.value}</button>;
}

// Change language
setLocale('fr'); // Button now shows "Soumettre"
```

### Interpolation

```typescript
const greeting = t('welcome.message', { name: 'John' });
console.log(greeting.value); // "Welcome, John!"

const validation = t('form.minLength', { min: 8 });
console.log(validation.value); // "Minimum 8 characters"
```

### Pluralization

```typescript
const itemsText = t('items.count', { count: 0 });
console.log(itemsText.value); // "No items"

itemsText = t('items.count', { count: 1 });
console.log(itemsText.value); // "1 item"

itemsText = t('items.count', { count: 5 });
console.log(itemsText.value); // "5 items"
```

### Custom Translations

Add your own translations:

```typescript
import { addTranslations } from '@fluxwind/i18n';

addTranslations({
  locale: 'en',
  translations: {
    myApp: {
      welcome: 'Welcome to my app!',
      dashboard: {
        title: 'Dashboard',
        stats: '{{count}} active users',
      },
    },
  },
});

// Use them
const welcomeText = t('myApp.welcome');
const statsText = t('myApp.dashboard.stats', { count: 42 });
```

### Override Defaults

You can override Fluxwind's default translations:

```typescript
import { addTranslations } from '@fluxwind/i18n';

addTranslations({
  locale: 'en',
  translations: {
    common: {
      loading: 'Please wait...', // Overrides "Loading..."
    },
  },
});
```

### Add New Locales

```typescript
import { addTranslations, setLocale } from '@fluxwind/i18n';

// Add Portuguese
addTranslations({
  locale: 'pt',
  translations: {
    common: {
      loading: 'Carregando...',
      save: 'Salvar',
      cancel: 'Cancelar',
    },
    button: {
      submit: 'Enviar',
    },
  },
});

// Use it
setLocale('pt');
```

### Check Available Locales

```typescript
import { getAvailableLocales } from '@fluxwind/i18n';

const locales = getAvailableLocales();
console.log(locales); // ['en', 'es', 'fr', 'de', 'zh', 'ja', 'pt']
```

## React Integration

```tsx
import { t, setLocale, locale } from '@fluxwind/i18n';
import { useSignal } from '@preact/signals-react';

function LanguageSwitcher() {
  return (
    <div>
      <button onClick={() => setLocale('en')}>English</button>
      <button onClick={() => setLocale('es')}>Español</button>
      <button onClick={() => setLocale('fr')}>Français</button>
    </div>
  );
}

function LoadingButton({ isLoading }: { isLoading: boolean }) {
  const loadingText = t('common.loading');
  const submitText = t('button.submit');

  return <button disabled={isLoading}>{isLoading ? loadingText.value : submitText.value}</button>;
}
```

## Advanced Usage

### Nested Keys

```typescript
addTranslations({
  locale: 'en',
  translations: {
    user: {
      profile: {
        name: 'Name',
        email: 'Email',
        settings: {
          theme: 'Theme',
          language: 'Language',
        },
      },
    },
  },
});

// Access with dot notation
const nameText = t('user.profile.name');
const themeText = t('user.profile.settings.theme');
```

### Complex Pluralization

```typescript
addTranslations({
  locale: 'en',
  translations: {
    notifications: {
      count: {
        zero: 'No new notifications',
        one: 'You have 1 new notification',
        other: 'You have {{count}} new notifications',
      },
    },
  },
});

const notifText = t('notifications.count', { count: 3 });
console.log(notifText.value); // "You have 3 new notifications"
```

### Interpolation + Pluralization

```typescript
addTranslations({
  locale: 'en',
  translations: {
    files: {
      count: {
        zero: 'No files in {{folder}}',
        one: '1 file in {{folder}}',
        other: '{{count}} files in {{folder}}',
      },
    },
  },
});

const filesText = t('files.count', { count: 5, folder: 'Documents' });
console.log(filesText.value); // "5 files in Documents"
```

## API Reference

### Functions

#### `t(key, options?)`

Returns a computed signal with the translation.

```typescript
const text = t('common.loading');
console.log(text.value); // "Loading..."
```

**Parameters:**

- `key: string` - Translation key (supports dot notation)
- `options?: TranslationOptions` - Optional parameters for interpolation/pluralization

**Returns:** `Signal<string>` - Reactive signal that updates when locale changes

---

#### `setLocale(locale)`

Changes the active locale.

```typescript
setLocale('es'); // Switch to Spanish
```

**Parameters:**

- `locale: string` - Locale code to activate

---

#### `addTranslations(localeData)`

Adds or extends translations for a locale.

```typescript
addTranslations({
  locale: 'en',
  translations: {
    /* your translations */
  },
});
```

**Parameters:**

- `localeData: LocaleData` - Object with `locale` and `translations`

---

#### `getAvailableLocales()`

Returns all registered locale codes.

```typescript
const locales = getAvailableLocales(); // ['en', 'es', 'fr', ...]
```

**Returns:** `string[]` - Array of locale codes

### Signals

#### `locale`

Current active locale (reactive signal).

```typescript
import { locale } from '@fluxwind/i18n';

console.log(locale.value); // "en"
locale.value = 'es'; // Direct assignment also works
```

#### `translations`

All registered translations (reactive signal).

```typescript
import { translations } from '@fluxwind/i18n';

console.log(translations.value['en']); // English translations
```

#### `currentTranslations`

Computed signal with translations for active locale.

```typescript
import { currentTranslations } from '@fluxwind/i18n';

console.log(currentTranslations.value); // Translations for current locale
```

## TypeScript

Full TypeScript support with type inference:

```typescript
import type { Locale, Translations, TranslationOptions, LocaleData } from '@fluxwind/i18n';

const myTranslations: Translations = {
  welcome: 'Hello!',
  nested: {
    key: 'Value',
  },
};
```

## Performance

- **Zero re-renders** - Uses signals instead of React Context
- **Tree-shakeable** - Only bundle locales you use
- **Lazy loading** - Load translations on demand
- **Computed signals** - Translations only update when locale changes
- **No watchers** - No performance overhead from change detection

## License

MIT © Mauricio Del Rio

## Contributing

Contributions welcome! Please read our [contributing guidelines](../../CONTRIBUTING.md) first.

## Support

- 📖 [Documentation](https://fluxwind.dev/docs/i18n)
- 🐛 [Report a Bug](https://github.com/mauriciodelrio/fluxwind-ui/issues)
