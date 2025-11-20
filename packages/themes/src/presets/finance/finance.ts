import type { ThemePreset } from '@/types/theme.types.js';

/**
 * Finance Theme
 *
 * Traditional financial theme with deep navy and gold accents. Designed for
 * banking applications, investment platforms, and financial services.
 * Conveys trust, stability, and premium quality.
 *
 * @category Finance
 * @wcag AA
 */
export const financeTheme: ThemePreset = {
  name: 'finance',
  label: 'Finance',
  description:
    'Traditional financial theme with deep navy and gold accents. Perfect for banking apps, investment platforms, and financial services.',
  category: 'finance',
  industry: ['finance', 'banking', 'investment', 'insurance'],
  extends: 'light',
  previewColor: '#1e40af',
  author: 'Fluxwind UI Team',
  version: '1.0.0',
  variables: {
    // ========================================
    // PRIMARY COLORS - Deep navy blue
    // ========================================
    '--fw-color-primary': '#1e40af', // Blue 800
    '--fw-color-primary-hover': '#1e3a8a', // Blue 900
    '--fw-color-primary-active': '#172554', // Blue 950
    '--fw-color-primary-light': '#3b82f6', // Blue 500
    '--fw-color-primary-dark': '#172554', // Blue 950

    // ========================================
    // SECONDARY COLORS - Premium gold
    // ========================================
    '--fw-color-secondary': '#f59e0b', // Amber 500
    '--fw-color-secondary-hover': '#d97706', // Amber 600
    '--fw-color-secondary-active': '#b45309', // Amber 700

    // ========================================
    // SEMANTIC COLORS - Financial context
    // ========================================
    '--fw-color-success': '#059669', // Emerald 600 - Profit
    '--fw-color-success-hover': '#047857',
    '--fw-color-warning': '#f59e0b', // Amber 500 - Caution
    '--fw-color-warning-hover': '#d97706',
    '--fw-color-error': '#dc2626', // Red 600 - Loss/Alert
    '--fw-color-error-hover': '#b91c1c',
    '--fw-color-info': '#1e40af', // Blue 800 - Information
    '--fw-color-info-hover': '#1e3a8a',

    // ========================================
    // BACKGROUND - Professional
    // ========================================
    '--fw-color-bg-primary': '#f9fafb', // Gray 50
    '--fw-color-bg-secondary': '#f3f4f6', // Gray 100
    '--fw-color-bg-tertiary': '#e5e7eb', // Gray 200

    // ========================================
    // TEXT - Authoritative
    // ========================================
    '--fw-color-text-primary': '#111827', // Gray 900
    '--fw-color-text-secondary': '#4b5563', // Gray 600
    '--fw-color-text-tertiary': '#6b7280', // Gray 500

    // ========================================
    // BORDERS - Strong definition
    // ========================================
    '--fw-color-border-primary': '#d1d5db', // Gray 300
    '--fw-color-border-secondary': '#e5e7eb', // Gray 200
    '--fw-color-border-focus': '#1e40af', // Blue 800
    '--fw-color-border-error': '#dc2626', // Red 600

    // ========================================
    // SHADOWS - Professional depth
    // ========================================
    '--fw-shadow-sm': '0 1px 2px 0 rgba(17, 24, 39, 0.08)',
    '--fw-shadow-base': '0 1px 3px 0 rgba(17, 24, 39, 0.14)',
    '--fw-shadow-md': '0 4px 6px -1px rgba(17, 24, 39, 0.14)',
    '--fw-shadow-lg': '0 10px 15px -3px rgba(17, 24, 39, 0.14)',
    '--fw-shadow-xl': '0 20px 25px -5px rgba(17, 24, 39, 0.14)',

    // ========================================
    // COMPONENTS - Financial interface
    // ========================================

    // Button - Trust and authority
    '--fw-button-bg': '#1e40af',
    '--fw-button-color': '#ffffff',
    '--fw-button-bg-hover': '#1e3a8a',

    // Input - Professional precision
    '--fw-input-bg': '#ffffff',
    '--fw-input-border': '1px solid #d1d5db',
    '--fw-input-border-focus': '1px solid #1e40af',
  },
};
