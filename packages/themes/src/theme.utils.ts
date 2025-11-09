/**
 * Theme utilities for Fluxwind UI
 * Provides functions to create, apply, and manage themes
 * @module theme.utils
 */

import type {
  ThemeNameExtended,
  ThemeConfig,
  ThemePreset,
  ApplyThemeOptions,
  ThemeChangeEvent,
  SystemTheme,
  ThemeWatcherCallback,
  ThemeWatcherCleanup,
  ThemeStorageAdapter,
  ThemeVariables,
} from './types/theme.types';

/**
 * Default storage key for theme persistence
 */
const DEFAULT_STORAGE_KEY = 'fluxwind-theme';

/**
 * Default theme name
 */
const DEFAULT_THEME: ThemeNameExtended = 'light';

/**
 * Local storage adapter (browser environment)
 */
const localStorageAdapter = {
  get: (key: string) => {
    /* v8 ignore next -- @preserve */
    if (typeof window === 'undefined') return null;
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set: (key: string, value: string) => {
    /* v8 ignore next -- @preserve */
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, value);
    } catch {
      // Fail silently
    }
  },
  remove: (key: string) => {
    /* v8 ignore next -- @preserve */
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(key);
    } catch {
      // Fail silently
    }
  },
};

/**
 * Create a custom theme configuration
 *
 * @param config - Theme configuration
 * @returns Complete theme configuration with defaults
 *
 * @example
 * ```typescript
 * const oceanTheme = createTheme({
 *   name: 'ocean',
 *   label: 'Ocean Blue',
 *   variables: {
 *     '--fw-color-primary': '#0ea5e9',
 *     '--fw-color-primary-hover': '#0284c7',
 *   },
 * });
 * ```
 */
export function createTheme(config: ThemeConfig): ThemePreset {
  return {
    name: config.name,
    label: config.label || config.name,
    variables: config.variables || {},
    extends: config.extends || DEFAULT_THEME,
    category: 'custom',
  };
}

/**
 * Apply a theme to the document or target element
 *
 * @param theme - Theme name or configuration
 * @param options - Application options
 *
 * @example
 * ```typescript
 * // Apply by name
 * applyTheme('dark');
 *
 * // Apply with custom variables
 * applyTheme({
 *   name: 'ocean',
 *   variables: {
 *     '--fw-color-primary': '#0ea5e9',
 *   },
 * });
 *
 * // Apply with options
 * applyTheme('dark', {
 *   persist: true,
 *   transition: 300,
 * });
 * ```
 */
export function applyTheme(
  theme: ThemeNameExtended | ThemeConfig,
  options: ApplyThemeOptions = {}
): void {
  const {
    target = typeof document !== 'undefined' ? document.documentElement : null,
    persist = true,
    storageKey = DEFAULT_STORAGE_KEY,
    transition = 0,
  } = options;

  if (!target) {
    return;
  }

  const previousTheme = getTheme(target);
  const themeConfig = typeof theme === 'string' ? { name: theme } : theme;

  // Apply transition if specified
  if (transition > 0) {
    target.style.transition = `all ${transition}ms ease-in-out`;
    setTimeout(() => {
      target.style.transition = '';
    }, transition);
  }

  // Set data-theme attribute
  target.setAttribute('data-theme', themeConfig.name);

  // Apply custom CSS variables if provided
  if (themeConfig.variables) {
    Object.entries(themeConfig.variables).forEach(([variable, value]) => {
      target.style.setProperty(variable, value);
    });
  }

  // Persist preference if enabled
  if (persist) {
    saveThemePreference(themeConfig.name, storageKey);
  }

  // Dispatch theme change event
  if (typeof window !== 'undefined') {
    const event = new CustomEvent<ThemeChangeEvent>('themechange', {
      detail: {
        previous: previousTheme,
        current: themeConfig.name,
        timestamp: Date.now(),
      },
    });
    window.dispatchEvent(event);
  }
}

/**
 * Get the currently applied theme
 *
 * @param target - Target element to check
 * @returns Current theme name or null
 *
 * @example
 * ```typescript
 * const currentTheme = getTheme();
 * console.log(currentTheme); // 'dark'
 * ```
 */
/* v8 ignore next -- @preserve */
export function getTheme(target?: HTMLElement | null): ThemeNameExtended | null {
  const element = target || (typeof document !== 'undefined' ? document.documentElement : null);

  /* v8 ignore next 3 */
  if (!element) {
    return null;
  }

  return element.getAttribute('data-theme');
}

/**
 * Remove the current theme and reset to default
 *
 * @param options - Application options
 *
 * @example
 * ```typescript
 * removeTheme();
 * // or
 * removeTheme({ persist: true });
 * ```
 */
export function removeTheme(options: ApplyThemeOptions = {}): void {
  const {
    target = typeof document !== 'undefined' ? document.documentElement : null,
    persist = true,
    storageKey = DEFAULT_STORAGE_KEY,
  } = options;

  if (!target) {
    return;
  }

  const previousTheme = getTheme(target);

  // Remove data-theme attribute
  target.removeAttribute('data-theme');

  // Remove custom CSS variables
  const styles = target.style;
  Array.from(styles).forEach((property) => {
    if (property.startsWith('--fw-')) {
      target.style.removeProperty(property);
    }
  });

  // Clear persisted preference if enabled
  if (persist) {
    clearThemePreference(storageKey);
  }

  // Dispatch theme change event
  if (typeof window !== 'undefined' && previousTheme) {
    const event = new CustomEvent<ThemeChangeEvent>('themechange', {
      detail: {
        previous: previousTheme,
        current: DEFAULT_THEME,
        timestamp: Date.now(),
      },
    });
    window.dispatchEvent(event);
  }
}

/**
 * Save theme preference to storage
 *
 * @param theme - Theme name to save
 * @param storageKey - Storage key
 * @param adapter - Storage adapter (defaults to localStorage)
 *
 * @example
 * ```typescript
 * saveThemePreference('dark');
 * ```
 */
export function saveThemePreference(
  theme: ThemeNameExtended,
  storageKey: string = DEFAULT_STORAGE_KEY,
  adapter: ThemeStorageAdapter = localStorageAdapter
): void {
  try {
    adapter.set(storageKey, theme);
  } catch {
    // Fail silently - storage might be unavailable or quota exceeded
  }
}

/**
 * Load theme preference from storage
 *
 * @param storageKey - Storage key
 * @param adapter - Storage adapter (defaults to localStorage)
 * @returns Stored theme name or null
 *
 * @example
 * ```typescript
 * const savedTheme = loadThemePreference();
 * if (savedTheme) {
 *   applyTheme(savedTheme);
 * }
 * ```
 */
export function loadThemePreference(
  storageKey: string = DEFAULT_STORAGE_KEY,
  adapter: ThemeStorageAdapter = localStorageAdapter
): ThemeNameExtended | null {
  try {
    return adapter.get(storageKey);
  } catch {
    // Fail silently - storage might be unavailable
    return null;
  }
}

/**
 * Clear theme preference from storage
 *
 * @param storageKey - Storage key
 * @param adapter - Storage adapter (defaults to localStorage)
 *
 * @example
 * ```typescript
 * clearThemePreference();
 * ```
 */
export function clearThemePreference(
  storageKey: string = DEFAULT_STORAGE_KEY,
  adapter: ThemeStorageAdapter = localStorageAdapter
): void {
  try {
    adapter.remove(storageKey);
  } catch {
    // Fail silently - storage might be unavailable
  }
}

/**
 * Get system theme preference (light/dark)
 *
 * @returns System theme preference
 *
 * @example
 * ```typescript
 * const systemTheme = getSystemTheme();
 * console.log(systemTheme); // 'dark'
 * ```
 */
export function getSystemTheme(): SystemTheme {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return 'no-preference';
  }

  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }

  return 'no-preference';
}

/**
 * Watch for system theme changes
 *
 * @param callback - Callback function to invoke on theme change
 * @returns Cleanup function to stop watching
 *
 * @example
 * ```typescript
 * const cleanup = watchSystemTheme((theme) => {
 *   console.log('System theme changed to:', theme);
 *   applyTheme(theme);
 * });
 *
 * // Later, stop watching
 * cleanup();
 * ```
 */
export function watchSystemTheme(callback: ThemeWatcherCallback): ThemeWatcherCleanup {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return () => {};
  }

  const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const lightModeQuery = window.matchMedia('(prefers-color-scheme: light)');

  const handler = (): void => {
    callback(getSystemTheme());
  };

  // Use modern addEventListener
  darkModeQuery.addEventListener('change', handler);
  lightModeQuery.addEventListener('change', handler);

  return () => {
    darkModeQuery.removeEventListener('change', handler);
    lightModeQuery.removeEventListener('change', handler);
  };
}

/**
 * Initialize theme from saved preference or system preference
 *
 * @param options - Initialization options
 * @returns Applied theme name
 *
 * @example
 * ```typescript
 * // In your app initialization
 * initTheme({ followSystem: true });
 * ```
 */
export function initTheme(
  options: {
    followSystem?: boolean;
    defaultTheme?: ThemeNameExtended;
    storageKey?: string;
  } = {}
): ThemeNameExtended {
  const {
    followSystem = true,
    defaultTheme = DEFAULT_THEME,
    storageKey = DEFAULT_STORAGE_KEY,
  } = options;

  // Try to load saved preference
  const savedTheme = loadThemePreference(storageKey);
  if (savedTheme) {
    applyTheme(savedTheme, { persist: false });
    return savedTheme;
  }

  // Follow system preference if enabled
  if (followSystem) {
    const systemTheme = getSystemTheme();
    if (systemTheme !== 'no-preference') {
      applyTheme(systemTheme, { persist: false });
      return systemTheme;
    }
  }

  // Apply default theme
  applyTheme(defaultTheme, { persist: false });
  return defaultTheme;
}

/**
 * Toggle between light and dark themes
 *
 * @param options - Application options
 * @returns New theme name
 *
 * @example
 * ```typescript
 * const newTheme = toggleTheme();
 * console.log(newTheme); // 'dark' or 'light'
 * ```
 */
export function toggleTheme(options: ApplyThemeOptions = {}): ThemeNameExtended {
  const currentTheme = getTheme();
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme, options);
  return newTheme;
}

/**
 * Merge theme variables with base theme
 *
 * @param baseVariables - Base theme variables
 * @param overrideVariables - Override variables
 * @returns Merged variables
 */
export function mergeThemeVariables(
  baseVariables: ThemeVariables = {},
  overrideVariables: ThemeVariables = {}
): ThemeVariables {
  return {
    ...baseVariables,
    ...overrideVariables,
  };
}
