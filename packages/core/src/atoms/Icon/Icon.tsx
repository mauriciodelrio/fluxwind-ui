import { forwardRef, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import type { SimpleIcon } from "simple-icons";
import { cn } from "@/lib/cn";
import { sizeMap, type Size } from "@/tokens";

export interface IconProps {
  /**
   * **Mode 1 — Lucide:** pass any Lucide React icon component.
   * `import { Star } from "lucide-react"`
   */
  icon?: LucideIcon;
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
}

const Icon = forwardRef<SVGSVGElement, IconProps>(
  (
    {
      icon: LucideComp,
      simpleIcon,
      children,
      size = "md",
      label,
      viewBox = "0 0 24 24",
      className,
    },
    ref,
  ) => {
    const sizeClasses = sizeMap[size].icon;

    if (LucideComp !== undefined) {
      const lucideA11y = label
        ? { role: "img" as const, "aria-label": label }
        : { "aria-hidden": true as const };

      return (
        <LucideComp
          className={cn("shrink-0", sizeClasses, className)}
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
