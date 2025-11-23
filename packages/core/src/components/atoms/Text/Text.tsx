/**
 * Text Component
 *
 * Atom component for Fluxwind UI.
 *
 * @module @fluxwind/core/components/atoms
 */

import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { TextProps } from './Text.types';
import { textVariants } from './Text.variants';

export const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ children, className, size = 'md', variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={twMerge(clsx(textVariants({ size, variant }), className))}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Text.displayName = 'Text';
