import { cva, type VariantProps } from 'class-variance-authority';
import { sizeMap, radiusMap, transitionMap } from '@/tokens';

export const buttonVariants = cva(
  // Base classes — layout, focus, cursor
  [
    'inline-flex items-center justify-center gap-2',
    'font-medium select-none cursor-pointer',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-fw-ring)]',
    'disabled:pointer-events-none disabled:opacity-50',
    'whitespace-nowrap',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-[var(--color-fw-primary)] text-[var(--color-fw-primary-fg)]',
          'hover:bg-[var(--color-fw-primary-hover)]',
        ],
        secondary: [
          'bg-[var(--color-fw-secondary)] text-[var(--color-fw-secondary-fg)]',
          'border border-[var(--color-fw-border)]',
          'hover:bg-[var(--color-fw-secondary-hover)]',
        ],
        destructive: [
          'bg-[var(--color-fw-destructive)] text-[var(--color-fw-destructive-fg)]',
          'hover:bg-[var(--color-fw-destructive-hover)]',
        ],
        ghost: [
          'bg-transparent text-[var(--color-fw-foreground)]',
          'hover:bg-[var(--color-fw-secondary)]',
        ],
        outline: [
          'bg-transparent border border-[var(--color-fw-border)] text-[var(--color-fw-foreground)]',
          'hover:bg-[var(--color-fw-secondary)]',
        ],
        link: [
          'bg-transparent underline-offset-4 text-[var(--color-fw-primary)]',
          'hover:underline',
          'h-auto px-0',
        ],
      },
      size: {
        xs: [sizeMap.xs.height, sizeMap.xs.px, sizeMap.xs.text],
        sm: [sizeMap.sm.height, sizeMap.sm.px, sizeMap.sm.text],
        md: [sizeMap.md.height, sizeMap.md.px, sizeMap.md.text],
        lg: [sizeMap.lg.height, sizeMap.lg.px, sizeMap.lg.text],
        xl: [sizeMap.xl.height, sizeMap.xl.px, sizeMap.xl.text],
      },
      radius: {
        none: radiusMap.none,
        sm: radiusMap.sm,
        md: radiusMap.md,
        lg: radiusMap.lg,
        xl: radiusMap.xl,
        full: radiusMap.full,
      },
      transition: {
        none:   transitionMap.none,
        smooth: transitionMap.smooth,
        snappy: transitionMap.snappy,
        spring: transitionMap.spring,
        slow:   transitionMap.slow,
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      radius: 'md',
      transition: 'smooth',
    },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
