/**
 * Checkbox Component
 *
 * Atom component for Fluxwind UI.
 *
 * @module @fluxwind/core/components/atoms
 */

import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { CheckboxProps } from './Checkbox.types';
import { checkboxVariants } from './Checkbox.variants';

export const Checkbox = React.forwardRef<HTMLElement, CheckboxProps>(
  ({ children, className, size = 'md', variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={twMerge(clsx(checkboxVariants({ size, variant }), className))}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
