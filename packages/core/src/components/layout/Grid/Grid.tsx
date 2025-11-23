/**
 * Grid Component
 *
 * Layout component for Fluxwind UI.
 *
 * @module @fluxwind/core/components/layouts
 */

import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { GridProps } from './Grid.types';
import { gridVariants } from './Grid.variants';

export const Grid = React.forwardRef<HTMLElement, GridProps>(
  ({ children, className, size = 'md', variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={twMerge(clsx(gridVariants({ size, variant }), className))}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = 'Grid';
