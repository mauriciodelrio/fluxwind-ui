/**
 * Spinner Component
 *
 * Atom component for Fluxwind UI.
 *
 * @module @fluxwind/core/components/atoms
 */

import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { SpinnerProps } from './Spinner.types';
import { spinnerVariants } from './Spinner.variants';

export const Spinner = React.forwardRef<HTMLElement, SpinnerProps>(
  ({ children, className, size = 'md', variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={twMerge(clsx(spinnerVariants({ size, variant }), className))}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Spinner.displayName = 'Spinner';
