/**
 * Fluxwind UI - Themes Package
 *
 * Design tokens and Tailwind configurations
 */

/**
 * Fluxwind UI Themes Package
 * Complete design system with tokens, themes, and Tailwind configuration
 */

// Export Tailwind configuration
export { fluxwindConfig } from './tailwind.config';

// Export all design tokens
export * from './tokens';

// Export all themes
export * from './themes';

// Export CSS variables utilities and types
export * from './variables.utils';
export * from './types/variables.types';

// Export theme utilities and types
export * from './theme.utils';
export * from './types/theme.types';

export type { Config } from 'tailwindcss';
