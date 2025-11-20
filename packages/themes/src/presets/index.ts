/**
 * Industry Theme Presets
 *
 * This module provides a comprehensive collection of 15 industry-specific
 * theme presets organized into 6 categories. Each theme is carefully designed
 * for specific use cases and target audiences.
 *
 * ## Categories
 *
 * - **General Purpose** (4 themes): High contrast, light, dark, and sepia themes
 *   suitable for most applications
 *
 * - **Healthcare** (3 themes): Calming, trustworthy themes for medical and
 *   wellness applications
 *
 * - **Finance** (3 themes): Professional, authoritative themes for banking
 *   and financial services
 *
 * - **E-Commerce** (3 themes): Engaging, conversion-focused themes for
 *   online retail
 *
 * - **Creative** (3 themes): Bold, expressive themes for creative professionals
 *   and content creators
 *
 * - **Tech** (2 themes): Modern, functional themes for developer tools
 *   and SaaS platforms
 *
 * ## Usage
 *
 * ```tsx
 * import { healthcareTheme, fintechTheme } from '@fluxwind/themes/presets';
 * import { ThemeProvider } from '@fluxwind/themes';
 *
 * function App() {
 *   return (
 *     <ThemeProvider theme={healthcareTheme}>
 *       <YourApp />
 *     </ThemeProvider>
 *   );
 * }
 * ```
 *
 * ## Finding the Right Theme
 *
 * Use the `industry` and `category` fields to filter themes:
 *
 * ```ts
 * import * as presets from '@fluxwind/themes/presets';
 *
 * // Find all themes for a specific industry
 * const healthcareThemes = Object.values(presets).filter(
 *   theme => theme.industry?.includes('healthcare')
 * );
 *
 * // Find all themes in a category
 * const financeThemes = Object.values(presets).filter(
 *   theme => theme.category === 'finance'
 * );
 * ```
 *
 * @module presets
 */

// General Purpose themes (4)
export {
  highContrastTheme,
  lightReferenceTheme,
  darkReferenceTheme,
  sepiaReferenceTheme,
} from './general';

// Healthcare themes (3)
export { healthcareTheme, wellnessTheme, medicalTheme } from './healthcare';

// Finance themes (3)
export { financeTheme, corporateTheme, fintechTheme } from './finance';

// E-Commerce themes (3)
export { ecommerceTheme, luxuryTheme, marketplaceTheme } from './ecommerce';

// Creative themes (3)
export { creativeTheme, bloggingTheme, mediaTheme } from './creative';

// Tech themes (2)
export { developerTheme, saasTheme } from './tech';

/**
 * Array of all available theme presets for iteration
 */
export { allThemePresets } from './registry';
