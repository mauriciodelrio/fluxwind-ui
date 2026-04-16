import { type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { skeletonVariants, type SkeletonVariants } from "./Skeleton.variants";

export interface SkeletonProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children">, SkeletonVariants {}

/**
 * Skeleton — a pure CSS loading placeholder atom.
 *
 * Renders an `aria-hidden` div so screen readers skip it entirely.
 * Wrap skeletons in a parent with `aria-busy="true"` and `aria-label` to
 * communicate the loading state to assistive technology.
 *
 * **Dimensions:** `shape="text"` has sensible defaults (`h-4 w-full`).
 * For `circle` and `rect`, pass a `className` with explicit sizing:
 * ```tsx
 * <Skeleton shape="circle" className="size-10" />
 * <Skeleton shape="rect"   className="h-48"    />
 * ```
 *
 * **Animation:** defaults to `pulse`. Use `shimmer` for a gradient sweep
 * effect. Pass `none` to disable animation (e.g. when driven by a parent
 * Suspense boundary with its own transition).
 */
export function Skeleton({
  shape,
  animate,
  className,
  ...props
}: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(skeletonVariants({ shape, animate }), className)}
      {...props}
    />
  );
}
