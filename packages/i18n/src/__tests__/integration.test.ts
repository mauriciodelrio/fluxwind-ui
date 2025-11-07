import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  locale,
  translations,
  currentTranslations,
  setLocale,
  addTranslations,
  getAvailableLocales,
} from '../store';
import { t } from '../t';
import { en, es, fr, de, zh, ja } from '../locales';

describe('@fluxwind/i18n - Store & Translation', () => {
  beforeEach(() => {
    // Reset to default state
    locale.value = 'en';
    translations.value = {
      en: { ...en },
      es: { ...es },
      fr: { ...fr },
      de: { ...de },
      zh: { ...zh },
      ja: { ...ja },
    };
  });

  describe('Store', () => {
    it('should have default locale "en"', () => {
      expect(locale.value).toBe('en');
    });

    it('should have default translations for en and es', () => {
      expect(translations.value['en']).toBeDefined();
      expect(translations.value['es']).toBeDefined();
      expect(translations.value['fr']).toBeDefined();
      expect(translations.value['de']).toBeDefined();
      expect(translations.value['zh']).toBeDefined();
      expect(translations.value['ja']).toBeDefined();
    });

    it('should compute currentTranslations based on locale', () => {
      locale.value = 'en';
      expect(currentTranslations.value).toBe(translations.value['en']);

      locale.value = 'es';
      expect(currentTranslations.value).toBe(translations.value['es']);
    });

    it('setLocale should change active locale', () => {
      setLocale('es');
      expect(locale.value).toBe('es');

      setLocale('en');
      expect(locale.value).toBe('en');
    });

    it('setLocale should warn for non-existent locale', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      setLocale('pt'); // Portuguese doesn't exist yet
      expect(locale.value).toBe('en'); // Should not change
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Locale 'pt' not found"));

      consoleSpy.mockRestore();
    });

    it('addTranslations should merge new translations', () => {
      addTranslations({
        locale: 'en',
        translations: {
          custom: {
            test: 'Test value',
          },
        },
      });

      expect(translations.value['en']?.['custom']).toEqual({ test: 'Test value' });
      expect(translations.value['en']?.['common']).toBeDefined(); // Should preserve existing
    });

    it('addTranslations should add new locale', () => {
      addTranslations({
        locale: 'fr',
        translations: {
          common: {
            hello: 'Bonjour',
          },
        },
      });

      expect(translations.value['fr']).toBeDefined();
      expect(translations.value['fr']?.['common']).toEqual({ hello: 'Bonjour' });
    });

    it('getAvailableLocales should return all locale codes', () => {
      const locales = getAvailableLocales();
      expect(locales).toContain('en');
      expect(locales).toContain('es');
      expect(locales).toContain('fr');
      expect(locales).toContain('de');
      expect(locales).toContain('zh');
      expect(locales).toContain('ja');
      expect(locales.length).toBeGreaterThanOrEqual(6);
    });

    it('should allow users to add custom locales', () => {
      addTranslations({
        locale: 'pt',
        translations: {
          common: {
            loading: 'Carregando...',
          },
        },
      });

      const locales = getAvailableLocales();
      expect(locales).toContain('pt');
      expect(translations.value['pt']).toBeDefined();
    });

    it('should allow users to extend default translations', () => {
      addTranslations({
        locale: 'en',
        translations: {
          myApp: {
            customMessage: 'Custom app message',
          },
        },
      });

      const customText = t('myApp.customMessage');
      expect(customText.value).toBe('Custom app message');

      // Default translations should still exist
      const loadingText = t('common.loading');
      expect(loadingText.value).toBe('Loading...');
    });

    it('should allow users to override default translations', () => {
      addTranslations({
        locale: 'en',
        translations: {
          common: {
            loading: 'Please wait...', // Override
          },
        },
      });

      const loadingText = t('common.loading');
      expect(loadingText.value).toBe('Please wait...');
    });
  });

  describe('Translation function (t)', () => {
    it('should return computed signal with translation', () => {
      const text = t('common.loading');
      expect(text.value).toBe('Loading...');
    });

    it('should reactively update when locale changes', () => {
      const text = t('common.loading');

      locale.value = 'en';
      expect(text.value).toBe('Loading...');

      locale.value = 'es';
      expect(text.value).toBe('Cargando...');
    });

    it('should handle nested keys with dot notation', () => {
      const text = t('button.submit');
      expect(text.value).toBe('Submit');

      locale.value = 'es';
      expect(text.value).toBe('Enviar');
    });

    it('should interpolate parameters', () => {
      const text = t('form.minLength', { min: 8 });
      expect(text.value).toBe('Minimum 8 characters');

      locale.value = 'es';
      expect(text.value).toBe('Mínimo 8 caracteres');
    });

    it('should handle pluralization', () => {
      const zero = t('items.count', { count: 0 });
      const one = t('items.count', { count: 1 });
      const many = t('items.count', { count: 5 });

      expect(zero.value).toBe('No items');
      expect(one.value).toBe('1 item');
      expect(many.value).toBe('5 items');
    });

    it('should handle pluralization in Spanish', () => {
      locale.value = 'es';

      const zero = t('items.count', { count: 0 });
      const one = t('items.count', { count: 1 });
      const many = t('items.count', { count: 5 });

      expect(zero.value).toBe('Sin elementos');
      expect(one.value).toBe('1 elemento');
      expect(many.value).toBe('5 elementos');
    });

    it('should handle pluralization with only count parameter', () => {
      const text = t('items.count', { count: 3 });
      expect(text.value).toBe('3 items');
    });

    it('should handle pluralization without any additional params', () => {
      const text0 = t('items.count', { count: 0 });
      const text1 = t('items.count', { count: 1 });
      const text5 = t('items.count', { count: 5 });

      expect(text0.value).toBe('No items');
      expect(text1.value).toBe('1 item');
      expect(text5.value).toBe('5 items');
    });

    it('should use default count of 0 when count is undefined', () => {
      // This tests the `options?.count ?? 0` branch
      addTranslations({
        locale: 'en',
        translations: {
          test: {
            plural: {
              zero: 'None',
              one: 'One',
              other: 'Many',
            },
          },
        },
      });

      const textNoCount = t('test.plural'); // No options at all
      expect(textNoCount.value).toBe('None'); // Should default to count=0
    });

    it('should return key if translation not found', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      const text = t('nonexistent.key');
      expect(text.value).toBe('nonexistent.key');
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining("Translation key not found: 'nonexistent.key'")
      );

      consoleSpy.mockRestore();
    });

    it('should handle key pointing to object', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      const text = t('common'); // Points to object, not string
      expect(text.value).toBe('common');
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('points to an object'));

      consoleSpy.mockRestore();
    });

    it('should reactively update when translations are added', () => {
      addTranslations({
        locale: 'en',
        translations: {
          dynamic: {
            message: 'Dynamic content',
          },
        },
      });

      const text = t('dynamic.message');
      expect(text.value).toBe('Dynamic content');
    });

    it('should handle complex interpolation with pluralization', () => {
      addTranslations({
        locale: 'en',
        translations: {
          files: {
            count: {
              zero: 'No files',
              one: '{{count}} file in {{folder}}',
              other: '{{count}} files in {{folder}}',
            },
          },
        },
      });

      const text = t('files.count', { count: 3, folder: 'Documents' });
      expect(text.value).toBe('3 files in Documents');
    });

    it('should handle missing interpolation params gracefully', () => {
      const text = t('form.minLength'); // Missing 'min' param
      expect(text.value).toBe('Minimum {{min}} characters');
    });

    it('should handle translation without options param', () => {
      const text = t('common.loading'); // No options, just string
      expect(text.value).toBe('Loading...');
    });

    it('should handle string translation with interpolation', () => {
      const text = t('form.minLength', { min: 10 }); // String with options
      expect(text.value).toBe('Minimum 10 characters');
    });

    it('should handle string translation with empty options object', () => {
      const text = t('common.loading', {}); // Empty options object
      expect(text.value).toBe('Loading...');
    });

    it('should handle string without placeholders but with options', () => {
      const text = t('common.success', { unused: 'param' }); // Options but no placeholders
      expect(text.value).toBe('Success');
    });

    it('should return empty object for non-existent locale in computed', () => {
      // Temporarily set to non-existent locale directly
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      locale.value = 'xx-invalid' as any;
      expect(currentTranslations.value).toEqual({});

      // Reset
      locale.value = 'en';
    });
  });

  describe('Integration: Real-world scenarios', () => {
    it('should work with button loading state', () => {
      const loadingText = t('common.loading');
      const submitText = t('button.submit');

      // English
      expect(loadingText.value).toBe('Loading...');
      expect(submitText.value).toBe('Submit');

      // Switch to Spanish
      locale.value = 'es';
      expect(loadingText.value).toBe('Cargando...');
      expect(submitText.value).toBe('Enviar');
    });

    it('should work with form validation', () => {
      const requiredMsg = t('validation.required', { field: 'Email' });
      const emailMsg = t('validation.email');

      expect(requiredMsg.value).toBe('Email is required');
      expect(emailMsg.value).toBe('Please enter a valid email');

      locale.value = 'es';
      expect(requiredMsg.value).toBe('Email es obligatorio');
      expect(emailMsg.value).toBe('Por favor ingresa un correo válido');
    });

    it('should work with ARIA labels', () => {
      const closeLabel = t('aria.close');
      const menuLabel = t('aria.menu');

      expect(closeLabel.value).toBe('Close');
      expect(menuLabel.value).toBe('Menu');

      locale.value = 'es';
      expect(closeLabel.value).toBe('Cerrar');
      expect(menuLabel.value).toBe('Menú');
    });
  });

  describe('Multi-language support', () => {
    it('should support French translations', () => {
      locale.value = 'fr';

      expect(t('common.loading').value).toBe('Chargement...');
      expect(t('button.submit').value).toBe('Soumettre');
      expect(t('aria.close').value).toBe('Fermer');
    });

    it('should support German translations', () => {
      locale.value = 'de';

      expect(t('common.loading').value).toBe('Laden...');
      expect(t('button.submit').value).toBe('Absenden');
      expect(t('aria.close').value).toBe('Schließen');
    });

    it('should support Chinese translations', () => {
      locale.value = 'zh';

      expect(t('common.loading').value).toBe('加载中...');
      expect(t('button.submit').value).toBe('提交');
      expect(t('aria.close').value).toBe('关闭');
    });

    it('should support Japanese translations', () => {
      locale.value = 'ja';

      expect(t('common.loading').value).toBe('読み込み中...');
      expect(t('button.submit').value).toBe('送信');
      expect(t('aria.close').value).toBe('閉じる');
    });

    it('should handle pluralization in all languages', () => {
      const testPlurals = (lang: string, zero: string, one: string, many: string) => {
        locale.value = lang;
        expect(t('items.count', { count: 0 }).value).toBe(zero);
        expect(t('items.count', { count: 1 }).value).toBe(one);
        expect(t('items.count', { count: 5 }).value).toBe(many);
      };

      testPlurals('en', 'No items', '1 item', '5 items');
      testPlurals('es', 'Sin elementos', '1 elemento', '5 elementos');
      testPlurals('fr', 'Aucun élément', '1 élément', '5 éléments');
      testPlurals('de', 'Keine Elemente', '1 Element', '5 Elemente');
      testPlurals('zh', '无项目', '1 个项目', '5 个项目');
      testPlurals('ja', 'アイテムなし', '1 アイテム', '5 アイテム');
    });
  });
});
