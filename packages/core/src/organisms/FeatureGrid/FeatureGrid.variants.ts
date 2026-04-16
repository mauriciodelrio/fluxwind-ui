import { cva } from "class-variance-authority";
import {
  containerMaxWidthMap,
  focusRingMap,
  radiusMap,
  sectionPaddingMap,
  shadowMap,
  transitionMap,
} from "@/tokens";

// ─── Types ────────────────────────────────────────────────────────────────────

/** Column layout of the grid. */
export type FeatureGridColumns = 2 | 3 | 4;

/** Visual style of each feature card. */
export type FeatureCardVariant = "flat" | "outlined" | "elevated";

/** Alignment of icon + text content within each card. */
export type FeatureCardAlign = "left" | "center";

// Re-exports for convenience at the barrel level
export type { ContainerMaxWidth as FeatureGridMaxWidth } from "@/tokens";
export type { SectionPadding as FeatureGridPadding } from "@/tokens";

// ─── Section root ─────────────────────────────────────────────────────────────

export const featureSectionVariants = cva(
  "w-full bg-[var(--color-fw-background)]",
  {
    variants: {
      padding: sectionPaddingMap,
    },
    defaultVariants: {
      padding: "md",
    },
  },
);

// ─── Inner container ──────────────────────────────────────────────────────────

export const featureContainerVariants = cva("mx-auto w-full px-6 lg:px-8", {
  variants: {
    maxWidth: containerMaxWidthMap,
  },
  defaultVariants: {
    maxWidth: "lg",
  },
});

// ─── Header block (eyebrow + heading + subheading) ───────────────────────────

export const featureHeaderVariants = cva(
  "mx-auto mb-12 max-w-2xl text-center sm:mb-16",
);

export const featureEyebrowVariants = cva(
  [
    "mb-3 inline-block text-sm font-semibold uppercase tracking-widest",
    "text-[var(--color-fw-primary-text)]",
  ].join(" "),
);

export const featureHeadingVariants = cva(
  [
    "text-3xl font-bold tracking-tight text-[var(--color-fw-foreground)]",
    "sm:text-4xl",
  ].join(" "),
);

export const featureSubheadingVariants = cva(
  ["mt-4 text-lg leading-8 text-[var(--color-fw-muted-foreground)]"].join(" "),
);

// ─── Grid wrapper ─────────────────────────────────────────────────────────────

export const featureGridVariants = cva("grid gap-8", {
  variants: {
    columns: {
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    },
  },
  defaultVariants: {
    columns: 3,
  },
});

// ─── Feature card ─────────────────────────────────────────────────────────────

export const featureCardVariants = cva(
  [
    "flex flex-col gap-4 p-6",
    radiusMap.xl,
    transitionMap.smooth,
    focusRingMap.default,
  ].join(" "),
  {
    variants: {
      variant: {
        flat: "bg-[var(--color-fw-card)]",
        outlined: [
          "border border-[var(--color-fw-border)]",
          "bg-[var(--color-fw-background)]",
        ].join(" "),
        elevated: ["bg-[var(--color-fw-card)]", shadowMap.md].join(" "),
      },
      align: {
        left: "items-start text-left",
        center: "items-center text-center",
      },
      /** Whether the card is interactive (a link or button). */
      interactive: {
        true: [
          "cursor-pointer",
          "hover:shadow-lg hover:-translate-y-0.5",
          "active:translate-y-0",
        ].join(" "),
        false: "",
      },
    },
    defaultVariants: {
      variant: "flat",
      align: "left",
      interactive: false,
    },
  },
);

// ─── Icon wrapper ─────────────────────────────────────────────────────────────

export const featureIconWrapperVariants = cva(
  [
    "flex shrink-0 items-center justify-center",
    "size-12",
    radiusMap.lg,
    "bg-[var(--color-fw-primary)]/10",
    "text-[var(--color-fw-primary-text)]",
  ].join(" "),
);

// ─── Card title ───────────────────────────────────────────────────────────────

export const featureCardTitleVariants = cva(
  "text-base font-semibold text-[var(--color-fw-foreground)]",
);

// ─── Card body ────────────────────────────────────────────────────────────────

export const featureCardBodyVariants = cva(
  "text-sm leading-6 text-[var(--color-fw-muted-foreground)] grow",
);

// ─── Card link indicator ──────────────────────────────────────────────────────

export const featureCardLinkVariants = cva(
  [
    "mt-2 inline-flex items-center gap-1 text-sm font-medium",
    "text-[var(--color-fw-primary-text)]",
    transitionMap.snappy,
    "hover:gap-2",
    focusRingMap.default,
  ].join(" "),
);
