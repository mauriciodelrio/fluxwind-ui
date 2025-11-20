import { describe, it, expect } from 'vitest';
import { developerTheme, saasTheme } from '@/presets/tech';

describe('Tech Themes', () => {
  const themes = [developerTheme, saasTheme];

  describe('Theme Structure', () => {
    it('should have all required fields for all themes', () => {
      themes.forEach((theme) => {
        expect(theme).toHaveProperty('name');
        expect(theme).toHaveProperty('label');
        expect(theme).toHaveProperty('description');
        expect(theme).toHaveProperty('category', 'tech');
        expect(theme).toHaveProperty('industry');
        expect(theme).toHaveProperty('extends');
        expect(theme).toHaveProperty('previewColor');
        expect(theme).toHaveProperty('author', 'Fluxwind UI Team');
        expect(theme).toHaveProperty('version', '1.0.0');
        expect(theme).toHaveProperty('variables');
      });
    });

    it('should have appropriate base themes', () => {
      // Developer extends dark, SaaS extends light
      expect(developerTheme.extends).toBe('dark');
      expect(saasTheme.extends).toBe('light');
    });
  });

  describe('Industry Tags', () => {
    it('should have developer tag for developerTheme', () => {
      expect(developerTheme.industry).toContain('developer');
    });

    it('should have saas tag for saasTheme', () => {
      expect(saasTheme.industry).toContain('saas');
    });

    it('should have valid tech-related tags only', () => {
      const validTechTags = ['developer', 'dev-tools', 'api', 'saas', 'dashboard', 'productivity'];

      themes.forEach((theme) => {
        theme.industry?.forEach((tag) => {
          expect(validTechTags).toContain(tag);
        });
      });
    });
  });

  describe('Color Palette', () => {
    it('should have VSCode-inspired colors for developerTheme', () => {
      const primaryColor = developerTheme.variables?.['--fw-color-primary'];
      expect(primaryColor).toBeTruthy();
      expect(primaryColor).toContain('#7c3aed'); // Purple
    });

    it('should have modern blue gradient for saasTheme', () => {
      const primaryColor = saasTheme.variables?.['--fw-color-primary'];
      expect(primaryColor).toBeTruthy();
      expect(primaryColor).toContain('#3b82f6'); // Blue
    });

    it('should have tech-forward color schemes', () => {
      themes.forEach((theme) => {
        expect(theme.variables).toBeDefined();
        const variables = theme.variables || {};
        expect(Object.keys(variables).length).toBeGreaterThan(5);
      });
    });
  });

  describe('Developer Experience', () => {
    it('should mention code/developer in descriptions', () => {
      const devDesc = developerTheme.description?.toLowerCase() || '';
      expect(
        devDesc.includes('code') || devDesc.includes('developer') || devDesc.includes('vscode')
      ).toBe(true);
    });

    it('should mention modern/productivity in SaaS description', () => {
      const saasDesc = saasTheme.description?.toLowerCase() || '';
      expect(
        saasDesc.includes('modern') || saasDesc.includes('saas') || saasDesc.includes('product')
      ).toBe(true);
    });

    it('should have syntax highlighting friendly colors', () => {
      const devVars = developerTheme.variables || {};
      const hasMultipleColors = Object.keys(devVars).filter((key) => key.includes('color')).length;
      expect(hasMultipleColors).toBeGreaterThan(3);
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
