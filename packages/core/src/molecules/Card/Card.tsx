import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import {
  cardVariants,
  cardHeaderVariants,
  cardBodyVariants,
  cardFooterVariants,
  type CardVariant,
} from "./Card.variants";

// ─── Card (root) ──────────────────────────────────────────────────────────────

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Visual style of the card. @default "outlined" */
  variant?: CardVariant;
  /**
   * When true the card gets hover/focus styles and becomes keyboard-focusable
   * via `tabIndex=0`. Useful for clickable card patterns.
   * @default false
   */
  isInteractive?: boolean;
  children: ReactNode;
}

const CardRoot = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = "outlined",
      isInteractive = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    /* eslint-disable jsx-a11y/no-noninteractive-tabindex */
    // role="article" gives the div a valid landmark role so aria-label is legal.
    // tabIndex=0 is set only when isInteractive=true. Both are overrideable via props.
    return (
      <div
        ref={ref}
        role={isInteractive ? "article" : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        className={cn(cardVariants({ variant, isInteractive }), className)}
        {...props}
      >
        {children}
      </div>
    );
    /* eslint-enable jsx-a11y/no-noninteractive-tabindex */
  },
);
CardRoot.displayName = "Card";

// ─── Card.Header ──────────────────────────────────────────────────────────────

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn(cardHeaderVariants(), className)} {...props}>
      {children}
    </div>
  ),
);
CardHeader.displayName = "Card.Header";

// ─── Card.Body ────────────────────────────────────────────────────────────────

export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn(cardBodyVariants(), className)} {...props}>
      {children}
    </div>
  ),
);
CardBody.displayName = "Card.Body";

// ─── Card.Footer ─────────────────────────────────────────────────────────────

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn(cardFooterVariants(), className)} {...props}>
      {children}
    </div>
  ),
);
CardFooter.displayName = "Card.Footer";

// ─── Compound export ──────────────────────────────────────────────────────────

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});
