import { cva, type VariantProps } from "class-variance-authority";

// ─── Legend ───────────────────────────────────────────────────────────────────

export const fieldGroupLegendVariants = cva(
  "font-medium text-[var(--color-fw-foreground)] select-none",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: { size: "md" },
  },
);

// ─── Message (hint + error share the same scale) ─────────────────────────────

export const fieldGroupMessageVariants = cva("", {
  variants: {
    intent: {
      hint: "text-[var(--color-fw-muted)]",
      error: "text-[var(--color-fw-destructive)]",
    },
    size: {
      sm: "text-xs",
      md: "text-xs",
      lg: "text-sm",
    },
  },
  defaultVariants: { intent: "hint", size: "md" },
});

// ─── Children container ───────────────────────────────────────────────────────

export const fieldGroupChildrenVariants = cva("flex gap-2", {
  variants: {
    direction: {
      vertical: "flex-col",
      horizontal: "flex-row flex-wrap",
    },
  },
  defaultVariants: { direction: "vertical" },
});

// ─── Types ────────────────────────────────────────────────────────────────────

export type FieldGroupVariants = VariantProps<typeof fieldGroupLegendVariants> &
  VariantProps<typeof fieldGroupChildrenVariants>;
