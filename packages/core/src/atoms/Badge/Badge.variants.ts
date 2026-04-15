import { cva, type VariantProps } from 'class-variance-authority';
import { radiusMap, transitionMap } from '@/tokens';

export const badgeVariants = cva(
  [
    'inline-flex items-center gap-1 font-medium',
    'px-2 py-0.5 text-xs leading-none',
    'select-none',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-[var(--color-fw-secondary)] text-[var(--color-fw-secondary-fg)]',
          'border border-[var(--color-fw-border)]',
        ],
        primary: [
          'bg-[var(--color-fw-primary)] text-[var(--color-fw-primary-fg)]',
        ],
        success: [
          'bg-[var(--color-fw-success)]/15 text-[var(--color-fw-success)]',
          'border border-[var(--color-fw-success)]/30',
        ],
        warning: [
          'bg-[var(--color-fw-warning)]/15 text-[var(--color-fw-warning)]',
          'border border-[var(--color-fw-warning)]/30',
        ],
        destructive: [
          'bg-[var(--color-fw-destructive)]/15 text-[var(--color-fw-destructive)]',
          'border border-[var(--color-fw-destructive)]/30',
        ],
        info: [
          'bg-[var(--color-fw-info)]/15 text-[var(--color-fw-info)]',
          'border border-[var(--color-fw-info)]/30',
        ],
        outline: [
          'bg-transparent text-[var(--color-fw-foreground)]',
          'border border-[var(--color-fw-border)]',
        ],
      },
      radius: {
        none: radiusMap.none,
        sm:   radiusMap.sm,
        md:   radiusMap.md,
        lg:   radiusMap.lg,
        full: radiusMap.full,
      },
      transition: {
        none:   transitionMap.none,
        smooth: transitionMap.smooth,
        snappy: transitionMap.snappy,
      },
    },
    defaultVariants: {
      variant: 'default',
      radius: 'full',
      transition: 'none',
    },
  },
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;
