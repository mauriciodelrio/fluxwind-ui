import { describe, it, expect } from 'vitest';
import {
  highContrastTheme,
  lightReferenceTheme,
  darkReferenceTheme,
  sepiaReferenceTheme,
} from '@/presets';

describe('General Purpose Themes', () => {
  describe('Theme Structure', () => {
    it('should have all required fields for highContrastTheme', () => {
      expect(highContrastTheme).toHaveProperty('name', 'high-contrast');
      expect(highContrastTheme).toHaveProperty('label', 'High Contrast');
      expect(highContrastTheme).toHaveProperty('description');
      expect(highContrastTheme).toHaveProperty('category', 'general');
      expect(highContrastTheme).toHaveProperty('industry');
      expect(highContrastTheme).toHaveProperty('extends', 'light');
      expect(highContrastTheme).toHaveProperty('previewColor');
      expect(highContrastTheme).toHaveProperty('author', 'Fluxwind UI Team');
      expect(highContrastTheme).toHaveProperty('version', '1.0.0');
      expect(highContrastTheme).toHaveProperty('variables');
    });

    it('should have all required fields for lightReferenceTheme', () => {
      expect(lightReferenceTheme).toHaveProperty('name', 'light-reference');
      expect(lightReferenceTheme).toHaveProperty('label', 'Light (Reference)');
      expect(lightReferenceTheme).toHaveProperty('category', 'general');
      expect(lightReferenceTheme).toHaveProperty('extends', 'light');
    });

    it('should have all required fields for darkReferenceTheme', () => {
      expect(darkReferenceTheme).toHaveProperty('name', 'dark-reference');
      expect(darkReferenceTheme).toHaveProperty('label', 'Dark (Reference)');
      expect(darkReferenceTheme).toHaveProperty('category', 'general');
      expect(darkReferenceTheme).toHaveProperty('extends', 'dark');
    });

    it('should have all required fields for sepiaReferenceTheme', () => {
      expect(sepiaReferenceTheme).toHaveProperty('name', 'sepia-reference');
      expect(sepiaReferenceTheme).toHaveProperty('label', 'Sepia (Reference)');
      expect(sepiaReferenceTheme).toHaveProperty('category', 'general');
      expect(sepiaReferenceTheme).toHaveProperty('extends', 'sepia');
    });
  });

  describe('Industry Tags', () => {
    it('should have accessibility industry tag for highContrastTheme', () => {
      expect(highContrastTheme.industry).toContain('accessibility');
    });

    it('should have general industry tag for all themes', () => {
      expect(lightReferenceTheme.industry).toContain('general');
      expect(darkReferenceTheme.industry).toContain('general');
      expect(sepiaReferenceTheme.industry).toContain('general');
    });

    it('should have valid industry tags', () => {
      const validTags = [
        'healthcare',
        'wellness',
        'finance',
        'ecommerce',
        'creative',
        'developer',
        'accessibility',
        'general',
        'productivity',
        'reading',
        'blogging',
      ];

      highContrastTheme.industry?.forEach((tag) => {
        expect(validTags).toContain(tag);
      });
    });
  });

  describe('CSS Variables', () => {
    it('should have CSS variables object for highContrastTheme', () => {
      expect(highContrastTheme.variables).toBeDefined();
      expect(typeof highContrastTheme.variables).toBe('object');
    });

    it('should have color variables in highContrastTheme', () => {
      expect(highContrastTheme.variables).toHaveProperty('--fw-color-bg-primary');
      expect(highContrastTheme.variables).toHaveProperty('--fw-color-text-primary');
      expect(highContrastTheme.variables).toHaveProperty('--fw-color-primary');
    });

    it('should have valid hex color values', () => {
      const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;
      const bgColor = highContrastTheme.variables?.['--fw-color-bg-primary'];

      if (bgColor && !bgColor.includes('rgb')) {
        expect(bgColor).toMatch(hexColorRegex);
      }
    });

    it('should have border width variables in highContrastTheme', () => {
      expect(highContrastTheme.variables).toHaveProperty('--fw-border-width-1');
      expect(highContrastTheme.variables).toHaveProperty('--fw-border-width-2');
    });

    it('should have component variables in highContrastTheme', () => {
      expect(highContrastTheme.variables).toHaveProperty('--fw-button-bg');
      expect(highContrastTheme.variables).toHaveProperty('--fw-input-bg');
    });

    it('should have empty variables for reference themes', () => {
      expect(lightReferenceTheme.variables).toEqual({});
      expect(darkReferenceTheme.variables).toEqual({});
      expect(sepiaReferenceTheme.variables).toEqual({});
    });
  });

  describe('Accessibility', () => {
    it('should have WCAG AAA contrast for highContrastTheme', () => {
      expect(highContrastTheme.description).toContain('WCAG AAA');
    });

    it('should use pure black text on white background', () => {
      expect(highContrastTheme.variables?.['--fw-color-bg-primary']).toBe('#ffffff');
      expect(highContrastTheme.variables?.['--fw-color-text-primary']).toBe('#000000');
    });

    it('should have strong border colors for visibility', () => {
      expect(highContrastTheme.variables?.['--fw-color-border-primary']).toBe('#000000');
    });
  });

  describe('Theme Metadata', () => {
    it('should have preview colors for all themes', () => {
      expect(highContrastTheme.previewColor).toBeTruthy();
      expect(lightReferenceTheme.previewColor).toBeTruthy();
      expect(darkReferenceTheme.previewColor).toBeTruthy();
      expect(sepiaReferenceTheme.previewColor).toBeTruthy();
    });

    it('should have descriptive labels', () => {
      expect(highContrastTheme.label).toBeTruthy();
      expect(highContrastTheme.label!.length).toBeGreaterThan(5);
      expect(lightReferenceTheme.label!.length).toBeGreaterThan(5);
    });

    it('should have semantic version numbers', () => {
      const versionRegex = /^\d+\.\d+\.\d+$/;
      expect(highContrastTheme.version).toMatch(versionRegex);
    });
  });
});
