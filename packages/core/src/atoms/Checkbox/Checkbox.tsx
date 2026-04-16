import {
  forwardRef,
  useId,
  useRef,
  useEffect,
  useCallback,
  type InputHTMLAttributes,
} from "react";
import { cn } from "@/lib/cn";
import {
  checkboxContainerVariants,
  checkboxBoxVariants,
  type CheckboxVariants,
} from "./Checkbox.variants";

export interface CheckboxProps
  extends
    Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type">,
    CheckboxVariants {
  /** Visible label — always required for a11y. */
  label: string;
  /** Helper text rendered below the checkbox row. */
  hint?: string;
  /** Error message — triggers invalid state and aria-describedby. */
  error?: string;
  /**
   * Sets the checkbox to an indeterminate state (neither checked nor unchecked).
   * Controlled via the DOM `.indeterminate` property, not an HTML attribute.
   */
  indeterminate?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      size,
      label,
      hint,
      error,
      indeterminate,
      id: externalId,
      disabled,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = externalId ?? generatedId;
    const hintId = hint ? `${id}-hint` : undefined;
    const errorId = error ? `${id}-error` : undefined;
    const describedBy =
      [hintId, errorId].filter(Boolean).join(" ") || undefined;

    // Internal ref needed to set the non-standard `.indeterminate` DOM property.
    const internalRef = useRef<HTMLInputElement>(null);

    // Merge the forwarded ref with the internal ref.
    const composedRef = useCallback(
      (node: HTMLInputElement | null) => {
        internalRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref !== null) {
          ref.current = node;
        }
      },
      [ref],
    );

    useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = indeterminate ?? false;
      }
    }, [indeterminate]);

    return (
      <div className={cn("flex flex-col gap-1 w-fit", className)}>
        {/*
         * The <label> wraps the input for implicit label association.
         * hint/error are outside and linked via aria-describedby.
         */}
        <label
          className={cn(
            "flex items-start gap-2.5 cursor-pointer select-none",
            disabled && "cursor-not-allowed opacity-50",
          )}
        >
          {/* Stacking context — all visual layers are absolute siblings of the input */}
          <span className={cn(checkboxContainerVariants({ size }), "mt-0.5")}>
            {/* Native input — sr-only keeps it in the a11y tree and tab order */}
            <input
              ref={composedRef}
              type="checkbox"
              id={id}
              disabled={disabled}
              aria-invalid={error ? true : undefined}
              aria-describedby={describedBy}
              className="peer sr-only"
              {...props}
            />

            {/* Layer 1 — background box (responds to peer state) */}
            <span
              aria-hidden="true"
              className={checkboxBoxVariants({ invalid: Boolean(error) })}
            />

            {/* Layer 2 — checkmark (visible when checked, hidden when indeterminate) */}
            <svg
              aria-hidden="true"
              viewBox="0 0 10 8"
              className="absolute inset-0 m-auto size-[65%] text-white pointer-events-none opacity-0 peer-checked:opacity-100 peer-indeterminate:!opacity-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="1,4 4,7 9,1" />
            </svg>

            {/* Layer 3 — dash (visible only when indeterminate) */}
            <span
              aria-hidden="true"
              className="absolute inset-0 m-auto h-[2px] w-[55%] rounded-full bg-white pointer-events-none opacity-0 peer-indeterminate:opacity-100"
            />
          </span>

          <span className="text-sm font-medium leading-4 text-[var(--color-fw-foreground)]">
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

Checkbox.displayName = "Checkbox";

export { Checkbox };
