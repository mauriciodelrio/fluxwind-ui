/**
 * Alert Component
 *
 * Molecule component for Fluxwind UI.
 *
 * @module @fluxwind/core/components/molecules
 */

import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { AlertProps } from './Alert.types';
import { alertVariants } from './Alert.variants';

export const Alert = React.forwardRef<HTMLElement, AlertProps>(
  ({ children, className, size = 'md', variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={twMerge(clsx(alertVariants({ size, variant }), className))}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Alert.displayName = 'Alert';
