import { cva, type VariantProps } from "class-variance-authority";

/**
 * Outer track — background container, handles size and shape.
 * overflow-hidden clips the fill and the indeterminate sliding element.
 */
export const progressTrackVariants = cva(
  "w-full overflow-hidden bg-[var(--color-fw-surface)]",
  {
    variants: {
      size: {
        sm: "h-1.5",
        md: "h-2.5",
        lg: "h-4",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        full: "rounded-full",
      },
    },
    defaultVariants: { size: "md", radius: "full" },
  },
);

/**
 * Inner fill — width driven by `value` via inline style.
 * The radius is kept in sync with the track via the same variant key.
 */
export const progressFillVariants = cva(
  "h-full transition-[width] duration-300 ease-in-out",
  {
    variants: {
      variant: {
        primary: "bg-[var(--color-fw-primary)]",
        success: "bg-[var(--color-fw-success)]",
        warning: "bg-[var(--color-fw-warning)]",
        destructive: "bg-[var(--color-fw-destructive)]",
        info: "bg-[var(--color-fw-info)]",
        muted: "bg-[var(--color-fw-muted)]",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        full: "rounded-full",
      },
    },
    defaultVariants: { variant: "primary", radius: "full" },
  },
);

export type ProgressTrackVariants = VariantProps<typeof progressTrackVariants>;
export type ProgressFillVariants = VariantProps<typeof progressFillVariants>;

export interface ProgressVariants
  extends ProgressTrackVariants, ProgressFillVariants {}
