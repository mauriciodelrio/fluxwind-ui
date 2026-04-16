import { cva } from "class-variance-authority";
import {
  containerMaxWidthMap,
  focusRingMap,
  sectionPaddingMap,
  transitionMap,
} from "@/tokens";

// ─── Types ────────────────────────────────────────────────────────────────────

/** Background style of the CTA section. */
export type CTASectionBackground = "default" | "muted" | "brand" | "dark";

/** Content layout — centered stack or split (text left / actions right). */
export type CTASectionLayout = "centered" | "split";

// Re-exports
export type { SectionPadding as CTASectionPadding } from "@/tokens";
export type { ContainerMaxWidth as CTASectionMaxWidth } from "@/tokens";

// ─── Section root ─────────────────────────────────────────────────────────────

export const ctaSectionVariants = cva("w-full", {
  variants: {
    padding: sectionPaddingMap,
    background: {
      default: "bg-[var(--color-fw-background)]",
      muted: "bg-[var(--color-fw-secondary)]",
      brand: "bg-[var(--color-fw-primary)]",
      dark: "bg-[var(--color-fw-foreground)]",
    },
  },
  defaultVariants: {
    padding: "md",
    background: "default",
  },
});

// ─── Inner container ──────────────────────────────────────────────────────────

export const ctaContainerVariants = cva("mx-auto w-full px-6 lg:px-8", {
  variants: {
    maxWidth: containerMaxWidthMap,
  },
  defaultVariants: {
    maxWidth: "lg",
  },
});

// ─── Inner layout wrapper ─────────────────────────────────────────────────────

export const ctaInnerVariants = cva("flex flex-col gap-8", {
  variants: {
    layout: {
      centered: "items-center text-center",
      split: "items-start sm:flex-row sm:items-center sm:justify-between",
    },
  },
  defaultVariants: {
    layout: "centered",
  },
});

// ─── Text block ───────────────────────────────────────────────────────────────

export const ctaTextBlockVariants = cva("flex flex-col gap-3", {
  variants: {
    layout: {
      centered: "items-center",
      split: "items-start",
    },
  },
  defaultVariants: {
    layout: "centered",
  },
});

// ─── Eyebrow ──────────────────────────────────────────────────────────────────

export const ctaEyebrowVariants = cva(
  "text-sm font-semibold uppercase tracking-widest",
  {
    variants: {
      background: {
        default: "text-[var(--color-fw-primary-text)]",
        muted: "text-[var(--color-fw-primary-text)]",
        brand: "text-[var(--color-fw-primary-fg)]/80",
        dark: "text-[var(--color-fw-background)]/70",
      },
    },
    defaultVariants: {
      background: "default",
    },
  },
);

// ─── Heading ──────────────────────────────────────────────────────────────────

export const ctaHeadingVariants = cva(
  "text-3xl font-bold tracking-tight sm:text-4xl",
  {
    variants: {
      background: {
        default: "text-[var(--color-fw-foreground)]",
        muted: "text-[var(--color-fw-foreground)]",
        brand: "text-[var(--color-fw-primary-fg)]",
        dark: "text-[var(--color-fw-background)]",
      },
    },
    defaultVariants: {
      background: "default",
    },
  },
);

// ─── Subheading ───────────────────────────────────────────────────────────────

export const ctaSubheadingVariants = cva("max-w-xl text-lg leading-8", {
  variants: {
    background: {
      default: "text-[var(--color-fw-muted-foreground)]",
      muted: "text-[var(--color-fw-muted-foreground)]",
      brand: "text-[var(--color-fw-primary-fg)]/80",
      dark: "text-[var(--color-fw-background)]/75",
    },
  },
  defaultVariants: {
    background: "default",
  },
});

// ─── Actions wrapper ──────────────────────────────────────────────────────────

export const ctaActionsVariants = cva("flex flex-wrap gap-4", {
  variants: {
    layout: {
      centered: "justify-center",
      split: "justify-start sm:shrink-0",
    },
  },
  defaultVariants: {
    layout: "centered",
  },
});

// ─── Divider (optional horizontal rule above the section) ────────────────────

export const ctaDividerVariants = cva("border-t", {
  variants: {
    background: {
      default: "border-[var(--color-fw-border)]",
      muted: "border-[var(--color-fw-border)]",
      brand: "border-[var(--color-fw-primary-fg)]/20",
      dark: "border-[var(--color-fw-background)]/20",
    },
  },
  defaultVariants: {
    background: "default",
  },
});

// ─── Exported token references (for focus / transition use in stories) ────────

export { focusRingMap, transitionMap };
