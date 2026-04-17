import { cva, type VariantProps } from "class-variance-authority";
import { sizeMap, transitionMap, focusRingMap } from "@/tokens";

export const linkVariants = cva(
  [
    "inline-flex items-center gap-1",
    "font-medium cursor-pointer",
    "rounded-sm",
    focusRingMap.default,
    transitionMap.smooth,
  ],
  {
    variants: {
      /**
       * Visual colour intent.
       * - `default` — brand primary colour (adapts to active theme).
       * - `muted` — subdued tone; useful in footers and secondary nav.
       * - `destructive` — red; use for permanent-deletion confirmation links.
       * - `inherit` — no colour override; inherits the parent's colour.
       */
      variant: {
        default: [
          "text-[var(--color-fw-primary-text)]",
          "hover:text-[var(--color-fw-primary-hover)]",
        ],
        muted: [
          "text-[var(--color-fw-muted-foreground)]",
          "hover:text-[var(--color-fw-foreground)]",
        ],
        destructive: [
          "text-[var(--color-fw-destructive-text)]",
          "hover:text-[var(--color-fw-destructive-hover)]",
        ],
        inherit: ["text-inherit", "hover:text-inherit"],
      },
      /**
       * Underline display rule.
       * - `always` — permanently underlined.
       * - `hover` — underlined on hover/focus only (default).
       * - `none` — no underline.
       */
      underline: {
        always: "underline underline-offset-4 decoration-current",
        hover:
          "no-underline hover:underline underline-offset-4 decoration-current",
        none: "no-underline hover:no-underline",
      },
      /**
       * Text size — maps to the shared `sizeMap` token scale.
       */
      size: {
        xs: sizeMap.xs.text,
        sm: sizeMap.sm.text,
        md: sizeMap.md.text,
        lg: sizeMap.lg.text,
        xl: sizeMap.xl.text,
      },
    },
    defaultVariants: {
      variant: "default",
      underline: "hover",
      size: "md",
    },
  },
);

export type LinkVariants = VariantProps<typeof linkVariants>;
