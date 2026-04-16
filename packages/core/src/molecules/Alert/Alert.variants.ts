import { cva, type VariantProps } from "class-variance-authority";

// ─── Container ────────────────────────────────────────────────────────────────

export const alertVariants = cva(
  ["relative flex items-start gap-3 rounded-md border p-4 text-sm"],
  {
    variants: {
      intent: {
        info: [
          "bg-[var(--color-fw-info)]/10",
          "border-[var(--color-fw-info)]/30",
          "text-[var(--color-fw-info-text)]",
        ],
        success: [
          "bg-[var(--color-fw-success)]/10",
          "border-[var(--color-fw-success)]/30",
          "text-[var(--color-fw-success-text)]",
        ],
        warning: [
          "bg-[var(--color-fw-warning)]/10",
          "border-[var(--color-fw-warning)]/30",
          "text-[var(--color-fw-warning-text)]",
        ],
        error: [
          "bg-[var(--color-fw-destructive)]/10",
          "border-[var(--color-fw-destructive)]/30",
          "text-[var(--color-fw-destructive-text)]",
        ],
      },
    },
    defaultVariants: { intent: "info" },
  },
);

// ─── Icon ─────────────────────────────────────────────────────────────────────

export const alertIconVariants = cva("shrink-0 mt-0.5 size-5", {
  variants: {
    intent: {
      info: "text-[var(--color-fw-info-text)]",
      success: "text-[var(--color-fw-success-text)]",
      warning: "text-[var(--color-fw-warning-text)]",
      error: "text-[var(--color-fw-destructive-text)]",
    },
  },
  defaultVariants: { intent: "info" },
});

// ─── Types ────────────────────────────────────────────────────────────────────

export type AlertVariants = VariantProps<typeof alertVariants>;
export type AlertIntent = NonNullable<AlertVariants["intent"]>;
