import type { ThemePreset } from '@/types/theme.types.js';

/**
 * Sepia Theme Reference
 *
 * A reference to the built-in sepia theme with general purpose industry tags.
 * This theme provides a warm, comfortable reading experience reminiscent of
 * aged paper, reducing blue light exposure.
 *
 * @category General Purpose
 * @wcag AA
 */
export const sepiaReferenceTheme: ThemePreset = {
  name: 'sepia-reference',
  label: 'Sepia (Reference)',
  description:
    'Warm sepia tones for comfortable reading. Reduces blue light exposure and provides a classic, aged paper aesthetic ideal for content-heavy applications.',
  category: 'general',
  industry: ['general', 'reading', 'blogging'],
  extends: 'sepia',
  previewColor: '#92400e',
  author: 'Fluxwind UI Team',
  version: '1.0.0',
  variables: {
    // No overrides - uses base sepia theme
  },
};
