import type { ThemePreset } from '@/types/theme.types.js';

/**
 * SaaS Theme
 *
 * Modern SaaS theme with blue gradient and purple accents. Designed for
 * software-as-a-service platforms, dashboards, and productivity tools.
 * Balances professionalism with modern design.
 *
 * @category Tech
 * @wcag AA
 */
export const saasTheme: ThemePreset = {
  name: 'saas',
  label: 'SaaS',
  description:
    'Modern SaaS theme with blue gradient and purple accents. Perfect for SaaS platforms, dashboards, and productivity applications.',
  category: 'tech',
  industry: ['saas', 'dashboard', 'productivity'],
  extends: 'light',
  previewColor: '#3b82f6',
  author: 'Fluxwind UI Team',
  version: '1.0.0',
  variables: {
    // ========================================
    // PRIMARY COLORS - Modern blue
    // ========================================
    '--fw-color-primary': '#3b82f6', // Blue 500
    '--fw-color-primary-hover': '#2563eb', // Blue 600
    '--fw-color-primary-active': '#1d4ed8', // Blue 700
    '--fw-color-primary-light': '#60a5fa', // Blue 400
    '--fw-color-primary-dark': '#1e40af', // Blue 800

    // ========================================
    // SECONDARY COLORS - SaaS purple
    // ========================================
    '--fw-color-secondary': '#8b5cf6', // Violet 500
    '--fw-color-secondary-hover': '#7c3aed', // Violet 600
    '--fw-color-secondary-active': '#6d28d9', // Violet 700

    // ========================================
    // SEMANTIC COLORS - SaaS context
    // ========================================
    '--fw-color-success': '#10b981', // Emerald 500 - Success
    '--fw-color-success-hover': '#059669',
    '--fw-color-warning': '#f59e0b', // Amber 500 - Warning
    '--fw-color-warning-hover': '#d97706',
    '--fw-color-error': '#ef4444', // Red 500 - Error
    '--fw-color-error-hover': '#dc2626',
    '--fw-color-info': '#3b82f6', // Blue 500 - Info
    '--fw-color-info-hover': '#2563eb',

    // ========================================
    // BACKGROUND - Modern SaaS
    // ========================================
    '--fw-color-bg-primary': '#ffffff', // Pure white
    '--fw-color-bg-secondary': '#f9fafb', // Gray 50
    '--fw-color-bg-tertiary': '#f3f4f6', // Gray 100

    // ========================================
    // TEXT - Professional SaaS
    // ========================================
    '--fw-color-text-primary': '#111827', // Gray 900
    '--fw-color-text-secondary': '#6b7280', // Gray 500
    '--fw-color-text-tertiary': '#9ca3af', // Gray 400

    // ========================================
    // BORDERS - Clean SaaS lines
    // ========================================
    '--fw-color-border-primary': '#e5e7eb', // Gray 200
    '--fw-color-border-secondary': '#f3f4f6', // Gray 100
    '--fw-color-border-focus': '#3b82f6', // Blue 500
    '--fw-color-border-error': '#ef4444', // Red 500

    // ========================================
    // BORDER RADIUS - Modern SaaS curves
    // ========================================
    '--fw-radius-base': '0.5rem',
    '--fw-radius-md': '0.75rem',
    '--fw-radius-lg': '1rem',
    '--fw-radius-xl': '1.5rem',

    // ========================================
    // SHADOWS - Modern SaaS depth
    // ========================================
    '--fw-shadow-sm': '0 1px 2px 0 rgba(59, 130, 246, 0.05)',
    '--fw-shadow-base': '0 1px 3px 0 rgba(59, 130, 246, 0.1)',
    '--fw-shadow-md': '0 4px 6px -1px rgba(59, 130, 246, 0.1)',
    '--fw-shadow-lg': '0 10px 15px -3px rgba(59, 130, 246, 0.15)',
    '--fw-shadow-xl': '0 20px 25px -5px rgba(59, 130, 246, 0.2)',
    '--fw-shadow-focus': '0 0 0 3px rgba(59, 130, 246, 0.25)',

    // ========================================
    // COMPONENTS - SaaS interface
    // ========================================

    // Button - Modern SaaS action
    '--fw-button-bg': '#3b82f6',
    '--fw-button-color': '#ffffff',
    '--fw-button-bg-hover': '#2563eb',
    '--fw-button-border-radius': '0.5rem',
    '--fw-button-shadow-hover': '0 4px 12px 0 rgba(59, 130, 246, 0.3)',

    // Input - Clean SaaS forms
    '--fw-input-bg': '#ffffff',
    '--fw-input-border': '1px solid #e5e7eb',
    '--fw-input-color': '#111827',
    '--fw-input-border-focus': '1px solid #3b82f6',
    '--fw-input-border-radius': '0.5rem',
  },
};
