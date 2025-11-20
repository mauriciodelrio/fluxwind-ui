import type { ThemePreset } from '@/types/theme.types.js';

/**
 * Medical Theme
 *
 * Clinical white theme with red emergency accents. Designed for hospital
 * systems, emergency care interfaces, and critical medical applications.
 * Prioritizes clarity and immediate recognition.
 *
 * @category Healthcare
 * @wcag AAA
 */
export const medicalTheme: ThemePreset = {
  name: 'medical',
  label: 'Medical',
  description:
    'Clinical white theme with red emergency accents. Perfect for hospital systems, emergency care interfaces, and critical medical applications.',
  category: 'healthcare',
  industry: ['healthcare', 'telemedicine'],
  extends: 'light',
  previewColor: '#6366f1',
  author: 'Fluxwind UI Team',
  version: '1.0.0',
  variables: {
    // ========================================
    // PRIMARY COLORS - Clinical indigo
    // ========================================
    '--fw-color-primary': '#6366f1', // Indigo 500
    '--fw-color-primary-hover': '#4f46e5', // Indigo 600
    '--fw-color-primary-active': '#4338ca', // Indigo 700
    '--fw-color-primary-light': '#a5b4fc', // Indigo 300
    '--fw-color-primary-dark': '#3730a3', // Indigo 800

    // ========================================
    // SECONDARY COLORS - Emergency red
    // ========================================
    '--fw-color-secondary': '#ef4444', // Red 500
    '--fw-color-secondary-hover': '#dc2626', // Red 600
    '--fw-color-secondary-active': '#b91c1c', // Red 700

    // ========================================
    // SEMANTIC COLORS - Medical context
    // ========================================
    '--fw-color-success': '#10b981', // Emerald 500 - Stable
    '--fw-color-success-hover': '#059669',
    '--fw-color-warning': '#f97316', // Orange 500 - Warning
    '--fw-color-warning-hover': '#ea580c',
    '--fw-color-error': '#dc2626', // Red 600 - Critical
    '--fw-color-error-hover': '#b91c1c',
    '--fw-color-info': '#6366f1', // Indigo 500 - Info
    '--fw-color-info-hover': '#4f46e5',

    // ========================================
    // BACKGROUND - Pure clinical white
    // ========================================
    '--fw-color-bg-primary': '#ffffff', // Pure white
    '--fw-color-bg-secondary': '#f9fafb', // Gray 50
    '--fw-color-bg-tertiary': '#f3f4f6', // Gray 100

    // ========================================
    // TEXT - High contrast for clarity
    // ========================================
    '--fw-color-text-primary': '#111827', // Gray 900
    '--fw-color-text-secondary': '#4b5563', // Gray 600
    '--fw-color-text-tertiary': '#6b7280', // Gray 500

    // ========================================
    // BORDERS - Clean clinical lines
    // ========================================
    '--fw-color-border-primary': '#d1d5db', // Gray 300
    '--fw-color-border-secondary': '#e5e7eb', // Gray 200
    '--fw-color-border-focus': '#6366f1', // Indigo 500
    '--fw-color-border-error': '#dc2626', // Red 600

    // ========================================
    // BORDER RADIUS - Clinical precision
    // ========================================
    '--fw-radius-base': '0.375rem', // Less rounded
    '--fw-radius-md': '0.5rem',
    '--fw-radius-lg': '0.75rem',

    // ========================================
    // SHADOWS - Strong definition
    // ========================================
    '--fw-shadow-sm': '0 1px 2px 0 rgba(17, 24, 39, 0.06)',
    '--fw-shadow-base': '0 1px 3px 0 rgba(17, 24, 39, 0.12)',
    '--fw-shadow-md': '0 4px 6px -1px rgba(17, 24, 39, 0.12)',
    '--fw-shadow-lg': '0 10px 15px -3px rgba(17, 24, 39, 0.12)',
    '--fw-shadow-xl': '0 20px 25px -5px rgba(17, 24, 39, 0.12)',

    // ========================================
    // COMPONENTS - Clinical interface
    // ========================================

    // Button - Clear action
    '--fw-button-bg': '#6366f1',
    '--fw-button-color': '#ffffff',
    '--fw-button-bg-hover': '#4f46e5',
    '--fw-button-border-width': '2px',

    // Input - Precise boundaries
    '--fw-input-bg': '#ffffff',
    '--fw-input-border': '2px solid #d1d5db',
    '--fw-input-border-width': '2px',
    '--fw-input-border-focus': '2px solid #6366f1',
  },
};
