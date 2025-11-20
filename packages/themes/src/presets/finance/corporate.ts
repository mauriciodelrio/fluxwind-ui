import type { ThemePreset } from '@/types/theme.types.js';

/**
 * Corporate Theme
 *
 * Modern corporate theme with charcoal and electric blue. Designed for
 * business applications, enterprise software, and corporate portals.
 * Balances professionalism with contemporary aesthetics.
 *
 * @category Finance
 * @wcag AA
 */
export const corporateTheme: ThemePreset = {
  name: 'corporate',
  label: 'Corporate',
  description:
    'Modern corporate theme with charcoal and electric blue. Ideal for business applications, enterprise software, and corporate portals.',
  category: 'finance',
  industry: ['corporate', 'consulting', 'finance'],
  extends: 'light',
  previewColor: '#0284c7',
  author: 'Fluxwind UI Team',
  version: '1.0.0',
  variables: {
    // ========================================
    // PRIMARY COLORS - Electric blue
    // ========================================
    '--fw-color-primary': '#0284c7', // Sky 600
    '--fw-color-primary-hover': '#0369a1', // Sky 700
    '--fw-color-primary-active': '#075985', // Sky 800
    '--fw-color-primary-light': '#38bdf8', // Sky 400
    '--fw-color-primary-dark': '#075985', // Sky 800

    // ========================================
    // SECONDARY COLORS - Charcoal
    // ========================================
    '--fw-color-secondary': '#64748b', // Slate 500
    '--fw-color-secondary-hover': '#475569', // Slate 600
    '--fw-color-secondary-active': '#334155', // Slate 700

    // ========================================
    // SEMANTIC COLORS - Business context
    // ========================================
    '--fw-color-success': '#10b981', // Emerald 500
    '--fw-color-success-hover': '#059669',
    '--fw-color-warning': '#f59e0b', // Amber 500
    '--fw-color-warning-hover': '#d97706',
    '--fw-color-error': '#ef4444', // Red 500
    '--fw-color-error-hover': '#dc2626',
    '--fw-color-info': '#0284c7', // Sky 600
    '--fw-color-info-hover': '#0369a1',

    // ========================================
    // BACKGROUND - Modern corporate
    // ========================================
    '--fw-color-bg-primary': '#ffffff', // White
    '--fw-color-bg-secondary': '#f8fafc', // Slate 50
    '--fw-color-bg-tertiary': '#f1f5f9', // Slate 100

    // ========================================
    // TEXT - Professional clarity
    // ========================================
    '--fw-color-text-primary': '#0f172a', // Slate 900
    '--fw-color-text-secondary': '#475569', // Slate 600
    '--fw-color-text-tertiary': '#64748b', // Slate 500

    // ========================================
    // BORDERS - Clean modern lines
    // ========================================
    '--fw-color-border-primary': '#cbd5e1', // Slate 300
    '--fw-color-border-secondary': '#e2e8f0', // Slate 200
    '--fw-color-border-focus': '#0284c7', // Sky 600
    '--fw-color-border-error': '#ef4444', // Red 500

    // ========================================
    // SHADOWS - Modern depth
    // ========================================
    '--fw-shadow-sm': '0 1px 2px 0 rgba(15, 23, 42, 0.06)',
    '--fw-shadow-base': '0 1px 3px 0 rgba(15, 23, 42, 0.10)',
    '--fw-shadow-md': '0 4px 6px -1px rgba(15, 23, 42, 0.10)',
    '--fw-shadow-lg': '0 10px 15px -3px rgba(15, 23, 42, 0.10)',

    // ========================================
    // COMPONENTS - Corporate interface
    // ========================================

    // Button - Modern and professional
    '--fw-button-bg': '#0284c7',
    '--fw-button-color': '#ffffff',
    '--fw-button-bg-hover': '#0369a1',

    // Input - Clean business forms
    '--fw-input-bg': '#ffffff',
    '--fw-input-border': '1px solid #cbd5e1',
    '--fw-input-border-focus': '1px solid #0284c7',
  },
};
