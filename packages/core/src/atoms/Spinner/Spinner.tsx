import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { spinnerVariants, type SpinnerVariants } from "./Spinner.variants";

export interface SpinnerProps
  extends HTMLAttributes<HTMLSpanElement>, SpinnerVariants {
  /** Accessible label announced to screen readers. Defaults to "Loading". */
  label?: string;
}

const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, size, variant, label = "Loading", ...props }, ref) => {
    return (
      <span
        ref={ref}
        role="status"
        aria-label={label}
        className={cn("inline-flex items-center justify-center", className)}
        {...props}
      >
        <span
          aria-hidden="true"
          className={cn(spinnerVariants({ size, variant }))}
        />
      </span>
    );
  },
);

Spinner.displayName = "Spinner";

export { Spinner };
