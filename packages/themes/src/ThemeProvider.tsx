/**
 * ThemeProvider - React Provider component for theme management
 * @module ThemeProvider
 */

import { createContext, useContext, useEffect, useRef, type ReactNode } from 'react';
import { createThemeStore, type ThemeStore, type ThemeStoreConfig } from './theme.store';

/**
 * Theme context value
 */
export type ThemeContextValue = ThemeStore | null;

/**
 * Theme context
 */
const ThemeContext = createContext<ThemeContextValue>(null);

/**
 * ThemeProvider props
 */
export interface ThemeProviderProps extends ThemeStoreConfig {
  /**
   * Children components
   */
  children: ReactNode;

  /**
   * Optional custom theme store instance
   * If provided, will use this instead of creating a new one
   */
  store?: ThemeStore;
}

/**
 * ThemeProvider component - Provides theme management context to the component tree
 *
 * @param props - Provider props
 * @returns Provider component
 *
 * @example
 * ```tsx
 * import { ThemeProvider } from '@fluxwind/themes';
 *
 * function App() {
 *   return (
 *     <ThemeProvider
 *       initialTheme="dark"
 *       followSystem={true}
 *       persist={true}
 *     >
 *       <YourApp />
 *     </ThemeProvider>
 *   );
 * }
 * ```
 */
export function ThemeProvider({
  children,
  store: customStore,
  initialTheme,
  followSystem,
  persist,
  storageKey,
  transition,
}: ThemeProviderProps): JSX.Element {
  // Create or use provided store
  const storeRef = useRef<ThemeStore | null>(null);

  if (!storeRef.current) {
    if (customStore) {
      storeRef.current = customStore;
    } else {
      const config: ThemeStoreConfig = {};
      if (initialTheme !== undefined) config.initialTheme = initialTheme;
      if (followSystem !== undefined) config.followSystem = followSystem;
      if (persist !== undefined) config.persist = persist;
      if (storageKey !== undefined) config.storageKey = storageKey;
      if (transition !== undefined) config.transition = transition;

      storeRef.current = createThemeStore(config);
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (storeRef.current && !customStore) {
        storeRef.current.cleanup();
      }
    };
  }, [customStore]);

  return <ThemeContext.Provider value={storeRef.current}>{children}</ThemeContext.Provider>;
}

/**
 * Hook to access theme store from context
 *
 * @returns Theme store instance
 * @throws Error if used outside of ThemeProvider
 *
 * @example
 * ```tsx
 * import { useTheme } from '@fluxwind/themes';
 *
 * function MyComponent() {
 *   const theme = useTheme();
 *
 *   return (
 *     <div>
 *       <p>Current theme: {theme.currentTheme.value}</p>
 *       <p>Effective theme: {theme.effectiveTheme.value}</p>
 *       <button onClick={() => theme.toggleTheme()}>
 *         Toggle Theme
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useTheme(): ThemeStore {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}

/**
 * Hook to access theme store with safe fallback
 * Returns null if used outside of ThemeProvider (doesn't throw)
 *
 * @returns Theme store instance or null
 *
 * @example
 * ```tsx
 * import { useThemeSafe } from '@fluxwind/themes';
 *
 * function MyComponent() {
 *   const theme = useThemeSafe();
 *
 *   if (!theme) {
 *     // Not within ThemeProvider, use default behavior
 *     return <div>Default theme</div>;
 *   }
 *
 *   return <div>Current theme: {theme.currentTheme.value}</div>;
 * }
 * ```
 */
export function useThemeSafe(): ThemeStore | null {
  return useContext(ThemeContext);
}
