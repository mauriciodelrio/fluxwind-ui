import {
  createContext,
  forwardRef,
  useContext,
  useId,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import {
  accordionRootVariants,
  accordionItemVariants,
  accordionTriggerVariants,
  accordionPanelVariants,
  type AccordionTriggerVariants,
} from "./Accordion.variants";

// ─── Context ──────────────────────────────────────────────────────────────────

interface AccordionContextValue {
  variant: "default" | "bordered" | "separated";
  size: NonNullable<AccordionTriggerVariants["size"]>;
  exclusive: boolean;
  openId: string | null;
  onItemToggle: (id: string, isOpen: boolean) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext(): AccordionContextValue | null {
  return useContext(AccordionContext);
}

// ─── Chevron icon ─────────────────────────────────────────────────────────────

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

// ─── Accordion.Root ───────────────────────────────────────────────────────────

export interface AccordionRootProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  variant?: "default" | "bordered" | "separated";
  /** Size applied to all child items unless overridden. */
  size?: NonNullable<AccordionTriggerVariants["size"]>;
  /** When true, opening one item closes all others. */
  exclusive?: boolean;
  children: ReactNode;
}

const AccordionRoot = forwardRef<HTMLDivElement, AccordionRootProps>(
  (
    {
      variant = "default",
      size = "md",
      exclusive = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [openId, setOpenId] = useState<string | null>(null);

    const handleItemToggle = (id: string, isOpen: boolean) => {
      setOpenId(isOpen ? id : null);
    };

    return (
      <AccordionContext.Provider
        value={{
          variant,
          size,
          exclusive,
          openId,
          onItemToggle: handleItemToggle,
        }}
      >
        <div
          ref={ref}
          className={cn(accordionRootVariants({ variant }), className)}
          {...props}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    );
  },
);
AccordionRoot.displayName = "Accordion";

// ─── Accordion.Item ───────────────────────────────────────────────────────────

export interface AccordionItemProps extends Omit<
  HTMLAttributes<HTMLDetailsElement>,
  "children" | "onToggle"
> {
  /** Content rendered inside the `<summary>` trigger button. */
  trigger: ReactNode;
  /** Optional leading icon shown before the trigger text. */
  icon?: ReactNode;
  /** Uncontrolled: whether the item starts open. */
  defaultOpen?: boolean;
  /** Controlled: whether the item is currently open. */
  open?: boolean;
  /** Fires when the item is toggled with the new open state. */
  onToggle?: (isOpen: boolean) => void;
  /** Prevents the item from being opened or closed. */
  disabled?: boolean;
  /** Override size from context for this specific item. */
  size?: NonNullable<AccordionTriggerVariants["size"]>;
  /** Override variant from context for this specific item. */
  variant?: "default" | "bordered" | "separated";
  children: ReactNode;
}

const AccordionItem = forwardRef<HTMLDetailsElement, AccordionItemProps>(
  (
    {
      trigger,
      icon,
      defaultOpen = false,
      open: controlledOpen,
      onToggle,
      disabled = false,
      size: sizeProp,
      variant: variantProp,
      id: externalId,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const ctx = useAccordionContext();
    const generatedId = useId();
    const id = externalId ?? generatedId;

    const size = sizeProp ?? ctx?.size ?? "md";
    const variant = variantProp ?? ctx?.variant ?? "default";

    // Determine open state precedence:
    // 1. Controlled via `open` prop
    // 2. Exclusive mode via context
    // 3. Uncontrolled via `defaultOpen`
    const isExclusiveControlled = Boolean(ctx?.exclusive);
    const isControlled = controlledOpen !== undefined || isExclusiveControlled;

    const openValue = isExclusiveControlled
      ? ctx?.openId === id
      : controlledOpen;

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
      if (disabled) {
        e.preventDefault();
        return;
      }

      if (isExclusiveControlled && ctx) {
        const isCurrentlyOpen = ctx.openId === id;
        ctx.onItemToggle(id, !isCurrentlyOpen);
        // Prevent the native <details> toggle so we own the open state
        e.preventDefault();
        return;
      }

      if (controlledOpen !== undefined && onToggle) {
        // Pure controlled — prevent native toggle and call onToggle
        const nextOpen = !controlledOpen;
        onToggle(nextOpen);
        e.preventDefault();
      } else if (onToggle) {
        // Uncontrolled but with observer — let native toggle happen first
        // The onToggle fires after the details element updates its `open` attr
        const details = (e.currentTarget as HTMLElement).closest("details");
        if (details) {
          // `open` attr is still the OLD value at click time; it flips after
          const willBeOpen = !details.open;
          onToggle(willBeOpen);
        }
      }
    };

    return (
      <details
        ref={ref}
        id={id}
        {...(isControlled
          ? { open: openValue }
          : { ...(defaultOpen ? { open: true } : {}) })}
        className={cn(accordionItemVariants({ variant }), "group", className)}
        {...props}
      >
        <summary
          className={accordionTriggerVariants({ size })}
          aria-disabled={disabled || undefined}
          onClick={handleClick}
        >
          <span className="flex items-center gap-2">
            {icon !== undefined && (
              <span aria-hidden="true" className="shrink-0">
                {icon}
              </span>
            )}
            {trigger}
          </span>
          <ChevronDownIcon
            className={cn(
              "h-4 w-4 shrink-0 motion-safe:transition-transform motion-safe:duration-200",
              "group-open:rotate-180",
            )}
          />
        </summary>

        <div className={accordionPanelVariants({ size })}>{children}</div>
      </details>
    );
  },
);
AccordionItem.displayName = "Accordion.Item";

// ─── Compound export ──────────────────────────────────────────────────────────

export const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItem,
});
