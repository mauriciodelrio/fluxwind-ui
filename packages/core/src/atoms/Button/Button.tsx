import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { buttonVariants, type ButtonVariants } from './Button.variants';

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariants {
  /** Accessible label — required when the button contains only an icon. */
  'aria-label'?: string;
  /** Icon placed before the button label. */
  iconLeft?: ReactNode;
  /** Icon placed after the button label. */
  iconRight?: ReactNode;
  /** Shows a loading spinner and sets aria-busy. */
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      radius,
      transition,
      fullWidth,
      iconLeft,
      iconRight,
      loading = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled === true || loading}
        aria-busy={loading ? true : undefined}
        className={cn(
          buttonVariants({ variant, size, radius, transition, fullWidth }),
          className,
        )}
        {...props}
      >
        {loading ? (
          <svg
            aria-hidden="true"
            className="animate-spin size-4 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : null}
        {!loading && iconLeft ? (
          <span aria-hidden="true" className="shrink-0">
            {iconLeft}
          </span>
        ) : null}
        {children}
        {!loading && iconRight ? (
          <span aria-hidden="true" className="shrink-0">
            {iconRight}
          </span>
        ) : null}
      </button>
    );
  },
);

Button.displayName = 'Button';

export { Button };
