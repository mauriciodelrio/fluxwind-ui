import { cva, type VariantProps } from "class-variance-authority";
import { transitionMap, focusRingMap } from "@/tokens";

/**
 * Rating container — a `<fieldset>` wrapper that controls the gap between stars.
 *
 * Uses `border-none p-0 m-0` to reset fieldset browser defaults.
 */
export const ratingContainerVariants = cva(
  "inline-flex items-center border-0 p-0 m-0",
  {
    variants: {
      size: {
        sm: "gap-0.5",
        md: "gap-1",
        lg: "gap-1.5",
      },
    },
    defaultVariants: { size: "md" },
  },
);

/**
 * Individual star `<label>` — wraps a visually-hidden radio input + two-layer
 * SVG star. `relative` is required so the partial-fill overlay can be
 * absolutely positioned inside the label.
 *
 * Colours are handled inside `StarIcon` via a clip-width overlay, allowing
 * fractional fills for decimal rating display (e.g. 3.7 → 70 % fill on star 4).
 */
export const ratingStarVariants = cva(
  ["relative inline-flex cursor-pointer", transitionMap.snappy],
  {
    variants: {
      size: {
        sm: "size-3.5",
        md: "size-5",
        lg: "size-6",
      },
    },
    defaultVariants: { size: "md" },
  },
);

/**
 * Focus ring applied to each radio input inside the star label.
 * Uses focusRingMap so the ring respects the global `--color-fw-ring` token.
 */
export const ratingInputFocusClass = focusRingMap.default;

export type RatingVariants = VariantProps<typeof ratingContainerVariants>;
export type RatingStarVariants = VariantProps<typeof ratingStarVariants>;
