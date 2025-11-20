import type { ThemePreset } from '@/types/theme.types.js';

/**
 * Healthcare Theme
 *
 * Professional medical theme with calming blues and soft greens. Designed
 * for healthcare providers, patient portals, and medical applications.
 * Provides a trustworthy and clinical appearance while maintaining warmth.
 *
 * @category Healthcare
 * @wcag AA
 */
export const healthcareTheme: ThemePreset = {
  name: 'healthcare',
  label: 'Healthcare',
  description:
    'Professional medical theme with calming blues and soft greens. Perfect for healthcare providers, patient portals, and medical applications.',
  category: 'healthcare',
  industry: ['healthcare', 'telemedicine', 'pharmacy'],
  extends: 'light',
  previewColor: '#0ea5e9',
  author: 'Fluxwind UI Team',
  version: '1.0.0',
  variables: {
    // ========================================
    // PRIMARY COLORS - Clinical blue
    // ========================================
    '--fw-color-primary': '#0ea5e9', // Sky blue 500
    '--fw-color-primary-hover': '#0284c7', // Sky blue 600
    '--fw-color-primary-active': '#0369a1', // Sky blue 700
    '--fw-color-primary-light': '#7dd3fc', // Sky blue 300
    '--fw-color-primary-dark': '#075985', // Sky blue 800

    // ========================================
    // SECONDARY COLORS - Soft medical green
    // ========================================
    '--fw-color-secondary': '#10b981', // Emerald 500
    '--fw-color-secondary-hover': '#059669', // Emerald 600
    '--fw-color-secondary-active': '#047857', // Emerald 700

    // ========================================
    // SEMANTIC COLORS - Healthcare context
    // ========================================
    '--fw-color-success': '#10b981', // Emerald 500 - Health positive
    '--fw-color-success-hover': '#059669',
    '--fw-color-warning': '#f59e0b', // Amber 500 - Caution
    '--fw-color-warning-hover': '#d97706',
    '--fw-color-error': '#ef4444', // Red 500 - Critical alert
    '--fw-color-error-hover': '#dc2626',
    '--fw-color-info': '#0ea5e9', // Sky 500 - Information
    '--fw-color-info-hover': '#0284c7',

    // ========================================
    // BACKGROUND - Clean clinical feel
    // ========================================
    '--fw-color-bg-primary': '#f8fafc', // Slate 50
    '--fw-color-bg-secondary': '#f1f5f9', // Slate 100
    '--fw-color-bg-tertiary': '#e2e8f0', // Slate 200

    // ========================================
    // TEXT - Professional and readable
    // ========================================
    '--fw-color-text-primary': '#0f172a', // Slate 900
    '--fw-color-text-secondary': '#475569', // Slate 600
    '--fw-color-text-tertiary': '#64748b', // Slate 500

    // ========================================
    // BORDERS - Subtle and clean
    // ========================================
    '--fw-color-border-primary': '#cbd5e1', // Slate 300
    '--fw-color-border-secondary': '#e2e8f0', // Slate 200
    '--fw-color-border-focus': '#0ea5e9', // Sky 500
    '--fw-color-border-error': '#ef4444', // Red 500

    // ========================================
    // SHADOWS - Soft and subtle
    // ========================================
    '--fw-shadow-sm': '0 1px 2px 0 rgba(15, 23, 42, 0.05)',
    '--fw-shadow-base': '0 1px 3px 0 rgba(15, 23, 42, 0.1)',
    '--fw-shadow-md': '0 4px 6px -1px rgba(15, 23, 42, 0.1)',
    '--fw-shadow-lg': '0 10px 15px -3px rgba(15, 23, 42, 0.1)',
    '--fw-shadow-xl': '0 20px 25px -5px rgba(15, 23, 42, 0.1)',

    // ========================================
    // COMPONENTS - Clinical interface
    // ========================================

    // Button - Trust and action
    '--fw-button-bg': '#0ea5e9',
    '--fw-button-color': '#ffffff',
    '--fw-button-bg-hover': '#0284c7',
    '--fw-button-border-radius': '0.5rem', // More rounded

    // Input - Clean and clear
    '--fw-input-bg': '#ffffff',
    '--fw-input-border': '1px solid #cbd5e1',
    '--fw-input-border-focus': '1px solid #0ea5e9',
    '--fw-input-border-radius': '0.5rem',
  },
};
