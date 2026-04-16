import {
  type AnchorHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import {
  type FooterBackground,
  type FooterNavColumns,
  footerBottomVariants,
  footerBrandNameVariants,
  footerBrandVariants,
  footerContainerVariants,
  footerCopyrightVariants,
  footerLegalLinkVariants,
  footerLegalListVariants,
  footerNavColumnVariants,
  footerNavGridVariants,
  footerNavHeadingVariants,
  footerNavLinkVariants,
  footerNavListVariants,
  footerSocialLinkVariants,
  footerSocialRowVariants,
  footerTaglineVariants,
  footerTopVariants,
  footerVariants,
} from "./Footer.variants";
import type { ContainerMaxWidth } from "@/tokens";

// ─── Prop types ───────────────────────────────────────────────────────────────

export interface FooterRootProps extends HTMLAttributes<HTMLElement> {
  /** Background colour / style of the footer. @default "default" */
  background?: FooterBackground;
  /** Maximum width of the inner container. @default "lg" */
  maxWidth?: ContainerMaxWidth;
}

export interface FooterBrandProps extends HTMLAttributes<HTMLDivElement> {
  background?: FooterBackground;
}

export interface FooterBrandNameProps extends HTMLAttributes<HTMLParagraphElement> {
  background?: FooterBackground;
}

export interface FooterTaglineProps extends HTMLAttributes<HTMLParagraphElement> {
  background?: FooterBackground;
}

export interface FooterNavGridProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of nav columns in the grid. @default 3 */
  columns?: FooterNavColumns;
}

export interface FooterNavColumnProps extends HTMLAttributes<HTMLDivElement> {
  background?: FooterBackground;
}

export interface FooterNavHeadingProps extends HTMLAttributes<HTMLParagraphElement> {
  background?: FooterBackground;
}

export interface FooterNavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  background?: FooterBackground;
}

export type FooterSocialRowProps = HTMLAttributes<HTMLDivElement>;

export interface FooterSocialLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  background?: FooterBackground;
  /** Accessible label — required for icon-only links. */
  label: string;
}

export interface FooterBottomProps extends HTMLAttributes<HTMLDivElement> {
  background?: FooterBackground;
}

export interface FooterCopyrightProps extends HTMLAttributes<HTMLParagraphElement> {
  background?: FooterBackground;
}

export type FooterLegalListProps = HTMLAttributes<HTMLUListElement>;

export interface FooterLegalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  background?: FooterBackground;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FooterRoot({
  background = "default",
  maxWidth = "lg",
  className,
  children,
  ...props
}: FooterRootProps) {
  return (
    <footer
      className={cn(footerVariants({ background }), className)}
      {...props}
    >
      <div className={cn(footerContainerVariants({ maxWidth }))}>
        {children}
      </div>
    </footer>
  );
}
FooterRoot.displayName = "Footer.Root";

function FooterTop({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(footerTopVariants(), className)} {...props}>
      {children}
    </div>
  );
}
FooterTop.displayName = "Footer.Top";

function FooterBrand({
  background: _background,
  className,
  children,
  ...props
}: FooterBrandProps) {
  return (
    <div className={cn(footerBrandVariants(), className)} {...props}>
      {children}
    </div>
  );
}
FooterBrand.displayName = "Footer.Brand";

function FooterBrandName({
  background = "default",
  className,
  children,
  ...props
}: FooterBrandNameProps) {
  return (
    <p
      className={cn(footerBrandNameVariants({ background }), className)}
      {...props}
    >
      {children}
    </p>
  );
}
FooterBrandName.displayName = "Footer.BrandName";

function FooterTagline({
  background = "default",
  className,
  children,
  ...props
}: FooterTaglineProps) {
  return (
    <p
      className={cn(footerTaglineVariants({ background }), className)}
      {...props}
    >
      {children}
    </p>
  );
}
FooterTagline.displayName = "Footer.Tagline";

function FooterNavGrid({
  columns = 3,
  className,
  children,
  ...props
}: FooterNavGridProps) {
  return (
    <div
      className={cn(footerNavGridVariants({ columns }), className)}
      {...props}
    >
      {children}
    </div>
  );
}
FooterNavGrid.displayName = "Footer.NavGrid";

function FooterNavColumn({
  background: _background,
  className,
  children,
  ...props
}: FooterNavColumnProps) {
  return (
    <div className={cn(footerNavColumnVariants(), className)} {...props}>
      {children}
    </div>
  );
}
FooterNavColumn.displayName = "Footer.NavColumn";

function FooterNavHeading({
  background = "default",
  className,
  children,
  ...props
}: FooterNavHeadingProps) {
  return (
    <p
      className={cn(footerNavHeadingVariants({ background }), className)}
      {...props}
    >
      {children}
    </p>
  );
}
FooterNavHeading.displayName = "Footer.NavHeading";

function FooterNavList({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLUListElement>) {
  return (
    <ul className={cn(footerNavListVariants(), className)} {...props}>
      {children}
    </ul>
  );
}
FooterNavList.displayName = "Footer.NavList";

function FooterNavLink({
  background = "default",
  className,
  children,
  ...props
}: FooterNavLinkProps) {
  return (
    <li>
      <a
        className={cn(footerNavLinkVariants({ background }), className)}
        {...props}
      >
        {children}
      </a>
    </li>
  );
}
FooterNavLink.displayName = "Footer.NavLink";

function FooterSocialRow({
  className,
  children,
  ...props
}: FooterSocialRowProps) {
  return (
    <div
      role="group"
      className={cn(footerSocialRowVariants(), className)}
      aria-label="Social media links"
      {...props}
    >
      {children}
    </div>
  );
}
FooterSocialRow.displayName = "Footer.SocialRow";

function FooterSocialLink({
  background = "default",
  label,
  className,
  children,
  ...props
}: FooterSocialLinkProps) {
  return (
    <a
      aria-label={label}
      className={cn(footerSocialLinkVariants({ background }), className)}
      {...props}
    >
      <span aria-hidden="true">{children}</span>
    </a>
  );
}
FooterSocialLink.displayName = "Footer.SocialLink";

function FooterBottom({
  background = "default",
  className,
  children,
  ...props
}: FooterBottomProps) {
  return (
    <div
      className={cn(footerBottomVariants({ background }), className)}
      {...props}
    >
      {children}
    </div>
  );
}
FooterBottom.displayName = "Footer.Bottom";

function FooterCopyright({
  background = "default",
  className,
  children,
  ...props
}: FooterCopyrightProps) {
  return (
    <p
      className={cn(footerCopyrightVariants({ background }), className)}
      {...props}
    >
      {children}
    </p>
  );
}
FooterCopyright.displayName = "Footer.Copyright";

function FooterLegalList({
  className,
  children,
  ...props
}: FooterLegalListProps) {
  return (
    <ul className={cn(footerLegalListVariants(), className)} {...props}>
      {children}
    </ul>
  );
}
FooterLegalList.displayName = "Footer.LegalList";

function FooterLegalLink({
  background = "default",
  className,
  children,
  ...props
}: FooterLegalLinkProps) {
  return (
    <li>
      <a
        className={cn(footerLegalLinkVariants({ background }), className)}
        {...props}
      >
        {children}
      </a>
    </li>
  );
}
FooterLegalLink.displayName = "Footer.LegalLink";

// ─── Compound export ──────────────────────────────────────────────────────────

export const Footer = {
  Root: FooterRoot,
  Top: FooterTop,
  Brand: FooterBrand,
  BrandName: FooterBrandName,
  Tagline: FooterTagline,
  NavGrid: FooterNavGrid,
  NavColumn: FooterNavColumn,
  NavHeading: FooterNavHeading,
  NavList: FooterNavList,
  NavLink: FooterNavLink,
  SocialRow: FooterSocialRow,
  SocialLink: FooterSocialLink,
  Bottom: FooterBottom,
  Copyright: FooterCopyright,
  LegalList: FooterLegalList,
  LegalLink: FooterLegalLink,
};

// Re-export ReactNode for consumer convenience
export type { ReactNode };
