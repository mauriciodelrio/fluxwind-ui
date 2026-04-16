import { useId, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import {
  progressTrackVariants,
  progressFillVariants,
  type ProgressVariants,
} from "./Progress.variants";

export interface ProgressProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children">, ProgressVariants {
  /**
   * Current progress value (0–100).
   * Omit or pass `undefined` for indeterminate state.
   */
  value?: number;
  /**
   * Accessible name describing what the progress represents.
   * Always required — used as `aria-label` on the progressbar element.
   */
  label: string;
  /** Show the label text visually above the bar. */
  showLabel?: boolean;
  /** Show the percentage value visually above the bar (only in determined state). */
  showValue?: boolean;
}

/**
 * Progress — a linear progress bar atom.
 *
 * **Determined:** Pass `value` (0–100). The fill width animates via CSS transition.
 * Values are clamped to [0, 100] internally.
 *
 * **Indeterminate:** Omit `value`. A sliding bar animates indefinitely to signal
 * activity when progress cannot be measured. Respects `prefers-reduced-motion`.
 *
 * **A11y:** Uses `role="progressbar"` with `aria-label`, `aria-valuemin`,
 * `aria-valuemax`, and `aria-valuenow` (determined only).
 */
export function Progress({
  value,
  label,
  showLabel = false,
  showValue = false,
  size,
  radius,
  variant,
  className,
  ...props
}: ProgressProps) {
  const labelId = useId();
  const isDetermined = value !== undefined;
  const clampedValue = isDetermined
    ? Math.min(100, Math.max(0, value))
    : undefined;

  return (
    <div className={cn("w-full flex flex-col gap-1.5", className)} {...props}>
      {/* Optional visible header row */}
      {showLabel || showValue ? (
        <div className="flex items-center justify-between gap-2">
          {showLabel ? (
            <span
              id={labelId}
              className="text-sm font-medium text-[var(--color-fw-foreground)]"
            >
              {label}
            </span>
          ) : null}
          {showValue && isDetermined ? (
            <span className="text-xs tabular-nums text-[var(--color-fw-muted)] ml-auto">
              {clampedValue}%
            </span>
          ) : null}
        </div>
      ) : null}

      {/* Track */}
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clampedValue}
        className={progressTrackVariants({ size, radius })}
      >
        {isDetermined ? (
          /* Determined fill */
          <div
            aria-hidden="true"
            className={progressFillVariants({ variant, radius })}
            style={{ width: `${String(clampedValue ?? 0)}%` }}
          />
        ) : (
          /* Indeterminate sliding bar */
          <div
            aria-hidden="true"
            className={cn(
              "h-full w-1/3 animate-fw-indeterminate",
              progressFillVariants({ variant, radius }),
            )}
          />
        )}
      </div>
    </div>
  );
}
