/**
 * Paragraph Component
 *
 * Atom component for Fluxwind UI.
 *
 * @module @fluxwind/core/components/atoms
 */

import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ParagraphProps } from './Paragraph.types';
import { paragraphVariants } from './Paragraph.variants';

export const Paragraph = React.forwardRef<HTMLElement, ParagraphProps>(
  ({ children, className, size = 'md', variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={twMerge(clsx(paragraphVariants({ size, variant }), className))}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Paragraph.displayName = 'Paragraph';
