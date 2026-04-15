import { forwardRef, type SVGProps } from 'react';
import { cn } from '@/lib/cn';
import { sizeMap, type Size } from '@/tokens';

export interface IconProps extends SVGProps<SVGSVGElement> {
  /**
   * The icon SVG path(s). Pass your icon's `<path>` or `<g>` children.
   * FluxWind Icon is a wrapper — not bundled with icon sets.
   */
  children: React.ReactNode;
  /** Size token — controls width and height. */
  size?: Size;
  /**
   * Accessible label. When provided: role="img" + aria-label.
   * When omitted: aria-hidden="true" (decorative icon).
   */
  label?: string;
  /** Override viewBox. Defaults to "0 0 24 24". */
  viewBox?: string;
}

const Icon = forwardRef<SVGSVGElement, IconProps>(
  (
    {
      children,
      size = 'md',
      label,
      viewBox = '0 0 24 24',
      className,
      ...props
    },
    ref,
  ) => {
    const sizeClasses = sizeMap[size].icon;
    const a11yProps = label
      ? { role: 'img' as const, 'aria-label': label }
      : { 'aria-hidden': true as const, focusable: 'false' as const };

    return (
      <svg
        ref={ref}
        viewBox={viewBox}
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className={cn('shrink-0', sizeClasses, className)}
        {...a11yProps}
        {...props}
      >
        {children}
      </svg>
    );
  },
);

Icon.displayName = 'Icon';

export { Icon };
