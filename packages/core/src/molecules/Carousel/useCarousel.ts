import { useCallback, useEffect, useReducer, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface UseCarouselOptions {
  /**
   * Total number of slides. Required to compute bounds and wrapping.
   */
  count: number;
  /**
   * Start at this slide index on mount. @default 0
   */
  defaultIndex?: number;
  /**
   * Controlled current index. When provided the component is controlled.
   */
  index?: number;
  /**
   * Fired when the active slide changes.
   */
  onChange?: (index: number) => void;
  /**
   * When true, navigating past the last slide wraps around to the first
   * (and vice-versa). @default false
   */
  loop?: boolean;
  /**
   * Interval in milliseconds for auto-advancing slides.
   * Set to 0 or omit to disable autoplay. @default 0
   */
  autoplay?: number;
}

export interface UseCarouselReturn {
  /** Zero-based index of the currently visible slide. */
  current: number;
  /** Whether the carousel is currently auto-playing. */
  isPlaying: boolean;
  /** Advance to the next slide. Wraps if `loop` is enabled. */
  next: () => void;
  /** Go back to the previous slide. Wraps if `loop` is enabled. */
  prev: () => void;
  /** Jump to a specific slide by zero-based index. */
  goTo: (index: number) => void;
  /** Pause autoplay (e.g. on hover or focus). */
  pause: () => void;
  /** Resume autoplay (e.g. on mouse leave or blur). */
  resume: () => void;
  /** Whether the prev button should be enabled. */
  canPrev: boolean;
  /** Whether the next button should be enabled. */
  canNext: boolean;
}

// ─── Reducer ─────────────────────────────────────────────────────────────────

interface State {
  current: number;
  isPlaying: boolean;
}
type Action =
  | { type: "NEXT"; count: number; loop: boolean }
  | { type: "PREV"; count: number; loop: boolean }
  | { type: "GO_TO"; index: number }
  | { type: "PAUSE" }
  | { type: "RESUME" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "NEXT": {
      const isLast = state.current === action.count - 1;
      if (isLast && !action.loop) return state;
      return { ...state, current: isLast ? 0 : state.current + 1 };
    }
    case "PREV": {
      const isFirst = state.current === 0;
      if (isFirst && !action.loop) return state;
      return {
        ...state,
        current: isFirst ? action.count - 1 : state.current - 1,
      };
    }
    case "GO_TO":
      return { ...state, current: action.index };
    case "PAUSE":
      return { ...state, isPlaying: false };
    case "RESUME":
      return { ...state, isPlaying: true };
  }
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useCarousel({
  count,
  defaultIndex = 0,
  index: controlledIndex,
  onChange,
  loop = false,
  autoplay = 0,
}: UseCarouselOptions): UseCarouselReturn {
  const isControlled = controlledIndex !== undefined;

  const [state, dispatch] = useReducer(reducer, {
    current: isControlled ? controlledIndex : defaultIndex,
    isPlaying: autoplay > 0,
  });

  // Sync controlled index changes
  useEffect(() => {
    if (isControlled) {
      dispatch({ type: "GO_TO", index: controlledIndex });
    }
  }, [isControlled, controlledIndex]);

  // Fire onChange when current changes (uncontrolled mode)
  const prevCurrentRef = useRef(state.current);
  useEffect(() => {
    if (prevCurrentRef.current !== state.current) {
      prevCurrentRef.current = state.current;
      onChange?.(state.current);
    }
  }, [state.current, onChange]);

  const next = useCallback(() => {
    dispatch({ type: "NEXT", count, loop });
  }, [count, loop]);

  const prev = useCallback(() => {
    dispatch({ type: "PREV", count, loop });
  }, [count, loop]);

  const goTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= count) return;
      dispatch({ type: "GO_TO", index });
    },
    [count],
  );

  const pause = useCallback(() => {
    dispatch({ type: "PAUSE" });
  }, []);

  const resume = useCallback(() => {
    if (autoplay > 0) {
      dispatch({ type: "RESUME" });
    }
  }, [autoplay]);

  // Autoplay interval
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!state.isPlaying || autoplay <= 0) {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      dispatch({ type: "NEXT", count, loop });
    }, autoplay);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [state.isPlaying, autoplay, count, loop]);

  const current = isControlled ? controlledIndex : state.current;
  const canPrev = loop || current > 0;
  const canNext = loop || current < count - 1;

  return {
    current,
    isPlaying: state.isPlaying,
    next,
    prev,
    goTo,
    pause,
    resume,
    canPrev,
    canNext,
  };
}
