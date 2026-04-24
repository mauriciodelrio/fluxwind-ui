import { cva, type VariantProps } from "class-variance-authority";

/**
 * Outer track — background container that clips the fill.
 * `overflow-hidden` is required to clip the fill div.
 * `relative` is required to position the `<meter>` overlay.
 */
export const gaugeTrackVariants = cva(
  "relative w-full overflow-hidden bg-[var(--color-fw-border)]",
  {
    variants: {
      size: {
        xs: "h-1",
        sm: "h-1.5",
        md: "h-2.5",
        lg: "h-4",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
    },
    defaultVariants: { size: "md", radius: "full" },
  },
);

/**
 * Inner fill — width is driven by `value` via inline style.
 * Radius is kept in sync with the track via the same variant key.
 */
export const gaugeFillVariants = cva(
  "h-full transition-[width] duration-300 ease-in-out",
  {
    variants: {
      color: {
        primary: "bg-[var(--color-fw-primary)]",
        success: "bg-[var(--color-fw-success)]",
        warning: "bg-[var(--color-fw-warning)]",
        destructive: "bg-[var(--color-fw-destructive)]",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
    },
    defaultVariants: { color: "primary", radius: "full" },
  },
);

export type GaugeTrackVariants = VariantProps<typeof gaugeTrackVariants>;
export type GaugeFillVariants = VariantProps<typeof gaugeFillVariants>;

export type GaugeSize = NonNullable<GaugeTrackVariants["size"]>;
export type GaugeRadius = NonNullable<GaugeTrackVariants["radius"]>;
export type GaugeColor = NonNullable<GaugeFillVariants["color"]>;
export type GaugeVariant =
  | "auto"
  | "primary"
  | "success"
  | "warning"
  | "destructive";
