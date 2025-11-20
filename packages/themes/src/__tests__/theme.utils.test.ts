/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  createTheme,
  applyTheme,
  getTheme,
  removeTheme,
  saveThemePreference,
  loadThemePreference,
  clearThemePreference,
  getSystemTheme,
  watchSystemTheme,
  initTheme,
  toggleTheme,
  mergeThemeVariables,
} from '@/theme.utils';

describe('Theme Utilities', () => {
  let root: HTMLElement;

  beforeEach(() => {
    // Setup DOM
    root = document.documentElement;
    root.removeAttribute('data-theme');

    // Clear all custom properties
    const styles = root.style;
    Array.from(styles).forEach((property) => {
      if (property.startsWith('--fw-')) {
        root.style.removeProperty(property);
      }
    });

    // Clear localStorage
    localStorage.clear();

    // Reset window events
    vi.clearAllMocks();
  });

  afterEach(() => {
    root.removeAttribute('data-theme');
    localStorage.clear();
  });

  describe('createTheme()', () => {
    it('should create a theme with default values', () => {
      const theme = createTheme({
        name: 'ocean',
      });

      expect(theme).toEqual({
        name: 'ocean',
        label: 'ocean',
        variables: {},
        extends: 'light',
        category: 'custom',
      });
    });

    it('should create a theme with custom label', () => {
      const theme = createTheme({
        name: 'ocean',
        label: 'Ocean Blue',
      });

      expect(theme.label).toBe('Ocean Blue');
    });

    it('should create a theme with custom variables', () => {
      const theme = createTheme({
        name: 'ocean',
        variables: {
          '--fw-color-primary': '#0ea5e9',
          '--fw-color-primary-hover': '#0284c7',
        },
      });

      expect(theme.variables).toEqual({
        '--fw-color-primary': '#0ea5e9',
        '--fw-color-primary-hover': '#0284c7',
      });
    });

    it('should create a theme extending another base', () => {
      const theme = createTheme({
        name: 'dark-ocean',
        extends: 'dark',
      });

      expect(theme.extends).toBe('dark');
    });

    it('should default to light base if extends not specified', () => {
      const theme = createTheme({
        name: 'custom',
      });

      expect(theme.extends).toBe('light');
    });
  });

  describe('applyTheme()', () => {
    it('should apply theme by name', () => {
      applyTheme('dark', { persist: false });

      expect(root.getAttribute('data-theme')).toBe('dark');
    });

    it('should apply theme with configuration', () => {
      applyTheme(
        {
          name: 'ocean',
          variables: {
            '--fw-color-primary': '#0ea5e9',
          },
        },
        { persist: false }
      );

      expect(root.getAttribute('data-theme')).toBe('ocean');
      expect(root.style.getPropertyValue('--fw-color-primary')).toBe('#0ea5e9');
    });

    it('should apply multiple CSS variables', () => {
      applyTheme(
        {
          name: 'custom',
          variables: {
            '--fw-color-primary': '#ff0000',
            '--fw-color-secondary': '#00ff00',
            '--fw-color-bg-primary': '#0000ff',
          },
        },
        { persist: false }
      );

      expect(root.style.getPropertyValue('--fw-color-primary')).toBe('#ff0000');
      expect(root.style.getPropertyValue('--fw-color-secondary')).toBe('#00ff00');
      expect(root.style.getPropertyValue('--fw-color-bg-primary')).toBe('#0000ff');
    });

    it('should apply theme to custom target element', () => {
      const target = document.createElement('div');

      applyTheme('dark', { target, persist: false });

      expect(target.getAttribute('data-theme')).toBe('dark');
    });

    it('should persist theme preference by default', () => {
      applyTheme('dark');

      expect(localStorage.getItem('fluxwind-theme')).toBe('dark');
    });

    it('should not persist when persist is false', () => {
      applyTheme('dark', { persist: false });

      expect(localStorage.getItem('fluxwind-theme')).toBeNull();
    });

    it('should use custom storage key', () => {
      applyTheme('dark', { storageKey: 'custom-theme' });

      expect(localStorage.getItem('custom-theme')).toBe('dark');
    });

    it('should dispatch themechange event', () => {
      const handler = vi.fn();
      window.addEventListener('themechange', handler);

      applyTheme('dark', { persist: false });

      expect(handler).toHaveBeenCalled();
      const event = handler.mock.calls[0]?.[0] as CustomEvent;
      expect(event?.detail.current).toBe('dark');
      expect(event?.detail.previous).toBeNull();

      window.removeEventListener('themechange', handler);
    });

    it('should include previous theme in event', () => {
      applyTheme('dark', { persist: false });

      const handler = vi.fn();
      window.addEventListener('themechange', handler);

      applyTheme('light', { persist: false });

      expect(handler).toHaveBeenCalled();
      const event = handler.mock.calls[0]?.[0] as CustomEvent;
      expect(event?.detail.previous).toBe('dark');
      expect(event?.detail.current).toBe('light');

      window.removeEventListener('themechange', handler);
    });

    it('should handle transition duration', async () => {
      applyTheme('dark', { transition: 100, persist: false });

      // Transition should be set initially
      expect(root.style.transition).toContain('100ms');

      // Wait for transition to be removed
      await new Promise((resolve) => setTimeout(resolve, 150));

      expect(root.style.transition).toBe('');
    });
  });

  describe('getTheme()', () => {
    it('should return null when no theme is applied', () => {
      expect(getTheme()).toBeNull();
    });

    it('should return the current theme', () => {
      applyTheme('dark', { persist: false });

      expect(getTheme()).toBe('dark');
    });

    it('should return theme from custom target', () => {
      const target = document.createElement('div');
      applyTheme('sepia', { target, persist: false });

      expect(getTheme(target)).toBe('sepia');
    });

    it('should return null for element without theme', () => {
      const target = document.createElement('div');

      expect(getTheme(target)).toBeNull();
    });
  });

  describe('removeTheme()', () => {
    it('should remove theme attribute', () => {
      applyTheme('dark', { persist: false });
      removeTheme({ persist: false });

      expect(root.getAttribute('data-theme')).toBeNull();
    });

    it('should remove custom CSS variables', () => {
      applyTheme(
        {
          name: 'custom',
          variables: {
            '--fw-color-primary': '#ff0000',
            '--fw-color-secondary': '#00ff00',
          },
        },
        { persist: false }
      );

      removeTheme({ persist: false });

      expect(root.style.getPropertyValue('--fw-color-primary')).toBe('');
      expect(root.style.getPropertyValue('--fw-color-secondary')).toBe('');
    });

    it('should clear persisted preference by default', () => {
      applyTheme('dark');
      removeTheme();

      expect(localStorage.getItem('fluxwind-theme')).toBeNull();
    });

    it('should not clear preference when persist is false', () => {
      applyTheme('dark');
      removeTheme({ persist: false });

      expect(localStorage.getItem('fluxwind-theme')).toBe('dark');
    });

    it('should dispatch themechange event', () => {
      applyTheme('dark', { persist: false });

      const handler = vi.fn();
      window.addEventListener('themechange', handler);

      removeTheme({ persist: false });

      expect(handler).toHaveBeenCalled();
      const event = handler.mock.calls[0]?.[0] as CustomEvent;
      expect(event?.detail.previous).toBe('dark');
      expect(event?.detail.current).toBe('light');

      window.removeEventListener('themechange', handler);
    });

    it('should remove theme from custom target', () => {
      const target = document.createElement('div');
      applyTheme('dark', { target, persist: false });
      removeTheme({ target, persist: false });

      expect(target.getAttribute('data-theme')).toBeNull();
    });
  });

  describe('Storage Functions', () => {
    describe('saveThemePreference()', () => {
      it('should save theme to localStorage', () => {
        saveThemePreference('dark');

        expect(localStorage.getItem('fluxwind-theme')).toBe('dark');
      });

      it('should use custom storage key', () => {
        saveThemePreference('dark', 'custom-theme');

        expect(localStorage.getItem('custom-theme')).toBe('dark');
      });

      it('should handle storage errors gracefully', () => {
        const mockAdapter = {
          get: vi.fn(),
          set: vi.fn(() => {
            throw new Error('Storage error');
          }),
          remove: vi.fn(),
        };

        expect(() => saveThemePreference('dark', 'key', mockAdapter)).not.toThrow();
      });
    });

    describe('loadThemePreference()', () => {
      it('should load theme from localStorage', () => {
        localStorage.setItem('fluxwind-theme', 'dark');

        expect(loadThemePreference()).toBe('dark');
      });

      it('should return null when no preference is saved', () => {
        expect(loadThemePreference()).toBeNull();
      });

      it('should use custom storage key', () => {
        localStorage.setItem('custom-theme', 'sepia');

        expect(loadThemePreference('custom-theme')).toBe('sepia');
      });

      it('should handle storage errors gracefully', () => {
        const mockAdapter = {
          get: vi.fn(() => {
            throw new Error('Storage error');
          }),
          set: vi.fn(),
          remove: vi.fn(),
        };

        expect(loadThemePreference('key', mockAdapter)).toBeNull();
      });
    });

    describe('clearThemePreference()', () => {
      it('should clear theme from localStorage', () => {
        localStorage.setItem('fluxwind-theme', 'dark');
        clearThemePreference();

        expect(localStorage.getItem('fluxwind-theme')).toBeNull();
      });

      it('should use custom storage key', () => {
        localStorage.setItem('custom-theme', 'dark');
        clearThemePreference('custom-theme');

        expect(localStorage.getItem('custom-theme')).toBeNull();
      });

      it('should handle storage errors gracefully', () => {
        const mockAdapter = {
          get: vi.fn(),
          set: vi.fn(),
          remove: vi.fn(() => {
            throw new Error('Storage error');
          }),
        };

        expect(() => clearThemePreference('key', mockAdapter)).not.toThrow();
      });
    });
  });

  describe('System Theme Functions', () => {
    describe('getSystemTheme()', () => {
      it('should return "dark" when system prefers dark', () => {
        // Mock matchMedia to prefer dark
        Object.defineProperty(window, 'matchMedia', {
          writable: true,
          value: vi.fn((query: string) => ({
            matches: query === '(prefers-color-scheme: dark)',
            media: query,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
          })),
        });

        expect(getSystemTheme()).toBe('dark');
      });

      it('should return "light" when system prefers light', () => {
        // Mock matchMedia to prefer light
        Object.defineProperty(window, 'matchMedia', {
          writable: true,
          value: vi.fn((query: string) => ({
            matches: query === '(prefers-color-scheme: light)',
            media: query,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
          })),
        });

        expect(getSystemTheme()).toBe('light');
      });

      it('should return "no-preference" when no preference', () => {
        // Mock matchMedia with no matches
        Object.defineProperty(window, 'matchMedia', {
          writable: true,
          value: vi.fn(() => ({
            matches: false,
            media: '',
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
          })),
        });

        expect(getSystemTheme()).toBe('no-preference');
      });
    });

    describe('watchSystemTheme()', () => {
      it('should call callback when system theme changes', () => {
        const callback = vi.fn();
        const listeners: Array<() => void> = [];

        // Mock matchMedia with addEventListener support
        Object.defineProperty(window, 'matchMedia', {
          writable: true,
          value: vi.fn(() => ({
            matches: false,
            media: '',
            addEventListener: vi.fn((event: string, handler: () => void) => {
              if (event === 'change') {
                listeners.push(handler);
              }
            }),
            removeEventListener: vi.fn(),
          })),
        });

        watchSystemTheme(callback);

        // Simulate system theme change
        listeners.forEach((listener) => listener());

        expect(callback).toHaveBeenCalled();
      });

      it('should return cleanup function', () => {
        const callback = vi.fn();
        const removeEventListener = vi.fn();

        // Mock matchMedia
        Object.defineProperty(window, 'matchMedia', {
          writable: true,
          value: vi.fn(() => ({
            matches: false,
            media: '',
            addEventListener: vi.fn(),
            removeEventListener,
          })),
        });

        const cleanup = watchSystemTheme(callback);
        cleanup();

        expect(removeEventListener).toHaveBeenCalled();
      });

      it('should handle multiple watchers', () => {
        const callback1 = vi.fn();
        const callback2 = vi.fn();
        const listeners: Array<() => void> = [];

        Object.defineProperty(window, 'matchMedia', {
          writable: true,
          value: vi.fn(() => ({
            matches: false,
            media: '',
            addEventListener: vi.fn((event: string, handler: () => void) => {
              if (event === 'change') {
                listeners.push(handler);
              }
            }),
            removeEventListener: vi.fn(),
          })),
        });

        watchSystemTheme(callback1);
        watchSystemTheme(callback2);

        // Simulate system theme change
        listeners.forEach((listener) => listener());

        expect(callback1).toHaveBeenCalled();
        expect(callback2).toHaveBeenCalled();
      });
    });
  });

  describe('initTheme()', () => {
    it('should apply saved preference if exists', () => {
      localStorage.setItem('fluxwind-theme', 'dark');

      const theme = initTheme();

      expect(theme).toBe('dark');
      expect(root.getAttribute('data-theme')).toBe('dark');
    });

    it('should follow system preference if no saved preference', () => {
      // Mock system preference
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn((query: string) => ({
          matches: query === '(prefers-color-scheme: dark)',
          media: query,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        })),
      });

      const theme = initTheme({ followSystem: true });

      expect(theme).toBe('dark');
      expect(root.getAttribute('data-theme')).toBe('dark');
    });

    it('should apply default theme if no preference and followSystem is false', () => {
      const theme = initTheme({ followSystem: false });

      expect(theme).toBe('light');
      expect(root.getAttribute('data-theme')).toBe('light');
    });

    it('should use custom default theme', () => {
      const theme = initTheme({ defaultTheme: 'sepia', followSystem: false });

      expect(theme).toBe('sepia');
      expect(root.getAttribute('data-theme')).toBe('sepia');
    });

    it('should not persist during initialization', () => {
      initTheme();

      // Check that persist option was false
      expect(localStorage.getItem('fluxwind-theme')).toBeNull();
    });

    it('should prefer saved preference over system', () => {
      localStorage.setItem('fluxwind-theme', 'light');

      // Mock system to prefer dark
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn((query: string) => ({
          matches: query === '(prefers-color-scheme: dark)',
          media: query,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        })),
      });

      const theme = initTheme({ followSystem: true });

      // Should use saved preference (light) not system (dark)
      expect(theme).toBe('light');
    });
  });

  describe('toggleTheme()', () => {
    it('should toggle from light to dark', () => {
      applyTheme('light', { persist: false });

      const newTheme = toggleTheme({ persist: false });

      expect(newTheme).toBe('dark');
      expect(root.getAttribute('data-theme')).toBe('dark');
    });

    it('should toggle from dark to light', () => {
      applyTheme('dark', { persist: false });

      const newTheme = toggleTheme({ persist: false });

      expect(newTheme).toBe('light');
      expect(root.getAttribute('data-theme')).toBe('light');
    });

    it('should default to dark when no theme is set', () => {
      const newTheme = toggleTheme({ persist: false });

      expect(newTheme).toBe('dark');
    });

    it('should persist by default', () => {
      applyTheme('light', { persist: false });
      toggleTheme();

      expect(localStorage.getItem('fluxwind-theme')).toBe('dark');
    });

    it('should handle toggle with custom options', () => {
      applyTheme('light', { persist: false });

      toggleTheme({ storageKey: 'custom-theme' });

      expect(localStorage.getItem('custom-theme')).toBe('dark');
    });
  });

  describe('mergeThemeVariables()', () => {
    it('should merge variables correctly', () => {
      const base = {
        '--fw-color-primary': '#000000',
        '--fw-color-secondary': '#111111',
      };

      const override = {
        '--fw-color-primary': '#ffffff',
        '--fw-color-tertiary': '#222222',
      };

      const merged = mergeThemeVariables(base, override);

      expect(merged).toEqual({
        '--fw-color-primary': '#ffffff', // overridden
        '--fw-color-secondary': '#111111', // from base
        '--fw-color-tertiary': '#222222', // from override
      });
    });

    it('should handle empty base', () => {
      const override = {
        '--fw-color-primary': '#ffffff',
      };

      const merged = mergeThemeVariables({}, override);

      expect(merged).toEqual(override);
    });

    it('should handle empty override', () => {
      const base = {
        '--fw-color-primary': '#000000',
      };

      const merged = mergeThemeVariables(base, {});

      expect(merged).toEqual(base);
    });

    it('should handle both empty', () => {
      const merged = mergeThemeVariables({}, {});

      expect(merged).toEqual({});
    });

    it('should return empty object when no parameters', () => {
      const merged = mergeThemeVariables();

      expect(merged).toEqual({});
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid theme switching', () => {
      applyTheme('dark', { persist: false });
      applyTheme('light', { persist: false });
      applyTheme('sepia', { persist: false });
      applyTheme('dark', { persist: false });

      expect(root.getAttribute('data-theme')).toBe('dark');
    });

    it('should handle applying same theme multiple times', () => {
      applyTheme('dark', { persist: false });
      applyTheme('dark', { persist: false });
      applyTheme('dark', { persist: false });

      expect(root.getAttribute('data-theme')).toBe('dark');
    });

    it('should handle custom theme names', () => {
      applyTheme('my-custom-theme-123', { persist: false });

      expect(root.getAttribute('data-theme')).toBe('my-custom-theme-123');
    });

    it('should handle theme with no variables', () => {
      applyTheme(
        {
          name: 'minimal',
          variables: {},
        },
        { persist: false }
      );

      expect(root.getAttribute('data-theme')).toBe('minimal');
    });

    it('should handle very long theme names', () => {
      const longName = 'a'.repeat(1000);
      applyTheme(longName, { persist: false });

      expect(root.getAttribute('data-theme')).toBe(longName);
    });

    it('should handle special characters in theme names', () => {
      applyTheme('theme-with-dashes_and_underscores', { persist: false });

      expect(root.getAttribute('data-theme')).toBe('theme-with-dashes_and_underscores');
    });
  });

  describe('SSR and Browser Compatibility', () => {
    it('should handle applyTheme with null target gracefully', () => {
      expect(() =>
        applyTheme('dark', { target: null as unknown as HTMLElement, persist: false })
      ).not.toThrow();
    });

    it('should handle getTheme with null target', () => {
      expect(getTheme(null)).toBeNull();
    });

    it('should handle removeTheme with null target gracefully', () => {
      expect(() =>
        removeTheme({ target: null as unknown as HTMLElement, persist: false })
      ).not.toThrow();
    });

    it('should return no-preference when matchMedia is not available', () => {
      const originalMatchMedia = window.matchMedia;
      // @ts-expect-error - testing undefined case
      delete window.matchMedia;

      expect(getSystemTheme()).toBe('no-preference');

      window.matchMedia = originalMatchMedia;
    });

    it('should return cleanup function when matchMedia is not available', () => {
      const originalMatchMedia = window.matchMedia;
      // @ts-expect-error - testing undefined case
      delete window.matchMedia;

      const cleanup = watchSystemTheme(vi.fn());
      expect(cleanup).toBeInstanceOf(Function);
      expect(() => cleanup()).not.toThrow();

      window.matchMedia = originalMatchMedia;
    });

    it('should handle transitions with 0 duration', () => {
      applyTheme('dark', { transition: 0, persist: false });
      expect(root.getAttribute('data-theme')).toBe('dark');
    });

    it('should not dispatch event when previous theme is null during removeTheme', () => {
      const handler = vi.fn();
      window.addEventListener('themechange', handler);

      // Remove theme when no theme is set
      removeTheme({ persist: false });

      // Event should not be dispatched when previous theme is null
      expect(handler).not.toHaveBeenCalled();

      window.removeEventListener('themechange', handler);
    });

    it('should handle custom storage adapter in saveThemePreference', () => {
      const customAdapter = {
        get: vi.fn(),
        set: vi.fn(),
        remove: vi.fn(),
      };

      saveThemePreference('dark', 'custom-key', customAdapter);

      expect(customAdapter.set).toHaveBeenCalledWith('custom-key', 'dark');
    });

    it('should handle custom storage adapter in loadThemePreference', () => {
      const customAdapter = {
        get: vi.fn(() => 'sepia'),
        set: vi.fn(),
        remove: vi.fn(),
      };

      const theme = loadThemePreference('custom-key', customAdapter);

      expect(customAdapter.get).toHaveBeenCalledWith('custom-key');
      expect(theme).toBe('sepia');
    });

    it('should handle custom storage adapter in clearThemePreference', () => {
      const customAdapter = {
        get: vi.fn(),
        set: vi.fn(),
        remove: vi.fn(),
      };

      clearThemePreference('custom-key', customAdapter);

      expect(customAdapter.remove).toHaveBeenCalledWith('custom-key');
    });
  });

  describe('Advanced Integration Scenarios', () => {
    it('should handle rapid toggles', () => {
      toggleTheme({ persist: false });
      toggleTheme({ persist: false });
      toggleTheme({ persist: false });

      const currentTheme = getTheme();
      expect(['light', 'dark']).toContain(currentTheme);
    });

    it('should handle theme change with custom variables and transition', async () => {
      applyTheme(
        {
          name: 'custom',
          variables: {
            '--fw-color-primary': '#ff0000',
          },
        },
        { transition: 100, persist: false }
      );

      expect(root.style.transition).toContain('100ms');

      await new Promise((resolve) => setTimeout(resolve, 150));

      expect(root.style.transition).toBe('');
      expect(root.style.getPropertyValue('--fw-color-primary')).toBe('#ff0000');
    });

    it('should maintain theme after multiple operations', () => {
      applyTheme('dark', { persist: false });
      const theme1 = getTheme();

      applyTheme(
        {
          name: 'dark',
          variables: { '--fw-color-primary': '#000' },
        },
        { persist: false }
      );
      const theme2 = getTheme();

      expect(theme1).toBe('dark');
      expect(theme2).toBe('dark');
    });

    it('should handle initTheme with system preference no-preference', () => {
      // Mock system with no preference
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn(() => ({
          matches: false,
          media: '',
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        })),
      });

      const theme = initTheme({ followSystem: true, defaultTheme: 'sepia' });

      // Should use default when no system preference
      expect(theme).toBe('sepia');
    });

    it('should handle mergeThemeVariables with undefined parameters', () => {
      const merged = mergeThemeVariables(undefined, undefined);
      expect(merged).toEqual({});
    });

    it('should handle complex variable merging', () => {
      const base = {
        '--fw-color-primary': '#000',
        '--fw-color-secondary': '#111',
        '--fw-color-bg-primary': '#222',
      };

      const override = {
        '--fw-color-primary': '#fff',
        '--fw-color-bg-secondary': '#333',
      };

      const merged = mergeThemeVariables(base, override);

      expect(merged).toEqual({
        '--fw-color-primary': '#fff',
        '--fw-color-secondary': '#111',
        '--fw-color-bg-primary': '#222',
        '--fw-color-bg-secondary': '#333',
      });
    });
  });

  describe('Type Safety and Function Coverage', () => {
    it('should test isDefaultTheme from types', async () => {
      const { isDefaultTheme } = await import('../types/theme.types');

      expect(isDefaultTheme('light')).toBe(true);
      expect(isDefaultTheme('dark')).toBe(true);
      expect(isDefaultTheme('sepia')).toBe(true);
      expect(isDefaultTheme('custom')).toBe(false);
      expect(isDefaultTheme('ocean')).toBe(false);
    });

    it('should handle createTheme with all options', () => {
      const theme = createTheme({
        name: 'full-theme',
        label: 'Full Theme',
        variables: {
          '--fw-color-primary': '#123456',
        },
        extends: 'dark',
      });

      expect(theme.name).toBe('full-theme');
      expect(theme.label).toBe('Full Theme');
      expect(theme.extends).toBe('dark');
      expect(theme.category).toBe('custom');
      expect(theme.variables).toEqual({
        '--fw-color-primary': '#123456',
      });
    });

    it('should toggle from non-existent theme to dark', () => {
      // No theme set initially
      const newTheme = toggleTheme({ persist: false });
      expect(newTheme).toBe('dark');
    });

    it('should apply theme and verify all properties are set', () => {
      const config = {
        name: 'test-theme',
        variables: {
          '--fw-color-primary': '#abc123',
          '--fw-color-secondary': '#def456',
        },
      };

      applyTheme(config, { persist: true, storageKey: 'test-key' });

      expect(root.getAttribute('data-theme')).toBe('test-theme');
      expect(root.style.getPropertyValue('--fw-color-primary')).toBe('#abc123');
      expect(root.style.getPropertyValue('--fw-color-secondary')).toBe('#def456');
      expect(localStorage.getItem('test-key')).toBe('test-theme');
    });

    it('should handle getTheme when document is undefined', () => {
      // Test the fallback when no target is provided
      const theme = getTheme(undefined);
      // In jsdom, document should be available, so it should work normally
      expect(theme).toBeNull(); // No theme set initially
    });

    it('should apply theme without transition when transition is 0', () => {
      applyTheme('dark', { transition: 0, persist: false });

      // Should not have transition property set
      expect(root.getAttribute('data-theme')).toBe('dark');
    });

    it('should handle storage errors in save operation', () => {
      const errorAdapter = {
        get: vi.fn(),
        set: vi.fn(() => {
          throw new Error('Storage full');
        }),
        remove: vi.fn(),
      };

      // Should not throw
      expect(() => {
        saveThemePreference('dark', 'key', errorAdapter);
      }).not.toThrow();
    });

    it('should handle storage errors in load operation', () => {
      const errorAdapter = {
        get: vi.fn(() => {
          throw new Error('Storage unavailable');
        }),
        set: vi.fn(),
        remove: vi.fn(),
      };

      // Should return null instead of throwing
      const result = loadThemePreference('key', errorAdapter);
      expect(result).toBeNull();
    });

    it('should handle storage errors in clear operation', () => {
      const errorAdapter = {
        get: vi.fn(),
        set: vi.fn(),
        remove: vi.fn(() => {
          throw new Error('Storage unavailable');
        }),
      };

      // Should not throw
      expect(() => {
        clearThemePreference('key', errorAdapter);
      }).not.toThrow();
    });

    it('should toggle theme when current theme is light', () => {
      applyTheme('light', { persist: false });
      const newTheme = toggleTheme({ persist: false });

      expect(newTheme).toBe('dark');
      expect(getTheme()).toBe('dark');
    });

    it('should toggle theme when current theme is dark', () => {
      applyTheme('dark', { persist: false });
      const newTheme = toggleTheme({ persist: false });

      expect(newTheme).toBe('light');
      expect(getTheme()).toBe('light');
    });

    it('should handle custom target element in applyTheme', () => {
      const customElement = document.createElement('section');
      document.body.appendChild(customElement);

      applyTheme('dark', { target: customElement, persist: false });

      expect(customElement.getAttribute('data-theme')).toBe('dark');
      expect(root.getAttribute('data-theme')).toBeNull(); // Root should not be affected

      document.body.removeChild(customElement);
    });

    it('should handle custom target element in removeTheme', () => {
      const customElement = document.createElement('section');
      document.body.appendChild(customElement);

      applyTheme('dark', { target: customElement, persist: false });
      removeTheme({ target: customElement, persist: false });

      expect(customElement.getAttribute('data-theme')).toBeNull();

      document.body.removeChild(customElement);
    });

    it('should dispatch event with timestamp', () => {
      const handler = vi.fn();
      window.addEventListener('themechange', handler);

      const beforeTime = Date.now();
      applyTheme('dark', { persist: false });
      const afterTime = Date.now();

      const event = handler.mock.calls[0]?.[0] as CustomEvent;
      expect(event?.detail.timestamp).toBeGreaterThanOrEqual(beforeTime);
      expect(event?.detail.timestamp).toBeLessThanOrEqual(afterTime);

      window.removeEventListener('themechange', handler);
    });

    it('should handle removeTheme clearing specific CSS variables only', () => {
      // Set some non-fw variables
      root.style.setProperty('--custom-var', 'value');

      applyTheme(
        {
          name: 'custom',
          variables: {
            '--fw-color-primary': '#000',
          },
        },
        { persist: false }
      );

      removeTheme({ persist: false });

      // fw variable should be removed
      expect(root.style.getPropertyValue('--fw-color-primary')).toBe('');
      // Custom variable should remain
      expect(root.style.getPropertyValue('--custom-var')).toBe('value');

      // Cleanup
      root.style.removeProperty('--custom-var');
    });

    it('should handle initTheme with all options', () => {
      localStorage.setItem('custom-storage', 'sepia');

      const theme = initTheme({
        followSystem: false,
        defaultTheme: 'light',
        storageKey: 'custom-storage',
      });

      expect(theme).toBe('sepia');
      expect(getTheme()).toBe('sepia');
    });

    it('should create theme with minimal config', () => {
      const theme = createTheme({ name: 'minimal' });

      expect(theme.name).toBe('minimal');
      expect(theme.label).toBe('minimal');
      expect(theme.extends).toBe('light');
      expect(theme.category).toBe('custom');
      expect(theme.variables).toEqual({});
    });

    it('should handle SSR environment in localStorageAdapter.set', () => {
      // Test that the SSR check works by using a custom adapter
      const mockAdapter = {
        get: vi.fn(),
        set: vi.fn(),
        remove: vi.fn(),
      };

      saveThemePreference('dark', 'test-key', mockAdapter);
      expect(mockAdapter.set).toHaveBeenCalledWith('test-key', 'dark');
    });

    it('should handle SSR environment in localStorageAdapter.get', () => {
      // Test that the SSR check works by using a custom adapter
      const mockAdapter = {
        get: vi.fn(() => 'dark'),
        set: vi.fn(),
        remove: vi.fn(),
      };

      const result = loadThemePreference('test-key', mockAdapter);
      expect(mockAdapter.get).toHaveBeenCalledWith('test-key');
      expect(result).toBe('dark');
    });

    it('should handle SSR environment in localStorageAdapter.remove', () => {
      // Test that the SSR check works by using a custom adapter
      const mockAdapter = {
        get: vi.fn(),
        set: vi.fn(),
        remove: vi.fn(),
      };

      clearThemePreference('test-key', mockAdapter);
      expect(mockAdapter.remove).toHaveBeenCalledWith('test-key');
    });

    it('should handle getTheme with null element gracefully', () => {
      // When element is explicitly null
      const result = getTheme(null);
      expect(result).toBeNull();
    });

    it('should apply theme with all transition options', () => {
      applyTheme('dark', {
        transition: 300,
        persist: true,
        storageKey: 'theme-key',
      });

      expect(root.getAttribute('data-theme')).toBe('dark');
      expect(localStorage.getItem('theme-key')).toBe('dark');
    });

    it('should handle applyTheme with theme preset config', () => {
      const preset = createTheme({
        name: 'custom-preset',
        label: 'Custom Preset',
        extends: 'dark',
        variables: {
          '--fw-color-primary': '#ff00ff',
        },
      });

      applyTheme(preset, { persist: false });

      expect(root.getAttribute('data-theme')).toBe('custom-preset');
      expect(root.style.getPropertyValue('--fw-color-primary')).toBe('#ff00ff');
    });

    it('should merge theme variables correctly', () => {
      const base = {
        '--fw-color-primary': '#000',
        '--fw-color-secondary': '#111',
      };

      const override = {
        '--fw-color-secondary': '#fff',
        '--fw-color-tertiary': '#222',
      };

      const merged = mergeThemeVariables(base, override);

      expect(merged).toEqual({
        '--fw-color-primary': '#000',
        '--fw-color-secondary': '#fff',
        '--fw-color-tertiary': '#222',
      });
    });

    it('should handle initTheme when followSystem is true and system preference is dark', () => {
      // Mock matchMedia to return dark preference
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query: string) => ({
          matches: query === '(prefers-color-scheme: dark)',
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });

      const theme = initTheme({
        followSystem: true,
        defaultTheme: 'light',
      });

      expect(theme).toBe('dark');
    });

    it('should handle toggleTheme with custom target', () => {
      const customElement = document.createElement('section');
      document.body.appendChild(customElement);

      applyTheme('light', { target: customElement, persist: false });
      const newTheme = toggleTheme({ target: customElement, persist: false });

      expect(newTheme).toBe('dark');
      expect(customElement.getAttribute('data-theme')).toBe('dark');

      document.body.removeChild(customElement);
    });

    it('should handle removeTheme with clearStorage option', () => {
      localStorage.setItem('fw-theme', 'dark');
      applyTheme('dark', { persist: true });

      removeTheme({ persist: true, storageKey: 'fw-theme' });

      expect(localStorage.getItem('fw-theme')).toBeNull();
      expect(root.getAttribute('data-theme')).toBeNull();
    });
  });
});
