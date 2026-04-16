import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import {
  statusDotVariants,
  type StatusDotVariants,
} from "./StatusDot.variants";

/** Human-readable labels for each status value — used for aria-label. */
const statusLabelMap: Record<
  NonNullable<StatusDotVariants["status"]>,
  string
> = {
  online: "Online",
  away: "Away",
  busy: "Busy",
  offline: "Offline",
  info: "Info",
};

export interface StatusDotProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "children">, StatusDotVariants {
  /**
   * Custom accessible label — overrides the default "{Status}" label derived
   * from the `status` prop. Useful when embedding in a richer context, e.g.
   * "Alice is online".
   */
  label?: string;
}

/**
 * A small coloured dot indicating presence or status.
 *
 * Renders a `<span>` with `role="status"` and an accessible `aria-label`.
 * It intentionally has no visible text — screen readers announce via the label.
 *
 * @example
 * // Next to an avatar
 * <div className="relative inline-flex">
 *   <Avatar src={src} alt="Alice" />
 *   <StatusDot status="online" className="absolute bottom-0 right-0" />
 * </div>
 */
const StatusDot = forwardRef<HTMLSpanElement, StatusDotProps>(
  ({ className, status, size, pulse, label, ...props }, ref) => {
    const resolvedStatus = status ?? "offline";
    const ariaLabel = label ?? statusLabelMap[resolvedStatus];

    return (
      <span
        ref={ref}
        role="status"
        aria-label={ariaLabel}
        className={cn(statusDotVariants({ status, size, pulse }), className)}
        {...props}
      />
    );
  },
);

StatusDot.displayName = "StatusDot";

export { StatusDot };
