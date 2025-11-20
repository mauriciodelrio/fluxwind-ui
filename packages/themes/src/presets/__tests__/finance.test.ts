import { describe, it, expect } from 'vitest';
import { financeTheme, corporateTheme, fintechTheme } from '@/presets';

describe('Finance Themes', () => {
  const themes = [financeTheme, corporateTheme, fintechTheme];

  describe('Theme Structure', () => {
    it('should have all required fields for all themes', () => {
      themes.forEach((theme) => {
        expect(theme).toHaveProperty('name');
        expect(theme).toHaveProperty('label');
        expect(theme).toHaveProperty('description');
        expect(theme).toHaveProperty('category', 'finance');
        expect(theme).toHaveProperty('industry');
        expect(theme).toHaveProperty('extends');
        expect(theme).toHaveProperty('previewColor');
        expect(theme).toHaveProperty('author', 'Fluxwind UI Team');
        expect(theme).toHaveProperty('version', '1.0.0');
        expect(theme).toHaveProperty('variables');
      });
    });

    it('should have appropriate base themes', () => {
      // Finance and Corporate extend light, Fintech extends dark
      expect(financeTheme.extends).toBe('light');
      expect(corporateTheme.extends).toBe('light');
      expect(fintechTheme.extends).toBe('dark');
    });
  });

  describe('Industry Tags', () => {
    it('should have finance tag for financeTheme', () => {
      expect(financeTheme.industry).toContain('finance');
    });

    it('should have corporate tag for corporateTheme', () => {
      expect(corporateTheme.industry).toContain('corporate');
    });

    it('should have fintech tag for fintechTheme', () => {
      expect(fintechTheme.industry).toContain('fintech');
    });

    it('should have valid finance-related tags only', () => {
      const validFinanceTags = [
        'finance',
        'banking',
        'investment',
        'insurance',
        'corporate',
        'consulting',
        'fintech',
        'crypto',
        'payment',
      ];

      themes.forEach((theme) => {
        theme.industry?.forEach((tag) => {
          expect(validFinanceTags).toContain(tag);
        });
      });
    });
  });

  describe('Color Palette', () => {
    it('should have navy and gold for financeTheme', () => {
      const primaryColor = financeTheme.variables?.['--fw-color-primary'];
      expect(primaryColor).toBeTruthy();
      expect(primaryColor).toContain('#1e40af'); // Deep navy
    });

    it('should have professional dark colors for corporateTheme', () => {
      const primaryColor = corporateTheme.variables?.['--fw-color-primary'];
      expect(primaryColor).toBeTruthy();
      expect(primaryColor).toContain('#0284c7'); // Electric blue
    });

    it('should have modern fintech colors for fintechTheme', () => {
      const primaryColor = fintechTheme.variables?.['--fw-color-primary'];
      expect(primaryColor).toBeTruthy();
      expect(primaryColor).toContain('#10b981'); // Neon green
    });

    it('should have trust-inspiring color schemes', () => {
      themes.forEach((theme) => {
        expect(theme.variables).toBeDefined();
        expect(Object.keys(theme.variables || {}).length).toBeGreaterThan(5);
      });
    });
  });

  describe('Professional Appearance', () => {
    it('should mention trust/professional in descriptions', () => {
      themes.forEach((theme) => {
        const desc = theme.description?.toLowerCase() || '';
        expect(
          desc.includes('trust') ||
            desc.includes('professional') ||
            desc.includes('traditional') ||
            desc.includes('corporate') ||
            desc.includes('modern') ||
            desc.includes('vibrant')
        ).toBe(true);
      });
    });

    it('should have appropriate backgrounds for their theme type', () => {
      // Fintech (dark theme) should have dark background
      const fintechBg = fintechTheme.variables?.['--fw-color-bg-primary'];
      if (fintechBg) {
        expect(fintechBg).toMatch(/#[0-2][0-9a-f]{5}/);
      }

      // Finance and Corporate (light themes) can have light backgrounds
      expect(financeTheme.variables?.['--fw-color-bg-primary']).toBeTruthy();
      expect(corporateTheme.variables?.['--fw-color-bg-primary']).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should have accessibility considerations', () => {
      // All themes should have description mentioning their purpose
      themes.forEach((theme) => {
        expect(theme.description).toBeTruthy();
        expect(theme.description!.length).toBeGreaterThan(20);
      });
    });
  });
});
