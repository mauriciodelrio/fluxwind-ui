import type { ThemePreset } from '@/types/theme.types.js';

/**
 * Media Theme
 *
 * Bold media theme with red and charcoal. Designed for media platforms,
 * entertainment sites, and video applications. Commands attention
 * and encourages content consumption.
 *
 * @category Creative
 * @wcag AA
 */
export const mediaTheme: ThemePreset = {
  name: 'media',
  label: 'Media',
  description:
    'Bold media theme with red and charcoal. Perfect for media platforms, entertainment sites, and video streaming applications.',
  category: 'creative',
  industry: ['media', 'entertainment', 'video', 'news'],
  extends: 'dark',
  previewColor: '#dc2626',
  author: 'Fluxwind UI Team',
  version: '1.0.0',
  variables: {
    // ========================================
    // PRIMARY COLORS - Bold red
    // ========================================
    '--fw-color-primary': '#dc2626', // Red 600
    '--fw-color-primary-hover': '#b91c1c', // Red 700
    '--fw-color-primary-active': '#991b1b', // Red 800
    '--fw-color-primary-light': '#ef4444', // Red 500
    '--fw-color-primary-dark': '#7f1d1d', // Red 900

    // ========================================
    // SECONDARY COLORS - Media charcoal
    // ========================================
    '--fw-color-secondary': '#1f2937', // Gray 800
    '--fw-color-secondary-hover': '#111827', // Gray 900
    '--fw-color-secondary-active': '#030712', // Gray 950

    // ========================================
    // SEMANTIC COLORS - Media context
    // ========================================
    '--fw-color-success': '#10b981', // Emerald 500 - Live
    '--fw-color-success-hover': '#059669',
    '--fw-color-warning': '#f59e0b', // Amber 500 - Buffering
    '--fw-color-warning-hover': '#d97706',
    '--fw-color-error': '#dc2626', // Red 600 - Error
    '--fw-color-error-hover': '#b91c1c',
    '--fw-color-info': '#3b82f6', // Blue 500 - Info
    '--fw-color-info-hover': '#2563eb',

    // ========================================
    // BACKGROUND - Deep media blacks
    // ========================================
    '--fw-color-bg-primary': '#030712', // Gray 950
    '--fw-color-bg-secondary': '#111827', // Gray 900
    '--fw-color-bg-tertiary': '#1f2937', // Gray 800
    '--fw-color-bg-inverse': '#ffffff',

    // ========================================
    // TEXT - Strong contrast for media
    // ========================================
    '--fw-color-text-primary': '#f9fafb', // Gray 50
    '--fw-color-text-secondary': '#d1d5db', // Gray 300
    '--fw-color-text-tertiary': '#9ca3af', // Gray 400
    '--fw-color-text-inverse': '#030712',

    // ========================================
    // BORDERS - Media separators
    // ========================================
    '--fw-color-border-primary': '#374151', // Gray 700
    '--fw-color-border-secondary': '#1f2937', // Gray 800
    '--fw-color-border-focus': '#dc2626', // Red 600
    '--fw-color-border-error': '#dc2626', // Red 600

    // ========================================
    // BORDER RADIUS - Media content
    // ========================================
    '--fw-radius-base': '0.5rem',
    '--fw-radius-md': '0.75rem',
    '--fw-radius-lg': '1rem',

    // ========================================
    // SHADOWS - Media depth
    // ========================================
    '--fw-shadow-sm': '0 1px 2px 0 rgba(220, 38, 38, 0.1)',
    '--fw-shadow-base': '0 1px 3px 0 rgba(220, 38, 38, 0.15)',
    '--fw-shadow-md': '0 4px 6px -1px rgba(220, 38, 38, 0.2)',
    '--fw-shadow-lg': '0 10px 15px -3px rgba(220, 38, 38, 0.25)',
    '--fw-shadow-xl': '0 20px 25px -5px rgba(220, 38, 38, 0.3)',
    '--fw-shadow-focus': '0 0 0 3px rgba(220, 38, 38, 0.4)',

    // ========================================
    // COMPONENTS - Media interface
    // ========================================

    // Button - Bold media action
    '--fw-button-bg': '#dc2626',
    '--fw-button-color': '#ffffff',
    '--fw-button-bg-hover': '#b91c1c',
    '--fw-button-shadow-hover': '0 4px 12px 0 rgba(220, 38, 38, 0.4)',

    // Input - Media search
    '--fw-input-bg': '#111827',
    '--fw-input-border': '1px solid #374151',
    '--fw-input-color': '#f9fafb',
    '--fw-input-border-focus': '1px solid #dc2626',
  },
};
