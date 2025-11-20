import type { ThemePreset } from '@/types/theme.types.js';

/**
 * Marketplace Theme
 *
 * Friendly marketplace theme with teal and coral. Designed for
 * multi-vendor platforms, local commerce, and community marketplaces.
 * Encourages connection and discovery.
 *
 * @category E-Commerce
 * @wcag AA
 */
export const marketplaceTheme: ThemePreset = {
  name: 'marketplace',
  label: 'Marketplace',
  description:
    'Friendly marketplace theme with teal and coral. Perfect for multi-vendor platforms, local commerce, and community marketplaces.',
  category: 'ecommerce',
  industry: ['marketplace', 'local-commerce', 'ecommerce'],
  extends: 'light',
  previewColor: '#14b8a6',
  author: 'Fluxwind UI Team',
  version: '1.0.0',
  variables: {
    // ========================================
    // PRIMARY COLORS - Fresh teal
    // ========================================
    '--fw-color-primary': '#14b8a6', // Teal 500
    '--fw-color-primary-hover': '#0d9488', // Teal 600
    '--fw-color-primary-active': '#0f766e', // Teal 700
    '--fw-color-primary-light': '#2dd4bf', // Teal 400
    '--fw-color-primary-dark': '#115e59', // Teal 800

    // ========================================
    // SECONDARY COLORS - Warm coral
    // ========================================
    '--fw-color-secondary': '#fb7185', // Rose 400
    '--fw-color-secondary-hover': '#f43f5e', // Rose 500
    '--fw-color-secondary-active': '#e11d48', // Rose 600

    // ========================================
    // SEMANTIC COLORS - Marketplace context
    // ========================================
    '--fw-color-success': '#10b981', // Emerald 500 - Sale completed
    '--fw-color-success-hover': '#059669',
    '--fw-color-warning': '#f59e0b', // Amber 500 - Pending
    '--fw-color-warning-hover': '#d97706',
    '--fw-color-error': '#ef4444', // Red 500 - Unavailable
    '--fw-color-error-hover': '#dc2626',
    '--fw-color-info': '#14b8a6', // Teal 500 - New listing
    '--fw-color-info-hover': '#0d9488',

    // ========================================
    // BACKGROUND - Friendly and inviting
    // ========================================
    '--fw-color-bg-primary': '#ffffff',
    '--fw-color-bg-secondary': '#f0fdfa', // Teal 50
    '--fw-color-bg-tertiary': '#ccfbf1', // Teal 100

    // ========================================
    // TEXT - Approachable
    // ========================================
    '--fw-color-text-primary': '#115e59', // Teal 800
    '--fw-color-text-secondary': '#0f766e', // Teal 700
    '--fw-color-text-tertiary': '#5eead4', // Teal 300

    // ========================================
    // BORDERS - Friendly separation
    // ========================================
    '--fw-color-border-primary': '#99f6e4', // Teal 200
    '--fw-color-border-secondary': '#ccfbf1', // Teal 100
    '--fw-color-border-focus': '#14b8a6', // Teal 500
    '--fw-color-border-error': '#ef4444', // Red 500

    // ========================================
    // BORDER RADIUS - Friendly curves
    // ========================================
    '--fw-radius-base': '0.75rem',
    '--fw-radius-md': '1rem',
    '--fw-radius-lg': '1.5rem',

    // ========================================
    // SHADOWS - Soft elevation
    // ========================================
    '--fw-shadow-sm': '0 1px 2px 0 rgba(20, 184, 166, 0.05)',
    '--fw-shadow-base': '0 1px 3px 0 rgba(20, 184, 166, 0.1)',
    '--fw-shadow-md': '0 4px 6px -1px rgba(20, 184, 166, 0.15)',
    '--fw-shadow-lg': '0 10px 15px -3px rgba(20, 184, 166, 0.2)',

    // ========================================
    // COMPONENTS - Marketplace interface
    // ========================================

    // Button - Friendly action
    '--fw-button-bg': '#14b8a6',
    '--fw-button-color': '#ffffff',
    '--fw-button-bg-hover': '#0d9488',
    '--fw-button-border-radius': '0.75rem',

    // Input - Community search
    '--fw-input-bg': '#ffffff',
    '--fw-input-border': '1px solid #99f6e4',
    '--fw-input-border-focus': '1px solid #14b8a6',
    '--fw-input-border-radius': '0.75rem',
  },
};
