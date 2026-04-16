import { cva, type VariantProps } from "class-variance-authority";
import { transitionMap } from "@/tokens";

/**
 * Outer container span — establishes stacking context and sets the touch area.
 * All children are absolutely positioned within it.
 */
export const checkboxContainerVariants = cva("relative inline-flex shrink-0", {
  variants: {
    size: {
      sm: "size-3.5",
      md: "size-4",
      lg: "size-5",
    },
  },
  defaultVariants: { size: "md" },
});

/**
 * Background box — the visible square border/fill.
 * Responds to peer (the sr-only native input) state via peer-* variants.
 */
export const checkboxBoxVariants = cva(
  [
    "absolute inset-0 rounded-sm",
    "border border-[var(--color-fw-border)] bg-[var(--color-fw-background)]",
    // checked + indeterminate → primary colour
    "peer-checked:bg-[var(--color-fw-primary)] peer-checked:border-[var(--color-fw-primary)]",
    "peer-indeterminate:bg-[var(--color-fw-primary)] peer-indeterminate:border-[var(--color-fw-primary)]",
    // focus ring (keyboard navigation)
    "peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-fw-ring)]",
    "peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[var(--color-fw-background)]",
    // disabled state
    "peer-disabled:opacity-50 peer-disabled:cursor-not-allowed",
    transitionMap.snappy,
  ],
  {
    variants: {
      invalid: {
        true: [
          "border-[var(--color-fw-destructive)]",
          "peer-checked:bg-[var(--color-fw-destructive)] peer-checked:border-[var(--color-fw-destructive)]",
          "peer-indeterminate:bg-[var(--color-fw-destructive)] peer-indeterminate:border-[var(--color-fw-destructive)]",
        ],
        false: "",
      },
    },
    defaultVariants: { invalid: false },
  },
);

export type CheckboxVariants = VariantProps<typeof checkboxContainerVariants>;
