import { cva, type VariantProps } from "class-variance-authority";

/**
 * Outer container span — sets the track dimensions.
 * All visual layers are absolutely positioned within it.
 */
export const switchContainerVariants = cva("relative inline-flex shrink-0", {
  variants: {
    size: {
      sm: "h-4 w-7",
      md: "h-5 w-9",
      lg: "h-6 w-11",
    },
  },
  defaultVariants: { size: "md" },
});

/**
 * Track (pill background) — responds to peer (the sr-only native input).
 */
export const switchTrackVariants = cva(
  [
    "absolute inset-0 rounded-full",
    "bg-[var(--color-fw-border)]",
    "peer-checked:bg-[var(--color-fw-primary)]",
    // focus ring
    "peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-fw-ring)]",
    "peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[var(--color-fw-background)]",
    // disabled
    "peer-disabled:opacity-50 peer-disabled:cursor-not-allowed",
    "transition-colors duration-150 ease-out",
  ],
  {
    variants: {
      invalid: {
        true: "peer-checked:bg-[var(--color-fw-destructive)]",
        false: "",
      },
    },
    defaultVariants: { invalid: false },
  },
);

/**
 * Thumb (sliding circle) — translates when checked.
 * Size and translation are coordinated per `size` variant.
 *
 * Translation values (track_width - thumb_width - 2×offset=1px):
 *   sm: 28 - 12 - 4 = 12px → translate-x-3
 *   md: 36 - 16 - 4 = 16px → translate-x-4
 *   lg: 44 - 20 - 4 = 20px → translate-x-5
 */
export const switchThumbVariants = cva(
  [
    "absolute top-0.5 left-0.5 rounded-full bg-white shadow-sm",
    "transition-transform duration-150 ease-out",
  ],
  {
    variants: {
      size: {
        sm: ["size-3", "peer-checked:translate-x-3"],
        md: ["size-4", "peer-checked:translate-x-4"],
        lg: ["size-5", "peer-checked:translate-x-5"],
      },
    },
    defaultVariants: { size: "md" },
  },
);

export type SwitchVariants = VariantProps<typeof switchContainerVariants>;
