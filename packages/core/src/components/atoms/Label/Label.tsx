/**
 * Label Component
 *
 * Atom component for Fluxwind UI.
 *
 * @module @fluxwind/core/components/atoms
 */

import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { LabelProps } from './Label.types';
import { labelVariants } from './Label.variants';

export const Label = React.forwardRef<HTMLElement, LabelProps>(
  ({ children, className, size = 'md', variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={twMerge(clsx(labelVariants({ size, variant }), className))}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Label.displayName = 'Label';
