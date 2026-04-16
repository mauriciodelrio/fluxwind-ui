import { forwardRef, type HTMLAttributes, type ImgHTMLAttributes } from "react";
import { useSignal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import { cn } from "@/lib/cn";
import { avatarVariants, type AvatarVariants } from "./Avatar.variants";

export interface AvatarProps
  extends HTMLAttributes<HTMLSpanElement>, AvatarVariants {
  /** Image URL. When provided, renders an `<img>` with the `alt` text. */
  src?: string;
  /** Alt text for the image — required when `src` is provided for WCAG 1.1.1. */
  alt?: string;
  /** Fallback initials shown when `src` is absent or fails to load (max 2 chars). */
  initials?: string;
  /** Additional props forwarded to the inner `<img>` element. */
  imgProps?: Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt">;
}

function getInitials(raw: string): string {
  return raw.trim().slice(0, 2).toUpperCase();
}

const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  (
    { className, size, radius, src, alt, initials, imgProps, ...props },
    ref,
  ) => {
    useSignals();
    const imgError = useSignal(false);
    const showImage = Boolean(src) && !imgError.value;
    const displayInitials = initials ? getInitials(initials) : null;

    function renderContent() {
      if (showImage) {
        return (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <img
            src={src}
            alt={alt ?? ""}
            className="size-full object-cover"
            onError={() => {
              imgError.value = true;
            }}
            {...imgProps}
          />
        );
      }
      if (displayInitials) {
        return <span aria-hidden="true">{displayInitials}</span>;
      }
      return (
        /* Generic person silhouette fallback */
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-[60%] text-[var(--color-fw-muted)]"
        >
          <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-5.33 0-8 2.67-8 4v1h16v-1c0-1.33-2.67-4-8-4Z" />
        </svg>
      );
    }

    return (
      <span
        ref={ref}
        role={showImage ? undefined : "img"}
        aria-label={showImage ? undefined : (alt ?? initials ?? "Avatar")}
        className={cn(avatarVariants({ size, radius }), className)}
        {...props}
      >
        {renderContent()}
      </span>
    );
  },
);

Avatar.displayName = "Avatar";

export { Avatar };
