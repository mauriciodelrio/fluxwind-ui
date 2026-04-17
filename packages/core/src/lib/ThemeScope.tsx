import {
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
  createElement,
} from "react";

/**
 * Industry themes supported by FluxWind.
 * Each theme maps to a CSS file in `@fluxwind/core/styles/themes/<theme>`.
 * Import the corresponding CSS file to enable the theme tokens:
 *
 * ```ts
 * import "@fluxwind/core/styles/themes/health";
 * ```
 */
export type FwTheme =
  | "health"
  | "commerce"
  | "finance"
  | "education"
  | "legal"
  | "creative";

export interface ThemeScopeProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "children"
> {
  /** The industry theme to apply to this subtree. */
  theme: FwTheme;
  /**
   * The HTML element to render as the scope container.
   * @default "div"
   */
  as?: ElementType;
  children: ReactNode;
}

/**
 * Scopes a FluxWind industry theme to a subtree without affecting the global
 * theme. CSS custom properties cascade naturally — components inside inherit
 * the scoped brand palette while the rest of the page remains unchanged.
 *
 * `ThemeScope` is orthogonal to `ThemeProvider` (light/dark mode): dark mode
 * still applies inside a `ThemeScope`. They compose freely.
 *
 * @example
 * ```tsx
 * // Import the theme CSS once (e.g. in your global stylesheet)
 * import "@fluxwind/core/styles/themes/health";
 *
 * // Then scope a section:
 * <ThemeScope theme="health" as="section">
 *   <Button variant="primary">Book appointment</Button>
 * </ThemeScope>
 * ```
 */
export function ThemeScope({
  theme,
  as: Tag = "div",
  children,
  ...props
}: ThemeScopeProps) {
  return createElement(Tag, { "data-fw-theme": theme, ...props }, children);
}
