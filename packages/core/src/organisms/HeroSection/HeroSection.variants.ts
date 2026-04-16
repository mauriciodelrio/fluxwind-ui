import { cva } from "class-variance-authority";
import {
  containerMaxWidthMap,
  focusRingMap,
  sectionPaddingMap,
  transitionMap,
} from "@/tokens";

// ─── Root section ──────────────────────────────────────────────────────────────

export const heroSectionRootVariants = cva(
  ["relative w-full overflow-hidden"],
  {
    variants: {
      padding: {
        sm: sectionPaddingMap.sm,
        md: sectionPaddingMap.md,
        lg: sectionPaddingMap.lg,
      },
    },
    defaultVariants: { padding: "lg" },
  },
);

// ─── Inner container ──────────────────────────────────────────────────────────

export const heroContainerVariants = cva(
  "relative mx-auto px-4 sm:px-6 lg:px-8",
  {
    variants: {
      maxWidth: {
        sm: containerMaxWidthMap.sm,
        md: containerMaxWidthMap.md,
        lg: containerMaxWidthMap.lg,
        full: containerMaxWidthMap.full,
      },
      layout: {
        centered: "flex flex-col items-center text-center gap-8",
        "split-left": "grid grid-cols-1 items-center gap-12 lg:grid-cols-2",
        "split-right": "grid grid-cols-1 items-center gap-12 lg:grid-cols-2",
      },
    },
    defaultVariants: { maxWidth: "lg", layout: "centered" },
  },
);

// ─── Text block (eyebrow + heading + subheading + actions) ────────────────────

export const heroTextBlockVariants = cva([], {
  variants: {
    layout: {
      centered: "flex flex-col items-center gap-6",
      "split-left": "flex flex-col gap-6",
      "split-right": "flex flex-col gap-6 lg:order-2",
    },
  },
  defaultVariants: { layout: "centered" },
});

// ─── Eyebrow label ────────────────────────────────────────────────────────────

export const heroEyebrowVariants = cva([
  "inline-flex items-center gap-1.5 rounded-full",
  "border border-[var(--color-fw-border)]",
  "bg-[var(--color-fw-surface)]",
  "px-3 py-1",
  "text-xs font-semibold tracking-wide text-[var(--color-fw-muted-foreground)]",
  "uppercase",
]);

// ─── Heading ──────────────────────────────────────────────────────────────────

export const heroHeadingVariants = cva(
  "font-bold tracking-tight text-[var(--color-fw-foreground)]",
  {
    variants: {
      size: {
        sm: "text-3xl sm:text-4xl",
        md: "text-4xl sm:text-5xl lg:text-6xl",
        lg: "text-5xl sm:text-6xl lg:text-7xl",
      },
    },
    defaultVariants: { size: "md" },
  },
);

// ─── Subheading ───────────────────────────────────────────────────────────────

export const heroSubheadingVariants = cva(
  "max-w-2xl text-[var(--color-fw-muted-foreground)]",
  {
    variants: {
      size: {
        sm: "text-base",
        md: "text-lg sm:text-xl",
        lg: "text-xl sm:text-2xl",
      },
    },
    defaultVariants: { size: "md" },
  },
);

// ─── Actions slot ─────────────────────────────────────────────────────────────

export const heroActionsVariants = cva("flex flex-wrap gap-4", {
  variants: {
    layout: {
      centered: "justify-center",
      "split-left": "justify-start",
      "split-right": "justify-start",
    },
  },
  defaultVariants: { layout: "centered" },
});

// ─── Media slot ───────────────────────────────────────────────────────────────

export const heroMediaVariants = cva(
  "relative w-full overflow-hidden rounded-2xl",
  {
    variants: {
      layout: {
        centered: "mt-8 aspect-[16/9]",
        "split-left": "aspect-[4/3] lg:order-2",
        "split-right": "aspect-[4/3] lg:order-1",
      },
      shadow: {
        none: "",
        md: "shadow-xl",
        lg: "shadow-2xl",
      },
    },
    defaultVariants: { layout: "centered", shadow: "md" },
  },
);

// ─── Video play/pause button ──────────────────────────────────────────────────

export const heroPlayButtonVariants = cva([
  "absolute inset-0 flex items-center justify-center",
  "bg-[var(--color-fw-background)]/30",
  transitionMap.smooth,
  "hover:bg-[var(--color-fw-background)]/20",
  focusRingMap.default,
  "rounded-2xl",
]);

// ─── Types ────────────────────────────────────────────────────────────────────

export type HeroLayout = "centered" | "split-left" | "split-right";
export type HeroHeadingSize = "sm" | "md" | "lg";
export type HeroMediaShadow = "none" | "md" | "lg";
export type {
  ContainerMaxWidth as HeroMaxWidth,
  SectionPadding as HeroPadding,
} from "@/tokens";
