import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  type AnchorHTMLAttributes,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import { useSignal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import { cn } from "@/lib/cn";
import {
  navbarBrandVariants,
  navbarContainerVariants,
  navbarLinkVariants,
  navbarMenuButtonVariants,
  navbarMobileLinkVariants,
  navbarMobilePanelVariants,
  navbarRootVariants,
  type NavbarMaxWidth,
  type NavbarSize,
  type NavbarTheme,
} from "./Navbar.variants";

// ─── Internal Signal Store (avoids prop drilling across sub-components) ────────

interface NavbarContextValue {
  /** Signal: whether the mobile menu is open */
  isOpen: ReturnType<typeof useSignal<boolean>>;
  menuId: string;
  menuButtonRef: React.RefObject<HTMLButtonElement | null>;
}

const NavbarContext = createContext<NavbarContextValue | null>(null);

function useNavbarContext(component: string): NavbarContextValue {
  const ctx = useContext(NavbarContext);
  if (!ctx) {
    throw new Error(
      `<Navbar.${component}> must be rendered inside <Navbar.Root>.`,
    );
  }
  return ctx;
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export interface NavbarRootProps extends HTMLAttributes<HTMLElement> {
  /** Visual theme of the bar. @default "solid" */
  theme?: NavbarTheme;
  /** Height of the bar. @default "md" */
  size?: NavbarSize;
  /** Max-width constraint for the inner container. @default "lg" */
  maxWidth?: NavbarMaxWidth;
  /** Stick to top of viewport. @default false */
  sticky?: boolean;
  /** Human-readable label for the <nav> landmark. @default "Main navigation" */
  navLabel?: string;
  children: ReactNode;
}

function NavbarRoot({
  theme = "solid",
  size = "md",
  maxWidth = "lg",
  sticky = false,
  navLabel = "Main navigation",
  className,
  children,
  ...props
}: NavbarRootProps) {
  useSignals();
  const isOpen = useSignal(false);
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  // Close mobile menu on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      if (e.key === "Escape" && isOpen.value) {
        isOpen.value = false;
        menuButtonRef.current?.focus();
      }
    },
    [isOpen],
  );

  // Close mobile menu on viewport resize to desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) isOpen.value = false;
    };
    mq.addEventListener("change", handler);
    return () => {
      mq.removeEventListener("change", handler);
    };
  }, [isOpen]);

  return (
    <NavbarContext.Provider value={{ isOpen, menuId, menuButtonRef }}>
      <header
        className={cn(navbarRootVariants({ theme, size, sticky }), className)}
        onKeyDown={handleKeyDown}
        {...props}
      >
        <nav
          aria-label={navLabel}
          className={navbarContainerVariants({ maxWidth })}
        >
          {children}
        </nav>
      </header>
    </NavbarContext.Provider>
  );
}

NavbarRoot.displayName = "Navbar.Root";

// ─── Brand ────────────────────────────────────────────────────────────────────

export interface NavbarBrandProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
}

function NavbarBrand({ className, children, ...props }: NavbarBrandProps) {
  return (
    <a className={cn(navbarBrandVariants(), className)} {...props}>
      {children}
    </a>
  );
}

NavbarBrand.displayName = "Navbar.Brand";

// ─── Links (desktop nav) ──────────────────────────────────────────────────────

export interface NavbarLinksProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

function NavbarLinks({ className, children, ...props }: NavbarLinksProps) {
  return (
    <div
      className={cn("hidden items-center gap-1 md:flex", className)}
      {...props}
    >
      {children}
    </div>
  );
}

NavbarLinks.displayName = "Navbar.Links";

// ─── Link ─────────────────────────────────────────────────────────────────────

export interface NavbarLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Marks this link as the current page. Adds aria-current="page". */
  active?: boolean;
  children: ReactNode;
}

function NavbarLink({
  active = false,
  className,
  children,
  ...props
}: NavbarLinkProps) {
  return (
    <a
      aria-current={active ? "page" : undefined}
      className={cn(navbarLinkVariants({ active }), className)}
      {...props}
    >
      {children}
    </a>
  );
}

NavbarLink.displayName = "Navbar.Link";

// ─── Actions (right-side slot) ────────────────────────────────────────────────

export interface NavbarActionsProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

function NavbarActions({ className, children, ...props }: NavbarActionsProps) {
  return (
    <div
      className={cn("hidden items-center gap-2 md:flex", className)}
      {...props}
    >
      {children}
    </div>
  );
}

NavbarActions.displayName = "Navbar.Actions";

// ─── Mobile toggle button ─────────────────────────────────────────────────────

export interface NavbarMobileToggleProps extends HTMLAttributes<HTMLButtonElement> {
  /** Label for screen readers when menu is closed. @default "Open menu" */
  openLabel?: string;
  /** Label for screen readers when menu is open. @default "Close menu" */
  closeLabel?: string;
}

function NavbarMobileToggle({
  openLabel = "Open menu",
  closeLabel = "Close menu",
  className,
  ...props
}: NavbarMobileToggleProps) {
  useSignals();
  const { isOpen, menuId, menuButtonRef } = useNavbarContext("MobileToggle");

  const label = isOpen.value ? closeLabel : openLabel;

  return (
    <button
      ref={menuButtonRef}
      type="button"
      aria-label={label}
      aria-expanded={isOpen.value}
      aria-controls={menuId}
      className={cn(navbarMenuButtonVariants(), className)}
      onClick={() => {
        isOpen.value = !isOpen.value;
      }}
      {...props}
    >
      {/* Hamburger / X icon */}
      <span aria-hidden="true" className="block size-5 relative">
        <span
          className={cn(
            "absolute inset-x-0 h-0.5 bg-current rounded-full transition-all duration-200",
            isOpen.value ? "top-1/2 -translate-y-1/2 rotate-45" : "top-1",
          )}
        />
        <span
          className={cn(
            "absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-current rounded-full transition-all duration-200",
            isOpen.value ? "opacity-0" : "opacity-100",
          )}
        />
        <span
          className={cn(
            "absolute inset-x-0 h-0.5 bg-current rounded-full transition-all duration-200",
            isOpen.value ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-1",
          )}
        />
      </span>
    </button>
  );
}

NavbarMobileToggle.displayName = "Navbar.MobileToggle";

// ─── Mobile menu panel ────────────────────────────────────────────────────────

export interface NavbarMobileMenuProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

function NavbarMobileMenu({
  className,
  children,
  ...props
}: NavbarMobileMenuProps) {
  useSignals();
  const { isOpen, menuId } = useNavbarContext("MobileMenu");

  if (!isOpen.value) return null;

  return (
    <div
      id={menuId}
      className={cn(navbarMobilePanelVariants(), className)}
      {...props}
    >
      {children}
    </div>
  );
}

NavbarMobileMenu.displayName = "Navbar.MobileMenu";

// ─── Mobile link ──────────────────────────────────────────────────────────────

export interface NavbarMobileLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
  children: ReactNode;
}

function NavbarMobileLink({
  active = false,
  className,
  children,
  onClick,
  onKeyDown,
  ...props
}: NavbarMobileLinkProps) {
  useSignals();
  const { isOpen } = useNavbarContext("MobileLink");

  const handleClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      isOpen.value = false;
      onClick?.(e);
    },
    [isOpen, onClick],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLAnchorElement>) => {
      if (e.key === "Enter" || e.key === " ") isOpen.value = false;
      onKeyDown?.(e);
    },
    [isOpen, onKeyDown],
  );

  return (
    <a
      aria-current={active ? "page" : undefined}
      className={cn(navbarMobileLinkVariants({ active }), className)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
    </a>
  );
}

NavbarMobileLink.displayName = "Navbar.MobileLink";

// ─── Namespace export ─────────────────────────────────────────────────────────

export const Navbar = {
  Root: NavbarRoot,
  Brand: NavbarBrand,
  Links: NavbarLinks,
  Link: NavbarLink,
  Actions: NavbarActions,
  MobileToggle: NavbarMobileToggle,
  MobileMenu: NavbarMobileMenu,
  MobileLink: NavbarMobileLink,
};

// ─── Re-export types ──────────────────────────────────────────────────────────

export type {
  NavbarTheme,
  NavbarSize,
  NavbarMaxWidth,
} from "./Navbar.variants";
