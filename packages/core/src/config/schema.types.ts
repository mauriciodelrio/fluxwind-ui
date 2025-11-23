/**
 * Component Configuration Schema Types
 *
 * Universal type definitions for component JSON configurations.
 * These types ensure type-safe, consistent configuration across all components.
 *
 * @module @fluxwind/core/config
 */

// ===== SIZE VARIANTS =====
export type SizeVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type Breakpoint = 'mobile' | 'tablet' | 'desktop';
export type SizingMode = 'classic' | 'intelligent';

// ===== SIZE VALUES =====
export interface SizeValue {
  height: string;
  minWidth?: string;
  maxWidth?: string;
  width?: string;
}

export interface ResponsiveSizeValue {
  mobile: string;
  tablet: string;
  desktop: string;
}

// ===== SIZING SYSTEM =====
export interface SizingConfig {
  mode: SizingMode;
  classic: {
    default: SizeVariant;
    values: Record<SizeVariant, SizeValue>;
  };
  intelligent: {
    mobile: SizeVariant;
    tablet: SizeVariant;
    desktop: SizeVariant;
    values: Record<SizeVariant, ResponsiveSizeValue>;
  };
}

// ===== SPACING SYSTEM =====
export interface SpacingConfig {
  padding: {
    x: Record<SizeVariant, string>;
    y: Record<SizeVariant, string>;
  };
  gap?: Record<SizeVariant, string>;
  margin?: Record<string, string>;
}

// ===== COLORS =====
export interface ColorMapping {
  bg: string;
  text: string;
  border: string;
}

export interface StateColorModifier {
  bgOpacity?: string;
  textOpacity?: string;
  borderOpacity?: string;
  scale?: string;
  opacity?: string;
  cursor?: string;
  ringWidth?: string;
  ringOffset?: string;
  ringColor?: string;
}

export interface ColorsConfig {
  variants: {
    primary: ColorMapping;
    secondary: ColorMapping;
    success: ColorMapping;
    error: ColorMapping;
    warning: ColorMapping;
    info: ColorMapping;
    neutral: ColorMapping;
  };
  states: {
    hover: StateColorModifier;
    active: StateColorModifier;
    disabled: StateColorModifier;
    focus: StateColorModifier;
  };
}

// ===== TYPOGRAPHY =====
export interface TypographyConfig {
  fontFamily: string;
  fontSize: Record<SizeVariant, string>;
  fontWeight: Record<string, number>;
  lineHeight: Record<SizeVariant, string>;
  letterSpacing?: Record<string, string>;
}

// ===== BORDERS =====
export interface BordersConfig {
  width: Record<string, string>;
  radius: Record<SizeVariant, string>;
  color: string;
}

// ===== SHADOWS =====
export interface ShadowsConfig {
  default: string | null;
  hover?: string | null;
  focus?: string | null;
  active?: string | null;
}

// ===== ANIMATIONS =====
export interface AnimationConfig {
  duration: string;
  easing: string;
  properties?: string[];
}

export interface AnimationsConfig {
  transition: {
    default: AnimationConfig;
    hover?: AnimationConfig;
    active?: AnimationConfig;
    focus?: AnimationConfig;
  };
  keyframes?: {
    enter?: string;
    exit?: string;
    loading?: string;
  };
  respectReducedMotion: boolean;
}

// ===== ACCESSIBILITY =====
export type FocusStrategy = 'auto' | 'manual' | 'trap';

export interface A11yConfig {
  role?: string;
  ariaLabels: Record<string, string>;
  ariaDescriptions?: Record<string, string>;
  keyboardShortcuts?: string[];
  focusStrategy: FocusStrategy;
  minimumTouchTarget: string;
}

// ===== INTERNATIONALIZATION =====
export interface I18nConfig {
  namespace: string;
  defaultTexts: Record<string, string>;
  textProps: string[];
}

// ===== STATES =====
export interface StateConfig {
  disabled?: boolean;
  opacity?: number;
  cursor?: string;
  pointerEvents?: string;
  showSpinner?: boolean;
  spinnerPosition?: 'left' | 'right';
}

export interface StatesConfig {
  loading?: StateConfig;
  disabled?: StateConfig;
  error?: StateConfig;
  success?: StateConfig;
}

// ===== VARIANTS =====
export interface VariantsConfig {
  appearance: string[];
  size: string[];
  colorScheme?: string[];
  custom?: Record<string, string[]>;
}

// ===== MAIN COMPONENT CONFIG =====
export interface ComponentConfig {
  /** Component sizing configuration (classic vs intelligent) */
  sizing: SizingConfig;

  /** Spacing system (padding, gap, margin) */
  spacing: SpacingConfig;

  /** Color system with theme compliance */
  colors: ColorsConfig;

  /** Typography configuration */
  typography: TypographyConfig;

  /** Border styles */
  borders: BordersConfig;

  /** Elevation/shadow system */
  shadows: ShadowsConfig;

  /** Animation and motion configuration */
  animations: AnimationsConfig;

  /** Accessibility settings */
  a11y: A11yConfig;

  /** Internationalization settings */
  i18n: I18nConfig;

  /** Component states configuration */
  states: StatesConfig;

  /** Available variants */
  variants: VariantsConfig;
}

// ===== ATOMIC DESIGN TYPES =====
export type ComponentType = 'atom' | 'molecule' | 'organism' | 'layout';

export interface ComponentMetadata {
  name: string;
  type: ComponentType;
  version: string;
  description: string;
  tags?: string[];
}

// ===== CONFIG WITH METADATA =====
export interface ComponentConfigWithMetadata extends ComponentConfig {
  metadata: ComponentMetadata;
}

// ===== UTILITY TYPES =====
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type ComponentConfigOverride = DeepPartial<ComponentConfig>;

// ===== BREAKPOINT MAPPINGS =====
export const BREAKPOINT_VALUES = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
} as const;

export const SIZE_ORDER: SizeVariant[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

// ===== TYPE GUARDS =====
export function isSizeVariant(value: string): value is SizeVariant {
  return SIZE_ORDER.includes(value as SizeVariant);
}

export function isBreakpoint(value: string): value is Breakpoint {
  return ['mobile', 'tablet', 'desktop'].includes(value);
}

export function isSizingMode(value: string): value is SizingMode {
  return ['classic', 'intelligent'].includes(value);
}

export function isComponentType(value: string): value is ComponentType {
  return ['atom', 'molecule', 'organism', 'layout'].includes(value);
}
