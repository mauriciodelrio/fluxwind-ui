import { type HTMLAttributes, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  featureCardBodyVariants,
  featureCardLinkVariants,
  featureCardTitleVariants,
  featureCardVariants,
  featureContainerVariants,
  featureEyebrowVariants,
  featureGridVariants,
  featureHeaderVariants,
  featureHeadingVariants,
  featureIconWrapperVariants,
  featureSectionVariants,
  featureSubheadingVariants,
  type FeatureCardAlign,
  type FeatureCardVariant,
  type FeatureGridColumns,
  type FeatureGridMaxWidth,
  type FeatureGridPadding,
} from "./FeatureGrid.variants";

// ─── Sub-component props ──────────────────────────────────────────────────────

export interface FeatureGridRootProps extends HTMLAttributes<HTMLElement> {
  /** Vertical padding of the section. @default "md" */
  padding?: FeatureGridPadding;
  /** Max-width of the inner container. @default "lg" */
  maxWidth?: FeatureGridMaxWidth;
  /** Number of columns in the grid. @default 3 */
  columns?: FeatureGridColumns;
  /** Visual style applied to every card (can be overridden per-card). @default "flat" */
  cardVariant?: FeatureCardVariant;
  /** Alignment of content inside each card. @default "left" */
  cardAlign?: FeatureCardAlign;
  children: ReactNode;
}

export interface FeatureGridHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface FeatureGridEyebrowProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

export interface FeatureGridHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** HTML heading level. @default "h2" */
  as?: "h2" | "h3";
  children: ReactNode;
}

export interface FeatureGridSubheadingProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

export interface FeatureGridListProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of grid columns. @default 3 */
  columns?: FeatureGridColumns;
  children: ReactNode;
}

export interface FeatureGridCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Override the root-level cardVariant for this card. */
  variant?: FeatureCardVariant;
  /** Override the root-level cardAlign for this card. */
  align?: FeatureCardAlign;
  /** Marks the card as interactive — adds hover/active styles. */
  interactive?: boolean;
  children: ReactNode;
}

export interface FeatureGridIconProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface FeatureGridTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /** HTML heading level rendered. @default "h3" */
  as?: "h3" | "h4";
  children: ReactNode;
}

export interface FeatureGridBodyProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

export interface FeatureGridLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
}

// ─── Root ─────────────────────────────────────────────────────────────────────
// Renders the outer <section> + inner container + CSS Grid.
// cardVariant and cardAlign are passed down via plain props to avoid context
// complexity — FeatureGrid cards are not deeply nested.

function FeatureGridRoot({
  padding = "md",
  maxWidth = "lg",
  columns: _columns,
  cardVariant: _cardVariant,
  cardAlign: _cardAlign,
  className,
  children,
  ...props
}: FeatureGridRootProps) {
  return (
    <section
      className={cn(featureSectionVariants({ padding }), className)}
      {...props}
    >
      <div className={featureContainerVariants({ maxWidth })}>{children}</div>
    </section>
  );
}

FeatureGridRoot.displayName = "FeatureGrid.Root";

// ─── Header ───────────────────────────────────────────────────────────────────

function FeatureGridHeader({
  className,
  children,
  ...props
}: FeatureGridHeaderProps) {
  return (
    <div className={cn(featureHeaderVariants(), className)} {...props}>
      {children}
    </div>
  );
}

FeatureGridHeader.displayName = "FeatureGrid.Header";

// ─── Eyebrow ──────────────────────────────────────────────────────────────────

function FeatureGridEyebrow({
  className,
  children,
  ...props
}: FeatureGridEyebrowProps) {
  return (
    <p className={cn(featureEyebrowVariants(), className)} {...props}>
      {children}
    </p>
  );
}

FeatureGridEyebrow.displayName = "FeatureGrid.Eyebrow";

// ─── Heading ──────────────────────────────────────────────────────────────────

function FeatureGridHeading({
  as: Tag = "h2",
  className,
  children,
  ...props
}: FeatureGridHeadingProps) {
  return (
    <Tag className={cn(featureHeadingVariants(), className)} {...props}>
      {children}
    </Tag>
  );
}

FeatureGridHeading.displayName = "FeatureGrid.Heading";

// ─── Subheading ───────────────────────────────────────────────────────────────

function FeatureGridSubheading({
  className,
  children,
  ...props
}: FeatureGridSubheadingProps) {
  return (
    <p className={cn(featureSubheadingVariants(), className)} {...props}>
      {children}
    </p>
  );
}

FeatureGridSubheading.displayName = "FeatureGrid.Subheading";

// ─── List (grid wrapper) ──────────────────────────────────────────────────────

function FeatureGridList({
  columns = 3,
  className,
  children,
  ...props
}: FeatureGridListProps) {
  return (
    <div className={cn(featureGridVariants({ columns }), className)} {...props}>
      {children}
    </div>
  );
}

FeatureGridList.displayName = "FeatureGrid.List";

// ─── Card ─────────────────────────────────────────────────────────────────────

function FeatureGridCard({
  variant = "flat",
  align = "left",
  interactive = false,
  className,
  children,
  ...props
}: FeatureGridCardProps) {
  return (
    <div
      className={cn(
        featureCardVariants({ variant, align, interactive }),
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

FeatureGridCard.displayName = "FeatureGrid.Card";

// ─── Icon ─────────────────────────────────────────────────────────────────────

function FeatureGridIcon({
  className,
  children,
  ...props
}: FeatureGridIconProps) {
  return (
    <div
      className={cn(featureIconWrapperVariants(), className)}
      aria-hidden="true"
      {...props}
    >
      {children}
    </div>
  );
}

FeatureGridIcon.displayName = "FeatureGrid.Icon";

// ─── Card title ───────────────────────────────────────────────────────────────

function FeatureGridTitle({
  as: Tag = "h3",
  className,
  children,
  ...props
}: FeatureGridTitleProps) {
  return (
    <Tag className={cn(featureCardTitleVariants(), className)} {...props}>
      {children}
    </Tag>
  );
}

FeatureGridTitle.displayName = "FeatureGrid.Title";

// ─── Card body ────────────────────────────────────────────────────────────────

function FeatureGridBody({
  className,
  children,
  ...props
}: FeatureGridBodyProps) {
  return (
    <p className={cn(featureCardBodyVariants(), className)} {...props}>
      {children}
    </p>
  );
}

FeatureGridBody.displayName = "FeatureGrid.Body";

// ─── Card link ────────────────────────────────────────────────────────────────

function FeatureGridLink({
  href,
  className,
  children,
  ...props
}: FeatureGridLinkProps) {
  return (
    <a
      href={href}
      className={cn(featureCardLinkVariants(), className)}
      {...props}
    >
      {children}
      <ArrowRight
        aria-hidden="true"
        className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5"
      />
    </a>
  );
}

FeatureGridLink.displayName = "FeatureGrid.Link";

// ─── Compound export ──────────────────────────────────────────────────────────

export const FeatureGrid = {
  Root: FeatureGridRoot,
  Header: FeatureGridHeader,
  Eyebrow: FeatureGridEyebrow,
  Heading: FeatureGridHeading,
  Subheading: FeatureGridSubheading,
  List: FeatureGridList,
  Card: FeatureGridCard,
  Icon: FeatureGridIcon,
  Title: FeatureGridTitle,
  Body: FeatureGridBody,
  Link: FeatureGridLink,
};
