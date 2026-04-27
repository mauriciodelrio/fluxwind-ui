import {
  createContext,
  forwardRef,
  useContext,
  useId,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { useCarousel, type UseCarouselOptions } from "./useCarousel";
import {
  carouselRootVariants,
  carouselTrackVariants,
  carouselItemVariants,
  carouselNavVariants,
  carouselDotVariants,
  carouselDotsVariants,
  type CarouselRadius,
} from "./Carousel.variants";

// ─── Context ──────────────────────────────────────────────────────────────────

interface CarouselContextValue {
  current: number;
  count: number;
  isPlaying: boolean;
  canPrev: boolean;
  canNext: boolean;
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
  pause: () => void;
  resume: () => void;
  trackId: string;
  /** Accessible label for the whole carousel region. Required. */
  label: string;
  /** Whether transition animation is enabled (respects prefers-reduced-motion). */
  animated: boolean;
}

const CarouselContext = createContext<CarouselContextValue | null>(null);

function useCarouselContext(component: string): CarouselContextValue {
  const ctx = useContext(CarouselContext);
  if (!ctx) {
    throw new Error(`<${component}> must be used inside <Carousel.Root>.`);
  }
  return ctx;
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export interface CarouselRootProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange">, UseCarouselOptions {
  /**
   * Total number of slides. Required.
   */
  count: number;
  /**
   * Accessible label for the carousel landmark region.
   * Shown to screen readers — never hardcoded.
   */
  label: string;
  /**
   * Border radius applied to the outer container. @default "md"
   */
  radius?: CarouselRadius;
  /**
   * Disable CSS transitions (useful for test environments or reduced-motion).
   * @default false
   */
  disableAnimation?: boolean;
  children: ReactNode;
}

const CarouselRoot = forwardRef<HTMLDivElement, CarouselRootProps>(
  (
    {
      count,
      label,
      defaultIndex,
      index,
      onChange,
      loop = false,
      autoplay = 0,
      radius = "md",
      disableAnimation = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const trackId = useId();

    const {
      current,
      isPlaying,
      canPrev,
      canNext,
      next,
      prev,
      goTo,
      pause,
      resume,
    } = useCarousel({ count, defaultIndex, index, onChange, loop, autoplay });

    // Pause autoplay on hover / focus-within
    const handleMouseEnter = () => {
      pause();
    };
    const handleMouseLeave = () => {
      resume();
    };
    const handleFocusIn = () => {
      pause();
    };
    const handleFocusOut = () => {
      resume();
    };

    // Keyboard navigation on the root element
    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    };

    return (
      <CarouselContext.Provider
        value={{
          current,
          count,
          isPlaying,
          canPrev,
          canNext,
          next,
          prev,
          goTo,
          pause,
          resume,
          trackId,
          label,
          animated: !disableAnimation,
        }}
      >
        {/* role="region" + aria-label creates a navigation landmark */}
        <div
          ref={ref}
          role="region"
          aria-label={label}
          aria-roledescription="carousel"
          className={cn(carouselRootVariants({ radius }), className)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleFocusIn}
          onBlur={handleFocusOut}
          onKeyDown={handleKeyDown}
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  },
);
CarouselRoot.displayName = "Carousel.Root";

// ─── Track ────────────────────────────────────────────────────────────────────

export interface CarouselTrackProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const CarouselTrack = forwardRef<HTMLDivElement, CarouselTrackProps>(
  ({ className, children, ...props }, ref) => {
    const { current, trackId, animated } = useCarouselContext("Carousel.Track");
    const translateX = `translateX(-${String(current * 100)}%)`;

    return (
      <div
        ref={ref}
        id={trackId}
        aria-live="polite"
        aria-atomic="false"
        className={cn(carouselTrackVariants({ animated }), className)}
        style={{ transform: translateX }}
        {...props}
      >
        {children}
      </div>
    );
  },
);
CarouselTrack.displayName = "Carousel.Track";

// ─── Item (slide) ─────────────────────────────────────────────────────────────

export interface CarouselItemProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Zero-based index of this slide. Required for aria-label and visibility.
   */
  index: number;
  /**
   * Accessible label for this individual slide.
   * Pattern: "Slide X of Y" — pass from parent using total count.
   * @example slideLabel={`Slide ${index + 1} of ${count}`}
   */
  slideLabel: string;
  children: ReactNode;
}

const CarouselItem = forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ index, slideLabel, className, children, ...props }, ref) => {
    const { current } = useCarouselContext("Carousel.Item");
    const isActive = current === index;

    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        aria-label={slideLabel}
        aria-hidden={!isActive}
        className={cn(carouselItemVariants(), className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
CarouselItem.displayName = "Carousel.Item";

// ─── Prev button ──────────────────────────────────────────────────────────────

export interface CarouselPrevProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Accessible label for the previous button. @default "Previous slide"
   */
  label?: string;
}

const CarouselPrev = forwardRef<HTMLButtonElement, CarouselPrevProps>(
  ({ label = "Previous slide", className, onClick, ...props }, ref) => {
    const { prev, canPrev } = useCarouselContext("Carousel.Prev");

    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        disabled={!canPrev}
        className={cn(carouselNavVariants({ direction: "prev" }), className)}
        onClick={(e) => {
          prev();
          onClick?.(e);
        }}
        {...props}
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
      </button>
    );
  },
);
CarouselPrev.displayName = "Carousel.Prev";

// ─── Next button ──────────────────────────────────────────────────────────────

export interface CarouselNextProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Accessible label for the next button. @default "Next slide"
   */
  label?: string;
}

const CarouselNext = forwardRef<HTMLButtonElement, CarouselNextProps>(
  ({ label = "Next slide", className, onClick, ...props }, ref) => {
    const { next, canNext } = useCarouselContext("Carousel.Next");

    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        disabled={!canNext}
        className={cn(carouselNavVariants({ direction: "next" }), className)}
        onClick={(e) => {
          next();
          onClick?.(e);
        }}
        {...props}
      >
        <ChevronRight className="size-4" aria-hidden="true" />
      </button>
    );
  },
);
CarouselNext.displayName = "Carousel.Next";

// ─── Dots ─────────────────────────────────────────────────────────────────────

export interface CarouselDotsProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Template for per-dot aria-label. Receives the 1-based slide number.
   * @default (n) => `Go to slide ${n}`
   */
  dotLabel?: (slideNumber: number) => string;
}

const CarouselDots = forwardRef<HTMLDivElement, CarouselDotsProps>(
  (
    { dotLabel = (n) => `Go to slide ${String(n)}`, className, ...props },
    ref,
  ) => {
    const { current, count, goTo } = useCarouselContext("Carousel.Dots");

    return (
      <div
        ref={ref}
        role="tablist"
        aria-label="Slide indicators"
        className={cn(carouselDotsVariants(), className)}
        {...props}
      >
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-label={dotLabel(i + 1)}
            aria-selected={current === i}
            aria-current={current === i ? "true" : undefined}
            className={cn(carouselDotVariants({ active: current === i }))}
            onClick={() => {
              goTo(i);
            }}
          />
        ))}
      </div>
    );
  },
);
CarouselDots.displayName = "Carousel.Dots";

// ─── Compound export ──────────────────────────────────────────────────────────

export const Carousel = {
  Root: CarouselRoot,
  Track: CarouselTrack,
  Item: CarouselItem,
  Prev: CarouselPrev,
  Next: CarouselNext,
  Dots: CarouselDots,
};
