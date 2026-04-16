import { type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import {
  dividerHorizontalVariants,
  dividerLabeledVariants,
  dividerLineVariants,
  dividerVerticalVariants,
  type DividerHorizontalVariants,
} from "./Divider.variants";

export interface DividerProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "children"
> {
  /** Visual orientation of the separator. @default "horizontal" */
  orientation?: "horizontal" | "vertical";
  /** Border style. @default "solid" */
  variant?: DividerHorizontalVariants["variant"];
  /**
   * Outer spacing — `my-*` for horizontal, `mx-*` for vertical.
   * @default "md"
   */
  spacing?: DividerHorizontalVariants["spacing"];
  /**
   * Optional text rendered in the center of a horizontal divider (e.g. "or").
   * Ignored when `orientation="vertical"`.
   */
  label?: string;
}

/**
 * Divider — a semantic separator atom.
 *
 * **Horizontal (default):** renders a native `<hr>` when no `label` is given —
 * the most semantic choice. When `label` is provided, renders a
 * `<div role="separator">` with two hairlines flanking the text.
 *
 * **Vertical:** renders a `<div role="separator" aria-orientation="vertical">`.
 * Place inside a flex row container — `self-stretch` fills the parent height.
 *
 * ```tsx
 * <Divider />
 * <Divider label="or" />
 * <Divider orientation="vertical" />
 * <Divider variant="dashed" spacing="lg" />
 * ```
 */
export function Divider({
  orientation = "horizontal",
  variant,
  spacing,
  label,
  className,
  ...props
}: DividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn(dividerVerticalVariants({ variant, spacing }), className)}
        {...props}
      />
    );
  }

  if (label) {
    return (
      <div
        role="separator"
        className={cn(dividerLabeledVariants({ spacing }), className)}
        {...props}
      >
        <span aria-hidden="true" className={dividerLineVariants({ variant })} />
        <span className="text-xs text-[var(--color-fw-muted)] whitespace-nowrap select-none">
          {label}
        </span>
        <span aria-hidden="true" className={dividerLineVariants({ variant })} />
      </div>
    );
  }

  return (
    <hr
      className={cn(dividerHorizontalVariants({ variant, spacing }), className)}
      {...(props as HTMLAttributes<HTMLHRElement>)}
    />
  );
}
