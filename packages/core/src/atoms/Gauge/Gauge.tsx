import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import {
  gaugeTrackVariants,
  gaugeFillVariants,
  type GaugeSize,
  type GaugeRadius,
  type GaugeVariant,
  type GaugeColor,
} from "./Gauge.variants";

export interface GaugeProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  /** Current measured value (required). */
  value: number;
  /** Minimum value of the range (default 0). */
  min?: number;
  /** Maximum value of the range (default 100). */
  max?: number;
  /** Upper boundary of the low range. */
  low?: number;
  /** Lower boundary of the high range. */
  high?: number;
  /** The value that is considered optimal. */
  optimum?: number;
  /** Visual size of the bar track. */
  size?: GaugeSize;
  /** Border radius of the bar track. */
  radius?: GaugeRadius;
  /**
   * Color variant.
   * - `auto`: derives color from value position relative to low/high/optimum ranges.
   * - Other values: fixed color, ignores ranges.
   */
  variant?: GaugeVariant;
  /** Accessible label for the meter. Required unless `aria-labelledby` is provided. */
  "aria-label"?: string;
  /** Show the formatted value (e.g. "72%") below the bar. */
  showValue?: boolean;
  /** Unit appended to the displayed value (default "%"). */
  unit?: string;
  /** Visible label text rendered above the bar. Also used as `aria-label` when no explicit `aria-label` is set. */
  label?: string;
}

/**
 * Resolves the fill color for `variant="auto"` based on W3C <meter> semantics.
 *
 * Logic mirrors the browser's native coloring algorithm:
 * - If no low/high/optimum are defined → primary
 * - If optimum is in the low range → low values are optimal:
 *     value <= low → success, value <= high → warning, otherwise → destructive
 * - If optimum is in the high range → high values are optimal:
 *     value >= high → success, value >= low → warning, otherwise → destructive
 * - Otherwise (optimum is in the middle):
 *     low <= value <= high → success, else → warning
 */
export function resolveAutoColor(
  value: number,
  min: number,
  max: number,
  low: number | undefined,
  high: number | undefined,
  optimum: number | undefined,
): GaugeColor {
  // No range hints — fall back to primary
  if (low === undefined && high === undefined && optimum === undefined) {
    return "primary";
  }

  const effectiveLow = low ?? min;
  const effectiveHigh = high ?? max;
  const effectiveOptimum = optimum ?? (min + max) / 2;

  if (effectiveOptimum <= effectiveLow) {
    // Optimum is in the low segment → low is best
    if (value <= effectiveLow) return "success";
    if (value <= effectiveHigh) return "warning";
    return "destructive";
  }

  if (effectiveOptimum >= effectiveHigh) {
    // Optimum is in the high segment → high is best
    if (value >= effectiveHigh) return "success";
    if (value >= effectiveLow) return "warning";
    return "destructive";
  }

  // Optimum is in the middle segment
  if (value >= effectiveLow && value <= effectiveHigh) return "success";
  return "warning";
}

export const Gauge = forwardRef<HTMLDivElement, GaugeProps>(
  (
    {
      value,
      min = 0,
      max = 100,
      low,
      high,
      optimum,
      size,
      radius,
      variant = "auto",
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      showValue = false,
      unit = "%",
      label,
      className,
      ...props
    },
    ref,
  ) => {
    const clampedValue = Math.min(max, Math.max(min, value));
    const fillPercent =
      max === min ? 0 : ((clampedValue - min) / (max - min)) * 100;

    // Resolve the fill color
    const fillColor: GaugeColor =
      variant === "auto"
        ? resolveAutoColor(clampedValue, min, max, low, high, optimum)
        : variant;

    // Determine the effective aria-label for the <meter>
    const effectiveAriaLabel = ariaLabel ?? label;

    return (
      <div
        ref={ref}
        className={cn("w-full flex flex-col gap-1.5", className)}
        {...props}
      >
        {/* Optional visible header */}
        {label !== undefined || showValue ? (
          <div className="flex items-center justify-between gap-2">
            {label !== undefined && (
              <span className="text-sm font-medium text-[var(--color-fw-foreground)]">
                {label}
              </span>
            )}
            {showValue ? (
              <span className="text-xs tabular-nums text-[var(--color-fw-muted-foreground)] ml-auto">
                {clampedValue}
                {unit}
              </span>
            ) : null}
          </div>
        ) : null}

        {/* Track — contains the accessible <meter> + the visual fill */}
        <div className={gaugeTrackVariants({ size, radius })}>
          {/*
           * Native <meter> — appearance-none hides the browser's built-in rendering
           * but preserves role="meter" and attributes in the accessibility tree.
           */}
          <meter
            value={clampedValue}
            min={min}
            max={max}
            low={low}
            high={high}
            optimum={optimum}
            aria-label={effectiveAriaLabel}
            aria-labelledby={ariaLabelledBy}
            className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
          />

          {/* Visual fill div */}
          <div
            aria-hidden="true"
            className={gaugeFillVariants({ color: fillColor, radius })}
            style={{ width: `${String(fillPercent)}%` }}
          />
        </div>
      </div>
    );
  },
);

Gauge.displayName = "Gauge";
