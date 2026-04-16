import { forwardRef, useId, type TextareaHTMLAttributes } from "react";
import { useSignal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import { cn } from "@/lib/cn";
import { textareaVariants, type TextareaVariants } from "./Textarea.variants";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>, TextareaVariants {
  /** Visible label — always required for a11y (rendered as <label>). */
  label: string;
  /** Helper text rendered below the textarea. */
  hint?: string;
  /** Error message — triggers invalid state and aria-describedby. */
  error?: string;
  /**
   * When provided, shows a character counter `current / max` below the field.
   * Wire `value` (controlled) or `defaultValue` alongside this prop so the
   * counter reflects the actual length.
   */
  maxLength?: number;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      resize,
      radius,
      transition,
      label,
      hint,
      error,
      maxLength,
      id: externalId,
      disabled,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref,
  ) => {
    useSignals();
    const generatedId = useId();
    const id = externalId ?? generatedId;
    const hintId = hint ? `${id}-hint` : undefined;
    const errorId = error ? `${id}-error` : undefined;
    const describedBy =
      [hintId, errorId].filter(Boolean).join(" ") || undefined;

    // In uncontrolled mode, track length via internal state so the counter
    // updates as the user types. In controlled mode, derive from `value`.
    const isControlled = value !== undefined;
    const uncontrolledLength = useSignal<number>(
      typeof defaultValue === "string" ? defaultValue.length : 0,
    );

    let currentLength: number | undefined;
    if (maxLength !== undefined) {
      if (isControlled) {
        currentLength = typeof value === "string" ? value.length : 0;
      } else {
        currentLength = uncontrolledLength.value;
      }
    }

    return (
      <div className="flex flex-col gap-1.5 w-full">
        <label
          htmlFor={id}
          className="text-sm font-medium text-[var(--color-fw-foreground)]"
        >
          {label}
        </label>

        <textarea
          ref={ref}
          id={id}
          disabled={disabled}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          onChange={(e) => {
            if (!isControlled) uncontrolledLength.value = e.target.value.length;
            onChange?.(e);
          }}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            textareaVariants({ resize, radius, transition }),
            className,
          )}
          {...props}
        />

        {/* Footer row: error/hint on the left, counter on the right */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-0.5">
            {error ? (
              <span
                id={errorId}
                className="text-xs text-[var(--color-fw-destructive-text)]"
              >
                {error}
              </span>
            ) : null}
            {hint ? (
              <span
                id={hintId}
                className="text-xs text-[var(--color-fw-muted)]"
              >
                {hint}
              </span>
            ) : null}
          </div>

          {maxLength !== undefined && currentLength !== undefined ? (
            <span
              aria-live="polite"
              className={cn(
                "text-xs tabular-nums shrink-0",
                currentLength >= maxLength
                  ? "text-[var(--color-fw-destructive-text)]"
                  : "text-[var(--color-fw-muted)]",
              )}
            >
              {currentLength}/{maxLength}
            </span>
          ) : null}
        </div>
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export { Textarea };
