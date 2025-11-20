import type { ThemePreset } from '@/types/theme.types.js';

/**
 * E-Commerce Theme
 *
 * Energetic retail theme with vibrant orange and pink. Designed for
 * online stores, shopping platforms, and retail applications.
 * Encourages engagement and conversion.
 *
 * @category E-Commerce
 * @wcag AA
 */
export const ecommerceTheme: ThemePreset = {
  name: 'ecommerce',
  label: 'E-Commerce',
  description:
    'Energetic retail theme with vibrant orange and pink. Perfect for online stores, shopping platforms, and retail applications.',
  category: 'ecommerce',
  industry: ['ecommerce', 'retail', 'fashion'],
  extends: 'light',
  previewColor: '#f97316',
  author: 'Fluxwind UI Team',
  version: '1.0.0',
  variables: {
    // ========================================
    // PRIMARY COLORS - Vibrant orange
    // ========================================
    '--fw-color-primary': '#f97316', // Orange 500
    '--fw-color-primary-hover': '#ea580c', // Orange 600
    '--fw-color-primary-active': '#c2410c', // Orange 700
    '--fw-color-primary-light': '#fb923c', // Orange 400
    '--fw-color-primary-dark': '#9a3412', // Orange 800

    // ========================================
    // SECONDARY COLORS - Exciting pink
    // ========================================
    '--fw-color-secondary': '#ec4899', // Pink 500
    '--fw-color-secondary-hover': '#db2777', // Pink 600
    '--fw-color-secondary-active': '#be185d', // Pink 700

    // ========================================
    // SEMANTIC COLORS - Shopping context
    // ========================================
    '--fw-color-success': '#10b981', // Emerald 500 - Added to cart
    '--fw-color-success-hover': '#059669',
    '--fw-color-warning': '#f59e0b', // Amber 500 - Low stock
    '--fw-color-warning-hover': '#d97706',
    '--fw-color-error': '#ef4444', // Red 500 - Out of stock
    '--fw-color-error-hover': '#dc2626',
    '--fw-color-info': '#3b82f6', // Blue 500 - Information
    '--fw-color-info-hover': '#2563eb',

    // ========================================
    // BACKGROUND - Clean shopping
    // ========================================
    '--fw-color-bg-primary': '#ffffff', // Pure white
    '--fw-color-bg-secondary': '#fef2f2', // Red 50 (warm)
    '--fw-color-bg-tertiary': '#fee2e2', // Red 100

    // ========================================
    // TEXT - Clear product info
    // ========================================
    '--fw-color-text-primary': '#111827', // Gray 900
    '--fw-color-text-secondary': '#6b7280', // Gray 500
    '--fw-color-text-tertiary': '#9ca3af', // Gray 400

    // ========================================
    // BORDERS - Product boundaries
    // ========================================
    '--fw-color-border-primary': '#e5e7eb', // Gray 200
    '--fw-color-border-secondary': '#f3f4f6', // Gray 100
    '--fw-color-border-focus': '#f97316', // Orange 500
    '--fw-color-border-error': '#ef4444', // Red 500

    // ========================================
    // SHADOWS - Product elevation
    // ========================================
    '--fw-shadow-sm': '0 1px 2px 0 rgba(249, 115, 22, 0.05)',
    '--fw-shadow-base': '0 1px 3px 0 rgba(249, 115, 22, 0.1)',
    '--fw-shadow-md': '0 4px 6px -1px rgba(249, 115, 22, 0.15)',
    '--fw-shadow-lg': '0 10px 15px -3px rgba(249, 115, 22, 0.2)',
    '--fw-shadow-xl': '0 20px 25px -5px rgba(249, 115, 22, 0.25)',

    // ========================================
    // COMPONENTS - Shopping interface
    // ========================================

    // Button - Strong CTA
    '--fw-button-bg': '#f97316',
    '--fw-button-color': '#ffffff',
    '--fw-button-bg-hover': '#ea580c',
    '--fw-button-border-radius': '0.5rem',
    '--fw-button-shadow-hover': '0 4px 12px 0 rgba(249, 115, 22, 0.3)',

    // Input - Product search
    '--fw-input-bg': '#ffffff',
    '--fw-input-border': '1px solid #e5e7eb',
    '--fw-input-border-focus': '1px solid #f97316',
    '--fw-input-border-radius': '0.5rem',
  },
};
