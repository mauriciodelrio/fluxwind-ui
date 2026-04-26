import { forwardRef, type ReactNode, type ComponentType } from "react";
import type { LucideIcon } from "lucide-react";
import type { SimpleIcon } from "simple-icons";
import { cn } from "@/lib/cn";
import { sizeMap, type Size } from "@/tokens";

/**
 * Tabler icon component type. Matches the interface exported by
 * `@tabler/icons-react` (SVG components accepting size, strokeWidth, className).
 */
type TablerIconComponent = ComponentType<{
  size?: number | string;
  stroke?: number;
  strokeWidth?: number;
  className?: string;
  "aria-hidden"?: boolean;
  "aria-label"?: string;
  role?: string;
}>;

export interface IconProps {
  /**
   * **Mode 1 — Lucide:** pass any Lucide React icon component.
   * `import { Star } from "lucide-react"`
   *
   * **Mode 4 — Tabler:** when `library="tabler"`, pass any `@tabler/icons-react` component.
   * `import { IconMapPin } from "@tabler/icons-react"`
   */
  icon?: LucideIcon | TablerIconComponent;
  /**
   * Icon library selector. Default `"lucide"` preserves backward compatibility.
   * Set to `"tabler"` to render a component from `@tabler/icons-react`.
   */
  library?: "lucide" | "tabler";
  /**
   * **Mode 2 — Brand:** pass a Simple Icons icon object.
   * `import { siGithub } from "simple-icons"`
   * The SVG path embeds inline — zero fetch, fully tree-shakeable.
   */
  simpleIcon?: SimpleIcon;
  /**
   * **Mode 3 — Custom (legacy):** SVG path children, bring-your-own.
   * `<Icon><path d="..." /></Icon>`
   */
  children?: ReactNode;
  /** Size token — controls width and height. */
  size?: Size;
  /**
   * Accessible label. When provided: `role="img"` + `aria-label`.
   * When omitted: `aria-hidden="true"` (decorative icon).
   */
  label?: string;
  /** Override viewBox for custom-children mode. Defaults to `"0 0 24 24"`. */
  viewBox?: string;
  className?: string;
  /**
   * SVG stroke width. Passed through to Lucide and Tabler icon components.
   * Defaults to each library's own default (Lucide: 2, Tabler: 2).
   */
  strokeWidth?: number;
}

const Icon = forwardRef<SVGSVGElement, IconProps>(
  (
    {
      icon: IconComp,
      library = "lucide",
      simpleIcon,
      children,
      size = "md",
      label,
      viewBox = "0 0 24 24",
      className,
      strokeWidth,
    },
    ref,
  ) => {
    const sizeClasses = sizeMap[size].icon;

    // ── Mode 4 — Tabler ───────────────────────────────────────────────────────
    if (library === "tabler") {
      if (!IconComp) {
        // eslint-disable-next-line no-console
        console.error(
          "[Icon] library='tabler' requires @tabler/icons-react to be installed " +
            "and an icon component passed via the `icon` prop. " +
            "Install with: pnpm add @tabler/icons-react",
        );
        return null;
      }

      const TablerComp = IconComp as TablerIconComponent;
      const tablerA11y = label
        ? { role: "img" as const, "aria-label": label }
        : { "aria-hidden": true as const };

      return (
        <TablerComp
          className={cn("shrink-0", sizeClasses, className)}
          {...(strokeWidth !== undefined ? { strokeWidth } : {})}
          {...tablerA11y}
        />
      );
    }

    // ── Mode 1 — Lucide ───────────────────────────────────────────────────────
    if (IconComp !== undefined) {
      const LucideComp = IconComp as LucideIcon;
      const lucideA11y = label
        ? { role: "img" as const, "aria-label": label }
        : { "aria-hidden": true as const };

      return (
        <LucideComp
          className={cn("shrink-0", sizeClasses, className)}
          {...(strokeWidth !== undefined ? { strokeWidth } : {})}
          {...lucideA11y}
        />
      );
    }

    if (simpleIcon !== undefined) {
      const svgA11y = label
        ? { role: "img" as const, "aria-label": label }
        : { "aria-hidden": true as const, focusable: "false" as const };

      return (
        <svg
          ref={ref}
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className={cn("shrink-0", sizeClasses, className)}
          {...svgA11y}
        >
          {label ? <title>{label}</title> : null}
          <path d={simpleIcon.path} />
        </svg>
      );
    }

    const customA11y = label
      ? { role: "img" as const, "aria-label": label }
      : { "aria-hidden": true as const, focusable: "false" as const };

    return (
      <svg
        ref={ref}
        viewBox={viewBox}
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("shrink-0", sizeClasses, className)}
        {...customA11y}
      >
        {label ? <title>{label}</title> : null}
        {children}
      </svg>
    );
  },
);

Icon.displayName = "Icon";

export { Icon };
