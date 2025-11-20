import type { ThemePreset } from '@/types/theme.types.js';

/**
 * Developer Theme
 *
 * Code-focused theme inspired by VS Code with purple and cyan. Designed for
 * developer tools, code editors, and technical documentation.
 * Optimized for long coding sessions.
 *
 * @category Tech
 * @wcag AA
 */
export const developerTheme: ThemePreset = {
  name: 'developer',
  label: 'Developer',
  description:
    'Code-focused theme inspired by VS Code with purple and cyan. Perfect for developer tools, IDEs, and technical documentation.',
  category: 'tech',
  industry: ['developer', 'dev-tools', 'api', 'productivity'],
  extends: 'dark',
  previewColor: '#7c3aed',
  author: 'Fluxwind UI Team',
  version: '1.0.0',
  variables: {
    // ========================================
    // PRIMARY COLORS - Code purple
    // ========================================
    '--fw-color-primary': '#7c3aed', // Violet 600
    '--fw-color-primary-hover': '#6d28d9', // Violet 700
    '--fw-color-primary-active': '#5b21b6', // Violet 800
    '--fw-color-primary-light': '#8b5cf6', // Violet 500
    '--fw-color-primary-dark': '#4c1d95', // Violet 900

    // ========================================
    // SECONDARY COLORS - Code cyan
    // ========================================
    '--fw-color-secondary': '#22d3ee', // Cyan 400
    '--fw-color-secondary-hover': '#06b6d4', // Cyan 500
    '--fw-color-secondary-active': '#0891b2', // Cyan 600

    // ========================================
    // SEMANTIC COLORS - Developer context
    // ========================================
    '--fw-color-success': '#22c55e', // Green 500 - Build success
    '--fw-color-success-hover': '#16a34a',
    '--fw-color-warning': '#fbbf24', // Amber 400 - Deprecation
    '--fw-color-warning-hover': '#f59e0b',
    '--fw-color-error': '#f87171', // Red 400 - Syntax error
    '--fw-color-error-hover': '#ef4444',
    '--fw-color-info': '#22d3ee', // Cyan 400 - Info
    '--fw-color-info-hover': '#06b6d4',

    // ========================================
    // BACKGROUND - Code editor dark
    // ========================================
    '--fw-color-bg-primary': '#1e1e1e', // VS Code dark background
    '--fw-color-bg-secondary': '#252526', // VS Code sidebar
    '--fw-color-bg-tertiary': '#2d2d30', // VS Code panel
    '--fw-color-bg-inverse': '#ffffff',

    // ========================================
    // TEXT - Code readability
    // ========================================
    '--fw-color-text-primary': '#d4d4d4', // VS Code text
    '--fw-color-text-secondary': '#9ca3af', // Gray 400
    '--fw-color-text-tertiary': '#6b7280', // Gray 500
    '--fw-color-text-inverse': '#1e1e1e',

    // ========================================
    // BORDERS - Code editor style
    // ========================================
    '--fw-color-border-primary': '#3e3e42', // VS Code border
    '--fw-color-border-secondary': '#2d2d30',
    '--fw-color-border-focus': '#7c3aed', // Violet 600
    '--fw-color-border-error': '#f87171', // Red 400

    // ========================================
    // BORDER RADIUS - Minimal code style
    // ========================================
    '--fw-radius-base': '0.25rem',
    '--fw-radius-md': '0.375rem',
    '--fw-radius-lg': '0.5rem',

    // ========================================
    // SHADOWS - Subtle code panels
    // ========================================
    '--fw-shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    '--fw-shadow-base': '0 1px 3px 0 rgba(0, 0, 0, 0.4)',
    '--fw-shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.4)',
    '--fw-shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.4)',

    // ========================================
    // TYPOGRAPHY - Code-friendly
    // ========================================
    '--fw-font-mono': "'Fira Code', 'Cascadia Code', 'JetBrains Mono', monospace",

    // ========================================
    // COMPONENTS - Developer interface
    // ========================================

    // Button - Code action
    '--fw-button-bg': '#7c3aed',
    '--fw-button-color': '#ffffff',
    '--fw-button-bg-hover': '#6d28d9',
    '--fw-button-border-radius': '0.25rem',

    // Input - Code input
    '--fw-input-bg': '#252526',
    '--fw-input-border': '1px solid #3e3e42',
    '--fw-input-color': '#d4d4d4',
    '--fw-input-border-focus': '1px solid #7c3aed',
    '--fw-input-border-radius': '0.25rem',
  },
};
