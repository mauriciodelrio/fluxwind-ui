/**
 * Dialog Component
 *
 * Molecule component for Fluxwind UI.
 *
 * @module @fluxwind/core/components/molecules
 */

import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { DialogProps } from './Dialog.types';
import { dialogVariants } from './Dialog.variants';

export const Dialog = React.forwardRef<HTMLElement, DialogProps>(
  ({ children, className, size = 'md', variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={twMerge(clsx(dialogVariants({ size, variant }), className))}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Dialog.displayName = 'Dialog';
