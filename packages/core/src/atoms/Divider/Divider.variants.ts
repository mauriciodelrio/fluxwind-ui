import { cva, type VariantProps } from "class-variance-authority";

/**
 * Horizontal `<hr>` — Tailwind v4 preflight gives `<hr>` a 1px top border by
 * default, so we only need to override color and optionally border-style.
 */
export const dividerHorizontalVariants = cva(
  "border-[var(--color-fw-border)]",
  {
    variants: {
      variant: {
        solid: "",
        dashed: "border-dashed",
        dotted: "border-dotted",
      },
      spacing: {
        none: "my-0",
        sm: "my-2",
        md: "my-4",
        lg: "my-8",
      },
    },
    defaultVariants: { variant: "solid", spacing: "md" },
  },
);

/**
 * Wrapper div for labeled horizontal divider — controls outer spacing.
 * The two flanking lines are handled by `dividerLineVariants`.
 */
export const dividerLabeledVariants = cva("flex items-center gap-3", {
  variants: {
    spacing: {
      none: "my-0",
      sm: "my-2",
      md: "my-4",
      lg: "my-8",
    },
  },
  defaultVariants: { spacing: "md" },
});

/**
 * The `<span>` hairlines that flank the label text.
 * Needs explicit `border-t` because global reset zeros all border widths on
 * non-`<hr>` elements.
 */
export const dividerLineVariants = cva(
  "flex-1 border-t border-[var(--color-fw-border)]",
  {
    variants: {
      variant: {
        solid: "",
        dashed: "border-dashed",
        dotted: "border-dotted",
      },
    },
    defaultVariants: { variant: "solid" },
  },
);

/**
 * Vertical separator `<div>` — `self-stretch` fills the cross-axis of a flex
 * parent; `border-l` draws the 1px line.
 */
export const dividerVerticalVariants = cva(
  "self-stretch border-l border-[var(--color-fw-border)]",
  {
    variants: {
      variant: {
        solid: "",
        dashed: "border-dashed",
        dotted: "border-dotted",
      },
      spacing: {
        none: "mx-0",
        sm: "mx-2",
        md: "mx-4",
        lg: "mx-8",
      },
    },
    defaultVariants: { variant: "solid", spacing: "md" },
  },
);

export type DividerHorizontalVariants = VariantProps<
  typeof dividerHorizontalVariants
>;
export type DividerVerticalVariants = VariantProps<
  typeof dividerVerticalVariants
>;
