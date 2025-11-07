// Core functionality
export { t } from './t';
export {
  locale,
  translations,
  currentTranslations,
  setLocale,
  addTranslations,
  getAvailableLocales,
} from './store';

// Default locales (auto-initialized)
export { en, es, fr, de, zh, ja } from './locales';

// Types
export type {
  Locale,
  TranslationValue,
  Translations,
  TranslationParams,
  PluralOptions,
  TranslationOptions,
  LocaleData,
} from './types';

// Utils (for advanced usage)
export { interpolate } from './utils/interpolate';
export { pluralize, getPluralForm } from './utils/pluralize';
export { getNested } from './utils/get-nested';
