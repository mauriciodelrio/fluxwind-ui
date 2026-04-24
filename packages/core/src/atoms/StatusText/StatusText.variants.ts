import { cva, type VariantProps } from "class-variance-authority";

// ─── StatusText Variants ──────────────────────────────────────────────────────
//
// Typographic variants for feedback/status messages. Intentionally a subset of
// Text variants — display/heading/subheading scales are not appropriate for
// status regions. Color is decoupled from variant so it can be combined freely.

export const statusTextVariants = cva("", {
  variants: {
    variant: {
      body: "text-base",
      caption: "text-xs",
      label: "text-sm font-medium",
      code: "font-mono text-sm bg-[var(--color-fw-surface)] px-1.5 py-0.5 rounded-md",
    },
    color: {
      inherit: "text-inherit",
      muted: "text-[var(--color-fw-muted-foreground)]",
      primary: "text-[var(--color-fw-primary-text)]",
      destructive: "text-[var(--color-fw-destructive-text)]",
      success: "text-[var(--color-fw-success-text)]",
      warning: "text-[var(--color-fw-warning-text)]",
    },
  },
  defaultVariants: {
    variant: "body",
    color: "inherit",
  },
});

export type StatusTextVariants = VariantProps<typeof statusTextVariants>;
export type StatusTextVariant = NonNullable<StatusTextVariants["variant"]>;
export type StatusTextColor = NonNullable<StatusTextVariants["color"]>;
