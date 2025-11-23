/**
 * Input Component
 *
 * Atom component for Fluxwind UI.
 *
 * @module @fluxwind/core/components/atoms
 */

import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { InputProps } from './Input.types';
import { inputVariants } from './Input.variants';

export const Input = React.forwardRef<HTMLElement, InputProps>(
  ({ children, className, size = 'md', variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={twMerge(clsx(inputVariants({ size, variant }), className))}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Input.displayName = 'Input';
