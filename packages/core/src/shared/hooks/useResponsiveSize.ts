/**
 * useResponsiveSize Hook
 *
 * React hook for intelligent responsive sizing based on breakpoints.
 * Supports both classic (static) and intelligent (responsive) sizing modes.
 *
 * @module @fluxwind/core/shared/hooks
 */

import { useMemo } from 'react';
import { useBreakpoint } from '@fluxwind/a11y';
import type {
  SizeVariant,
  Breakpoint,
  ComponentConfig,
  SizingMode,
} from '../../config/schema.types';
export interface UseResponsiveSizeOptions {
  /** Component sizing configuration */
  sizingConfig: ComponentConfig['sizing'];
  /** Size variant prop (e.g., 'sm', 'md', 'lg') */
  size?: SizeVariant;
  /** Override sizing mode */
  mode?: SizingMode;
}

export interface ResponsiveSizeResult {
  /** Computed height value */
  height: string;
  /** Current sizing mode being used */
  mode: SizingMode;
  /** Current breakpoint */
  breakpoint: Breakpoint;
  /** Effective size variant */
  effectiveSize: SizeVariant;
}

/**
 * Calculate responsive size based on current breakpoint and sizing mode
 *
 * @param options - Sizing options
 * @returns Responsive size result
 *
 * @example
 * ```tsx
 * function Button({ size = 'md', sizeMode }: ButtonProps) {
 *   const config = useComponentConfig({
 *     componentName: 'Button',
 *     componentType: 'atom'
 *   });
 *
 *   const { height, effectiveSize } = useResponsiveSize({
 *     sizingConfig: config.sizing,
 *     size,
 *     mode: sizeMode
 *   });
 *
 *   return (
 *     <button style={{ height }} className={`button-${effectiveSize}`}>
 *       Click me
 *     </button>
 *   );
 * }
 * ```
 */
export function useResponsiveSize(options: UseResponsiveSizeOptions): ResponsiveSizeResult {
  const { sizingConfig, size, mode } = options;
  const breakpoint = useBreakpoint();

  return useMemo(() => {
    const effectiveMode = mode ?? sizingConfig.mode;

    if (effectiveMode === 'classic') {
      const effectiveSize = size ?? sizingConfig.classic.default;
      const sizeValue = sizingConfig.classic.values[effectiveSize];

      return {
        height: sizeValue.height,
        mode: 'classic',
        breakpoint,
        effectiveSize,
      };
    }

    // Intelligent mode
    const effectiveSize = size ?? sizingConfig.intelligent[breakpoint];
    const responsiveValue = sizingConfig.intelligent.values[effectiveSize];
    const height = responsiveValue[breakpoint];

    return {
      height,
      mode: 'intelligent',
      breakpoint,
      effectiveSize,
    };
  }, [sizingConfig, size, mode, breakpoint]);
}

/**
 * Get all size values for a given size variant
 * Useful for generating size variant classes
 *
 * @example
 * ```tsx
 * const sizes = useAllSizeValues(config.sizing, 'md');
 * // { mobile: '36px', tablet: '40px', desktop: '40px' }
 * ```
 */
export function useAllSizeValues(
  sizingConfig: ComponentConfig['sizing'],
  size: SizeVariant
): Record<Breakpoint, string> | string {
  return useMemo(() => {
    if (sizingConfig.mode === 'classic') {
      return sizingConfig.classic.values[size].height;
    }

    return sizingConfig.intelligent.values[size];
  }, [sizingConfig, size]);
}

/**
 * Hook for getting responsive padding values
 *
 * @example
 * ```tsx
 * const padding = useResponsivePadding(config.spacing, 'md');
 * // { x: 'var(--fluxwind-space-4)', y: 'var(--fluxwind-space-2)' }
 * ```
 */
export function useResponsivePadding(
  spacingConfig: ComponentConfig['spacing'],
  size: SizeVariant
): { x: string; y: string } {
  return useMemo(
    () => ({
      x: spacingConfig.padding.x[size],
      y: spacingConfig.padding.y[size],
    }),
    [spacingConfig, size]
  );
}

/**
 * Hook for getting responsive gap value
 *
 * @example
 * ```tsx
 * const gap = useResponsiveGap(config.spacing, 'md');
 * // 'var(--fluxwind-space-2)'
 * ```
 */
export function useResponsiveGap(
  spacingConfig: ComponentConfig['spacing'],
  size: SizeVariant
): string | undefined {
  return useMemo(() => spacingConfig.gap?.[size], [spacingConfig, size]);
}
