import type { IconComponent, IconProps } from './icon.types';

/**
 * Icon wrapper component that provides consistent styling and behavior
 * for Lucide icons, custom user icons, and icons from other libraries.
 *
 * @example
 * ```tsx
 * // Using Lucide icons (from our package)
 * import { Search } from '@fluxwind/icons';
 * <Search size={24} />
 *
 * // Using custom SVG icon
 * import { Icon } from '@fluxwind/icons';
 * import MyCustomIcon from './my-icon.svg';
 * <Icon as={MyCustomIcon} size={24} />
 *
 * // Using React Icons (Font Awesome, etc.)
 * import { FaBeer } from 'react-icons/fa';
 * <Icon as={FaBeer} size={24} color="gold" />
 *
 * // Using Heroicons
 * import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
 * <Icon as={MagnifyingGlassIcon} size={24} />
 *
 * // Using Material UI Icons
 * import SearchIcon from '@mui/icons-material/Search';
 * <Icon as={SearchIcon} size={24} />
 * ```
 */

export interface IconWrapperProps extends IconProps {
  /**
   * Custom icon component to render
   * Can be any React component that accepts SVG props or icon library component
   */
  as?: IconComponent;
}

export const Icon = ({
  as: Component,
  size = 24,
  color = 'currentColor',
  strokeWidth = 2,
  className = '',
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden = false,
  ...props
}: IconWrapperProps) => {
  if (!Component) {
    console.warn('Icon: No icon component provided. Use the "as" prop to specify an icon.');
    return null;
  }

  // Normalize size to number for calculations
  const numericSize = typeof size === 'number' ? size : parseInt(size as string, 10) || 24;
  const sizeInPx = `${numericSize}px`;

  // Prepare props that work across different icon libraries
  const commonProps: Record<string, unknown> = {
    // Standard SVG props (works with most libraries)
    width: sizeInPx,
    height: sizeInPx,
    className,
    'aria-label': ariaLabel,
    'aria-hidden': ariaHidden,

    // Lucide/custom SVG props
    stroke: color,
    strokeWidth,

    // React Icons / Font Awesome props
    size: numericSize,
    color,

    // Material UI Icons props
    fontSize: numericSize > 24 ? 'large' : numericSize < 20 ? 'small' : 'medium',

    // Heroicons - uses className for sizing
    style: {
      width: sizeInPx,
      height: sizeInPx,
      color,
    },

    // Pass through any additional props
    ...props,
  };

  return <Component {...commonProps} />;
};

Icon.displayName = 'Icon';
