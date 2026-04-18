import { cva, type VariantProps } from "class-variance-authority";

// ─── Modal panel ─────────────────────────────────────────────────────────────

export const modalVariants = cva(
  [
    // Layout
    "m-auto w-full rounded-lg p-0",
    // Colors — respects active FluxWind theme + dark mode
    "bg-[var(--color-fw-surface)] text-[var(--color-fw-foreground)]",
    // Shadow + border
    "shadow-lg ring-1 ring-[var(--color-fw-border)]",
    // Max height with scroll
    "max-h-[90dvh] overflow-auto",
  ],
  {
    variants: {
      size: {
        sm: "max-w-sm",
        md: "max-w-lg",
        lg: "max-w-2xl",
        xl: "max-w-4xl",
        full: "max-w-[95vw]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

// ─── Modal header ─────────────────────────────────────────────────────────────

export const modalHeaderVariants = cva([
  "flex items-start justify-between gap-4",
  "border-b border-[var(--color-fw-border)] px-6 py-4",
]);

// ─── Modal body ───────────────────────────────────────────────────────────────

export const modalBodyVariants = cva(["overflow-y-auto px-6 py-5"]);

// ─── Modal footer ─────────────────────────────────────────────────────────────

export const modalFooterVariants = cva([
  "flex flex-wrap items-center justify-end gap-3",
  "border-t border-[var(--color-fw-border)] px-6 py-4",
]);

// ─── Close button ─────────────────────────────────────────────────────────────

export const modalCloseButtonVariants = cva([
  "mt-0.5 shrink-0 rounded-md p-1.5",
  "text-[var(--color-fw-muted-foreground)]",
  "transition-colors hover:bg-[var(--color-fw-secondary)] hover:text-[var(--color-fw-foreground)]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-fw-ring)] focus-visible:ring-offset-1",
]);

// ─── Types ────────────────────────────────────────────────────────────────────

export type ModalVariants = VariantProps<typeof modalVariants>;
export type ModalSize = NonNullable<ModalVariants["size"]>;
