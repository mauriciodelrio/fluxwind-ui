import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { inputVariants, type InputVariants } from './Input.variants';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>, InputVariants {
  /** Visible label — always required for a11y (rendered as <label>). */
  label: string;
  /** Helper text rendered below the input. */
  hint?: string;
  /** Error message — triggers invalid state and aria-describedby. */
  error?: string;
  /** Icon rendered inside the leading edge of the input. */
  iconLeft?: ReactNode;
  /** Icon rendered inside the trailing edge of the input. */
  iconRight?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      size,
      radius,
      transition,
      label,
      hint,
      error,
      iconLeft,
      iconRight,
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
    const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        <label htmlFor={id} className="text-sm font-medium text-[var(--color-fw-foreground)]">
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
          <input
            ref={ref}
            id={id}
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            className={cn(
              inputVariants({ size, radius, transition }),
              iconLeft ? 'pl-9' : undefined,
              iconRight ? 'pr-9' : undefined,
              className,
            )}
            {...props}
          />
          {iconRight ? (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-3 text-[var(--color-fw-muted)]"
            >
              {iconRight}
            </span>
          ) : null}
        </div>

        {error ? (
          <span
            id={errorId}
            role="alert"
            className="text-xs text-[var(--color-fw-destructive)]"
          >
            {error}
          </span>
        ) : null}
        {!error && hint ? (
          <span id={hintId} className="text-xs text-[var(--color-fw-muted)]">
            {hint}
          </span>
        ) : null}
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };
