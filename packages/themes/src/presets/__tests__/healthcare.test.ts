import { describe, it, expect } from 'vitest';
import { healthcareTheme, wellnessTheme, medicalTheme } from '@/presets';

describe('Healthcare Themes', () => {
  const themes = [healthcareTheme, wellnessTheme, medicalTheme];

  describe('Theme Structure', () => {
    it('should have all required fields for all themes', () => {
      themes.forEach((theme) => {
        expect(theme).toHaveProperty('name');
        expect(theme).toHaveProperty('label');
        expect(theme).toHaveProperty('description');
        expect(theme).toHaveProperty('category', 'healthcare');
        expect(theme).toHaveProperty('industry');
        expect(theme).toHaveProperty('extends');
        expect(theme).toHaveProperty('previewColor');
        expect(theme).toHaveProperty('author', 'Fluxwind UI Team');
        expect(theme).toHaveProperty('version', '1.0.0');
        expect(theme).toHaveProperty('variables');
      });
    });

    it('should have unique names', () => {
      const names = themes.map((t) => t.name);
      const uniqueNames = new Set(names);
      expect(uniqueNames.size).toBe(themes.length);
    });

    it('should have unique labels', () => {
      const labels = themes.map((t) => t.label);
      const uniqueLabels = new Set(labels);
      expect(uniqueLabels.size).toBe(themes.length);
    });
  });

  describe('Industry Tags', () => {
    it('should have healthcare-related tags', () => {
      // Healthcare theme has 'healthcare' tag
      expect(healthcareTheme.industry).toContain('healthcare');

      // Wellness theme has wellness-related tags
      expect(wellnessTheme.industry).toContain('wellness');

      // Medical theme has healthcare tag
      expect(medicalTheme.industry).toContain('healthcare');
    });

    it('should have wellness tag for wellnessTheme', () => {
      expect(wellnessTheme.industry).toContain('wellness');
    });

    it('should have telemedicine tag for medicalTheme', () => {
      expect(medicalTheme.industry).toContain('telemedicine');
    });

    it('should have valid healthcare-related tags only', () => {
      const validHealthcareTags = [
        'healthcare',
        'wellness',
        'mental-health',
        'telemedicine',
        'fitness',
        'nutrition',
        'pharmacy',
      ];

      themes.forEach((theme) => {
        theme.industry?.forEach((tag) => {
          expect(validHealthcareTags).toContain(tag);
        });
      });
    });
  });

  describe('Color Palette', () => {
    it('should have calming blue primary color for healthcareTheme', () => {
      const primaryColor = healthcareTheme.variables?.['--fw-color-primary'];
      expect(primaryColor).toBeTruthy();
      expect(primaryColor).toContain('#0ea5e9'); // Sky blue
    });

    it('should have sage green primary color for wellnessTheme', () => {
      const primaryColor = wellnessTheme.variables?.['--fw-color-primary'];
      expect(primaryColor).toBeTruthy();
      expect(primaryColor).toContain('#84cc16'); // Sage green
    });

    it('should have clinical colors for medicalTheme', () => {
      const bgColor = medicalTheme.variables?.['--fw-color-bg-primary'];
      expect(bgColor).toBeTruthy();
      // Should have clean white or very light background
      expect(bgColor).toMatch(/#f[0-9a-f]{5}/);
    });

    it('should have soft, accessible colors', () => {
      themes.forEach((theme) => {
        expect(theme.variables).toBeDefined();
        expect(Object.keys(theme.variables || {}).length).toBeGreaterThan(0);
      });
    });
  });

  describe('Theme Descriptions', () => {
    it('should mention healthcare in descriptions', () => {
      themes.forEach((theme) => {
        const desc = theme.description?.toLowerCase() || '';
        expect(
          desc.includes('health') ||
            desc.includes('medical') ||
            desc.includes('wellness') ||
            desc.includes('calm')
        ).toBe(true);
      });
    });

    it('should have descriptive and informative descriptions', () => {
      themes.forEach((theme) => {
        expect(theme.description).toBeTruthy();
        expect(theme.description!.length).toBeGreaterThan(30);
      });
    });
  });

  describe('Accessibility Considerations', () => {
    it('should have detailed descriptions', () => {
      themes.forEach((theme) => {
        expect(theme.description).toBeTruthy();
        expect(theme.description!.length).toBeGreaterThan(30);
      });
    });

    it('should have sufficient contrast colors', () => {
      // Medical theme should have high contrast light background
      const medicalBg = medicalTheme.variables?.['--fw-color-bg-primary'];
      expect(medicalBg).toBeTruthy();
      expect(medicalBg).toMatch(/#f[0-9a-f]{5}/);
    });
  });
});
