/**
 * Tooltip Component
 *
 * Molecule component for Fluxwind UI.
 *
 * @module @fluxwind/core/components/molecules
 */

import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { TooltipProps } from './Tooltip.types';
import { tooltipVariants } from './Tooltip.variants';

export const Tooltip = React.forwardRef<HTMLElement, TooltipProps>(
  ({ children, className, size = 'md', variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={twMerge(clsx(tooltipVariants({ size, variant }), className))}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Tooltip.displayName = 'Tooltip';
