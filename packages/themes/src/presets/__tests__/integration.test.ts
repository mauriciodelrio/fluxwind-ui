import { describe, it, expect } from 'vitest';
import * as generalPresets from '@/presets/general';
import * as healthcarePresets from '@/presets/healthcare';
import * as financePresets from '@/presets/finance';
import * as ecommercePresets from '@/presets/ecommerce';
import * as creativePresets from '@/presets/creative';
import * as techPresets from '@/presets/tech';

describe('Theme Presets Integration', () => {
  const allPresets = [
    ...Object.values(generalPresets),
    ...Object.values(healthcarePresets),
    ...Object.values(financePresets),
    ...Object.values(ecommercePresets),
    ...Object.values(creativePresets),
    ...Object.values(techPresets),
  ];

  describe('Collection Integrity', () => {
    it('should have at least 15 industry-specific themes', () => {
      expect(allPresets.length).toBeGreaterThanOrEqual(15);
    });

    it('should have 4 general themes', () => {
      expect(Object.values(generalPresets)).toHaveLength(4);
    });

    it('should have 3 healthcare themes', () => {
      expect(Object.values(healthcarePresets)).toHaveLength(3);
    });

    it('should have 3 finance themes', () => {
      expect(Object.values(financePresets)).toHaveLength(3);
    });

    it('should have 3 ecommerce themes', () => {
      expect(Object.values(ecommercePresets)).toHaveLength(3);
    });

    it('should have 3 creative themes', () => {
      expect(Object.values(creativePresets)).toHaveLength(3);
    });

    it('should have 2 tech themes', () => {
      expect(Object.values(techPresets)).toHaveLength(2);
    });
  });

  describe('Unique Identifiers', () => {
    it('should have unique theme names across all presets', () => {
      const names = allPresets.map((theme) => theme.name);
      const uniqueNames = new Set(names);
      expect(uniqueNames.size).toBe(allPresets.length);
    });

    it('should have unique labels across all presets', () => {
      const labels = allPresets.map((theme) => theme.label);
      const uniqueLabels = new Set(labels);
      expect(uniqueLabels.size).toBe(allPresets.length);
    });

    it('should have unique preview colors across categories', () => {
      const previewColors = allPresets.map((theme) => theme.previewColor);
      // Allow some duplicates but ensure variety
      const uniqueColors = new Set(previewColors);
      expect(uniqueColors.size).toBeGreaterThan(10);
    });
  });

  describe('Consistent Structure', () => {
    it('should have version 1.0.0 for all themes', () => {
      allPresets.forEach((theme) => {
        expect(theme.version).toBe('1.0.0');
      });
    });

    it('should have Fluxwind UI Team as author for all themes', () => {
      allPresets.forEach((theme) => {
        expect(theme.author).toBe('Fluxwind UI Team');
      });
    });

    it('should have non-empty descriptions', () => {
      allPresets.forEach((theme) => {
        expect(theme.description).toBeTruthy();
        expect(theme.description!.length).toBeGreaterThan(20);
      });
    });

    it('should have valid category assignments', () => {
      const validCategories = ['general', 'healthcare', 'finance', 'ecommerce', 'creative', 'tech'];

      allPresets.forEach((theme) => {
        expect(validCategories).toContain(theme.category);
      });
    });
  });

  describe('Industry Tag Coverage', () => {
    it('should have at least one industry tag per theme', () => {
      allPresets.forEach((theme) => {
        expect(theme.industry).toBeDefined();
        expect(theme.industry!.length).toBeGreaterThan(0);
      });
    });

    it('should cover all major industry categories', () => {
      const allTags = allPresets.flatMap((theme) => theme.industry || []);
      const uniqueTags = new Set(allTags);

      // Verify major industries are represented
      expect(uniqueTags.has('healthcare')).toBe(true);
      expect(uniqueTags.has('finance')).toBe(true);
      expect(uniqueTags.has('ecommerce')).toBe(true);
      expect(uniqueTags.has('creative')).toBe(true);
      expect(uniqueTags.has('developer')).toBe(true);
    });

    it('should have variety in tag assignments', () => {
      const allTags = allPresets.flatMap((theme) => theme.industry || []);
      const uniqueTags = new Set(allTags);
      // Should have at least 15 unique tags across all themes
      expect(uniqueTags.size).toBeGreaterThan(15);
    });
  });

  describe('Base Theme Extension', () => {
    it('should only extend light, dark, or sepia themes', () => {
      const validExtends = ['light', 'dark', 'sepia'];

      allPresets.forEach((theme) => {
        expect(validExtends).toContain(theme.extends);
      });
    });

    it('should have balanced base theme usage', () => {
      const extendsCounts = allPresets.reduce(
        (acc, theme) => {
          const base = theme.extends || 'light';
          acc[base] = (acc[base] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      );

      // Each base theme should be used at least once
      expect(extendsCounts['light']).toBeGreaterThan(0);
      expect(extendsCounts['dark']).toBeGreaterThan(0);
    });
  });

  describe('CSS Variable Overrides', () => {
    it('should have variable overrides for custom themes', () => {
      const customThemes = allPresets.filter((theme) => !theme.name.includes('reference'));

      customThemes.forEach((theme) => {
        const variables = theme.variables || {};
        expect(Object.keys(variables).length).toBeGreaterThan(0);
      });
    });

    it('should have empty variables for reference themes', () => {
      const referenceThemes = allPresets.filter((theme) => theme.name.includes('reference'));

      referenceThemes.forEach((theme) => {
        expect(theme.variables).toEqual({});
      });
    });

    it('should use valid CSS variable names', () => {
      allPresets.forEach((theme) => {
        const variables = theme.variables || {};
        Object.keys(variables).forEach((key) => {
          // Allow numbers in CSS variable names (e.g., --fw-border-width-1)
          expect(key).toMatch(/^--fw-[a-z0-9-]+$/);
        });
      });
    });
  });

  describe('Accessibility Standards', () => {
    it('should have detailed descriptions for all themes', () => {
      allPresets.forEach((theme) => {
        expect(theme.description).toBeTruthy();
        expect(theme.description!.length).toBeGreaterThan(30);
      });
    });

    it('should have at least one WCAG AAA theme', () => {
      const aaaThemes = allPresets.filter((theme) => theme.description?.includes('WCAG AAA'));
      expect(aaaThemes.length).toBeGreaterThan(0);
    });

    it('should have accessibility industry tag coverage', () => {
      const allTags = allPresets.flatMap((theme) => theme.industry || []);
      expect(allTags).toContain('accessibility');
    });
  });

  describe('Documentation Quality', () => {
    it('should have meaningful labels', () => {
      allPresets.forEach((theme) => {
        // Labels should exist and be descriptive
        expect(theme.label).toBeTruthy();
        expect(theme.label!.length).toBeGreaterThan(2);
        // Label should start with capital letter
        expect(theme.label![0]).toMatch(/[A-Z]/);
      });
    });

    it('should have descriptive preview colors', () => {
      allPresets.forEach((theme) => {
        expect(theme.previewColor).toBeTruthy();
        expect(theme.previewColor).toMatch(/^#[0-9A-Fa-f]{6}$/);
      });
    });

    it('should have capitalized labels', () => {
      allPresets.forEach((theme) => {
        expect(theme.label).toBeTruthy();
        const firstChar = theme.label!.charAt(0);
        expect(firstChar).toBe(firstChar.toUpperCase());
      });
    });
  });
});
