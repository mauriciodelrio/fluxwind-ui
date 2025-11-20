import type { ThemePreset } from '@/types/theme.types.js';

/**
 * Light Theme Reference
 *
 * A reference to the built-in light theme with general purpose industry tags.
 * This theme provides a clean, bright interface suitable for most applications.
 *
 * @category General Purpose
 * @wcag AA
 */
export const lightReferenceTheme: ThemePreset = {
  name: 'light-reference',
  label: 'Light (Reference)',
  description:
    'Clean and bright theme suitable for general purpose applications. Provides excellent readability and a modern aesthetic.',
  category: 'general',
  industry: ['general', 'productivity'],
  extends: 'light',
  previewColor: '#3b82f6',
  author: 'Fluxwind UI Team',
  version: '1.0.0',
  variables: {
    // No overrides - uses base light theme
  },
};
