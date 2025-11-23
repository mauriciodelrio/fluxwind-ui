/**
 * useBreakpoint Hook
 *
 * React hook for detecting current responsive breakpoint.
 * Used by Core components for intelligent responsive sizing.
 *
 * @module @fluxwind/a11y
 */

import { useState, useEffect } from 'react';

export type Breakpoint = 'mobile' | 'tablet' | 'desktop';

export const BREAKPOINT_VALUES = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
} as const;

/**
 * Get current breakpoint based on window width
 */
function getCurrentBreakpoint(): Breakpoint {
  if (typeof window === 'undefined') return 'desktop';

  const width = window.innerWidth;

  if (width < BREAKPOINT_VALUES.tablet) return 'mobile';
  if (width < BREAKPOINT_VALUES.desktop) return 'tablet';
  return 'desktop';
}

/**
 * Hook for detecting current responsive breakpoint
 *
 * @returns Current breakpoint ('mobile', 'tablet', or 'desktop')
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const breakpoint = useBreakpoint();
 *
 *   return (
 *     <div>
 *       Current breakpoint: {breakpoint}
 *       {breakpoint === 'mobile' && <MobileNav />}
 *       {breakpoint !== 'mobile' && <DesktopNav />}
 *     </div>
 *   );
 * }
 * ```
 */
export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(getCurrentBreakpoint);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    // Debounced resize handler
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setBreakpoint(getCurrentBreakpoint());
      }, 150); // 150ms debounce
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return breakpoint;
}

/**
 * Check if current breakpoint matches given breakpoint(s)
 *
 * @param target - Target breakpoint or array of breakpoints
 * @returns True if current breakpoint matches
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const isDesktop = useBreakpointMatch('desktop');
 *   const isMobileOrTablet = useBreakpointMatch(['mobile', 'tablet']);
 *
 *   return (
 *     <div>
 *       {isDesktop && <DesktopFeature />}
 *       {isMobileOrTablet && <TouchOptimizedUI />}
 *     </div>
 *   );
 * }
 * ```
 */
export function useBreakpointMatch(target: Breakpoint | Breakpoint[]): boolean {
  const currentBreakpoint = useBreakpoint();

  if (Array.isArray(target)) {
    return target.includes(currentBreakpoint);
  }

  return currentBreakpoint === target;
}

/**
 * Get breakpoint numeric value
 *
 * @param breakpoint - Breakpoint name
 * @returns Pixel value for breakpoint
 *
 * @example
 * ```typescript
 * getBreakpointValue('tablet'); // 768
 * ```
 */
export function getBreakpointValue(breakpoint: Breakpoint): number {
  return BREAKPOINT_VALUES[breakpoint];
}

/**
 * Check if window width is above a breakpoint
 *
 * @param breakpoint - Breakpoint to check against
 * @returns True if window is above breakpoint
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const isAboveTablet = useBreakpointAbove('tablet');
 *   // true on desktop, false on mobile/tablet
 * }
 * ```
 */
export function useBreakpointAbove(breakpoint: Breakpoint): boolean {
  const current = useBreakpoint();
  const breakpoints: Breakpoint[] = ['mobile', 'tablet', 'desktop'];

  const currentIndex = breakpoints.indexOf(current);
  const targetIndex = breakpoints.indexOf(breakpoint);

  return currentIndex > targetIndex;
}

/**
 * Check if window width is below a breakpoint
 *
 * @param breakpoint - Breakpoint to check against
 * @returns True if window is below breakpoint
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const isBelowDesktop = useBreakpointBelow('desktop');
 *   // true on mobile/tablet, false on desktop
 * }
 * ```
 */
export function useBreakpointBelow(breakpoint: Breakpoint): boolean {
  const current = useBreakpoint();
  const breakpoints: Breakpoint[] = ['mobile', 'tablet', 'desktop'];

  const currentIndex = breakpoints.indexOf(current);
  const targetIndex = breakpoints.indexOf(breakpoint);

  return currentIndex < targetIndex;
}
