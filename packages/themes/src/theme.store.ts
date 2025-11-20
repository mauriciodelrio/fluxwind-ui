/**
 * Theme Store - Reactive theme management with signals
 * @module theme.store
 */

import { signal, computed, type Signal } from '@preact/signals-core';
import type { ThemeNameExtended, ThemePreset } from '@/types/theme.types';
import { getTheme, applyTheme, getSystemTheme, watchSystemTheme } from '@/theme.utils';

/**
 * Theme store configuration
 */
export interface ThemeStoreConfig {
  /**
   * Initial theme to use
   * @default 'light'
   */
  initialTheme?: ThemeNameExtended;

  /**
   * Whether to follow system theme preference
   * @default false
   */
  followSystem?: boolean;

  /**
   * Whether to persist theme to localStorage
   * @default true
   */
  persist?: boolean;

  /**
   * Storage key for persisting theme
   * @default 'fw-theme'
   */
  storageKey?: string;

  /**
   * Transition duration in milliseconds
   * @default 200
   */
  transition?: number;
}

/**
 * Theme store state
 */
export interface ThemeStore {
  /**
   * Current theme name (reactive signal)
   */
  currentTheme: Signal<ThemeNameExtended>;

  /**
   * System theme preference (reactive signal)
   */
  systemTheme: Signal<'light' | 'dark' | 'no-preference'>;

  /**
   * Whether currently following system preference (reactive signal)
   */
  followingSystem: Signal<boolean>;

  /**
   * Computed: Effective theme (system or current)
   */
  effectiveTheme: Signal<ThemeNameExtended>;

  /**
   * Set a specific theme
   */
  setTheme: (theme: ThemeNameExtended | ThemePreset) => void;

  /**
   * Toggle between light and dark
   */
  toggleTheme: () => void;

  /**
   * Enable/disable system theme following
   */
  setFollowSystem: (follow: boolean) => void;

  /**
   * Get current theme from DOM
   */
  getActiveTheme: () => ThemeNameExtended | null;

  /**
   * Cleanup function (removes event listeners)
   */
  cleanup: () => void;
}

/**
 * Create a reactive theme store with signals
 *
 * @param config - Store configuration
 * @returns Theme store instance
 *
 * @example
 * ```typescript
 * const themeStore = createThemeStore({
 *   initialTheme: 'dark',
 *   followSystem: true,
 *   persist: true,
 * });
 *
 * // Set theme
 * themeStore.setTheme('dark');
 *
 * // Access reactive values
 * console.log(themeStore.currentTheme.value); // 'dark'
 * console.log(themeStore.effectiveTheme.value); // 'dark' or system theme
 *
 * // Toggle theme
 * themeStore.toggleTheme();
 *
 * // Cleanup
 * themeStore.cleanup();
 * ```
 */
export function createThemeStore(config: ThemeStoreConfig = {}): ThemeStore {
  const {
    initialTheme = 'light',
    followSystem = false,
    persist = true,
    storageKey = 'fw-theme',
    transition = 200,
  } = config;

  // Reactive signals
  const currentTheme = signal<ThemeNameExtended>(initialTheme);
  const systemTheme = signal<'light' | 'dark' | 'no-preference'>(getSystemTheme());
  const followingSystem = signal<boolean>(followSystem);

  // Computed effective theme (system or current)
  const effectiveTheme = computed<ThemeNameExtended>(() => {
    if (followingSystem.value && systemTheme.value !== 'no-preference') {
      return systemTheme.value;
    }
    return currentTheme.value;
  });

  // Watch system theme changes
  let unwatchSystem: (() => void) | null = null;
  if (followSystem) {
    unwatchSystem = watchSystemTheme((newSystemTheme) => {
      systemTheme.value = newSystemTheme;
      if (followingSystem.value && newSystemTheme !== 'no-preference') {
        applyTheme(newSystemTheme, {
          transition,
          persist,
          storageKey,
        });
      }
    });
  }

  /**
   * Set a specific theme
   */
  const setTheme = (theme: ThemeNameExtended | ThemePreset): void => {
    const themeName = typeof theme === 'string' ? theme : theme.name;
    currentTheme.value = themeName;

    applyTheme(theme, {
      transition,
      persist,
      storageKey,
    });
  };

  /**
   * Toggle between light and dark
   */
  const toggleTheme = (): void => {
    const current = effectiveTheme.value;
    const newTheme = current === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  /**
   * Enable/disable system theme following
   */
  const setFollowSystem = (follow: boolean): void => {
    followingSystem.value = follow;

    if (follow && !unwatchSystem) {
      // Start watching system theme
      unwatchSystem = watchSystemTheme((newSystemTheme) => {
        systemTheme.value = newSystemTheme;
        if (followingSystem.value && newSystemTheme !== 'no-preference') {
          applyTheme(newSystemTheme, {
            transition,
            persist,
            storageKey,
          });
        }
      });
    } else if (!follow && unwatchSystem) {
      // Stop watching system theme
      unwatchSystem();
      unwatchSystem = null;
    }

    // Apply effective theme
    applyTheme(effectiveTheme.value, {
      transition,
      persist,
      storageKey,
    });
  };

  /**
   * Get current theme from DOM
   */
  const getActiveTheme = (): ThemeNameExtended | null => {
    return getTheme();
  };

  /**
   * Cleanup function
   */
  const cleanup = (): void => {
    if (unwatchSystem) {
      unwatchSystem();
      unwatchSystem = null;
    }
  };

  // Apply initial theme
  applyTheme(effectiveTheme.value, {
    transition: 0, // No transition on initial load
    persist,
    storageKey,
  });

  return {
    currentTheme,
    systemTheme,
    followingSystem,
    effectiveTheme,
    setTheme,
    toggleTheme,
    setFollowSystem,
    getActiveTheme,
    cleanup,
  };
}

/**
 * Global theme store instance (singleton pattern)
 * Can be accessed across the application without React context
 */
export const globalThemeStore = createThemeStore({
  initialTheme: 'light',
  followSystem: false,
  persist: true,
});
