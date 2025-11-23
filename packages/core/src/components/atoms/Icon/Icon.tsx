/**
 * Icon Component
 *
 * Atom component for Fluxwind UI.
 *
 * @module @fluxwind/core/components/atoms
 */

import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { IconProps } from './Icon.types';
import { iconVariants } from './Icon.variants';

export const Icon = React.forwardRef<HTMLElement, IconProps>(
  ({ children, className, size = 'md', variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={twMerge(clsx(iconVariants({ size, variant }), className))}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Icon.displayName = 'Icon';
