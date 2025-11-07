/**
 * Animation tokens for Fluxwind UI
 * Includes timing, easing, and keyframe animations
 */

/**
 * Animation durations
 * Extended range for more control
 */
export const animationDuration = {
  instant: '50ms',
  fast: '150ms',
  base: '200ms',
  moderate: '300ms',
  slow: '500ms',
  slower: '700ms',
  slowest: '1000ms',
} as const;

/**
 * Animation easing functions
 * Includes Material Design and iOS-inspired easings
 */
export const animationEasing = {
  // CSS Standard
  linear: 'linear',
  ease: 'ease',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',

  // Material Design
  standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)', // Smooth entrance and exit
  decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)', // Elements entering screen
  accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)', // Elements leaving screen
  sharp: 'cubic-bezier(0.4, 0.0, 0.6, 1)', // Quick and defined

  // iOS-inspired
  iosSmooth: 'cubic-bezier(0.36, 0, 0.66, -0.56)', // Soft bounce

  // Premium custom easings
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', // Elastic bounce
  elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', // Elastic effect
  smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Ultra smooth
  anticipate: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', // Anticipate movement
} as const;

/**
 * Keyframe animations
 * Ready-to-use animation presets
 */
export const animationKeyframes = {
  // ===== FADE ANIMATIONS =====
  fadeIn: {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' },
  },
  fadeOut: {
    '0%': { opacity: '1' },
    '100%': { opacity: '0' },
  },

  // ===== SLIDE ANIMATIONS =====
  slideInUp: {
    '0%': { transform: 'translateY(100%)', opacity: '0' },
    '100%': { transform: 'translateY(0)', opacity: '1' },
  },
  slideInDown: {
    '0%': { transform: 'translateY(-100%)', opacity: '0' },
    '100%': { transform: 'translateY(0)', opacity: '1' },
  },
  slideInLeft: {
    '0%': { transform: 'translateX(-100%)', opacity: '0' },
    '100%': { transform: 'translateX(0)', opacity: '1' },
  },
  slideInRight: {
    '0%': { transform: 'translateX(100%)', opacity: '0' },
    '100%': { transform: 'translateX(0)', opacity: '1' },
  },
  slideOutUp: {
    '0%': { transform: 'translateY(0)', opacity: '1' },
    '100%': { transform: 'translateY(-100%)', opacity: '0' },
  },
  slideOutDown: {
    '0%': { transform: 'translateY(0)', opacity: '1' },
    '100%': { transform: 'translateY(100%)', opacity: '0' },
  },
  slideOutLeft: {
    '0%': { transform: 'translateX(0)', opacity: '1' },
    '100%': { transform: 'translateX(-100%)', opacity: '0' },
  },
  slideOutRight: {
    '0%': { transform: 'translateX(0)', opacity: '1' },
    '100%': { transform: 'translateX(100%)', opacity: '0' },
  },

  // ===== SCALE ANIMATIONS =====
  scaleIn: {
    '0%': { transform: 'scale(0.9)', opacity: '0' },
    '100%': { transform: 'scale(1)', opacity: '1' },
  },
  scaleOut: {
    '0%': { transform: 'scale(1)', opacity: '1' },
    '100%': { transform: 'scale(0.9)', opacity: '0' },
  },

  // ===== ZOOM ANIMATIONS =====
  zoomIn: {
    '0%': { transform: 'scale(0)', opacity: '0' },
    '100%': { transform: 'scale(1)', opacity: '1' },
  },
  zoomOut: {
    '0%': { transform: 'scale(1)', opacity: '1' },
    '100%': { transform: 'scale(0)', opacity: '0' },
  },

  // ===== ROTATE & SPIN =====
  spin: {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
  spinReverse: {
    '0%': { transform: 'rotate(360deg)' },
    '100%': { transform: 'rotate(0deg)' },
  },

  // ===== PULSE & HEARTBEAT =====
  pulse: {
    '0%, 100%': { opacity: '1' },
    '50%': { opacity: '0.5' },
  },
  heartbeat: {
    '0%, 100%': { transform: 'scale(1)' },
    '10%, 30%': { transform: 'scale(1.1)' },
    '20%, 40%': { transform: 'scale(1)' },
  },

  // ===== SHAKE & WOBBLE (Error states) =====
  shake: {
    '0%, 100%': { transform: 'translateX(0)' },
    '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-10px)' },
    '20%, 40%, 60%, 80%': { transform: 'translateX(10px)' },
  },
  shakeVertical: {
    '0%, 100%': { transform: 'translateY(0)' },
    '10%, 30%, 50%, 70%, 90%': { transform: 'translateY(-10px)' },
    '20%, 40%, 60%, 80%': { transform: 'translateY(10px)' },
  },
  wobble: {
    '0%, 100%': { transform: 'rotate(0deg)' },
    '25%': { transform: 'rotate(-5deg)' },
    '75%': { transform: 'rotate(5deg)' },
  },

  // ===== BOUNCE ANIMATIONS =====
  bounceIn: {
    '0%': { transform: 'scale(0.3)', opacity: '0' },
    '50%': { transform: 'scale(1.05)' },
    '70%': { transform: 'scale(0.9)' },
    '100%': { transform: 'scale(1)', opacity: '1' },
  },
  bounceOut: {
    '0%': { transform: 'scale(1)', opacity: '1' },
    '25%': { transform: 'scale(0.95)' },
    '50%': { transform: 'scale(1.1)' },
    '100%': { transform: 'scale(0.3)', opacity: '0' },
  },
  bounce: {
    '0%, 100%': {
      transform: 'translateY(-25%)',
      animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
    },
    '50%': {
      transform: 'translateY(0)',
      animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
    },
  },

  // ===== SHIMMER & LOADING =====
  shimmer: {
    '0%': {
      backgroundPosition: '-1000px 0',
    },
    '100%': {
      backgroundPosition: '1000px 0',
    },
  },
  skeleton: {
    '0%': { opacity: '1' },
    '50%': { opacity: '0.4' },
    '100%': { opacity: '1' },
  },

  // ===== WAVE & FLOAT =====
  wave: {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-5px)' },
  },
  float: {
    '0%, 100%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-10px)' },
  },

  // ===== SWING & PENDULUM =====
  swing: {
    '20%': { transform: 'rotate(15deg)' },
    '40%': { transform: 'rotate(-10deg)' },
    '60%': { transform: 'rotate(5deg)' },
    '80%': { transform: 'rotate(-5deg)' },
    '100%': { transform: 'rotate(0deg)' },
  },
  pendulum: {
    '0%': { transform: 'rotate(-10deg)' },
    '50%': { transform: 'rotate(10deg)' },
    '100%': { transform: 'rotate(-10deg)' },
  },

  // ===== FLIP ANIMATIONS =====
  flipX: {
    '0%': { transform: 'rotateX(0deg)' },
    '100%': { transform: 'rotateX(360deg)' },
  },
  flipY: {
    '0%': { transform: 'rotateY(0deg)' },
    '100%': { transform: 'rotateY(360deg)' },
  },

  // ===== GLOW & FLASH =====
  glow: {
    '0%, 100%': { boxShadow: '0 0 5px rgba(59, 130, 246, 0.5)' },
    '50%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.8)' },
  },
  flash: {
    '0%, 50%, 100%': { opacity: '1' },
    '25%, 75%': { opacity: '0' },
  },
} as const;

/**
 * Semantic animation configurations
 * Pre-configured animations for common UI patterns
 */
export const semanticAnimations = {
  // Modal/Dialog entrance
  modalEnter: {
    animation: 'scaleIn',
    duration: animationDuration.moderate,
    easing: animationEasing.smooth,
  },

  // Toast/Notification
  toastEnter: {
    animation: 'slideInRight',
    duration: animationDuration.fast,
    easing: animationEasing.easeOut,
  },

  // Dropdown menu
  dropdownEnter: {
    animation: 'fadeIn, scaleIn',
    duration: animationDuration.fast,
    easing: animationEasing.easeOut,
  },

  // Loading spinner
  spinner: {
    animation: 'spin',
    duration: animationDuration.slowest,
    easing: animationEasing.linear,
    iterationCount: 'infinite',
  },

  // Skeleton loader
  skeletonPulse: {
    animation: 'skeleton',
    duration: animationDuration.slower,
    easing: animationEasing.easeInOut,
    iterationCount: 'infinite',
  },

  // Button hover
  buttonHover: {
    duration: animationDuration.fast,
    easing: animationEasing.easeOut,
  },

  // Input focus
  inputFocus: {
    duration: animationDuration.fast,
    easing: animationEasing.easeOut,
  },

  // Error shake
  errorShake: {
    animation: 'shake',
    duration: animationDuration.moderate,
    easing: animationEasing.easeInOut,
  },
} as const;

export type AnimationDuration = keyof typeof animationDuration;
export type AnimationEasing = keyof typeof animationEasing;
export type AnimationKeyframe = keyof typeof animationKeyframes;
