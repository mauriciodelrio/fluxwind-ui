import { cva } from "class-variance-authority";
import { radiusMap } from "@/tokens";

// ─── Types ───────────────────────────────────────────────────────────────────

export type CarouselRadius = keyof typeof radiusMap;

// ─── Root ────────────────────────────────────────────────────────────────────

export const carouselRootVariants = cva("relative w-full overflow-hidden", {
  variants: {
    radius: {
      none: radiusMap.none,
      sm: radiusMap.sm,
      md: radiusMap.md,
      lg: radiusMap.lg,
      xl: radiusMap.xl,
      "2xl": radiusMap["2xl"],
      full: radiusMap.full,
    },
  },
  defaultVariants: {
    radius: "md",
  },
});

// ─── Track ───────────────────────────────────────────────────────────────────

export const carouselTrackVariants = cva("flex will-change-transform", {
  variants: {
    /**
     * Whether the track transition is animated.
     * Controlled programmatically — respects prefers-reduced-motion via
     * the global CSS rule in the design system.
     */
    animated: {
      true: "transition-transform duration-300 ease-in-out",
      false: "",
    },
  },
  defaultVariants: {
    animated: true,
  },
});

// ─── Item (slide) ─────────────────────────────────────────────────────────────

export const carouselItemVariants = cva(
  "min-w-0 shrink-0 grow-0 basis-full select-none",
);

// ─── Nav buttons ─────────────────────────────────────────────────────────────

export const carouselNavVariants = cva(
  [
    "absolute top-1/2 z-10 flex -translate-y-1/2 items-center justify-center",
    "h-9 w-9 rounded-full",
    "bg-fw-background/80 backdrop-blur-sm",
    "border border-fw-border",
    "text-fw-foreground",
    "shadow-sm",
    "transition-all duration-150",
    "hover:bg-fw-surface hover:shadow-md",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fw-ring",
    "disabled:pointer-events-none disabled:opacity-40",
  ],
  {
    variants: {
      direction: {
        prev: "left-3",
        next: "right-3",
      },
    },
  },
);

export type CarouselNavDirection = "prev" | "next";

// ─── Dot indicator ────────────────────────────────────────────────────────────

export const carouselDotVariants = cva(
  [
    "rounded-full transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fw-ring",
    "disabled:pointer-events-none disabled:opacity-40",
  ],
  {
    variants: {
      active: {
        true: "w-6 h-2.5 bg-fw-foreground",
        false: "w-2.5 h-2.5 bg-fw-muted hover:bg-fw-foreground/60",
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);

// ─── Dots container ───────────────────────────────────────────────────────────

export const carouselDotsVariants = cva(
  "absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5",
);
