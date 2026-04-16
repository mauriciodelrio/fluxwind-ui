import { forwardRef, useId, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import {
  switchContainerVariants,
  switchTrackVariants,
  switchThumbVariants,
  type SwitchVariants,
} from "./Switch.variants";

export interface SwitchProps
  extends
    Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type">,
    SwitchVariants {
  /** Visible label — always required for a11y. */
  label: string;
  /** Helper text rendered below the switch row. */
  hint?: string;
  /** Error message — triggers invalid state and aria-describedby. */
  error?: string;
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
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
        {/*
         * The <label> wraps the input for implicit label association.
         * hint/error are outside and linked via aria-describedby.
         */}
        <label
          className={cn(
            "flex items-center gap-3 cursor-pointer select-none",
            disabled && "cursor-not-allowed opacity-50",
          )}
        >
          {/* Stacking context — track and thumb are absolute siblings of the peer input */}
          <span className={switchContainerVariants({ size })}>
            {/* Native input — sr-only keeps it in the a11y tree and tab order */}
            <input
              ref={ref}
              type="checkbox"
              role="switch"
              id={id}
              disabled={disabled}
              aria-invalid={error ? true : undefined}
              aria-describedby={describedBy}
              className="peer sr-only"
              {...props}
            />

            {/* Track (background pill) */}
            <span
              aria-hidden="true"
              className={switchTrackVariants({ invalid: Boolean(error) })}
            />

            {/* Thumb (sliding circle) */}
            <span
              aria-hidden="true"
              className={switchThumbVariants({ size })}
            />
          </span>

          <span className="text-sm font-medium text-[var(--color-fw-foreground)]">
            {label}
          </span>
        </label>

        {hint ? (
          <span id={hintId} className="text-xs text-[var(--color-fw-muted)]">
            {hint}
          </span>
        ) : null}

        {error ? (
          <span
            id={errorId}
            className="text-xs text-[var(--color-fw-destructive-text)]"
          >
            {error}
          </span>
        ) : null}
      </div>
    );
  },
);

Switch.displayName = "Switch";

export { Switch };
