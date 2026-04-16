import { type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import {
  type CTASectionBackground,
  type CTASectionLayout,
  ctaActionsVariants,
  ctaContainerVariants,
  ctaDividerVariants,
  ctaEyebrowVariants,
  ctaHeadingVariants,
  ctaInnerVariants,
  ctaSectionVariants,
  ctaSubheadingVariants,
  ctaTextBlockVariants,
} from "./CTASection.variants";
import type { ContainerMaxWidth, SectionPadding } from "@/tokens";

// ─── Prop types ───────────────────────────────────────────────────────────────

export interface CTASectionRootProps extends HTMLAttributes<HTMLElement> {
  /** Background colour / style of the section. @default "default" */
  background?: CTASectionBackground;
  /** Vertical padding scale. @default "md" */
  padding?: SectionPadding;
  /** Maximum width of the inner container. @default "lg" */
  maxWidth?: ContainerMaxWidth;
  /** Content layout. @default "centered" */
  layout?: CTASectionLayout;
  /** When true renders a top border divider. @default false */
  divider?: boolean;
  as?: "section" | "div";
}

export interface CTASectionEyebrowProps extends HTMLAttributes<HTMLParagraphElement> {
  background?: CTASectionBackground;
}

export interface CTASectionHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  background?: CTASectionBackground;
  as?: "h1" | "h2" | "h3";
}

export interface CTASectionSubheadingProps extends HTMLAttributes<HTMLParagraphElement> {
  background?: CTASectionBackground;
}

export interface CTASectionActionsProps extends HTMLAttributes<HTMLDivElement> {
  layout?: CTASectionLayout;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function CTASectionRoot({
  background = "default",
  padding = "md",
  maxWidth = "lg",
  layout = "centered",
  divider = false,
  as: Tag = "section",
  className,
  children,
  ...props
}: CTASectionRootProps) {
  return (
    <Tag
      className={cn(ctaSectionVariants({ background, padding }), className)}
      {...props}
    >
      {divider ? (
        <div
          aria-hidden="true"
          className={cn(ctaDividerVariants({ background }), "mb-16")}
        />
      ) : null}
      <div className={cn(ctaContainerVariants({ maxWidth }))}>
        <div className={cn(ctaInnerVariants({ layout }))}>{children}</div>
      </div>
    </Tag>
  );
}
CTASectionRoot.displayName = "CTASection.Root";

function CTASectionTextBlock({
  layout = "centered",
  className,
  children,
  ...props
}: { layout?: CTASectionLayout } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(ctaTextBlockVariants({ layout }), className)} {...props}>
      {children}
    </div>
  );
}
CTASectionTextBlock.displayName = "CTASection.TextBlock";

function CTASectionEyebrow({
  background = "default",
  className,
  children,
  ...props
}: CTASectionEyebrowProps) {
  return (
    <p className={cn(ctaEyebrowVariants({ background }), className)} {...props}>
      {children}
    </p>
  );
}
CTASectionEyebrow.displayName = "CTASection.Eyebrow";

function CTASectionHeading({
  background = "default",
  as: Tag = "h2",
  className,
  children,
  ...props
}: CTASectionHeadingProps) {
  return (
    <Tag
      className={cn(ctaHeadingVariants({ background }), className)}
      {...props}
    >
      {children}
    </Tag>
  );
}
CTASectionHeading.displayName = "CTASection.Heading";

function CTASectionSubheading({
  background = "default",
  className,
  children,
  ...props
}: CTASectionSubheadingProps) {
  return (
    <p
      className={cn(ctaSubheadingVariants({ background }), className)}
      {...props}
    >
      {children}
    </p>
  );
}
CTASectionSubheading.displayName = "CTASection.Subheading";

function CTASectionActions({
  layout = "centered",
  className,
  children,
  ...props
}: CTASectionActionsProps) {
  return (
    <div className={cn(ctaActionsVariants({ layout }), className)} {...props}>
      {children}
    </div>
  );
}
CTASectionActions.displayName = "CTASection.Actions";

// ─── Compound export ──────────────────────────────────────────────────────────

export const CTASection = {
  Root: CTASectionRoot,
  TextBlock: CTASectionTextBlock,
  Eyebrow: CTASectionEyebrow,
  Heading: CTASectionHeading,
  Subheading: CTASectionSubheading,
  Actions: CTASectionActions,
};
