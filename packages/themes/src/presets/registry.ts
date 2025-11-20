/**
 * Theme Preset Registry
 *
 * Centralized registry of all available theme presets for easy iteration,
 * filtering, and dynamic theme selection.
 */

import type { ThemePreset } from '../types/theme.types';

// Import all presets
import {
  highContrastTheme,
  lightReferenceTheme,
  darkReferenceTheme,
  sepiaReferenceTheme,
} from './general';
import { healthcareTheme, wellnessTheme, medicalTheme } from './healthcare';
import { financeTheme, corporateTheme, fintechTheme } from './finance';
import { ecommerceTheme, luxuryTheme, marketplaceTheme } from './ecommerce';
import { creativeTheme, bloggingTheme, mediaTheme } from './creative';
import { developerTheme, saasTheme } from './tech';

/**
 * Array of all 15 theme presets
 *
 * @example
 * ```ts
 * import { allThemePresets } from '@fluxwind/themes/presets';
 *
 * // Find a theme by name
 * const theme = allThemePresets.find(t => t.name === 'healthcare');
 *
 * // Filter by category
 * const financeThemes = allThemePresets.filter(t => t.category === 'finance');
 *
 * // Filter by industry
 * const healthThemes = allThemePresets.filter(t =>
 *   t.industry?.includes('healthcare')
 * );
 * ```
 */
export const allThemePresets: ThemePreset[] = [
  // General Purpose (4)
  highContrastTheme,
  lightReferenceTheme,
  darkReferenceTheme,
  sepiaReferenceTheme,

  // Healthcare (3)
  healthcareTheme,
  wellnessTheme,
  medicalTheme,

  // Finance (3)
  financeTheme,
  corporateTheme,
  fintechTheme,

  // E-Commerce (3)
  ecommerceTheme,
  luxuryTheme,
  marketplaceTheme,

  // Creative (3)
  creativeTheme,
  bloggingTheme,
  mediaTheme,

  // Tech (2)
  developerTheme,
  saasTheme,
];

/**
 * Theme preset count by category
 */
export const themeCountByCategory = {
  general: 4,
  healthcare: 3,
  finance: 3,
  ecommerce: 3,
  creative: 3,
  tech: 2,
} as const;

/**
 * Total number of theme presets
 */
export const totalThemeCount = 15;
