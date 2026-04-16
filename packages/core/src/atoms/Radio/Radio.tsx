import { forwardRef, useId, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import {
  radioContainerVariants,
  radioTrackVariants,
  radioDotVariants,
  type RadioVariants,
} from "./Radio.variants";

export interface RadioProps
  extends
    Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type">,
    RadioVariants {
  /** Visible label — always required for a11y. */
  label: string;
  /** Helper text rendered below the radio row. */
  hint?: string;
  /** Error message — triggers invalid state and aria-describedby. */
  error?: string;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    { className, size, label, hint, error, id: externalId, disabled, ...props },
    ref,
  ) => {
    const generatedId = useId();
    const id = externalId ?? generatedId;
    const hintId = hint ? `${id}-hint` : undefined;
    const errorId = error ? `${id}-error` : undefined;
    const describedBy =
      [hintId, errorId].filter(Boolean).join(" ") || undefined;

    return (
      <div className={cn("flex flex-col gap-1 w-fit", className)}>
        <label
          className={cn(
            "flex items-start gap-2.5 cursor-pointer select-none",
            disabled && "cursor-not-allowed opacity-50",
          )}
        >
          {/* Stacking context — all visual layers are absolute siblings of the input */}
          <span className={cn(radioContainerVariants({ size }), "mt-0.5")}>
            {/* Native input — sr-only keeps it in the a11y tree and tab order */}
            <input
              ref={ref}
              type="radio"
              id={id}
              disabled={disabled}
              aria-describedby={describedBy}
              className="peer sr-only"
              {...props}
            />

            {/* Layer 1 — circle track (responds to peer state) */}
            <span
              aria-hidden="true"
              className={radioTrackVariants({ invalid: Boolean(error) })}
            />

            {/* Layer 2 — inner dot (visible when checked) */}
            <span
              aria-hidden="true"
              className={radioDotVariants({ size, invalid: Boolean(error) })}
            />
          </span>

          {/* Label text — part of the <label> so click area includes text */}
          <span className="text-sm leading-snug text-[var(--color-fw-foreground)]">
            {label}
          </span>
        </label>

        {error ? (
          <span
            id={errorId}
            className="text-xs text-[var(--color-fw-destructive-text)] pl-[1.625rem]"
          >
            {error}
          </span>
        ) : null}

        {hint ? (
          <span
            id={hintId}
            className="text-xs text-[var(--color-fw-muted)] pl-[1.625rem]"
          >
            {hint}
          </span>
        ) : null}
      </div>
    );
  },
);

Radio.displayName = "Radio";

export { Radio };
