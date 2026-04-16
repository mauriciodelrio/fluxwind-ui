import {
  forwardRef,
  useId,
  type SelectHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import { selectVariants, type SelectVariants } from "./Select.variants";

export interface SelectOption {
  /** Option value submitted with the form. */
  value: string;
  /** Visible option label. */
  label: string;
  /** Disables this individual option. */
  disabled?: boolean;
}

export interface SelectGroup {
  /** Label shown as the `<optgroup>` header. */
  group: string;
  /** Options belonging to this group. */
  options: SelectOption[];
}

export type SelectItem = SelectOption | SelectGroup;

export interface SelectProps
  extends
    Omit<SelectHTMLAttributes<HTMLSelectElement>, "size">,
    SelectVariants {
  /** Visible label — always required for a11y. */
  label: string;
  /**
   * Option list. Accepts either flat `SelectOption` items or
   * `SelectGroup` objects that render as `<optgroup>` elements.
   */
  options: SelectItem[];
  /**
   * Placeholder text shown as the first, non-selectable option.
   * When provided, it is selected by default and submits `""` as value.
   */
  placeholder?: string;
  /** Helper text rendered below the select. */
  hint?: string;
  /** Error message — triggers invalid state and aria-describedby. */
  error?: string;
  /**
   * Optional icon rendered inside the leading edge of the trigger.
   * The trailing chevron is always rendered by the component itself.
   */
  iconLeft?: ReactNode;
}

function isGroup(item: SelectItem): item is SelectGroup {
  return "group" in item;
}

function renderOptions(options: SelectItem[]) {
  return options.map((item) => {
    if (isGroup(item)) {
      return (
        <optgroup key={item.group} label={item.group}>
          {item.options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </optgroup>
      );
    }
    return (
      <option key={item.value} value={item.value} disabled={item.disabled}>
        {item.label}
      </option>
    );
  });
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      size,
      radius,
      transition,
      label,
      options,
      placeholder,
      hint,
      error,
      iconLeft,
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

    return (
      <div className="flex flex-col gap-1.5 w-full">
        <label
          htmlFor={id}
          className="text-sm font-medium text-[var(--color-fw-foreground)]"
        >
          {label}
        </label>

        <div className="relative flex items-center">
          {iconLeft ? (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-3 text-[var(--color-fw-muted)]"
            >
              {iconLeft}
            </span>
          ) : null}

          <select
            ref={ref}
            id={id}
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            className={cn(
              selectVariants({ size, radius, transition }),
              iconLeft ? "pl-9" : undefined,
              className,
            )}
            {...props}
          >
            {placeholder ? (
              <option value="" disabled hidden>
                {placeholder}
              </option>
            ) : null}
            {renderOptions(options)}
          </select>

          {/* Custom trailing chevron — replaces the native OS arrow */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-3 text-[var(--color-fw-muted)]"
          >
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
            >
              <polyline points="4,6 8,10 12,6" />
            </svg>
          </span>
        </div>

        {error ? (
          <span
            id={errorId}
            className="text-xs text-[var(--color-fw-destructive-text)]"
          >
            {error}
          </span>
        ) : null}
        {hint ? (
          <span id={hintId} className="text-xs text-[var(--color-fw-muted)]">
            {hint}
          </span>
        ) : null}
      </div>
    );
  },
);

Select.displayName = "Select";

export { Select };
