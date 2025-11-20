export * from './tokens';
export * from './presets';
export * from './themes';
// ============================================================================
// CSS Variables Utilities
// ============================================================================
export {
  getCSSVariable,
  setCSSVariable,
  removeCSSVariable,
  getCSSVariables,
  setCSSVariables,
  hasCSSVariable,
  getCSSVariableWithFallback,
  getComponentVariable,
  setComponentVariable,
  removeComponentVariable,
  getComponentVariables,
  setComponentVariables,
  hasComponentVariable,
  getComponentVariableWithFallback,
  getVariable,
  setVariable,
} from './variables.utils';

// ============================================================================
// CSS Variables Types
// ============================================================================
export type {
  CSSVariableCategory,
  FluxwindCSSVariable,
  ComponentCSSVariable,
  AllCSSVariables,
  CSSVariableValue,
  CSSVariableMap,
  ComponentVariableMap,
  GetCSSVariable,
  SetCSSVariable,
  GetComponentVariable,
  SetComponentVariable,
} from './types/variables.types';

// ============================================================================
// Theme Utilities
// ============================================================================
export {
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
} from './theme.utils';

// ============================================================================
// Theme Types
// ============================================================================
export {
  DEFAULT_THEMES,
  isDefaultTheme,
  type ThemeNameExtended,
  type SystemTheme,
  type ThemeVariables,
  type ThemeConfig,
  type ThemeCategory,
  type IndustryTag,
  type ThemePreset,
  type ApplyThemeOptions,
  type ThemeChangeEvent,
  type ThemeWatcherCallback,
  type ThemeWatcherCleanup,
  type ThemeStorageAdapter,
  type DefaultThemeName,
} from './types/theme.types';

// ============================================================================
// Theme Store
// ============================================================================
export {
  createThemeStore,
  globalThemeStore,
  type ThemeStoreConfig,
  type ThemeStore,
} from './theme.store';

// ============================================================================
// Theme Provider and Hooks
// ============================================================================
export { ThemeProvider, useTheme, useThemeSafe } from './ThemeProvider';
export type { ThemeProviderProps } from './ThemeProvider';

// ============================================================================
// External Type Exports
// ============================================================================
export type { Config } from 'tailwindcss';
