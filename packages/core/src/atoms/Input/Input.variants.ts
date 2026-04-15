import { cva, type VariantProps } from 'class-variance-authority';
import { sizeMap, radiusMap, transitionMap } from '@/tokens';

export const inputVariants = cva(
  [
    'w-full bg-[var(--color-fw-background)] text-[var(--color-fw-foreground)]',
    'border border-[var(--color-fw-border)]',
    'placeholder:text-[var(--color-fw-muted)]',
    'focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[var(--color-fw-ring)]',
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--color-fw-surface)]',
    'aria-[invalid=true]:border-[var(--color-fw-destructive)]',
    'aria-[invalid=true]:focus-visible:outline-[var(--color-fw-destructive)]',
  ],
  {
    variants: {
      size: {
        sm: [sizeMap.sm.height, sizeMap.sm.px, sizeMap.sm.text],
        md: [sizeMap.md.height, sizeMap.md.px, sizeMap.md.text],
        lg: [sizeMap.lg.height, sizeMap.lg.px, sizeMap.lg.text],
      },
      radius: {
        none: radiusMap.none,
        sm:   radiusMap.sm,
        md:   radiusMap.md,
        lg:   radiusMap.lg,
        xl:   radiusMap.xl,
        full: radiusMap.full,
      },
      transition: {
        none:   transitionMap.none,
        smooth: transitionMap.smooth,
        snappy: transitionMap.snappy,
      },
    },
    defaultVariants: {
      size: 'md',
      radius: 'md',
      transition: 'smooth',
    },
  },
);

export type InputVariants = VariantProps<typeof inputVariants>;
