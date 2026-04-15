import { forwardRef, type ElementType, type HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';
import { textVariants, type TextVariants } from './Text.variants';

// Polymorphic — default renders <p>, can be any text element
export interface TextProps extends HTMLAttributes<HTMLElement>, TextVariants {
  as?: ElementType;
}

const Text = forwardRef<HTMLElement, TextProps>(
  ({ as: Tag = 'p', className, variant, weight, align, truncate, ...props }, ref) => {
    return (
      <Tag
        ref={ref}
        className={cn(textVariants({ variant, weight, align, truncate }), className)}
        {...props}
      />
    );
  },
);

Text.displayName = 'Text';

export { Text };
