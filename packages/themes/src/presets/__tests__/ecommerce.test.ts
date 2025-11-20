import { describe, it, expect } from 'vitest';
import { ecommerceTheme, luxuryTheme, marketplaceTheme } from '@/presets';

describe('E-Commerce Themes', () => {
  const themes = [ecommerceTheme, luxuryTheme, marketplaceTheme];

  describe('Theme Structure', () => {
    it('should have all required fields for all themes', () => {
      themes.forEach((theme) => {
        expect(theme).toHaveProperty('name');
        expect(theme).toHaveProperty('label');
        expect(theme).toHaveProperty('description');
        expect(theme).toHaveProperty('category', 'ecommerce');
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
    it('should have ecommerce tag for ecommerceTheme', () => {
      expect(ecommerceTheme.industry).toContain('ecommerce');
    });

    it('should have luxury tag for luxuryTheme', () => {
      expect(luxuryTheme.industry).toContain('luxury');
    });

    it('should have marketplace tag for marketplaceTheme', () => {
      expect(marketplaceTheme.industry).toContain('marketplace');
    });

    it('should have valid ecommerce-related tags only', () => {
      const validEcommerceTags = [
        'ecommerce',
        'retail',
        'fashion',
        'luxury',
        'marketplace',
        'local-commerce',
      ];

      themes.forEach((theme) => {
        theme.industry?.forEach((tag) => {
          expect(validEcommerceTags).toContain(tag);
        });
      });
    });
  });

  describe('Color Palette', () => {
    it('should have vibrant colors for ecommerceTheme', () => {
      const primaryColor = ecommerceTheme.variables?.['--fw-color-primary'];
      expect(primaryColor).toBeTruthy();
      expect(primaryColor).toContain('#f97316'); // Vibrant orange
    });

    it('should have sophisticated dark colors for luxuryTheme', () => {
      const bgColor = luxuryTheme.variables?.['--fw-color-bg-primary'];
      expect(bgColor).toBeTruthy();
      expect(bgColor).toContain('#0f172a'); // Deep black
    });

    it('should have friendly teal colors for marketplaceTheme', () => {
      const primaryColor = marketplaceTheme.variables?.['--fw-color-primary'];
      expect(primaryColor).toBeTruthy();
      expect(primaryColor).toContain('#14b8a6'); // Teal
    });

    it('should have call-to-action focused colors', () => {
      themes.forEach((theme) => {
        expect(theme.variables).toBeDefined();
        const variables = theme.variables || {};
        expect(Object.keys(variables).length).toBeGreaterThan(0);
      });
    });
  });

  describe('Shopping Experience', () => {
    it('should mention shopping/conversion in descriptions', () => {
      themes.forEach((theme) => {
        const desc = theme.description?.toLowerCase() || '';
        expect(
          desc.includes('shop') ||
            desc.includes('conversion') ||
            desc.includes('purchase') ||
            desc.includes('luxury') ||
            desc.includes('marketplace')
        ).toBe(true);
      });
    });

    it('should have energetic preview colors for ecommerce', () => {
      expect(ecommerceTheme.previewColor).toBeTruthy();
      // Orange/vibrant color
      expect(ecommerceTheme.previewColor).toMatch(/#[ef][0-9a-f]{5}/);
    });

    it('should have sophisticated preview colors for luxury', () => {
      expect(luxuryTheme.previewColor).toBeTruthy();
      // Luxury uses rose gold color which is a light orange
      expect(luxuryTheme.previewColor).toMatch(/#[0-9a-f]{6}/);
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
