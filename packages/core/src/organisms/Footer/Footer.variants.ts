import { cva } from "class-variance-authority";
import { containerMaxWidthMap, focusRingMap, transitionMap } from "@/tokens";

// ─── Types ────────────────────────────────────────────────────────────────────

/** Background style of the footer. */
export type FooterBackground = "default" | "muted" | "dark";

// Re-exports
export type { ContainerMaxWidth as FooterMaxWidth } from "@/tokens";

// ─── Footer root (<footer>) ───────────────────────────────────────────────────

export const footerVariants = cva("w-full border-t", {
  variants: {
    background: {
      default: [
        "bg-[var(--color-fw-background)]",
        "border-[var(--color-fw-border)]",
      ],
      muted: [
        "bg-[var(--color-fw-secondary)]",
        "border-[var(--color-fw-border)]",
      ],
      dark: [
        "bg-[var(--color-fw-foreground)]",
        "border-[var(--color-fw-foreground)]",
      ],
    },
  },
  defaultVariants: {
    background: "default",
  },
});

// ─── Inner container ──────────────────────────────────────────────────────────

export const footerContainerVariants = cva(
  "mx-auto w-full px-6 lg:px-8 py-12 lg:py-16",
  {
    variants: {
      maxWidth: containerMaxWidthMap,
    },
    defaultVariants: {
      maxWidth: "lg",
    },
  },
);

// ─── Top row (logo area + nav columns) ───────────────────────────────────────

export const footerTopVariants = cva("xl:grid xl:grid-cols-3 xl:gap-8");

// ─── Brand area (logo + tagline) ──────────────────────────────────────────────

export const footerBrandVariants = cva("space-y-4");

// ─── Brand name ───────────────────────────────────────────────────────────────

export const footerBrandNameVariants = cva("text-base font-semibold", {
  variants: {
    background: {
      default: "text-[var(--color-fw-foreground)]",
      muted: "text-[var(--color-fw-foreground)]",
      dark: "text-[var(--color-fw-background)]",
    },
  },
  defaultVariants: {
    background: "default",
  },
});

// ─── Tagline ──────────────────────────────────────────────────────────────────

export const footerTaglineVariants = cva("text-sm leading-6", {
  variants: {
    background: {
      default: "text-[var(--color-fw-foreground)]/80",
      muted: "text-[var(--color-fw-foreground)]/80",
      dark: "text-[var(--color-fw-background)]/80",
    },
  },
  defaultVariants: {
    background: "default",
  },
});

// ─── Nav columns grid ─────────────────────────────────────────────────────────

export const footerNavGridVariants = cva(
  "mt-10 grid gap-8 xl:col-span-2 xl:mt-0",
  {
    variants: {
      columns: {
        2: "grid-cols-2",
        3: "grid-cols-2 sm:grid-cols-3",
        4: "grid-cols-2 sm:grid-cols-4",
      },
    },
    defaultVariants: {
      columns: 3,
    },
  },
);

export type FooterNavColumns = 2 | 3 | 4;

// ─── Nav column ───────────────────────────────────────────────────────────────

export const footerNavColumnVariants = cva("space-y-4");

// ─── Nav column heading ───────────────────────────────────────────────────────

export const footerNavHeadingVariants = cva(
  "text-sm font-semibold uppercase tracking-widest",
  {
    variants: {
      background: {
        default: "text-[var(--color-fw-foreground)]",
        muted: "text-[var(--color-fw-foreground)]",
        dark: "text-[var(--color-fw-background)]",
      },
    },
    defaultVariants: {
      background: "default",
    },
  },
);

// ─── Nav column list ──────────────────────────────────────────────────────────

export const footerNavListVariants = cva("space-y-3");

// ─── Nav link ─────────────────────────────────────────────────────────────────

export const footerNavLinkVariants = cva(
  ["block text-sm leading-6", focusRingMap.default, transitionMap.snappy],
  {
    variants: {
      background: {
        default: [
          "text-[var(--color-fw-foreground)]/80",
          "hover:text-[var(--color-fw-foreground)]",
        ],
        muted: [
          "text-[var(--color-fw-foreground)]/80",
          "hover:text-[var(--color-fw-foreground)]",
        ],
        dark: [
          "text-[var(--color-fw-background)]/80",
          "hover:text-[var(--color-fw-background)]",
        ],
      },
    },
    defaultVariants: {
      background: "default",
    },
  },
);

// ─── Social icons row ─────────────────────────────────────────────────────────

export const footerSocialRowVariants = cva("flex gap-6");

// ─── Social icon link ─────────────────────────────────────────────────────────

export const footerSocialLinkVariants = cva(
  ["rounded-md p-1", focusRingMap.default, transitionMap.snappy],
  {
    variants: {
      background: {
        default: [
          "text-[var(--color-fw-foreground)]/80",
          "hover:text-[var(--color-fw-foreground)]",
        ],
        muted: [
          "text-[var(--color-fw-foreground)]/80",
          "hover:text-[var(--color-fw-foreground)]",
        ],
        dark: [
          "text-[var(--color-fw-background)]/80",
          "hover:text-[var(--color-fw-background)]",
        ],
      },
    },
    defaultVariants: {
      background: "default",
    },
  },
);

// ─── Bottom bar (copyright + optional legal links) ───────────────────────────

export const footerBottomVariants = cva(
  "mt-12 border-t pt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between",
  {
    variants: {
      background: {
        default: "border-[var(--color-fw-border)]",
        muted: "border-[var(--color-fw-border)]",
        dark: "border-[var(--color-fw-background)]/20",
      },
    },
    defaultVariants: {
      background: "default",
    },
  },
);

// ─── Copyright text ───────────────────────────────────────────────────────────

export const footerCopyrightVariants = cva("text-xs leading-5", {
  variants: {
    background: {
      default: "text-[var(--color-fw-foreground)]/80",
      muted: "text-[var(--color-fw-foreground)]/80",
      dark: "text-[var(--color-fw-background)]/80",
    },
  },
  defaultVariants: {
    background: "default",
  },
});

// ─── Legal links row ──────────────────────────────────────────────────────────

export const footerLegalListVariants = cva("flex flex-wrap gap-x-6 gap-y-2");

export const footerLegalLinkVariants = cva(
  ["text-xs leading-5", focusRingMap.default, transitionMap.snappy],
  {
    variants: {
      background: {
        default: [
          "text-[var(--color-fw-foreground)]/80",
          "hover:text-[var(--color-fw-foreground)]",
        ],
        muted: [
          "text-[var(--color-fw-foreground)]/80",
          "hover:text-[var(--color-fw-foreground)]",
        ],
        dark: [
          "text-[var(--color-fw-background)]/80",
          "hover:text-[var(--color-fw-background)]",
        ],
      },
    },
    defaultVariants: {
      background: "default",
    },
  },
);
