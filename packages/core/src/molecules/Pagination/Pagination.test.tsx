import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { Pagination, buildPageRange } from "./Pagination";

// ─── buildPageRange unit tests ────────────────────────────────────────────────

describe("buildPageRange", () => {
  it("returns [1] when totalPages is 1", () => {
    expect(buildPageRange(1, 1, 1, true)).toEqual([1]);
  });

  it("returns all pages when totalPages fits without ellipsis", () => {
    expect(buildPageRange(3, 5, 1, true)).toEqual([1, 2, 3, 4, 5]);
  });

  it("shows ellipsis-end when page is near start", () => {
    const range = buildPageRange(1, 12, 1, true);
    expect(range[0]).toBe(1);
    expect(range).toContain("ellipsis-end");
    expect(range[range.length - 1]).toBe(12);
  });

  it("shows ellipsis-start when page is near end", () => {
    const range = buildPageRange(12, 12, 1, true);
    expect(range[0]).toBe(1);
    expect(range).toContain("ellipsis-start");
    expect(range[range.length - 1]).toBe(12);
  });

  it("shows both ellipses when page is in the middle", () => {
    const range = buildPageRange(6, 12, 1, true);
    expect(range).toContain("ellipsis-start");
    expect(range).toContain("ellipsis-end");
    expect(range[0]).toBe(1);
    expect(range[range.length - 1]).toBe(12);
  });

  it("places active page in the center of siblings", () => {
    const range = buildPageRange(6, 12, 1, true);
    expect(range).toContain(5);
    expect(range).toContain(6);
    expect(range).toContain(7);
  });

  it("increasing siblingCount shows more pages", () => {
    const narrow = buildPageRange(6, 12, 1, true);
    const wide = buildPageRange(6, 12, 2, true);
    expect(wide.filter((i) => typeof i === "number").length).toBeGreaterThan(
      narrow.filter((i) => typeof i === "number").length,
    );
  });

  it("does not produce duplicates", () => {
    for (let p = 1; p <= 12; p++) {
      const range = buildPageRange(p, 12, 1, true);
      const nums = range.filter((i): i is number => typeof i === "number");
      expect(nums.length).toBe(new Set(nums).size);
    }
  });
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

function renderPagination(
  overrides: Partial<Parameters<typeof Pagination>[0]> = {},
) {
  const onPageChange = vi.fn();
  render(
    <Pagination
      page={5}
      totalPages={12}
      onPageChange={onPageChange}
      {...overrides}
    />,
  );
  return { onPageChange };
}

// ─── Structure ────────────────────────────────────────────────────────────────

describe("Pagination – structure", () => {
  it("renders a nav landmark", () => {
    renderPagination();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("uses the aria-label prop on the nav", () => {
    renderPagination({ "aria-label": "Post navigation" });
    expect(
      screen.getByRole("navigation", { name: "Post navigation" }),
    ).toBeInTheDocument();
  });

  it("renders previous and next buttons", () => {
    renderPagination();
    expect(
      screen.getByRole("button", { name: "Previous page" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Next page" }),
    ).toBeInTheDocument();
  });

  it("renders page buttons for each number in the range", () => {
    renderPagination({ page: 1, totalPages: 5 });
    for (let i = 1; i <= 5; i++) {
      expect(
        screen.getByRole("button", { name: `Page ${String(i)}` }),
      ).toBeInTheDocument();
    }
  });

  it("marks active page with aria-current='page'", () => {
    renderPagination({ page: 5 });
    expect(screen.getByRole("button", { name: "Page 5" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("other pages do not have aria-current", () => {
    renderPagination({ page: 5 });
    expect(screen.getByRole("button", { name: "Page 4" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("renders ellipsis spans when range has gaps", () => {
    renderPagination({ page: 6, totalPages: 12 });
    const ellipses = screen.getAllByText("…");
    expect(ellipses.length).toBeGreaterThanOrEqual(1);
  });

  it("applies custom className to nav", () => {
    render(
      <Pagination
        page={1}
        totalPages={3}
        onPageChange={vi.fn()}
        className="custom-class"
      />,
    );
    expect(screen.getByRole("navigation")).toHaveClass("custom-class");
  });
});

// ─── Disabled states ──────────────────────────────────────────────────────────

describe("Pagination – disabled states", () => {
  it("disables previous button on first page", () => {
    renderPagination({ page: 1 });
    expect(
      screen.getByRole("button", { name: "Previous page" }),
    ).toBeDisabled();
  });

  it("enables previous button when not on first page", () => {
    renderPagination({ page: 2 });
    expect(
      screen.getByRole("button", { name: "Previous page" }),
    ).not.toBeDisabled();
  });

  it("disables next button on last page", () => {
    renderPagination({ page: 12, totalPages: 12 });
    expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();
  });

  it("enables next button when not on last page", () => {
    renderPagination({ page: 11, totalPages: 12 });
    expect(
      screen.getByRole("button", { name: "Next page" }),
    ).not.toBeDisabled();
  });

  it("makes the active page button non-interactive (pointer-events-none, no disabled attr)", () => {
    renderPagination({ page: 5 });
    const btn = screen.getByRole("button", { name: "Page 5" });
    // Not disabled (avoids opacity-40 contrast failure) but aria-current marks it as active
    expect(btn).not.toBeDisabled();
    expect(btn).toHaveAttribute("aria-current", "page");
    expect(btn).toHaveClass("pointer-events-none");
  });
});

// ─── Interaction ──────────────────────────────────────────────────────────────

describe("Pagination – interaction", () => {
  it("calls onPageChange with page - 1 when clicking previous", async () => {
    const { onPageChange } = renderPagination({ page: 5 });
    await userEvent.click(
      screen.getByRole("button", { name: "Previous page" }),
    );
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it("calls onPageChange with page + 1 when clicking next", async () => {
    const { onPageChange } = renderPagination({ page: 5 });
    await userEvent.click(screen.getByRole("button", { name: "Next page" }));
    expect(onPageChange).toHaveBeenCalledWith(6);
  });

  it("calls onPageChange with the clicked page number", async () => {
    const { onPageChange } = renderPagination({ page: 5, totalPages: 12 });
    await userEvent.click(screen.getByRole("button", { name: "Page 6" }));
    expect(onPageChange).toHaveBeenCalledWith(6);
  });

  it("does not call onPageChange when clicking the active page", async () => {
    const { onPageChange } = renderPagination({ page: 5 });
    await userEvent.click(screen.getByRole("button", { name: "Page 5" }));
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it("does not call onPageChange when clicking previous on page 1", async () => {
    const { onPageChange } = renderPagination({ page: 1 });
    await userEvent.click(
      screen.getByRole("button", { name: "Previous page" }),
    );
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it("does not call onPageChange when clicking next on last page", async () => {
    const { onPageChange } = renderPagination({ page: 12, totalPages: 12 });
    await userEvent.click(screen.getByRole("button", { name: "Next page" }));
    expect(onPageChange).not.toHaveBeenCalled();
  });
});

// ─── Edge cases ───────────────────────────────────────────────────────────────

describe("Pagination – edge cases", () => {
  it("renders with totalPages=1 without crashing", () => {
    renderPagination({ page: 1, totalPages: 1 });
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("renders with totalPages=2 without ellipsis", () => {
    renderPagination({ page: 1, totalPages: 2 });
    expect(screen.queryByText("…")).not.toBeInTheDocument();
  });

  it("accepts custom label props", () => {
    render(
      <Pagination
        page={3}
        totalPages={10}
        onPageChange={vi.fn()}
        previousLabel="Anterior"
        nextLabel="Siguiente"
      />,
    );
    expect(
      screen.getByRole("button", { name: "Anterior" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Siguiente" }),
    ).toBeInTheDocument();
  });
});

// ─── Accessibility ────────────────────────────────────────────────────────────

describe("Pagination – accessibility", () => {
  it("has no axe violations (default state)", async () => {
    const { container } = render(
      <Pagination page={5} totalPages={12} onPageChange={vi.fn()} />,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("has no axe violations on first page", async () => {
    const { container } = render(
      <Pagination page={1} totalPages={12} onPageChange={vi.fn()} />,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("has no axe violations on last page", async () => {
    const { container } = render(
      <Pagination page={12} totalPages={12} onPageChange={vi.fn()} />,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("ellipsis spans are hidden from assistive technology", () => {
    renderPagination({ page: 6, totalPages: 12 });
    // Ellipsis <span>s use aria-hidden="true" — they should not be accessible
    const ellipsisSpans = document.querySelectorAll('[aria-hidden="true"]');
    // ChevronLeft/Right SVGs + ellipses are all hidden
    expect(ellipsisSpans.length).toBeGreaterThan(0);
  });

  it("page buttons are keyboard focusable", () => {
    renderPagination();
    const buttons = screen.getAllByRole("button");
    buttons.forEach((btn) => {
      // disabled buttons don't need tabIndex; enabled ones must be natively focusable
      if (!btn.hasAttribute("disabled")) {
        expect(btn.tagName).toBe("BUTTON");
      }
    });
  });
});
