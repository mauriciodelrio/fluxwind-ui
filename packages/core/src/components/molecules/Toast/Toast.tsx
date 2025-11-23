/**
 * Toast Component
 *
 * Molecule component for Fluxwind UI.
 *
 * @module @fluxwind/core/components/molecules
 */

import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ToastProps } from './Toast.types';
import { toastVariants } from './Toast.variants';

export const Toast = React.forwardRef<HTMLElement, ToastProps>(
  ({ children, className, size = 'md', variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={twMerge(clsx(toastVariants({ size, variant }), className))}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Toast.displayName = 'Toast';
