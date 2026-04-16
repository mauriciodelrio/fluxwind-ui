import {
  createContext,
  useContext,
  useId,
  cloneElement,
  type HTMLAttributes,
  type ReactElement,
} from "react";
import { cn } from "@/lib/cn";
import {
  formFieldLabelVariants,
  formFieldMessageVariants,
  type FormFieldVariants,
} from "./FormField.variants";

// ─── Context ─────────────────────────────────────────────────────────────────

export interface FormFieldContextValue {
  /** The id shared between the label (htmlFor) and the wrapped control. */
  id: string;
  /** The id of the hint element — undefined when no hint is provided. */
  hintId: string | undefined;
  /** The id of the error element — undefined when no error is provided. */
  errorId: string | undefined;
  /** Space-separated id string for aria-describedby on the control. */
  describedBy: string | undefined;
  /** Whether the field has a validation error. */
  hasError: boolean;
  /** Whether the field (and child control) is disabled. */
  disabled: boolean;
  /** Whether the field is required. */
  required: boolean;
}

const FormFieldContext = createContext<FormFieldContextValue | null>(null);

/**
 * Returns the FormField context values for custom controls that need to
 * manually wire their ARIA attributes (e.g. composite widgets, date pickers).
 *
 * @throws {Error} when called outside a `<FormField>`.
 *
 * @example
 * ```tsx
 * function MyCustomInput() {
 *   const { id, describedBy, hasError, disabled, required } = useFormField();
 *   return (
 *     <input
 *       id={id}
 *       aria-describedby={describedBy}
 *       aria-invalid={hasError || undefined}
 *       aria-required={required || undefined}
 *       disabled={disabled}
 *     />
 *   );
 * }
 * ```
 */
export function useFormField(): FormFieldContextValue {
  const ctx = useContext(FormFieldContext);
  if (!ctx) {
    throw new Error("useFormField must be called inside a <FormField>");
  }
  return ctx;
}

// ─── Props ───────────────────────────────────────────────────────────────────

/**
 * Props that FormField injects into the child control via cloneElement.
 * The `children` prop is typed against this interface so TypeScript enforces
 * that the wrapped element accepts these standard HTML/ARIA attributes.
 */
interface ControlProps {
  id?: string;
  disabled?: boolean;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean | "grammar" | "spelling";
  "aria-required"?: boolean;
}

export interface FormFieldProps
  extends FormFieldVariants, Pick<HTMLAttributes<HTMLDivElement>, "className"> {
  /** Visible label text. Always required for WCAG 2.2 AA compliance. */
  label: string;
  /** Helper text displayed below the control. */
  hint?: string;
  /**
   * Validation error message.
   * Renders with `role="alert"`, appears below the control alongside any hint,
   * and sets `aria-invalid` on the child control.
   */
  error?: string;
  /** Displays a `*` indicator next to the label and sets `aria-required` on the child. */
  required?: boolean;
  /** Propagates the disabled state to the child control. */
  disabled?: boolean;
  /** Override the auto-generated control id. */
  id?: string;
  /**
   * The single form control to wrap. Must accept these standard attributes:
   * `id`, `aria-describedby`, `aria-invalid`, `aria-required`, `disabled`.
   *
   * Works with native HTML elements (`<input>`, `<textarea>`, `<select>`)
   * and custom controls. For complex composite controls, use the `useFormField()`
   * hook instead of relying on prop injection.
   */
  children: ReactElement<ControlProps>;
}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * FormField
 *
 * Wraps any form control with an accessible label, optional hint text,
 * and a validation error message. Automatically wires `htmlFor`, `id`,
 * `aria-describedby`, `aria-invalid`, `aria-required`, and `disabled`
 * between the label, messages, and the child control via `cloneElement`.
 *
 * For custom composite controls, consume FormField state with `useFormField()`.
 *
 * @example
 * ```tsx
 * // Wrapping a native input
 * <FormField label="Email address" hint="Work email preferred" required>
 *   <input type="email" className="..." />
 * </FormField>
 *
 * // With validation error
 * <FormField label="Email address" error={errors.email?.message}>
 *   <input type="email" className="..." />
 * </FormField>
 * ```
 */
export function FormField({
  label,
  hint,
  error,
  required = false,
  disabled = false,
  size,
  id: externalId,
  className,
  children,
}: FormFieldProps) {
  const generatedId = useId();
  const id = externalId ?? generatedId;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  const hasError = Boolean(error);

  const contextValue: FormFieldContextValue = {
    id,
    hintId,
    errorId,
    describedBy,
    hasError,
    disabled,
    required,
  };

  // Build the minimal set of props to inject — only include truthy ARIA values
  // to avoid overriding child-specific defaults with falsy no-ops.
  const injectedProps: Partial<ControlProps> = { id };
  if (describedBy !== undefined) {
    injectedProps["aria-describedby"] = describedBy;
  }
  if (hasError) {
    injectedProps["aria-invalid"] = true;
  }
  if (required) {
    injectedProps["aria-required"] = true;
  }
  if (disabled) {
    injectedProps.disabled = true;
  }

  const enrichedChild = cloneElement(children, injectedProps);

  return (
    <FormFieldContext.Provider value={contextValue}>
      <div className={cn("flex flex-col gap-1.5", className)}>
        {/* Label — htmlFor links it to the injected control id */}
        <label htmlFor={id} className={formFieldLabelVariants({ size })}>
          {label}
          {required ? (
            <span
              aria-hidden="true"
              className="ml-0.5 text-[var(--color-fw-destructive)]"
            >
              *
            </span>
          ) : null}
        </label>

        {/* The wrapped control with injected ARIA + id props */}
        {enrichedChild}

        {/* Hint — visible alongside error (both linked via aria-describedby) */}
        {hint ? (
          <p
            id={hintId}
            className={formFieldMessageVariants({ intent: "hint", size })}
          >
            {hint}
          </p>
        ) : null}

        {/* Error — role="alert" announces to screen readers immediately */}
        {error ? (
          <p
            id={errorId}
            role="alert"
            className={formFieldMessageVariants({ intent: "error", size })}
          >
            {error}
          </p>
        ) : null}
      </div>
    </FormFieldContext.Provider>
  );
}

FormField.displayName = "FormField";
