import type { ThemePreset } from '@/types/theme.types.js';

/**
 * Dark Theme Reference
 *
 * A reference to the built-in dark theme with general purpose industry tags.
 * This theme reduces eye strain in low-light environments and provides a
 * modern, professional appearance.
 *
 * @category General Purpose
 * @wcag AA
 */
export const darkReferenceTheme: ThemePreset = {
  name: 'dark-reference',
  label: 'Dark (Reference)',
  description:
    'Modern dark theme that reduces eye strain and works well in low-light environments. Perfect for extended use and professional applications.',
  category: 'general',
  industry: ['general', 'productivity', 'developer'],
  extends: 'dark',
  previewColor: '#1e293b',
  author: 'Fluxwind UI Team',
  version: '1.0.0',
  variables: {
    // No overrides - uses base dark theme
  },
};
