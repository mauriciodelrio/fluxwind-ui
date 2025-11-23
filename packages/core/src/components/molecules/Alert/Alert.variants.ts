/**
 * Alert Variants
 *
 * CVA (class-variance-authority) variant definitions.
 * Uses component config for consistent styling.
 *
 * @module @fluxwind/core/components
 */

import { cva, type VariantProps } from 'class-variance-authority';

export const alertVariants = cva(
  // Base styles
  ['inline-flex', 'items-center', 'justify-center', 'transition-all', 'duration-200'],
  {
    variants: {
      variant: {
        default: 'bg-gray-100 text-gray-900',
        primary: 'bg-primary-500 text-white',
        secondary: 'bg-secondary-500 text-white',
        success: 'bg-success-500 text-white',
        error: 'bg-error-500 text-white',
        warning: 'bg-warning-500 text-white',
        info: 'bg-info-500 text-white',
      },
      size: {
        xs: 'h-7 px-2 text-xs',
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-base',
        lg: 'h-12 px-5 text-lg',
        xl: 'h-14 px-6 text-xl',
        '2xl': 'h-16 px-8 text-2xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export type AlertVariantProps = VariantProps<typeof alertVariants>;
