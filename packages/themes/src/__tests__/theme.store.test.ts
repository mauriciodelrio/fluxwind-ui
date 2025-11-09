/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createThemeStore, globalThemeStore } from '../theme.store';

describe('Theme Store', () => {
  let root: HTMLElement;

  beforeEach(() => {
    root = document.documentElement;
    root.removeAttribute('data-theme');
    root.style.cssText = '';
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    root.removeAttribute('data-theme');
    root.style.cssText = '';
    localStorage.clear();
  });

  describe('createThemeStore()', () => {
    it('should create store with default configuration', () => {
      const store = createThemeStore();

      expect(store.currentTheme.value).toBe('light');
      expect(store.followingSystem.value).toBe(false);
      expect(root.getAttribute('data-theme')).toBe('light');
    });

    it('should create store with custom initial theme', () => {
      const store = createThemeStore({ initialTheme: 'dark' });

      expect(store.currentTheme.value).toBe('dark');
      expect(root.getAttribute('data-theme')).toBe('dark');
    });

    it('should create store with system following enabled', () => {
      const store = createThemeStore({ followSystem: true });

      expect(store.followingSystem.value).toBe(true);
    });

    it('should apply theme without transition on initial load', () => {
      createThemeStore({ initialTheme: 'dark', transition: 500 });

      // Theme should be applied immediately (no transition on initial load)
      expect(root.getAttribute('data-theme')).toBe('dark');
    });

    it('should persist theme to localStorage when enabled', () => {
      const store = createThemeStore({
        initialTheme: 'dark',
        persist: true,
        storageKey: 'test-theme',
      });

      expect(localStorage.getItem('test-theme')).toBe('dark');
      store.cleanup();
    });

    it('should not persist theme when disabled', () => {
      const store = createThemeStore({
        initialTheme: 'dark',
        persist: false,
        storageKey: 'test-theme',
      });

      expect(localStorage.getItem('test-theme')).toBeNull();
      store.cleanup();
    });
  });

  describe('setTheme()', () => {
    it('should set theme by name', () => {
      const store = createThemeStore();

      store.setTheme('dark');

      expect(store.currentTheme.value).toBe('dark');
      expect(root.getAttribute('data-theme')).toBe('dark');
    });

    it('should set theme by preset object', () => {
      const store = createThemeStore();

      store.setTheme({
        name: 'custom',
        label: 'Custom Theme',
        category: 'custom',
        variables: {
          '--fw-color-primary': '#ff0000',
        },
      });

      expect(store.currentTheme.value).toBe('custom');
      expect(root.getAttribute('data-theme')).toBe('custom');
      expect(root.style.getPropertyValue('--fw-color-primary')).toBe('#ff0000');
    });

    it('should update effectiveTheme when not following system', () => {
      const store = createThemeStore({ followSystem: false });

      store.setTheme('dark');

      expect(store.effectiveTheme.value).toBe('dark');
    });

    it('should persist theme when enabled', () => {
      const store = createThemeStore({ persist: true, storageKey: 'test-theme' });

      store.setTheme('dark');

      expect(localStorage.getItem('test-theme')).toBe('dark');
      store.cleanup();
    });
  });

  describe('toggleTheme()', () => {
    it('should toggle from light to dark', () => {
      const store = createThemeStore({ initialTheme: 'light' });

      store.toggleTheme();

      expect(store.currentTheme.value).toBe('dark');
      expect(root.getAttribute('data-theme')).toBe('dark');
    });

    it('should toggle from dark to light', () => {
      const store = createThemeStore({ initialTheme: 'dark' });

      store.toggleTheme();

      expect(store.currentTheme.value).toBe('light');
      expect(root.getAttribute('data-theme')).toBe('light');
    });

    it('should toggle effectiveTheme', () => {
      const store = createThemeStore({ initialTheme: 'light' });

      expect(store.effectiveTheme.value).toBe('light');

      store.toggleTheme();

      expect(store.effectiveTheme.value).toBe('dark');
    });
  });

  describe('setFollowSystem()', () => {
    it('should enable system theme following', () => {
      const store = createThemeStore({ followSystem: false });

      store.setFollowSystem(true);

      expect(store.followingSystem.value).toBe(true);
    });

    it('should disable system theme following', () => {
      const store = createThemeStore({ followSystem: true });

      store.setFollowSystem(false);

      expect(store.followingSystem.value).toBe(false);
      store.cleanup();
    });

    it('should apply current theme when disabling system following', () => {
      const store = createThemeStore({ followSystem: true, initialTheme: 'dark' });

      store.setFollowSystem(false);

      expect(root.getAttribute('data-theme')).toBe('dark');
      store.cleanup();
    });

    it('should cleanup system watcher when disabling', () => {
      const store = createThemeStore({ followSystem: true });

      store.setFollowSystem(false);
      store.setFollowSystem(true); // Re-enable to verify it works after cleanup

      expect(store.followingSystem.value).toBe(true);
      store.cleanup();
    });
  });

  describe('effectiveTheme computed signal', () => {
    it('should return currentTheme when not following system', () => {
      const store = createThemeStore({
        followSystem: false,
        initialTheme: 'dark',
      });

      expect(store.effectiveTheme.value).toBe('dark');
    });

    it('should return systemTheme when following system', () => {
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

      const store = createThemeStore({
        followSystem: true,
        initialTheme: 'light',
      });

      expect(store.systemTheme.value).toBe('dark');
      expect(store.effectiveTheme.value).toBe('dark');
      store.cleanup();
    });

    it('should return currentTheme when system preference is none', () => {
      // Mock matchMedia to return no preference
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(() => ({
          matches: false,
          media: '',
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });

      const store = createThemeStore({
        followSystem: true,
        initialTheme: 'light',
      });

      expect(store.systemTheme.value).toBe('no-preference');
      expect(store.effectiveTheme.value).toBe('light');
      store.cleanup();
    });
  });

  describe('getActiveTheme()', () => {
    it('should return current theme from DOM', () => {
      const store = createThemeStore({ initialTheme: 'dark' });

      expect(store.getActiveTheme()).toBe('dark');
    });

    it('should return null when no theme is set', () => {
      root.removeAttribute('data-theme');
      const store = createThemeStore({ initialTheme: 'light' });
      root.removeAttribute('data-theme'); // Remove again after store initialization

      expect(store.getActiveTheme()).toBeNull();
    });
  });

  describe('cleanup()', () => {
    it('should cleanup system watcher', () => {
      const store = createThemeStore({ followSystem: true });

      expect(() => store.cleanup()).not.toThrow();
    });

    it('should allow multiple cleanup calls', () => {
      const store = createThemeStore({ followSystem: true });

      store.cleanup();
      expect(() => store.cleanup()).not.toThrow();
    });
  });

  describe('globalThemeStore', () => {
    it('should export a global theme store instance', () => {
      expect(globalThemeStore).toBeDefined();
      expect(globalThemeStore.currentTheme).toBeDefined();
      expect(globalThemeStore.setTheme).toBeDefined();
      expect(globalThemeStore.toggleTheme).toBeDefined();
    });

    it('should have default configuration', () => {
      expect(globalThemeStore.followingSystem.value).toBe(false);
    });
  });

  describe('Reactive signals behavior', () => {
    it('should update effectiveTheme when currentTheme changes', () => {
      const store = createThemeStore({ followSystem: false });

      expect(store.effectiveTheme.value).toBe('light');

      store.setTheme('dark');

      expect(store.effectiveTheme.value).toBe('dark');
    });

    it('should update effectiveTheme when followingSystem changes', () => {
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

      const store = createThemeStore({
        followSystem: false,
        initialTheme: 'light',
      });

      expect(store.effectiveTheme.value).toBe('light');

      store.setFollowSystem(true);

      expect(store.effectiveTheme.value).toBe('dark');
      store.cleanup();
    });
  });

  describe('Integration scenarios', () => {
    it('should handle rapid theme changes', () => {
      const store = createThemeStore();

      store.setTheme('dark');
      store.setTheme('light');
      store.setTheme('sepia');
      store.setTheme('dark');

      expect(store.currentTheme.value).toBe('dark');
      expect(root.getAttribute('data-theme')).toBe('dark');
    });

    it('should handle theme changes with system following enabled', () => {
      const store = createThemeStore({ followSystem: true });

      store.setTheme('dark');

      expect(store.currentTheme.value).toBe('dark');
      store.cleanup();
    });

    it('should maintain theme state across enable/disable system following', () => {
      const store = createThemeStore({ followSystem: false, initialTheme: 'dark' });

      store.setFollowSystem(true);
      store.setFollowSystem(false);

      expect(store.currentTheme.value).toBe('dark');
      store.cleanup();
    });
  });

  describe('System theme watcher callbacks', () => {
    it('should detect system theme on initialization', () => {
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

      const store = createThemeStore({
        followSystem: true,
        initialTheme: 'light',
      });

      // Should detect dark system theme
      expect(store.systemTheme.value).toBe('dark');
      expect(store.effectiveTheme.value).toBe('dark');

      store.cleanup();
    });

    it('should apply theme when system theme changes and following system', () => {
      let mediaQueryCallback: ((e: MediaQueryListEvent) => void) | undefined;
      let currentTheme = 'light';

      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query: string) => ({
          matches: query === `(prefers-color-scheme: ${currentTheme})`,
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn((event: string, callback: (e: MediaQueryListEvent) => void) => {
            if (event === 'change') {
              mediaQueryCallback = callback;
            }
          }),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });

      const store = createThemeStore({
        followSystem: true,
        initialTheme: 'light',
      });

      // Verify initial state
      expect(store.systemTheme.value).toBe('light');
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');

      // Change mock to return dark theme
      currentTheme = 'dark';

      // Simulate system theme change to dark
      if (mediaQueryCallback) {
        mediaQueryCallback({
          matches: true,
          media: '(prefers-color-scheme: dark)',
        } as MediaQueryListEvent);
      }

      // Should update system theme signal and apply dark theme
      expect(store.systemTheme.value).toBe('dark');
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

      store.cleanup();
    });

    it('should handle system theme change to no-preference', () => {
      let mediaQueryCallback: ((e: MediaQueryListEvent) => void) | undefined;

      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query: string) => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn((event: string, callback: (e: MediaQueryListEvent) => void) => {
            if (event === 'change') {
              mediaQueryCallback = callback;
            }
          }),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });

      const store = createThemeStore({
        followSystem: true,
        initialTheme: 'light',
      });

      // Simulate system theme change to no preference
      if (mediaQueryCallback) {
        mediaQueryCallback({
          matches: false,
          media: '(prefers-color-scheme: dark)',
        } as MediaQueryListEvent);
      }

      // Should update to no-preference but not apply theme
      expect(store.systemTheme.value).toBe('no-preference');

      store.cleanup();
    });

    it('should start watching system when setFollowSystem(true) is called', () => {
      let mediaQueryCallback: ((e: MediaQueryListEvent) => void) | undefined;
      let currentTheme = 'dark';

      // Mock matchMedia to return dark preference
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query: string) => ({
          matches: query === `(prefers-color-scheme: ${currentTheme})`,
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn((event: string, callback: (e: MediaQueryListEvent) => void) => {
            if (event === 'change') {
              mediaQueryCallback = callback;
            }
          }),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });

      const store = createThemeStore({
        followSystem: false,
        initialTheme: 'light',
      });

      expect(store.effectiveTheme.value).toBe('light');

      // Enable system following
      store.setFollowSystem(true);

      // Should now use system theme (dark)
      expect(store.effectiveTheme.value).toBe('dark');
      expect(root.getAttribute('data-theme')).toBe('dark');

      // Change mock to return light theme
      currentTheme = 'light';

      // Now trigger system theme change to light
      if (mediaQueryCallback) {
        mediaQueryCallback({
          matches: true,
          media: '(prefers-color-scheme: light)',
        } as MediaQueryListEvent);
      }

      // Should update to light theme
      expect(store.systemTheme.value).toBe('light');
      expect(root.getAttribute('data-theme')).toBe('light');

      store.cleanup();
    });
  });
});
