import type { LucideProps } from 'lucide-react';
import type { SVGProps, ComponentType } from 'react';

/**
 * Props for Lucide icons (our default icon library)
 */
export interface IconProps extends Omit<LucideProps, 'ref'> {
  /**
   * Icon size in pixels
   * @default 24
   */
  size?: number | string;

  /**
   * Icon color
   * Uses currentColor by default (inherits from parent)
   */
  color?: string;

  /**
   * Stroke width
   * @default 2
   */
  strokeWidth?: number | string;

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Accessible label for the icon
   * Required for icons used without accompanying text
   */
  'aria-label'?: string;

  /**
   * Whether the icon is decorative only
   * @default false
   */
  'aria-hidden'?: boolean;
}

/**
 * Base props that most icon libraries accept
 * Combines SVG props with common icon library props
 */
export type BaseIconProps = Partial<SVGProps<SVGSVGElement>> & {
  size?: number | string | undefined;
  color?: string | undefined;
  fill?: string | undefined;
  stroke?: string | undefined;
  strokeWidth?: number | string | undefined;
  width?: number | string | undefined;
  height?: number | string | undefined;
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
  // Material UI specific
  fontSize?: 'small' | 'medium' | 'large' | 'inherit' | number | undefined;
  // Accessibility
  'aria-label'?: string | undefined;
  'aria-hidden'?: boolean | undefined;
  role?: string | undefined;
  title?: string | undefined;
  // Allow any other props for maximum compatibility
  [key: string]: unknown;
};

/**
 * Type for icon components from any library
 */
export type IconComponent = ComponentType<BaseIconProps>;
