import { useCallback, type ComponentProps } from "react";
import { useSignals } from "@preact/signals-react/runtime";
import { cn } from "@/lib/cn";
import {
  paginationVariants,
  paginationItemVariants,
  paginationEllipsisVariants,
  type PaginationVariants,
} from "./Pagination.variants";

// ─── Types ────────────────────────────────────────────────────────────────────

export type PaginationSize = NonNullable<PaginationVariants["size"]>;

export interface PaginationProps extends Omit<
  ComponentProps<"nav">,
  "onChange"
> {
  /** Current active page (1-based). */
  page: number;
  /** Total number of pages. */
  totalPages: number;
  /** Called when the user selects a different page. */
  onPageChange: (page: number) => void;
  /**
   * Number of page buttons to show on each side of the active page.
   * @default 1
   */
  siblingCount?: number;
  /**
   * Whether to always show first and last page buttons.
   * @default true
   */
  showEdges?: boolean;
  /** Size of all page buttons. @default "md" */
  size?: PaginationSize;
  /** Accessible label for the nav landmark. @default "Pagination" */
  "aria-label"?: string;
  /** Accessible label for "previous page" button. @default "Previous page" */
  previousLabel?: string;
  /** Accessible label for "next page" button. @default "Next page" */
  nextLabel?: string;
}

// ─── Page range algorithm ────────────────────────────────────────────────────

/**
 * Builds the list of items to display:
 *   1 … 4 5 [6] 7 8 … 12
 *
 * Returns an array of numbers and "ellipsis" strings.
 *
 * When `showEdges=true` and totalPages is small enough to fit in
 * `siblingCount * 2 + 5` slots, every page is shown without ellipsis.
 * When `showEdges=false`, only the sibling window around the active page
 * is shown (no anchored first/last pages).
 */
export function buildPageRange(
  page: number,
  totalPages: number,
  siblingCount: number,
  showEdges: boolean,
): (number | "ellipsis-start" | "ellipsis-end")[] {
  if (totalPages <= 1) return [1];

  if (!showEdges) {
    const start = Math.max(1, page - siblingCount);
    const end = Math.min(totalPages, page + siblingCount);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  // With edges: show first + last always; use ellipsis when there is a gap
  const totalSlots = siblingCount * 2 + 5; // first + last + 2 ellipses + 2*siblings + active
  if (totalPages <= totalSlots) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(page - siblingCount, 1);
  const rightSiblingIndex = Math.min(page + siblingCount, totalPages);
  const showLeftDots = leftSiblingIndex > 2;
  const showRightDots = rightSiblingIndex < totalPages - 1;

  const makeRange = (start: number, end: number): number[] =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  if (!showLeftDots && showRightDots) {
    const leftCount = 3 + 2 * siblingCount;
    return [...makeRange(1, leftCount), "ellipsis-end", totalPages];
  }

  if (showLeftDots && !showRightDots) {
    const rightCount = 3 + 2 * siblingCount;
    return [
      1,
      "ellipsis-start",
      ...makeRange(totalPages - rightCount + 1, totalPages),
    ];
  }

  // Both ellipses
  return [
    1,
    "ellipsis-start",
    ...makeRange(leftSiblingIndex, rightSiblingIndex),
    "ellipsis-end",
    totalPages,
  ];
}

// ─── ChevronLeft icon ─────────────────────────────────────────────────────────

function ChevronLeft() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

// ─── ChevronRight icon ────────────────────────────────────────────────────────

function ChevronRight() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

// ─── Pagination ───────────────────────────────────────────────────────────────

export function Pagination({
  page,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showEdges = true,
  size = "md",
  "aria-label": ariaLabel = "Pagination",
  previousLabel = "Previous page",
  nextLabel = "Next page",
  className,
  ...props
}: PaginationProps) {
  useSignals();

  const items = buildPageRange(page, totalPages, siblingCount, showEdges);

  const goTo = useCallback(
    (target: number) => {
      if (target < 1 || target > totalPages || target === page) return;
      onPageChange(target);
    },
    [page, totalPages, onPageChange],
  );

  return (
    <nav
      aria-label={ariaLabel}
      className={cn(paginationVariants(), className)}
      {...props}
    >
      {/* Previous */}
      <button
        type="button"
        aria-label={previousLabel}
        onClick={() => {
          goTo(page - 1);
        }}
        disabled={page <= 1}
        className={paginationItemVariants({ size, active: false })}
      >
        <ChevronLeft />
      </button>

      {/* Page items */}
      {items.map((item) => {
        if (item === "ellipsis-start" || item === "ellipsis-end") {
          return (
            <span
              key={item}
              aria-hidden="true"
              className={paginationEllipsisVariants({ size })}
            >
              &hellip;
            </span>
          );
        }

        const isActive = item === page;

        return (
          <button
            key={item}
            type="button"
            onClick={() => {
              goTo(item);
            }}
            aria-label={`Page ${String(item)}`}
            aria-current={isActive ? "page" : undefined}
            className={paginationItemVariants({ size, active: isActive })}
          >
            {item}
          </button>
        );
      })}

      {/* Next */}
      <button
        type="button"
        aria-label={nextLabel}
        onClick={() => {
          goTo(page + 1);
        }}
        disabled={page >= totalPages}
        className={paginationItemVariants({ size, active: false })}
      >
        <ChevronRight />
      </button>
    </nav>
  );
}

Pagination.displayName = "Pagination";
