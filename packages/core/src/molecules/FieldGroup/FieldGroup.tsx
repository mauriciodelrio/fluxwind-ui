import { useId, type FieldsetHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import {
  fieldGroupLegendVariants,
  fieldGroupMessageVariants,
  fieldGroupChildrenVariants,
  type FieldGroupVariants,
} from "./FieldGroup.variants";

// ─── Props ────────────────────────────────────────────────────────────────────

export interface FieldGroupProps
  extends
    Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, "size">,
    FieldGroupVariants {
  /** Visible legend text — required for WCAG 2.2 AA (WCAG 1.3.1). */
  legend: string;
  /** Helper text rendered below the legend and linked via `aria-describedby`. */
  hint?: string;
  /**
   * Validation error message.
   * Renders with `role="alert"` below the children group.
   * Sets `aria-invalid="true"` and `aria-describedby` on the `<fieldset>`.
   */
  error?: string;
  /** Adds a `*` indicator next to the legend and `aria-required` on the fieldset. */
  required?: boolean;
  /**
   * Layout direction for the children container.
   * @default "vertical"
   */
  direction?: "vertical" | "horizontal";
  /**
   * Controls the font size of legend, hint, and error text.
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
  /** Any form controls (Checkboxes, Switches, Radios, etc.). */
  children?: ReactNode;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * FieldGroup
 *
 * Wraps a set of related form controls with a semantic `<fieldset>` + `<legend>`,
 * fulfilling WCAG 1.3.1 (Info and Relationships, Level A).
 *
 * When `disabled` is set, the browser natively disables all form controls inside
 * the fieldset — no JavaScript simulation required.
 *
 * @example
 * ```tsx
 * <FieldGroup legend="Notification preferences" hint="Choose at least one.">
 *   <Checkbox label="Email" />
 *   <Checkbox label="SMS" />
 * </FieldGroup>
 * ```
 */
export function FieldGroup({
  legend,
  hint,
  error,
  required = false,
  direction = "vertical",
  size = "md",
  disabled,
  className,
  children,
  ...props
}: FieldGroupProps) {
  const groupId = useId();
  const hintId = hint ? `${groupId}-hint` : undefined;
  const errorId = error ? `${groupId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  const hasError = Boolean(error);

  return (
    <fieldset
      className={cn(
        "flex flex-col gap-1.5 border-0 p-0 m-0 min-w-0",
        disabled && "opacity-50",
        className,
      )}
      disabled={disabled}
      aria-describedby={describedBy}
      aria-invalid={hasError || undefined}
      aria-required={required || undefined}
      {...props}
    >
      {/* Legend — provides the accessible group name */}
      <legend className={fieldGroupLegendVariants({ size })}>
        {legend}
        {required ? (
          <span
            aria-hidden="true"
            className="ml-0.5 text-[var(--color-fw-destructive)]"
          >
            *
          </span>
        ) : null}
      </legend>

      {/* Hint — shown below legend, linked via aria-describedby */}
      {hint ? (
        <p
          id={hintId}
          className={fieldGroupMessageVariants({ intent: "hint", size })}
        >
          {hint}
        </p>
      ) : null}

      {/* Children container — direction controls flex-col vs flex-row */}
      <div className={fieldGroupChildrenVariants({ direction })}>
        {children}
      </div>

      {/* Error — role="alert" announces to screen readers immediately */}
      {error ? (
        <p
          id={errorId}
          role="alert"
          className={fieldGroupMessageVariants({ intent: "error", size })}
        >
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
