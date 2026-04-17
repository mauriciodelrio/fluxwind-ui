import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/cn";
import { sizeMap } from "@/tokens";
import { linkVariants, type LinkVariants } from "./Link.variants";

export interface LinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>, LinkVariants {
  /**
   * When `true`, adds `target="_blank"` + `rel="noopener noreferrer"` and
   * appends a trailing `ExternalLink` icon to signal the out-of-site navigation
   * to sighted users.
   * @default false
   */
  external?: boolean;
  children?: ReactNode;
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      className,
      variant,
      underline,
      size = "md",
      external = false,
      children,
      ...props
    },
    ref,
  ) => {
    const externalProps = external
      ? { target: "_blank" as const, rel: "noopener noreferrer" }
      : {};

    const iconClass = sizeMap[size ?? "md"].icon;

    return (
      <a
        ref={ref}
        className={cn(linkVariants({ variant, underline, size }), className)}
        {...externalProps}
        {...props}
      >
        {children}
        {external ? <ExternalLink
            aria-hidden="true"
            className={cn("shrink-0", iconClass)}
          /> : null}
      </a>
    );
  },
);

Link.displayName = "Link";

export { Link };
