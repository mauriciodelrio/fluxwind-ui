import { useId, type ReactNode } from "react";

export interface RadioGroupProps {
  /**
   * Legend text that describes the group — always required for a11y.
   * Rendered as a visually styled `<legend>` inside a `<fieldset>`.
   */
  legend: string;
  /** Error message for the whole group. Linked via aria-describedby on the fieldset. */
  error?: string;
  /** Helper text for the whole group. */
  hint?: string;
  /**
   * Layout direction of the radio items.
   * @default "vertical"
   */
  direction?: "vertical" | "horizontal";
  /** Radio atoms to render inside the group. */
  children: ReactNode;
  className?: string;
}

/**
 * RadioGroup wraps multiple Radio atoms in a semantic `<fieldset>` + `<legend>`.
 *
 * **A11y:** The `<fieldset>` provides the group role; `<legend>` announces the
 * group name to screen readers before each radio label. Never omit the legend.
 *
 * Individual Radio atoms should receive `name` + `value` props so the browser
 * handles mutual exclusion natively.
 */
export function RadioGroup({
  legend,
  error,
  hint,
  direction = "vertical",
  children,
  className,
}: RadioGroupProps) {
  const groupId = useId();
  const hintId = hint ? `${groupId}-hint` : undefined;
  const errorId = error ? `${groupId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <fieldset
      aria-describedby={describedBy}
      aria-invalid={error ? true : undefined}
      className={className}
      style={{ border: "none", padding: 0, margin: 0 }}
    >
      <legend className="text-sm font-semibold text-[var(--color-fw-foreground)] mb-2">
        {legend}
      </legend>

      <div
        className={
          direction === "horizontal"
            ? "flex flex-row flex-wrap gap-x-6 gap-y-2"
            : "flex flex-col gap-2"
        }
      >
        {children}
      </div>

      {error ? (
        <span
          id={errorId}
          className="block mt-1.5 text-xs text-[var(--color-fw-destructive-text)]"
        >
          {error}
        </span>
      ) : null}

      {hint ? (
        <span
          id={hintId}
          className="block mt-1.5 text-xs text-[var(--color-fw-muted)]"
        >
          {hint}
        </span>
      ) : null}
    </fieldset>
  );
}
