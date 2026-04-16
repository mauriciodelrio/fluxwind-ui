import { cva } from "class-variance-authority";
import {
  barHeightMap,
  containerMaxWidthMap,
  focusRingMap,
  transitionMap,
} from "@/tokens";

// ─── Root header ──────────────────────────────────────────────────────────────

export const navbarRootVariants = cva(["w-full z-50"], {
  variants: {
    theme: {
      solid: [
        "bg-[var(--color-fw-background)]",
        "border-b border-[var(--color-fw-border)]",
      ],
      transparent: ["bg-transparent"],
      blurred: [
        "bg-[var(--color-fw-background)]/80",
        "backdrop-blur-md",
        "border-b border-[var(--color-fw-border)]/60",
      ],
    },
    size: {
      md: barHeightMap.md,
      lg: barHeightMap.lg,
    },
    sticky: {
      true: "sticky top-0",
      false: "relative",
    },
  },
  defaultVariants: { theme: "solid", size: "md", sticky: false },
});

// ─── Inner container (max-width + padding) ────────────────────────────────────

export const navbarContainerVariants = cva(
  "mx-auto flex h-full items-center justify-between gap-4 px-4 sm:px-6 lg:px-8",
  {
    variants: {
      maxWidth: {
        sm: containerMaxWidthMap.sm,
        md: containerMaxWidthMap.md,
        lg: containerMaxWidthMap.lg,
        full: containerMaxWidthMap.full,
      },
    },
    defaultVariants: { maxWidth: "lg" },
  },
);

// ─── Brand ────────────────────────────────────────────────────────────────────

export const navbarBrandVariants = cva([
  "flex shrink-0 items-center gap-2 font-semibold text-[var(--color-fw-foreground)]",
  focusRingMap.default,
  "rounded-md",
]);

// ─── Desktop nav link ─────────────────────────────────────────────────────────

export const navbarLinkVariants = cva(
  [
    "inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium",
    transitionMap.snappy,
    focusRingMap.default,
  ],
  {
    variants: {
      active: {
        true: [
          "bg-[var(--color-fw-primary)]/10",
          "text-[var(--color-fw-primary-text)]",
        ],
        false: [
          "text-[var(--color-fw-muted-foreground)]",
          "hover:bg-[var(--color-fw-secondary-hover)]",
          "hover:text-[var(--color-fw-foreground)]",
        ],
      },
    },
    defaultVariants: { active: false },
  },
);

// ─── Mobile menu panel ────────────────────────────────────────────────────────

export const navbarMobilePanelVariants = cva([
  "absolute inset-x-0 top-full",
  "border-t border-[var(--color-fw-border)]",
  "bg-[var(--color-fw-background)]",
  "shadow-lg",
  "py-2",
]);

// ─── Mobile hamburger / close button ─────────────────────────────────────────

export const navbarMenuButtonVariants = cva([
  "inline-flex items-center justify-center rounded-md p-2",
  "text-[var(--color-fw-muted-foreground)]",
  "hover:bg-[var(--color-fw-secondary-hover)] hover:text-[var(--color-fw-foreground)]",
  transitionMap.snappy,
  focusRingMap.default,
  "md:hidden",
]);

// ─── Mobile nav link (full-width) ─────────────────────────────────────────────

export const navbarMobileLinkVariants = cva(
  [
    "flex w-full items-center px-4 py-2.5 text-sm font-medium",
    transitionMap.snappy,
    focusRingMap.inset,
  ],
  {
    variants: {
      active: {
        true: [
          "bg-[var(--color-fw-primary)]/10",
          "text-[var(--color-fw-primary-text)]",
        ],
        false: [
          "text-[var(--color-fw-muted-foreground)]",
          "hover:bg-[var(--color-fw-secondary-hover)]",
          "hover:text-[var(--color-fw-foreground)]",
        ],
      },
    },
    defaultVariants: { active: false },
  },
);

// ─── Types ────────────────────────────────────────────────────────────────────

export type NavbarTheme = "solid" | "transparent" | "blurred";
export type {
  BarHeight as NavbarSize,
  ContainerMaxWidth as NavbarMaxWidth,
} from "@/tokens";
