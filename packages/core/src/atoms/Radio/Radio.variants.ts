import { cva, type VariantProps } from "class-variance-authority";
import { transitionMap } from "@/tokens";

/**
 * Outer container span — establishes stacking context and sets the touch area.
 * All children are absolutely positioned within it.
 */
export const radioContainerVariants = cva("relative inline-flex shrink-0", {
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
 * Circle track — the visible round border/fill.
 * Responds to peer (the sr-only native input) state via peer-* variants.
 */
export const radioTrackVariants = cva(
  [
    "absolute inset-0 rounded-full",
    "border border-[var(--color-fw-border)] bg-[var(--color-fw-background)]",
    // checked → primary border colour
    "peer-checked:border-[var(--color-fw-primary)]",
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
          "peer-checked:border-[var(--color-fw-destructive)]",
        ],
        false: "",
      },
    },
    defaultVariants: { invalid: false },
  },
);

/**
 * Inner dot — the filled circle shown when checked.
 * Scales from 0 to ~45% of the container using peer-checked opacity + scale.
 */
export const radioDotVariants = cva(
  [
    "absolute inset-0 m-auto rounded-full pointer-events-none",
    "scale-0 opacity-0",
    "peer-checked:scale-100 peer-checked:opacity-100",
    transitionMap.snappy,
  ],
  {
    variants: {
      size: {
        sm: "size-1.5",
        md: "size-2",
        lg: "size-2.5",
      },
      invalid: {
        true: "bg-[var(--color-fw-destructive)]",
        false: "bg-[var(--color-fw-primary)]",
      },
    },
    defaultVariants: { size: "md", invalid: false },
  },
);

export type RadioVariants = VariantProps<typeof radioContainerVariants>;
