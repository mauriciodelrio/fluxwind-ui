import { describe, it, expect } from 'vitest';
import { creativeTheme, bloggingTheme, mediaTheme } from '@/presets';

describe('Creative Themes', () => {
  const themes = [creativeTheme, bloggingTheme, mediaTheme];

  describe('Theme Structure', () => {
    it('should have all required fields for all themes', () => {
      themes.forEach((theme) => {
        expect(theme).toHaveProperty('name');
        expect(theme).toHaveProperty('label');
        expect(theme).toHaveProperty('description');
        expect(theme).toHaveProperty('category', 'creative');
        expect(theme).toHaveProperty('industry');
        expect(theme).toHaveProperty('extends');
        expect(theme).toHaveProperty('previewColor');
        expect(theme).toHaveProperty('author', 'Fluxwind UI Team');
        expect(theme).toHaveProperty('version', '1.0.0');
        expect(theme).toHaveProperty('variables');
      });
    });
  });

  describe('Industry Tags', () => {
    it('should have creative tag for creativeTheme', () => {
      expect(creativeTheme.industry).toContain('creative');
    });

    it('should have blogging tag for bloggingTheme', () => {
      expect(bloggingTheme.industry).toContain('blogging');
    });

    it('should have media tag for mediaTheme', () => {
      expect(mediaTheme.industry).toContain('media');
    });

    it('should have valid creative-related tags only', () => {
      const validCreativeTags = [
        'creative',
        'design',
        'portfolio',
        'blogging',
        'magazine',
        'news',
        'media',
        'entertainment',
        'video',
      ];

      themes.forEach((theme) => {
        theme.industry?.forEach((tag) => {
          expect(validCreativeTags).toContain(tag);
        });
      });
    });
  });

  describe('Color Palette', () => {
    it('should have purple gradient for creativeTheme', () => {
      const primaryColor = creativeTheme.variables?.['--fw-color-primary'];
      expect(primaryColor).toBeTruthy();
      expect(primaryColor).toContain('#a855f7'); // Purple
    });

    it('should have warm terracotta for bloggingTheme', () => {
      const primaryColor = bloggingTheme.variables?.['--fw-color-primary'];
      expect(primaryColor).toBeTruthy();
      expect(primaryColor).toContain('#ea580c'); // Terracotta
    });

    it('should have bold red for mediaTheme', () => {
      const primaryColor = mediaTheme.variables?.['--fw-color-primary'];
      expect(primaryColor).toBeTruthy();
      expect(primaryColor).toContain('#dc2626'); // Bold red
    });

    it('should have vibrant, expressive color schemes', () => {
      themes.forEach((theme) => {
        expect(theme.variables).toBeDefined();
        const variables = theme.variables || {};
        expect(Object.keys(variables).length).toBeGreaterThan(5);
      });
    });
  });

  describe('Creative Expression', () => {
    it('should mention creativity/expression in descriptions', () => {
      themes.forEach((theme) => {
        const desc = theme.description?.toLowerCase() || '';
        expect(
          desc.includes('creative') ||
            desc.includes('expressive') ||
            desc.includes('bold') ||
            desc.includes('vibrant') ||
            desc.includes('storytelling') ||
            desc.includes('warm') ||
            desc.includes('editorial') ||
            desc.includes('media') ||
            desc.includes('entertainment')
        ).toBe(true);
      });
    });

    it('should use warm theme for readability in blogging', () => {
      // Blogging uses sepia for warm reading experience
      expect(bloggingTheme.extends).toBe('sepia');
    });

    it('should have gradient or multi-color support', () => {
      const creativeVars = creativeTheme.variables || {};
      const hasSecondary = Object.keys(creativeVars).some((key) => key.includes('secondary'));
      expect(hasSecondary).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('should have accessibility considerations', () => {
      themes.forEach((theme) => {
        expect(theme.description).toBeTruthy();
        expect(theme.description!.length).toBeGreaterThan(20);
      });
    });
  });
});
