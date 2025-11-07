import type { Config } from 'tailwindcss';
import {
  colorTokens,
  customColors,
  spacingTokens,
  typographyTokens,
  shadowTokens,
  semanticShadows,
  coloredShadows,
  animationDuration,
  animationEasing,
  animationKeyframes,
  borderWidth,
  borderRadius,
  breakpointTokens,
  zIndexTokens,
} from './tokens';

/**
 * Fluxwind UI complete Tailwind configuration
 * Includes all design tokens and custom utilities
 */
export const fluxwindConfig: Partial<Config> = {
  theme: {
    extend: {
      // ===== COLORS =====
      colors: {
        ...colorTokens,
        // Expose custom colors at root level for easier access
        ocean: customColors.ocean,
        tangerine: customColors.tangerine,
        sapphire: customColors.sapphire,
        mint: customColors.mint,
        lavender: customColors.lavender,
        coral: customColors.coral,
        electric: customColors.electric,
      },

      // ===== SPACING =====
      spacing: spacingTokens,

      // ===== TYPOGRAPHY =====
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fontFamily: typographyTokens.fontFamily as any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fontSize: typographyTokens.fontSize as any,
      fontWeight: typographyTokens.fontWeight,
      letterSpacing: typographyTokens.letterSpacing,
      lineHeight: typographyTokens.lineHeight,

      // ===== SHADOWS =====
      boxShadow: {
        ...shadowTokens,
        // Add semantic shadows
        ...semanticShadows,
        // Add colored shadows
        ...coloredShadows,
      },

      // ===== BORDERS =====
      borderWidth: borderWidth,
      borderRadius: borderRadius,

      // ===== BREAKPOINTS =====
      screens: breakpointTokens,

      // ===== Z-INDEX =====
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      zIndex: zIndexTokens as any,

      // ===== ANIMATIONS =====
      // Animation durations
      transitionDuration: animationDuration,

      // Animation easing
      transitionTimingFunction: animationEasing,

      // Keyframe animations
      keyframes: animationKeyframes,

      // Pre-configured animations
      animation: {
        // Fade animations
        'fade-in': `fadeIn ${animationDuration.fast} ${animationEasing.easeOut}`,
        'fade-out': `fadeOut ${animationDuration.fast} ${animationEasing.easeIn}`,

        // Slide animations
        'slide-in-up': `slideInUp ${animationDuration.moderate} ${animationEasing.easeOut}`,
        'slide-in-down': `slideInDown ${animationDuration.moderate} ${animationEasing.easeOut}`,
        'slide-in-left': `slideInLeft ${animationDuration.moderate} ${animationEasing.easeOut}`,
        'slide-in-right': `slideInRight ${animationDuration.moderate} ${animationEasing.easeOut}`,
        'slide-out-up': `slideOutUp ${animationDuration.moderate} ${animationEasing.easeIn}`,
        'slide-out-down': `slideOutDown ${animationDuration.moderate} ${animationEasing.easeIn}`,
        'slide-out-left': `slideOutLeft ${animationDuration.moderate} ${animationEasing.easeIn}`,
        'slide-out-right': `slideOutRight ${animationDuration.moderate} ${animationEasing.easeIn}`,

        // Scale animations
        'scale-in': `scaleIn ${animationDuration.fast} ${animationEasing.easeOut}`,
        'scale-out': `scaleOut ${animationDuration.fast} ${animationEasing.easeIn}`,
        'zoom-in': `zoomIn ${animationDuration.moderate} ${animationEasing.elastic}`,
        'zoom-out': `zoomOut ${animationDuration.moderate} ${animationEasing.elastic}`,

        // Spin animations
        spin: `spin ${animationDuration.slowest} ${animationEasing.linear} infinite`,
        'spin-reverse': `spinReverse ${animationDuration.slowest} ${animationEasing.linear} infinite`,

        // Pulse & heartbeat
        pulse: `pulse ${animationDuration.slower} ${animationEasing.easeInOut} infinite`,
        heartbeat: `heartbeat ${animationDuration.slowest} ${animationEasing.easeInOut} infinite`,

        // Shake & wobble (for errors)
        shake: `shake ${animationDuration.moderate} ${animationEasing.easeInOut}`,
        'shake-vertical': `shakeVertical ${animationDuration.moderate} ${animationEasing.easeInOut}`,
        wobble: `wobble ${animationDuration.slow} ${animationEasing.easeInOut}`,

        // Bounce
        'bounce-in': `bounceIn ${animationDuration.slow} ${animationEasing.bounce}`,
        'bounce-out': `bounceOut ${animationDuration.slow} ${animationEasing.bounce}`,
        bounce: `bounce ${animationDuration.slowest} ${animationEasing.bounce} infinite`,

        // Loading states
        shimmer: `shimmer ${animationDuration.slower} ${animationEasing.linear} infinite`,
        skeleton: `skeleton ${animationDuration.slower} ${animationEasing.easeInOut} infinite`,

        // Hover effects
        wave: `wave ${animationDuration.slow} ${animationEasing.easeInOut} infinite`,
        float: `float ${animationDuration.slower} ${animationEasing.easeInOut} infinite`,

        // Swing & pendulum
        swing: `swing ${animationDuration.slowest} ${animationEasing.easeInOut}`,
        pendulum: `pendulum ${animationDuration.slower} ${animationEasing.easeInOut} infinite`,

        // Flip
        'flip-x': `flipX ${animationDuration.slow} ${animationEasing.easeInOut}`,
        'flip-y': `flipY ${animationDuration.slow} ${animationEasing.easeInOut}`,

        // Effects
        glow: `glow ${animationDuration.slower} ${animationEasing.easeInOut} infinite`,
        flash: `flash ${animationDuration.slowest} ${animationEasing.linear} infinite`,
      },
    },
  },

  // Plugins can be added here
  plugins: [],
};

// Re-export tokens for direct access
export * from './tokens';
export * from './themes';
