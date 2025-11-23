/**
 * Switch Component
 *
 * Atom component for Fluxwind UI.
 *
 * @module @fluxwind/core/components/atoms
 */

import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { SwitchProps } from './Switch.types';
import { switchVariants } from './Switch.variants';

export const Switch = React.forwardRef<HTMLElement, SwitchProps>(
  ({ children, className, size = 'md', variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={twMerge(clsx(switchVariants({ size, variant }), className))}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Switch.displayName = 'Switch';
