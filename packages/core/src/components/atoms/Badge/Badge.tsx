/**
 * Badge Component
 *
 * Atom component for Fluxwind UI.
 *
 * @module @fluxwind/core/components/atoms
 */

import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { BadgeProps } from './Badge.types';
import { badgeVariants } from './Badge.variants';

export const Badge = React.forwardRef<HTMLElement, BadgeProps>(
  ({ children, className, size = 'md', variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={twMerge(clsx(badgeVariants({ size, variant }), className))}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';
