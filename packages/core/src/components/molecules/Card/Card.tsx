/**
 * Card Component
 *
 * Molecule component for Fluxwind UI.
 *
 * @module @fluxwind/core/components/molecules
 */

import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { CardProps } from './Card.types';
import { cardVariants } from './Card.variants';

export const Card = React.forwardRef<HTMLElement, CardProps>(
  ({ children, className, size = 'md', variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={twMerge(clsx(cardVariants({ size, variant }), className))}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
