import { cva, type VariantProps } from "class-variance-authority";

export const spinnerVariants = cva(
  [
    "animate-spin rounded-full",
    "border-2 border-current border-t-transparent",
    "shrink-0",
  ],
  {
    variants: {
      size: {
        xs: "size-3",
        sm: "size-4",
        md: "size-5",
        lg: "size-6",
        xl: "size-8",
      },
      variant: {
        current: "",
        primary: "text-[var(--color-fw-primary)]",
        muted: "text-[var(--color-fw-muted)]",
        destructive: "text-[var(--color-fw-destructive-text)]",
        white: "text-white",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "current",
    },
  },
);

export type SpinnerVariants = VariantProps<typeof spinnerVariants>;
