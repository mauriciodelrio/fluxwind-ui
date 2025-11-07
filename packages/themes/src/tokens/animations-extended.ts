/**
 * Extended Animation System for Fluxwind Design System
 *
 * Provides advanced animation tokens including:
 * - Duration scales (instant to slowest)
 * - Easing functions (Material Design + iOS inspired)
 * - Keyframe animations (fade, slide, scale, etc.)
 *
 * @packageDocumentation
 */

/**
 * Animation duration values in milliseconds
 *
 * @remarks
 * Use shorter durations for micro-interactions (hover, focus)
 * Use longer durations for complex state changes (modal open, page transitions)
 */
export const animationDurations = {
  /** 75ms - Instant feedback (checkbox, switch toggle) */
  instant: '75ms',

  /** 150ms - Fast interactions (button hover, tooltip show) */
  fast: '150ms',

  /** 250ms - Base duration (most interactions, default) */
  base: '250ms',

  /** 400ms - Moderate (tab switch, accordion expand) */
  moderate: '400ms',

  /** 600ms - Slow (modal open, drawer slide) */
  slow: '600ms',

  /** 800ms - Slower (page transitions, complex animations) */
  slower: '800ms',

  /** 1000ms - Slowest (decorative animations, loading states) */
  slowest: '1000ms',
} as const;

/**
 * Animation easing functions
 *
 * @remarks
 * - standard: Material Design standard easing (most common)
 * - decelerate: Starts fast, ends slow (enter animations)
 * - accelerate: Starts slow, ends fast (exit animations)
 * - sharp: Quick and decisive (alerts, toasts)
 * - bounce: Playful overshoot (success states, CTAs)
 * - elastic: Stronger overshoot (attention-grabbing)
 * - iosSmooth: iOS-inspired natural motion
 */
export const animationEasings = {
  /** Material Design standard easing - versatile for most animations */
  standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',

  /** Deceleration curve - elements entering the screen */
  decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)',

  /** Acceleration curve - elements leaving the screen */
  accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)',

  /** Sharp curve - quick and decisive movements */
  sharp: 'cubic-bezier(0.4, 0.0, 0.6, 1)',

  /** Bounce effect - playful overshoot */
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',

  /** Elastic effect - stronger overshoot for attention */
  elastic: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',

  /** iOS-inspired smooth easing */
  iosSmooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
} as const;

/**
 * Extended keyframe animations ready to use
 *
 * @remarks
 * Use these with CSS animation property:
 * ```css
 * animation: fadeIn 250ms cubic-bezier(0.4, 0.0, 0.2, 1);
 * ```
 */
export const extendedAnimationKeyframes = {
  /** Fade in from transparent to opaque */
  fadeIn: {
    name: 'fadeIn',
    keyframes: {
      from: { opacity: '0' },
      to: { opacity: '1' },
    },
  },

  /** Fade out from opaque to transparent */
  fadeOut: {
    name: 'fadeOut',
    keyframes: {
      from: { opacity: '1' },
      to: { opacity: '0' },
    },
  },

  /** Slide in from top */
  slideInDown: {
    name: 'slideInDown',
    keyframes: {
      from: {
        opacity: '0',
        transform: 'translateY(-16px)',
      },
      to: {
        opacity: '1',
        transform: 'translateY(0)',
      },
    },
  },

  /** Slide in from bottom */
  slideInUp: {
    name: 'slideInUp',
    keyframes: {
      from: {
        opacity: '0',
        transform: 'translateY(16px)',
      },
      to: {
        opacity: '1',
        transform: 'translateY(0)',
      },
    },
  },

  /** Slide in from left */
  slideInLeft: {
    name: 'slideInLeft',
    keyframes: {
      from: {
        opacity: '0',
        transform: 'translateX(-16px)',
      },
      to: {
        opacity: '1',
        transform: 'translateX(0)',
      },
    },
  },

  /** Slide in from right */
  slideInRight: {
    name: 'slideInRight',
    keyframes: {
      from: {
        opacity: '0',
        transform: 'translateX(16px)',
      },
      to: {
        opacity: '1',
        transform: 'translateX(0)',
      },
    },
  },

  /** Slide out to top */
  slideOutUp: {
    name: 'slideOutUp',
    keyframes: {
      from: {
        opacity: '1',
        transform: 'translateY(0)',
      },
      to: {
        opacity: '0',
        transform: 'translateY(-16px)',
      },
    },
  },

  /** Slide out to bottom */
  slideOutDown: {
    name: 'slideOutDown',
    keyframes: {
      from: {
        opacity: '1',
        transform: 'translateY(0)',
      },
      to: {
        opacity: '0',
        transform: 'translateY(16px)',
      },
    },
  },

  /** Scale in (grow from center) */
  scaleIn: {
    name: 'scaleIn',
    keyframes: {
      from: {
        opacity: '0',
        transform: 'scale(0.95)',
      },
      to: {
        opacity: '1',
        transform: 'scale(1)',
      },
    },
  },

  /** Scale out (shrink to center) */
  scaleOut: {
    name: 'scaleOut',
    keyframes: {
      from: {
        opacity: '1',
        transform: 'scale(1)',
      },
      to: {
        opacity: '0',
        transform: 'scale(0.95)',
      },
    },
  },

  /** Zoom in (grow with slight fade) */
  zoomIn: {
    name: 'zoomIn',
    keyframes: {
      from: {
        opacity: '0',
        transform: 'scale(0.8)',
      },
      to: {
        opacity: '1',
        transform: 'scale(1)',
      },
    },
  },

  /** Zoom out (shrink with fade) */
  zoomOut: {
    name: 'zoomOut',
    keyframes: {
      from: {
        opacity: '1',
        transform: 'scale(1)',
      },
      to: {
        opacity: '0',
        transform: 'scale(0.8)',
      },
    },
  },

  /** Shimmer effect for loading states */
  shimmer: {
    name: 'shimmer',
    keyframes: {
      '0%': {
        backgroundPosition: '-1000px 0',
      },
      '100%': {
        backgroundPosition: '1000px 0',
      },
    },
  },

  /** Pulse effect (scale subtly) */
  pulse: {
    name: 'pulse',
    keyframes: {
      '0%, 100%': {
        opacity: '1',
        transform: 'scale(1)',
      },
      '50%': {
        opacity: '0.8',
        transform: 'scale(0.98)',
      },
    },
  },

  /** Bounce effect */
  bounce: {
    name: 'bounce',
    keyframes: {
      '0%, 100%': {
        transform: 'translateY(0)',
      },
      '50%': {
        transform: 'translateY(-8px)',
      },
    },
  },

  /** Shake effect (for errors) */
  shake: {
    name: 'shake',
    keyframes: {
      '0%, 100%': {
        transform: 'translateX(0)',
      },
      '10%, 30%, 50%, 70%, 90%': {
        transform: 'translateX(-4px)',
      },
      '20%, 40%, 60%, 80%': {
        transform: 'translateX(4px)',
      },
    },
  },

  /** Spin (loading indicator) */
  spin: {
    name: 'spin',
    keyframes: {
      from: {
        transform: 'rotate(0deg)',
      },
      to: {
        transform: 'rotate(360deg)',
      },
    },
  },

  /** Ping effect (ripple outward) */
  ping: {
    name: 'ping',
    keyframes: {
      '0%': {
        transform: 'scale(1)',
        opacity: '1',
      },
      '75%, 100%': {
        transform: 'scale(2)',
        opacity: '0',
      },
    },
  },
} as const;

/**
 * TypeScript types for extended animation tokens
 */
export type ExtendedAnimationDuration = keyof typeof animationDurations;
export type ExtendedAnimationEasing = keyof typeof animationEasings;
export type ExtendedAnimationKeyframe = keyof typeof extendedAnimationKeyframes;

/**
 * Complete Fluxwind animation system
 *
 * @example
 * ```tsx
 * import { fluxwindAnimations } from '@fluxwind/themes';
 *
 * // Use in CSS-in-JS
 * const styles = {
 *   animation: `${fluxwindAnimations.keyframes.fadeIn.name}
 *               ${fluxwindAnimations.duration.base}
 *               ${fluxwindAnimations.easing.standard}`
 * };
 *
 * // Use with Tailwind config
 * module.exports = {
 *   theme: {
 *     extend: {
 *       transitionDuration: fluxwindAnimations.duration,
 *       transitionTimingFunction: fluxwindAnimations.easing,
 *       keyframes: Object.fromEntries(
 *         Object.entries(fluxwindAnimations.keyframes).map(
 *           ([key, { name, keyframes }]) => [name, keyframes]
 *         )
 *       ),
 *     }
 *   }
 * }
 * ```
 */
export const fluxwindAnimations = {
  duration: animationDurations,
  easing: animationEasings,
  keyframes: extendedAnimationKeyframes,
} as const;

export type FluxwindAnimations = typeof fluxwindAnimations;
