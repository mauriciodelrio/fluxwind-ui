/**
 * Type definitions for Fluxwind theme system
 * @module theme.types
 */

import type { AllCSSVariables } from '@/types/variables.types';

/**
 * Supported theme names
 * Extends the base theme names with custom strings
 */
export type ThemeNameExtended = 'light' | 'dark' | 'sepia' | string;

/**
 * System theme preferences
 */
export type SystemTheme = 'light' | 'dark' | 'no-preference';

/**
 * Custom CSS variables override map
 */
export type ThemeVariables = Partial<Record<AllCSSVariables, string>>;

/**
 * Theme configuration object
 */
export interface ThemeConfig {
  /**
   * Unique theme identifier
   * @example 'dark', 'ocean', 'custom-theme'
   */
  name: ThemeNameExtended;

  /**
   * Human-readable theme label
   * @example 'Dark Mode', 'Ocean Blue'
   */
  label?: string;

  /**
   * CSS variables to override
   * @example { '--fw-color-primary': '#0ea5e9' }
   */
  variables?: ThemeVariables;

  /**
   * Base theme to extend from
   * @default 'light'
   */
  extends?: ThemeNameExtended;
}

/**
 * Theme categories for organization
 */
export type ThemeCategory =
  | 'general' // Light, dark, sepia, high-contrast
  | 'healthcare' // Healthcare, wellness, medical
  | 'finance' // Finance, corporate, fintech
  | 'ecommerce' // E-commerce, luxury, marketplace
  | 'creative' // Creative, blogging, media
  | 'tech' // Developer, SaaS
  | 'custom'; // User-defined

/**
 * Industry tags for theme targeting
 */
export type IndustryTag =
  // Healthcare & Wellness
  | 'healthcare'
  | 'wellness'
  | 'mental-health'
  | 'telemedicine'
  | 'fitness'
  | 'nutrition'
  | 'pharmacy'
  // Finance & Business
  | 'finance'
  | 'banking'
  | 'investment'
  | 'insurance'
  | 'corporate'
  | 'consulting'
  | 'fintech'
  | 'crypto'
  | 'payment'
  // E-Commerce & Retail
  | 'ecommerce'
  | 'retail'
  | 'fashion'
  | 'luxury'
  | 'marketplace'
  | 'local-commerce'
  // Creative & Media
  | 'creative'
  | 'design'
  | 'portfolio'
  | 'blogging'
  | 'magazine'
  | 'news'
  | 'media'
  | 'entertainment'
  | 'video'
  // Tech & Developer
  | 'developer'
  | 'dev-tools'
  | 'api'
  | 'saas'
  | 'dashboard'
  | 'productivity'
  // General
  | 'accessibility'
  | 'reading'
  | 'general';

/**
 * Theme preset for quick theme creation
 */
export interface ThemePreset extends ThemeConfig {
  /**
   * Theme description
   */
  description?: string;

  /**
   * Theme category for organization
   * @default 'custom'
   */
  category?: ThemeCategory;

  /**
   * Industry tags for theme targeting
   * Helps users find themes suitable for their use case
   * @example ['healthcare', 'wellness', 'mental-health']
   */
  industry?: IndustryTag[];

  /**
   * Preview color (for theme selector UI)
   * @example '#0ea5e9'
   */
  previewColor?: string;

  /**
   * Author or creator of the theme
   * @example 'Fluxwind UI Team'
   */
  author?: string;

  /**
   * Version of the theme
   * @example '1.0.0'
   */
  version?: string;
}

/**
 * Theme application options
 */
export interface ApplyThemeOptions {
  /**
   * Target element to apply theme
   * @default document.documentElement
   */
  target?: HTMLElement;

  /**
   * Whether to save preference to localStorage
   * @default true
   */
  persist?: boolean;

  /**
   * Storage key for persistence
   * @default 'fluxwind-theme'
   */
  storageKey?: string;

  /**
   * Transition duration in milliseconds
   * @default 0
   */
  transition?: number;
}

/**
 * Theme change event data
 */
export interface ThemeChangeEvent {
  /**
   * Previous theme name
   */
  previous: ThemeNameExtended | null;

  /**
   * Current theme name
   */
  current: ThemeNameExtended;

  /**
   * Timestamp of change
   */
  timestamp: number;
}

/**
 * Theme watcher callback
 */
export type ThemeWatcherCallback = (theme: SystemTheme) => void;

/**
 * Theme watcher cleanup function
 */
export type ThemeWatcherCleanup = () => void;

/**
 * Storage adapter interface for theme persistence
 */
export interface ThemeStorageAdapter {
  /**
   * Get stored theme preference
   */
  get(key: string): string | null;

  /**
   * Set theme preference
   */
  set(key: string, value: string): void;

  /**
   * Remove theme preference
   */
  remove(key: string): void;
}

/**
 * Default theme preset names
 */
export const DEFAULT_THEMES = ['light', 'dark', 'sepia'] as const;

/**
 * Type for default theme names
 */
export type DefaultThemeName = (typeof DEFAULT_THEMES)[number];

/**
 * Check if theme is a default theme
 */
export function isDefaultTheme(theme: string): theme is DefaultThemeName {
  return DEFAULT_THEMES.includes(theme as DefaultThemeName);
}
