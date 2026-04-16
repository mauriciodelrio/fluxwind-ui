import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { Info, CircleCheck, TriangleAlert, CircleX, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  alertVariants,
  alertIconVariants,
  type AlertIntent,
} from "./Alert.variants";

// ─── Intent defaults ──────────────────────────────────────────────────────────

const INTENT_ICONS: Record<AlertIntent, LucideIcon> = {
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
  error: CircleX,
};

// error / warning → role="alert"  (assertive, immediate announcement)
// info  / success → role="status" (polite, non-interrupting)
const INTENT_ROLES: Record<AlertIntent, "alert" | "status"> = {
  info: "status",
  success: "status",
  warning: "alert",
  error: "alert",
};

// ─── Props ────────────────────────────────────────────────────────────────────

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Semantic intent — controls colour palette, default icon, and ARIA live
   * region role (`alert` for error/warning, `status` for info/success).
   */
  intent: AlertIntent;
  /** Optional bold title rendered above the body content. */
  title?: string;
  /** Alert body — plain text or rich React content. */
  children?: ReactNode;
  /**
   * Override the default intent icon with any Lucide icon component.
   * Pass `null` to hide the icon entirely.
   */
  icon?: LucideIcon | null;
  /**
   * When provided, a dismiss (×) button is rendered in the top-right corner.
   * The caller is responsible for removing `<Alert>` from the tree on click.
   */
  onDismiss?: () => void;
  /**
   * Accessible label for the dismiss button.
   * @default "Dismiss"
   */
  dismissLabel?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      intent,
      title,
      children,
      icon,
      onDismiss,
      dismissLabel = "Dismiss",
      className,
      ...props
    },
    ref,
  ) => {
    // icon === null   → explicitly hidden
    // icon === LucideIcon → consumer override
    // icon === undefined → use the default for this intent
    const IconComponent: LucideIcon | null =
      icon === null ? null : (icon ?? INTENT_ICONS[intent]);

    const role = INTENT_ROLES[intent];

    return (
      <div
        ref={ref}
        role={role}
        className={cn(alertVariants({ intent }), className)}
        {...props}
      >
        {/* Decorative intent icon */}
        {IconComponent !== null ? (
          <IconComponent
            aria-hidden="true"
            className={alertIconVariants({ intent })}
          />
        ) : null}

        {/* Content */}
        <div className="flex-1 min-w-0">
          {title ? (
            <p className="font-semibold leading-snug mb-1">{title}</p>
          ) : null}
          {children ? (
            <div className="leading-relaxed [&_p]:mb-2 [&_p:last-child]:mb-0">
              {children}
            </div>
          ) : null}
        </div>

        {/* Dismiss button */}
        {onDismiss ? (
          <button
            type="button"
            onClick={onDismiss}
            aria-label={dismissLabel}
            className={cn(
              "shrink-0 -mt-0.5 -mr-1 rounded p-0.5 cursor-pointer",
              "opacity-60 hover:opacity-100",
              "focus-visible:outline-2 focus-visible:outline-offset-1",
              "focus-visible:outline-[var(--color-fw-ring)]",
              "transition-opacity duration-150",
            )}
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        ) : null}
      </div>
    );
  },
);

Alert.displayName = "Alert";

export { Alert };
