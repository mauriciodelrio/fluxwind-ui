import { cva, type VariantProps } from "class-variance-authority";

// ─── Label ────────────────────────────────────────────────────────────────────

export const formFieldLabelVariants = cva(
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

export const formFieldMessageVariants = cva("", {
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

// ─── Types ────────────────────────────────────────────────────────────────────

export type FormFieldVariants = VariantProps<typeof formFieldLabelVariants>;
