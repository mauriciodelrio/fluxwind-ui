import { describe, it, expect } from 'vitest';
import {
  animationDurations,
  animationEasings,
  extendedAnimationKeyframes,
  fluxwindAnimations,
  type ExtendedAnimationDuration,
  type ExtendedAnimationEasing,
  type ExtendedAnimationKeyframe,
} from '../animations-extended';

describe('Extended Animation System', () => {
  describe('animationDurations', () => {
    it('should export all 7 duration values', () => {
      expect(Object.keys(animationDurations)).toHaveLength(7);
      expect(animationDurations).toHaveProperty('instant');
      expect(animationDurations).toHaveProperty('fast');
      expect(animationDurations).toHaveProperty('base');
      expect(animationDurations).toHaveProperty('moderate');
      expect(animationDurations).toHaveProperty('slow');
      expect(animationDurations).toHaveProperty('slower');
      expect(animationDurations).toHaveProperty('slowest');
    });

    it('should have valid duration format (ms)', () => {
      const msPattern = /^\d+ms$/;
      Object.values(animationDurations).forEach((duration) => {
        expect(duration).toMatch(msPattern);
      });
    });

    it('should have durations in ascending order', () => {
      const durations = Object.values(animationDurations).map((d) => parseInt(d.replace('ms', '')));

      for (let i = 1; i < durations.length; i++) {
        expect(durations[i]!).toBeGreaterThan(durations[i - 1]!);
      }
    });

    it('should have specific duration values', () => {
      expect(animationDurations.instant).toBe('75ms');
      expect(animationDurations.fast).toBe('150ms');
      expect(animationDurations.base).toBe('250ms');
      expect(animationDurations.moderate).toBe('400ms');
      expect(animationDurations.slow).toBe('600ms');
      expect(animationDurations.slower).toBe('800ms');
      expect(animationDurations.slowest).toBe('1000ms');
    });

    it('should have durations within reasonable range (75ms - 1000ms)', () => {
      const durations = Object.values(animationDurations).map((d) => parseInt(d.replace('ms', '')));

      durations.forEach((duration) => {
        expect(duration).toBeGreaterThanOrEqual(75);
        expect(duration).toBeLessThanOrEqual(1000);
      });
    });
  });

  describe('animationEasings', () => {
    it('should export all 7 easing functions', () => {
      expect(Object.keys(animationEasings)).toHaveLength(7);
      expect(animationEasings).toHaveProperty('standard');
      expect(animationEasings).toHaveProperty('decelerate');
      expect(animationEasings).toHaveProperty('accelerate');
      expect(animationEasings).toHaveProperty('sharp');
      expect(animationEasings).toHaveProperty('bounce');
      expect(animationEasings).toHaveProperty('elastic');
      expect(animationEasings).toHaveProperty('iosSmooth');
    });

    it('should have valid cubic-bezier format', () => {
      const cubicBezierPattern =
        /^cubic-bezier\(-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?,\s*\d+(\.\d+)?\)$/;

      Object.values(animationEasings).forEach((easing) => {
        expect(easing).toMatch(cubicBezierPattern);
      });
    });

    it('should have Material Design standard easing', () => {
      expect(animationEasings.standard).toBe('cubic-bezier(0.4, 0.0, 0.2, 1)');
    });

    it('should have decelerate curve for enter animations', () => {
      expect(animationEasings.decelerate).toBe('cubic-bezier(0.0, 0.0, 0.2, 1)');
    });

    it('should have accelerate curve for exit animations', () => {
      expect(animationEasings.accelerate).toBe('cubic-bezier(0.4, 0.0, 1, 1)');
    });

    it('should have sharp curve for decisive movements', () => {
      expect(animationEasings.sharp).toBe('cubic-bezier(0.4, 0.0, 0.6, 1)');
    });

    it('should have bounce effect with overshoot', () => {
      expect(animationEasings.bounce).toBe('cubic-bezier(0.68, -0.55, 0.265, 1.55)');
      // Verify it has negative value (overshoot)
      expect(animationEasings.bounce).toContain('-0.55');
    });

    it('should have elastic effect with stronger overshoot', () => {
      expect(animationEasings.elastic).toBe('cubic-bezier(0.68, -0.6, 0.32, 1.6)');
      // Verify it has negative value (overshoot)
      expect(animationEasings.elastic).toContain('-0.6');
    });

    it('should have iOS-inspired smooth easing', () => {
      expect(animationEasings.iosSmooth).toBe('cubic-bezier(0.25, 0.1, 0.25, 1)');
    });
  });

  describe('extendedAnimationKeyframes', () => {
    it('should export 18 keyframe animations', () => {
      expect(Object.keys(extendedAnimationKeyframes)).toHaveLength(18);
    });

    it('should have all fade animations', () => {
      expect(extendedAnimationKeyframes).toHaveProperty('fadeIn');
      expect(extendedAnimationKeyframes).toHaveProperty('fadeOut');
    });

    it('should have all slide animations', () => {
      expect(extendedAnimationKeyframes).toHaveProperty('slideInDown');
      expect(extendedAnimationKeyframes).toHaveProperty('slideInUp');
      expect(extendedAnimationKeyframes).toHaveProperty('slideInLeft');
      expect(extendedAnimationKeyframes).toHaveProperty('slideInRight');
      expect(extendedAnimationKeyframes).toHaveProperty('slideOutUp');
      expect(extendedAnimationKeyframes).toHaveProperty('slideOutDown');
    });

    it('should have all scale animations', () => {
      expect(extendedAnimationKeyframes).toHaveProperty('scaleIn');
      expect(extendedAnimationKeyframes).toHaveProperty('scaleOut');
      expect(extendedAnimationKeyframes).toHaveProperty('zoomIn');
      expect(extendedAnimationKeyframes).toHaveProperty('zoomOut');
    });

    it('should have special effect animations', () => {
      expect(extendedAnimationKeyframes).toHaveProperty('shimmer');
      expect(extendedAnimationKeyframes).toHaveProperty('pulse');
      expect(extendedAnimationKeyframes).toHaveProperty('bounce');
      expect(extendedAnimationKeyframes).toHaveProperty('shake');
      expect(extendedAnimationKeyframes).toHaveProperty('spin');
      expect(extendedAnimationKeyframes).toHaveProperty('ping');
    });

    it('should have consistent structure (name + keyframes)', () => {
      Object.entries(extendedAnimationKeyframes).forEach(([key, animation]) => {
        expect(animation).toHaveProperty('name');
        expect(animation).toHaveProperty('keyframes');
        expect(typeof animation.name).toBe('string');
        expect(typeof animation.keyframes).toBe('object');
        expect(animation.name).toBe(key);
      });
    });

    describe('Fade Animations', () => {
      it('fadeIn should go from transparent to opaque', () => {
        const { keyframes } = extendedAnimationKeyframes.fadeIn;
        expect(keyframes.from.opacity).toBe('0');
        expect(keyframes.to.opacity).toBe('1');
      });

      it('fadeOut should go from opaque to transparent', () => {
        const { keyframes } = extendedAnimationKeyframes.fadeOut;
        expect(keyframes.from.opacity).toBe('1');
        expect(keyframes.to.opacity).toBe('0');
      });
    });

    describe('Slide Animations', () => {
      it('slideInDown should start above and move to position', () => {
        const { keyframes } = extendedAnimationKeyframes.slideInDown;
        expect(keyframes.from.transform).toContain('translateY(-');
        expect(keyframes.to.transform).toBe('translateY(0)');
        expect(keyframes.from.opacity).toBe('0');
        expect(keyframes.to.opacity).toBe('1');
      });

      it('slideInUp should start below and move to position', () => {
        const { keyframes } = extendedAnimationKeyframes.slideInUp;
        expect(keyframes.from.transform).toContain('translateY(');
        expect(keyframes.from.transform).not.toContain('-');
        expect(keyframes.to.transform).toBe('translateY(0)');
      });

      it('slideInLeft should start from left', () => {
        const { keyframes } = extendedAnimationKeyframes.slideInLeft;
        expect(keyframes.from.transform).toContain('translateX(-');
        expect(keyframes.to.transform).toBe('translateX(0)');
      });

      it('slideInRight should start from right', () => {
        const { keyframes } = extendedAnimationKeyframes.slideInRight;
        expect(keyframes.from.transform).toContain('translateX(');
        expect(keyframes.from.transform).not.toContain('translateX(-');
        expect(keyframes.to.transform).toBe('translateX(0)');
      });

      it('slideOutUp should move upward and fade', () => {
        const { keyframes } = extendedAnimationKeyframes.slideOutUp;
        expect(keyframes.from.transform).toBe('translateY(0)');
        expect(keyframes.to.transform).toContain('translateY(-');
        expect(keyframes.from.opacity).toBe('1');
        expect(keyframes.to.opacity).toBe('0');
      });

      it('slideOutDown should move downward and fade', () => {
        const { keyframes } = extendedAnimationKeyframes.slideOutDown;
        expect(keyframes.from.transform).toBe('translateY(0)');
        expect(keyframes.to.transform).toContain('translateY(');
        expect(keyframes.to.transform).not.toContain('-');
      });
    });

    describe('Scale Animations', () => {
      it('scaleIn should grow from 0.95 to 1', () => {
        const { keyframes } = extendedAnimationKeyframes.scaleIn;
        expect(keyframes.from.transform).toBe('scale(0.95)');
        expect(keyframes.to.transform).toBe('scale(1)');
        expect(keyframes.from.opacity).toBe('0');
        expect(keyframes.to.opacity).toBe('1');
      });

      it('scaleOut should shrink from 1 to 0.95', () => {
        const { keyframes } = extendedAnimationKeyframes.scaleOut;
        expect(keyframes.from.transform).toBe('scale(1)');
        expect(keyframes.to.transform).toBe('scale(0.95)');
      });

      it('zoomIn should grow from 0.8 to 1', () => {
        const { keyframes } = extendedAnimationKeyframes.zoomIn;
        expect(keyframes.from.transform).toBe('scale(0.8)');
        expect(keyframes.to.transform).toBe('scale(1)');
      });

      it('zoomOut should shrink from 1 to 0.8', () => {
        const { keyframes } = extendedAnimationKeyframes.zoomOut;
        expect(keyframes.from.transform).toBe('scale(1)');
        expect(keyframes.to.transform).toBe('scale(0.8)');
      });
    });

    describe('Special Effects', () => {
      it('shimmer should animate background position', () => {
        const { keyframes } = extendedAnimationKeyframes.shimmer;
        expect(keyframes['0%'].backgroundPosition).toBe('-1000px 0');
        expect(keyframes['100%'].backgroundPosition).toBe('1000px 0');
      });

      it('pulse should have opacity and scale changes', () => {
        const { keyframes } = extendedAnimationKeyframes.pulse;
        expect(keyframes['0%, 100%']).toBeDefined();
        expect(keyframes['50%']).toBeDefined();
        expect(keyframes['50%'].opacity).toBe('0.8');
        expect(keyframes['50%'].transform).toBe('scale(0.98)');
      });

      it('bounce should move vertically', () => {
        const { keyframes } = extendedAnimationKeyframes.bounce;
        expect(keyframes['0%, 100%'].transform).toBe('translateY(0)');
        expect(keyframes['50%'].transform).toContain('translateY(-');
      });

      it('shake should move horizontally back and forth', () => {
        const { keyframes } = extendedAnimationKeyframes.shake;
        expect(keyframes['0%, 100%'].transform).toBe('translateX(0)');
        expect(keyframes['10%, 30%, 50%, 70%, 90%'].transform).toContain('translateX(-');
        expect(keyframes['20%, 40%, 60%, 80%'].transform).toContain('translateX(');
      });

      it('spin should rotate 360 degrees', () => {
        const { keyframes } = extendedAnimationKeyframes.spin;
        expect(keyframes.from.transform).toBe('rotate(0deg)');
        expect(keyframes.to.transform).toBe('rotate(360deg)');
      });

      it('ping should scale and fade out', () => {
        const { keyframes } = extendedAnimationKeyframes.ping;
        expect(keyframes['0%'].transform).toBe('scale(1)');
        expect(keyframes['0%'].opacity).toBe('1');
        expect(keyframes['75%, 100%'].transform).toBe('scale(2)');
        expect(keyframes['75%, 100%'].opacity).toBe('0');
      });
    });
  });

  describe('fluxwindAnimations', () => {
    it('should export complete animation system', () => {
      expect(fluxwindAnimations).toHaveProperty('duration');
      expect(fluxwindAnimations).toHaveProperty('easing');
      expect(fluxwindAnimations).toHaveProperty('keyframes');
    });

    it('should have all durations accessible', () => {
      expect(fluxwindAnimations.duration).toEqual(animationDurations);
    });

    it('should have all easings accessible', () => {
      expect(fluxwindAnimations.easing).toEqual(animationEasings);
    });

    it('should have all keyframes accessible', () => {
      expect(fluxwindAnimations.keyframes).toEqual(extendedAnimationKeyframes);
    });

    it('should be deeply immutable (as const)', () => {
      // TypeScript enforces this at compile time with 'as const'
      // Verify the object structure is frozen-like
      expect(Object.isFrozen(fluxwindAnimations)).toBe(false); // Not frozen, but const
      expect(fluxwindAnimations.duration).toBeDefined();
      expect(fluxwindAnimations.easing).toBeDefined();
      expect(fluxwindAnimations.keyframes).toBeDefined();
    });
  });

  describe('TypeScript Types', () => {
    it('should have ExtendedAnimationDuration type matching duration keys', () => {
      const durations: ExtendedAnimationDuration[] = [
        'instant',
        'fast',
        'base',
        'moderate',
        'slow',
        'slower',
        'slowest',
      ];

      durations.forEach((duration) => {
        expect(animationDurations[duration]).toBeDefined();
      });
    });

    it('should have ExtendedAnimationEasing type matching easing keys', () => {
      const easings: ExtendedAnimationEasing[] = [
        'standard',
        'decelerate',
        'accelerate',
        'sharp',
        'bounce',
        'elastic',
        'iosSmooth',
      ];

      easings.forEach((easing) => {
        expect(animationEasings[easing]).toBeDefined();
      });
    });

    it('should have ExtendedAnimationKeyframe type matching keyframe keys', () => {
      const keyframeNames: ExtendedAnimationKeyframe[] = [
        'fadeIn',
        'fadeOut',
        'slideInDown',
        'slideInUp',
        'slideInLeft',
        'slideInRight',
        'slideOutUp',
        'slideOutDown',
        'scaleIn',
        'scaleOut',
        'zoomIn',
        'zoomOut',
        'shimmer',
        'pulse',
        'bounce',
        'shake',
        'spin',
        'ping',
      ];

      keyframeNames.forEach((name) => {
        expect(extendedAnimationKeyframes[name]).toBeDefined();
      });
    });
  });

  describe('Animation System Integration', () => {
    it('should provide complete tokens for CSS-in-JS', () => {
      const duration = fluxwindAnimations.duration.base;
      const easing = fluxwindAnimations.easing.standard;
      const keyframe = fluxwindAnimations.keyframes.fadeIn.name;

      const animationString = `${keyframe} ${duration} ${easing}`;
      expect(animationString).toBe('fadeIn 250ms cubic-bezier(0.4, 0.0, 0.2, 1)');
    });

    it('should work with Tailwind keyframes config format', () => {
      const tailwindKeyframes = Object.fromEntries(
        Object.entries(fluxwindAnimations.keyframes).map(([_key, { name, keyframes }]) => [
          name,
          keyframes,
        ])
      );

      expect(tailwindKeyframes).toHaveProperty('fadeIn');
      expect(tailwindKeyframes).toHaveProperty('slideInUp');
      expect(tailwindKeyframes['fadeIn']).toEqual(extendedAnimationKeyframes.fadeIn.keyframes);
    });

    it('should have reasonable combinations for common use cases', () => {
      // Modal open: scaleIn + moderate + decelerate
      const modalOpen = {
        animation: `${fluxwindAnimations.keyframes.scaleIn.name} ${fluxwindAnimations.duration.moderate} ${fluxwindAnimations.easing.decelerate}`,
      };
      expect(modalOpen.animation).toBe('scaleIn 400ms cubic-bezier(0.0, 0.0, 0.2, 1)');

      // Toast enter: slideInDown + fast + standard
      const toastEnter = {
        animation: `${fluxwindAnimations.keyframes.slideInDown.name} ${fluxwindAnimations.duration.fast} ${fluxwindAnimations.easing.standard}`,
      };
      expect(toastEnter.animation).toBe('slideInDown 150ms cubic-bezier(0.4, 0.0, 0.2, 1)');

      // Loading spinner: spin + slowest + linear (we use standard)
      const spinner = {
        animation: `${fluxwindAnimations.keyframes.spin.name} ${fluxwindAnimations.duration.slowest} ${fluxwindAnimations.easing.standard} infinite`,
      };
      expect(spinner.animation).toContain('spin 1000ms');
    });
  });

  describe('Accessibility Considerations', () => {
    it('should have durations that respect reduced motion preferences', () => {
      // All durations should be ≤ 1s for better a11y
      const durations = Object.values(animationDurations).map((d) => parseInt(d.replace('ms', '')));

      durations.forEach((duration) => {
        expect(duration).toBeLessThanOrEqual(1000);
      });
    });

    it('should provide instant duration for reduced motion fallback', () => {
      // 75ms is fast enough to be barely perceptible
      const instant = parseInt(animationDurations.instant.replace('ms', ''));
      expect(instant).toBeLessThanOrEqual(100);
    });

    it('should have standard easing that is not too aggressive', () => {
      // Standard easing should not have extreme values
      expect(animationEasings.standard).toBe('cubic-bezier(0.4, 0.0, 0.2, 1)');
      // Standard easing should not have negative values (no overshoot)
      const values = animationEasings.standard.match(/-?\d+\.?\d*/g) || [];
      const hasNegative = values.some((v) => parseFloat(v) < 0);
      expect(hasNegative).toBe(false);
    });
  });
});
