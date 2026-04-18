import {
  forwardRef,
  type HTMLAttributes,
  type OlHTMLAttributes,
  type LiHTMLAttributes,
} from "react";
import { cn } from "@/lib/cn";
import { listVariants, listItemVariants, type ListSize } from "./List.variants";

// ─── Root ─────────────────────────────────────────────────────────────────────

type UnorderedProps = HTMLAttributes<HTMLUListElement> & {
  variant?: "unordered" | "none";
  size?: ListSize;
};

type OrderedProps = OlHTMLAttributes<HTMLOListElement> & {
  variant: "ordered";
  size?: ListSize;
};

export type ListRootProps = UnorderedProps | OrderedProps;

const ListRoot = forwardRef<HTMLUListElement | HTMLOListElement, ListRootProps>(
  ({ variant = "unordered", size = "md", className, ...props }, ref) => {
    const classes = cn(listVariants({ variant, size }), className);

    if (variant === "ordered") {
      return (
        <ol
          ref={ref as React.ForwardedRef<HTMLOListElement>}
          className={classes}
          {...(props as OlHTMLAttributes<HTMLOListElement>)}
        />
      );
    }

    return (
      <ul
        ref={ref as React.ForwardedRef<HTMLUListElement>}
        className={classes}
        {...(props as HTMLAttributes<HTMLUListElement>)}
      />
    );
  },
);
ListRoot.displayName = "List";

// ─── Item ─────────────────────────────────────────────────────────────────────

export interface ListItemProps extends LiHTMLAttributes<HTMLLIElement> {
  /** Render the item text in a muted/secondary color. @default false */
  muted?: boolean;
}

const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  ({ muted = false, className, ...props }, ref) => (
    <li
      ref={ref}
      className={cn(listItemVariants({ muted }), className)}
      {...props}
    />
  ),
);
ListItem.displayName = "List.Item";

// ─── Compound export ──────────────────────────────────────────────────────────

export const List = Object.assign(ListRoot, {
  Item: ListItem,
});
