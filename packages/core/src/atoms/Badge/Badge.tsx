import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { badgeVariants, type BadgeVariants } from "./Badge.variants";

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>, BadgeVariants {
  /** Optional icon rendered before the label. */
  icon?: ReactNode;
  /** Dot indicator shown before label (replaces icon). */
  dot?: boolean;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { className, variant, radius, transition, icon, dot, children, ...props },
    ref,
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          badgeVariants({ variant, radius, transition }),
          className,
        )}
        {...props}
      >
        {dot ? (
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-current shrink-0"
          />
        ) : null}
        {!dot && icon ? (
          <span aria-hidden="true" className="shrink-0">
            {icon}
          </span>
        ) : null}
        {children}
      </span>
    );
  },
);

Badge.displayName = "Badge";

export { Badge };
