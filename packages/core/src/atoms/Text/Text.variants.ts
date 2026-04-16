import { cva, type VariantProps } from "class-variance-authority";

export const textVariants = cva("", {
  variants: {
    variant: {
      body: "text-base text-[var(--color-fw-foreground)]",
      lead: "text-lg text-[var(--color-fw-foreground)]",
      small: "text-sm text-[var(--color-fw-muted)]",
      caption: "text-xs text-[var(--color-fw-muted)]",
      code: "text-sm font-mono bg-[var(--color-fw-surface)] px-1.5 py-0.5 rounded-md",
      label: "text-sm font-medium text-[var(--color-fw-foreground)]",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
    truncate: {
      true: "truncate",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

export type TextVariants = VariantProps<typeof textVariants>;
