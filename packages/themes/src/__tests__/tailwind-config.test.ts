/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest';
import { fluxwindConfig } from '../tailwind.config';
import { fluxwindColors, animationDurations, animationEasings } from '../tokens';

describe('Tailwind Configuration Integration', () => {
  describe('Configuration Structure', () => {
    it('should export a valid Tailwind config object', () => {
      expect(fluxwindConfig).toBeDefined();
      expect(fluxwindConfig.theme).toBeDefined();
      expect(fluxwindConfig.theme?.extend).toBeDefined();
    });

    it('should include all major theme sections', () => {
      const extend = fluxwindConfig.theme?.extend;
      expect(extend).toHaveProperty('colors');
      expect(extend).toHaveProperty('spacing');
      expect(extend).toHaveProperty('fontSize');
      expect(extend).toHaveProperty('fontWeight');
      expect(extend).toHaveProperty('boxShadow');
      expect(extend).toHaveProperty('borderRadius');
      expect(extend).toHaveProperty('transitionDuration');
      expect(extend).toHaveProperty('transitionTimingFunction');
      expect(extend).toHaveProperty('keyframes');
      expect(extend).toHaveProperty('animation');
    });
  });

  describe('Extended Colors Integration', () => {
    it('should include all 26 fluxwind color palettes', () => {
      const colors = fluxwindConfig.theme?.extend?.colors as Record<string, unknown>;
      expect(colors).toBeDefined();

      // Check for thematic colors (18)
      expect(colors).toHaveProperty('ocean');
      expect(colors).toHaveProperty('tangerine');
      expect(colors).toHaveProperty('sapphire');
      expect(colors).toHaveProperty('mint');
      expect(colors).toHaveProperty('lavender');
      expect(colors).toHaveProperty('coral');
      expect(colors).toHaveProperty('electric');
      expect(colors).toHaveProperty('amber');
      expect(colors).toHaveProperty('rose');
      expect(colors).toHaveProperty('lime');
      expect(colors).toHaveProperty('emerald');
      expect(colors).toHaveProperty('sky');
      expect(colors).toHaveProperty('indigo');
      expect(colors).toHaveProperty('violet');
      expect(colors).toHaveProperty('fuchsia');
      expect(colors).toHaveProperty('bronze');
      expect(colors).toHaveProperty('crimson');
      expect(colors).toHaveProperty('teal');

      // Check for semantic colors (4)
      expect(colors).toHaveProperty('success');
      expect(colors).toHaveProperty('warning');
      expect(colors).toHaveProperty('error');
      expect(colors).toHaveProperty('info');

      // Check for neutral variations (4)
      expect(colors).toHaveProperty('warmGray');
      expect(colors).toHaveProperty('coolGray');
      expect(colors).toHaveProperty('slateBlue');
      expect(colors).toHaveProperty('trueNeutral');
    });

    it('should have 11 shades for each color palette', () => {
      const colors = fluxwindConfig.theme?.extend?.colors as Record<string, Record<string, string>>;

      const colorPalettes = [
        'ocean',
        'tangerine',
        'sapphire',
        'mint',
        'lavender',
        'coral',
        'electric',
      ];

      colorPalettes.forEach((palette) => {
        const paletteColors = colors[palette];
        expect(paletteColors).toBeDefined();
        if (paletteColors) {
          expect(Object.keys(paletteColors)).toHaveLength(11);

          // Check for all shades (50-950)
          expect(paletteColors).toHaveProperty('50');
          expect(paletteColors).toHaveProperty('100');
          expect(paletteColors).toHaveProperty('200');
          expect(paletteColors).toHaveProperty('300');
          expect(paletteColors).toHaveProperty('400');
          expect(paletteColors).toHaveProperty('500');
          expect(paletteColors).toHaveProperty('600');
          expect(paletteColors).toHaveProperty('700');
          expect(paletteColors).toHaveProperty('800');
          expect(paletteColors).toHaveProperty('900');
          expect(paletteColors).toHaveProperty('950');
        }
      });
    });

    it('should match fluxwindColors structure', () => {
      const tailwindColors = fluxwindConfig.theme?.extend?.colors as Record<string, unknown>;

      Object.keys(fluxwindColors).forEach((colorKey) => {
        expect(tailwindColors).toHaveProperty(colorKey);
      });
    });
  });

  describe('Extended Animations Integration', () => {
    it('should include extended animation durations', () => {
      const durations = fluxwindConfig.theme?.extend?.transitionDuration as Record<string, string>;
      expect(durations).toBeDefined();

      // Check for extended durations
      expect(durations).toHaveProperty('instant');
      expect(durations).toHaveProperty('fast');
      expect(durations).toHaveProperty('base');
      expect(durations).toHaveProperty('moderate');
      expect(durations).toHaveProperty('slow');
      expect(durations).toHaveProperty('slower');
      expect(durations).toHaveProperty('slowest');

      // Verify values match animationDurations
      expect(durations['instant']).toBe(animationDurations.instant);
      expect(durations['fast']).toBe(animationDurations.fast);
      expect(durations['base']).toBe(animationDurations.base);
    });

    it('should include extended animation easings', () => {
      const easings = fluxwindConfig.theme?.extend?.transitionTimingFunction as Record<
        string,
        string
      >;
      expect(easings).toBeDefined();

      // Check for extended easings
      expect(easings).toHaveProperty('standard');
      expect(easings).toHaveProperty('decelerate');
      expect(easings).toHaveProperty('accelerate');
      expect(easings).toHaveProperty('sharp');
      expect(easings).toHaveProperty('bounce');
      expect(easings).toHaveProperty('elastic');
      expect(easings).toHaveProperty('smooth');

      // Verify values match animationEasings
      expect(easings['standard']).toBe(animationEasings.standard);
      expect(easings['decelerate']).toBe(animationEasings.decelerate);
    });

    it('should include extended keyframe animations', () => {
      const keyframes = fluxwindConfig.theme?.extend?.keyframes as Record<
        string,
        Record<string, Record<string, string>>
      >;
      expect(keyframes).toBeDefined();

      // Check for extended keyframes
      expect(keyframes).toHaveProperty('fadeIn');
      expect(keyframes).toHaveProperty('fadeOut');
      expect(keyframes).toHaveProperty('slideInUp');
      expect(keyframes).toHaveProperty('slideInDown');
      expect(keyframes).toHaveProperty('slideInLeft');
      expect(keyframes).toHaveProperty('slideInRight');
      expect(keyframes).toHaveProperty('slideOutUp');
      expect(keyframes).toHaveProperty('slideOutDown');
      expect(keyframes).toHaveProperty('scaleIn');
      expect(keyframes).toHaveProperty('scaleOut');
      expect(keyframes).toHaveProperty('zoomIn');
      expect(keyframes).toHaveProperty('zoomOut');
      expect(keyframes).toHaveProperty('shimmer');
      expect(keyframes).toHaveProperty('pulse');
      expect(keyframes).toHaveProperty('bounce');
      expect(keyframes).toHaveProperty('shake');
      expect(keyframes).toHaveProperty('spin');
      expect(keyframes).toHaveProperty('ping');
    });

    it('should have properly structured keyframe definitions', () => {
      const keyframes = fluxwindConfig.theme?.extend?.keyframes as Record<
        string,
        Record<string, Record<string, string>>
      >;

      // Check fadeIn structure
      expect(keyframes['fadeIn']).toBeDefined();
      const fadeIn = keyframes['fadeIn'];
      if (fadeIn) {
        expect(fadeIn['from']).toBeDefined();
        expect(fadeIn['to']).toBeDefined();
        expect(fadeIn['from']?.['opacity']).toBe('0');
        expect(fadeIn['to']?.['opacity']).toBe('1');
      }

      // Check slideInUp structure
      expect(keyframes['slideInUp']).toBeDefined();
      const slideInUp = keyframes['slideInUp'];
      if (slideInUp) {
        expect(slideInUp['from']).toHaveProperty('opacity');
        expect(slideInUp['from']).toHaveProperty('transform');
        expect(slideInUp['to']).toHaveProperty('opacity');
        expect(slideInUp['to']).toHaveProperty('transform');
      }
    });
  });

  describe('CSS Variables Mapping', () => {
    it('should map CSS variables for background colors', () => {
      const bgColors = fluxwindConfig.theme?.extend?.backgroundColor as Record<string, string>;
      expect(bgColors).toBeDefined();

      expect(bgColors['fw-primary']).toBe('var(--fw-color-bg-primary)');
      expect(bgColors['fw-secondary']).toBe('var(--fw-color-bg-secondary)');
      expect(bgColors['fw-tertiary']).toBe('var(--fw-color-bg-tertiary)');
      expect(bgColors['fw-inverse']).toBe('var(--fw-color-bg-inverse)');
    });

    it('should map CSS variables for text colors', () => {
      const textColors = fluxwindConfig.theme?.extend?.textColor as Record<string, string>;
      expect(textColors).toBeDefined();

      expect(textColors['fw-primary']).toBe('var(--fw-color-text-primary)');
      expect(textColors['fw-secondary']).toBe('var(--fw-color-text-secondary)');
      expect(textColors['fw-tertiary']).toBe('var(--fw-color-text-tertiary)');
      expect(textColors['fw-inverse']).toBe('var(--fw-color-text-inverse)');
      expect(textColors['fw-disabled']).toBe('var(--fw-color-text-disabled)');
    });

    it('should map CSS variables for border colors', () => {
      const borderColors = fluxwindConfig.theme?.extend?.borderColor as Record<string, string>;
      expect(borderColors).toBeDefined();

      expect(borderColors['fw-primary']).toBe('var(--fw-color-border-primary)');
      expect(borderColors['fw-secondary']).toBe('var(--fw-color-border-secondary)');
      expect(borderColors['fw-focus']).toBe('var(--fw-color-border-focus)');
      expect(borderColors['fw-error']).toBe('var(--fw-color-border-error)');
    });
  });

  describe('Pre-configured Animations', () => {
    it('should have pre-configured animation utilities', () => {
      const animations = fluxwindConfig.theme?.extend?.animation as Record<string, string>;
      expect(animations).toBeDefined();

      // Fade animations
      expect(animations['fade-in']).toContain('fadeIn');
      expect(animations['fade-out']).toContain('fadeOut');

      // Slide animations
      expect(animations['slide-in-up']).toContain('slideInUp');
      expect(animations['slide-in-down']).toContain('slideInDown');
      expect(animations['slide-in-left']).toContain('slideInLeft');
      expect(animations['slide-in-right']).toContain('slideInRight');

      // Scale animations
      expect(animations['scale-in']).toContain('scaleIn');
      expect(animations['scale-out']).toContain('scaleOut');

      // Effect animations
      expect(animations['pulse']).toContain('pulse');
      expect(animations['shake']).toContain('shake');
      expect(animations['shimmer']).toContain('shimmer');
      expect(animations['bounce']).toContain('bounce');
    });

    it('should use correct duration and easing in animations', () => {
      const animations = fluxwindConfig.theme?.extend?.animation as Record<string, string>;

      // Check that animations use durations from animationDuration
      expect(animations['fade-in']).toContain('150ms'); // fast
      expect(animations['slide-in-up']).toContain('300ms'); // moderate
    });
  });

  describe('Type Safety', () => {
    it('should export fluxwindConfig with proper TypeScript types', () => {
      // Type check - this will fail at compile time if types are wrong
      const config: typeof fluxwindConfig = fluxwindConfig;
      expect(config).toBeDefined();
    });

    it('should allow accessing nested properties', () => {
      const colors = fluxwindConfig.theme?.extend?.colors;
      const animations = fluxwindConfig.theme?.extend?.animation;
      const keyframes = fluxwindConfig.theme?.extend?.keyframes;

      expect(colors).toBeDefined();
      expect(animations).toBeDefined();
      expect(keyframes).toBeDefined();
    });
  });

  describe('Integration Completeness', () => {
    it('should have all required sections for component development', () => {
      const extend = fluxwindConfig.theme?.extend;

      // Essential for components
      expect(extend?.colors).toBeDefined();
      expect(extend?.backgroundColor).toBeDefined();
      expect(extend?.textColor).toBeDefined();
      expect(extend?.borderColor).toBeDefined();
      expect(extend?.spacing).toBeDefined();
      expect(extend?.fontSize).toBeDefined();
      expect(extend?.borderRadius).toBeDefined();
      expect(extend?.boxShadow).toBeDefined();

      // Essential for animations
      expect(extend?.transitionDuration).toBeDefined();
      expect(extend?.transitionTimingFunction).toBeDefined();
      expect(extend?.keyframes).toBeDefined();
      expect(extend?.animation).toBeDefined();

      // Essential for layout
      expect(extend?.screens).toBeDefined();
      expect(extend?.zIndex).toBeDefined();
    });

    it('should not override default Tailwind config', () => {
      // Ensure we're extending, not replacing
      expect(fluxwindConfig.theme?.extend).toBeDefined();
      expect(fluxwindConfig.theme?.colors).toBeUndefined(); // Should not replace root colors
    });
  });
});
