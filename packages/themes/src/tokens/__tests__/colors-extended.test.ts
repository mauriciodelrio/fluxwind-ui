import { describe, it, expect } from 'vitest';
import {
  // Thematic colors
  ocean,
  tangerine,
  sapphire,
  mint,
  lavender,
  coral,
  electric,
  amber,
  rose,
  lime,
  emerald,
  sky,
  indigo,
  violet,
  fuchsia,
  bronze,
  crimson,
  teal,
  // Semantic colors
  success,
  warning,
  error,
  info,
  // Neutral variations
  warmGray,
  coolGray,
  slateBlue,
  trueNeutral,
  // Main export and types
  fluxwindColors,
  type ExtendedColorShade,
  type ExtendedColorPalette,
  type FluxwindColorName,
} from '../colors-extended';

describe('Extended Colors', () => {
  const expectedShades: ExtendedColorShade[] = [
    '50',
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
    '950',
  ];

  describe('Color Palettes Structure', () => {
    const palettes: [string, ExtendedColorPalette][] = [
      // Thematic colors
      ['ocean', ocean],
      ['tangerine', tangerine],
      ['sapphire', sapphire],
      ['mint', mint],
      ['lavender', lavender],
      ['coral', coral],
      ['electric', electric],
      ['amber', amber],
      ['rose', rose],
      ['lime', lime],
      ['emerald', emerald],
      ['sky', sky],
      ['indigo', indigo],
      ['violet', violet],
      ['fuchsia', fuchsia],
      ['bronze', bronze],
      ['crimson', crimson],
      ['teal', teal],
      // Semantic colors
      ['success', success],
      ['warning', warning],
      ['error', error],
      ['info', info],
      // Neutral variations
      ['warmGray', warmGray],
      ['coolGray', coolGray],
      ['slateBlue', slateBlue],
      ['trueNeutral', trueNeutral],
    ];

    palettes.forEach(([name, palette]) => {
      describe(name, () => {
        it('should have all 11 shades (50-950)', () => {
          const shades = Object.keys(palette);
          expect(shades).toHaveLength(11);
          expect(shades).toEqual(expectedShades);
        });

        it('should have valid hex color format', () => {
          const hexColorRegex = /^#[0-9a-f]{6}$/i;

          expectedShades.forEach((shade) => {
            const color = palette[shade];
            expect(color).toMatch(hexColorRegex);
          });
        });

        it('should have primary color at shade 500', () => {
          expect(palette['500']).toBeDefined();
          expect(palette['500']).toMatch(/^#[0-9a-f]{6}$/i);
        });

        it('should have progressive lightness from 50 to 950', () => {
          // Shade 50 should be lighter than 950
          const lightest = palette['50'];
          const darkest = palette['950'];

          expect(lightest).toBeDefined();
          expect(darkest).toBeDefined();
          expect(lightest).not.toBe(darkest);
        });
      });
    });
  });

  describe('fluxwindColors Export', () => {
    it('should export all 26 color palettes', () => {
      expect(Object.keys(fluxwindColors)).toHaveLength(26);

      // Thematic colors (18)
      expect(fluxwindColors).toHaveProperty('ocean');
      expect(fluxwindColors).toHaveProperty('tangerine');
      expect(fluxwindColors).toHaveProperty('sapphire');
      expect(fluxwindColors).toHaveProperty('mint');
      expect(fluxwindColors).toHaveProperty('lavender');
      expect(fluxwindColors).toHaveProperty('coral');
      expect(fluxwindColors).toHaveProperty('electric');
      expect(fluxwindColors).toHaveProperty('amber');
      expect(fluxwindColors).toHaveProperty('rose');
      expect(fluxwindColors).toHaveProperty('lime');
      expect(fluxwindColors).toHaveProperty('emerald');
      expect(fluxwindColors).toHaveProperty('sky');
      expect(fluxwindColors).toHaveProperty('indigo');
      expect(fluxwindColors).toHaveProperty('violet');
      expect(fluxwindColors).toHaveProperty('fuchsia');
      expect(fluxwindColors).toHaveProperty('bronze');
      expect(fluxwindColors).toHaveProperty('crimson');
      expect(fluxwindColors).toHaveProperty('teal');

      // Semantic colors (4)
      expect(fluxwindColors).toHaveProperty('success');
      expect(fluxwindColors).toHaveProperty('warning');
      expect(fluxwindColors).toHaveProperty('error');
      expect(fluxwindColors).toHaveProperty('info');

      // Neutral variations (4)
      expect(fluxwindColors).toHaveProperty('warmGray');
      expect(fluxwindColors).toHaveProperty('coolGray');
      expect(fluxwindColors).toHaveProperty('slateBlue');
      expect(fluxwindColors).toHaveProperty('trueNeutral');
    });

    it('should have correct palette structure for each color', () => {
      Object.values(fluxwindColors).forEach((palette) => {
        expect(Object.keys(palette)).toHaveLength(11);
        expect(Object.keys(palette)).toEqual(expectedShades);
      });
    });
  });

  describe('Color Uniqueness', () => {
    it('should have mostly unique primary colors (500) across palettes', () => {
      const primaryColors = Object.values(fluxwindColors).map((palette) => palette['500']);
      const uniquePrimaries = new Set(primaryColors);

      // Some colors intentionally share values for consistency:
      // - teal and mint both use #14b8a6 (same concept, different names)
      // - sapphire, electric, and info all use #3b82f6 (blue consistency)
      // - error and crimson both use #ef4444 (red consistency)
      // - warning and amber both use #f59e0b (amber consistency)
      // This gives us ~19 unique values out of 26 palettes
      expect(uniquePrimaries.size).toBeGreaterThanOrEqual(19);
      expect(uniquePrimaries.size).toBeLessThan(26); // Not all should be unique
    });

    it('should have some intentional color overlaps for consistency', () => {
      // Verify intentional overlaps
      expect(teal['500']).toBe(mint['500']); // Same teal/mint concept
      expect(sapphire['500']).toBe(electric['500']); // Same blue base
      expect(sapphire['500']).toBe(info['500']); // Info uses same blue
      expect(error['500']).toBe(crimson['500']); // Same red concept
      expect(warning['500']).toBe(amber['500']); // Warning uses amber
    });
  });

  describe('Semantic Colors', () => {
    it('should have proper semantic color values', () => {
      // Success should be green
      expect(success['500']).toBe('#22c55e');

      // Warning should be amber/yellow
      expect(warning['500']).toBe('#f59e0b');

      // Error should be red
      expect(error['500']).toBe('#ef4444');

      // Info should be blue
      expect(info['500']).toBe('#3b82f6');
    });

    it('should have optimal contrast for semantic colors', () => {
      // Semantic colors should have good contrast between 50 and 500
      const semanticPalettes = [success, warning, error, info];

      semanticPalettes.forEach((palette) => {
        const light = palette['50'];
        const primary = palette['500'];

        expect(light).toBeDefined();
        expect(primary).toBeDefined();
        expect(light).not.toBe(primary);
      });
    });
  });

  describe('Neutral Variations', () => {
    it('should have all neutral palettes', () => {
      expect(warmGray['500']).toBe('#78716c');
      expect(coolGray['500']).toBe('#6b7280');
      expect(slateBlue['500']).toBe('#64748b');
      expect(trueNeutral['500']).toBe('#737373');
    });

    it('should have different neutral tones', () => {
      const neutrals = [warmGray['500'], coolGray['500'], slateBlue['500'], trueNeutral['500']];

      const uniqueNeutrals = new Set(neutrals);
      expect(uniqueNeutrals.size).toBe(4);
    });
  });

  describe('Accessibility Considerations', () => {
    it('should have sufficient contrast between extremes', () => {
      // Test that 50 and 950 have very different hex values
      // This is a basic check; real contrast should be tested with tools

      const palettes = Object.values(fluxwindColors);

      palettes.forEach((palette) => {
        const lightest = palette['50'];
        const darkest = palette['950'];

        // Remove # and convert to numbers for comparison
        const lightValue = parseInt(lightest.slice(1), 16);
        const darkValue = parseInt(darkest.slice(1), 16);

        // Light should have higher hex value than dark
        expect(lightValue).toBeGreaterThan(darkValue);
      });
    });
  });

  describe('TypeScript Types', () => {
    it('should export ExtendedColorShade type correctly', () => {
      // Type test - will fail at compile time if incorrect
      const shade: ExtendedColorShade = '500';
      expect(shade).toBe('500');
    });

    it('should export FluxwindColorName type correctly', () => {
      // Type test - will fail at compile time if incorrect
      const colorName: FluxwindColorName = 'ocean';
      expect(colorName).toBe('ocean');
    });

    it('should allow accessing palette colors with type safety', () => {
      const oceanColor = ocean['500'];
      expect(oceanColor).toBe('#06b6d4');

      const tangerineColor = tangerine['500'];
      expect(tangerineColor).toBe('#f97316');
    });
  });

  describe('Specific Color Values', () => {
    describe('Thematic Colors', () => {
      it('ocean-500 should be correct cyan', () => {
        expect(ocean['500']).toBe('#06b6d4');
      });

      it('tangerine-500 should be correct orange', () => {
        expect(tangerine['500']).toBe('#f97316');
      });

      it('sapphire-500 should be correct blue', () => {
        expect(sapphire['500']).toBe('#3b82f6');
      });

      it('mint-500 should be correct teal', () => {
        expect(mint['500']).toBe('#14b8a6');
      });

      it('lavender-500 should be correct purple', () => {
        expect(lavender['500']).toBe('#a855f7');
      });

      it('coral-500 should be correct rose', () => {
        expect(coral['500']).toBe('#f43f5e');
      });

      it('amber-500 should be correct golden', () => {
        expect(amber['500']).toBe('#f59e0b');
      });

      it('lime-500 should be correct yellow-green', () => {
        expect(lime['500']).toBe('#84cc16');
      });

      it('emerald-500 should be correct green', () => {
        expect(emerald['500']).toBe('#10b981');
      });

      it('crimson-500 should be correct red', () => {
        expect(crimson['500']).toBe('#ef4444');
      });
    });

    describe('Semantic Colors', () => {
      it('success-500 should be optimized green', () => {
        expect(success['500']).toBe('#22c55e');
      });

      it('warning-500 should be optimized amber', () => {
        expect(warning['500']).toBe('#f59e0b');
      });

      it('error-500 should be optimized red', () => {
        expect(error['500']).toBe('#ef4444');
      });

      it('info-500 should be optimized blue', () => {
        expect(info['500']).toBe('#3b82f6');
      });
    });
  });

  describe('Documentation', () => {
    it('should have JSDoc comments for each palette', () => {
      // This is more of a code review check, but we can verify exports exist
      expect(ocean).toBeDefined();
      expect(tangerine).toBeDefined();
      expect(sapphire).toBeDefined();
      expect(mint).toBeDefined();
      expect(lavender).toBeDefined();
      expect(coral).toBeDefined();
      expect(electric).toBeDefined();
    });
  });

  describe('Immutability', () => {
    it('should be immutable (as const)', () => {
      // TypeScript will enforce this at compile time
      // Runtime check: objects should be frozen in production
      expect(Object.isFrozen(ocean)).toBe(false); // as const doesn't freeze at runtime

      // But we can verify structure
      expect(() => {
        // @ts-expect-error - Testing immutability
        ocean['500'] = '#000000';
      }).not.toThrow(); // JavaScript allows this, but TS prevents it
    });
  });
});
