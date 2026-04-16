import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import axe from "axe-core";
import { Skeleton } from "./Skeleton";

describe("Skeleton", () => {
  // ─── Structure ──────────────────────────────────────────────────────────────

  it("renders a div element", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild?.nodeName).toBe("DIV");
  });

  it("has aria-hidden true", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });

  // ─── Shape variants ─────────────────────────────────────────────────────────

  it("text shape has h-4 class", () => {
    const { container } = render(<Skeleton shape="text" />);
    expect(container.firstChild).toHaveClass("h-4");
  });

  it("text shape has rounded-sm class", () => {
    const { container } = render(<Skeleton shape="text" />);
    expect(container.firstChild).toHaveClass("rounded-sm");
  });

  it("circle shape has rounded-full class", () => {
    const { container } = render(<Skeleton shape="circle" />);
    expect(container.firstChild).toHaveClass("rounded-full");
  });

  it("circle shape does not have h-4 class", () => {
    const { container } = render(<Skeleton shape="circle" />);
    expect(container.firstChild).not.toHaveClass("h-4");
  });

  it("rect shape has rounded-md class", () => {
    const { container } = render(<Skeleton shape="rect" />);
    expect(container.firstChild).toHaveClass("rounded-md");
  });

  it("rect shape has w-full class", () => {
    const { container } = render(<Skeleton shape="rect" />);
    expect(container.firstChild).toHaveClass("w-full");
  });

  // ─── Animation variants ─────────────────────────────────────────────────────

  it("animate pulse includes motion-safe:animate-pulse", () => {
    const { container } = render(<Skeleton animate="pulse" />);
    expect(container.firstChild).toHaveClass("motion-safe:animate-pulse");
  });

  it("animate none does not include motion-safe:animate-pulse", () => {
    const { container } = render(<Skeleton animate="none" />);
    expect(container.firstChild).not.toHaveClass("motion-safe:animate-pulse");
  });

  it("animate shimmer includes fw-skeleton-shimmer class", () => {
    const { container } = render(<Skeleton animate="shimmer" />);
    expect(container.firstChild).toHaveClass("fw-skeleton-shimmer");
  });

  it("animate shimmer does not include animate-pulse", () => {
    const { container } = render(<Skeleton animate="shimmer" />);
    expect(container.firstChild).not.toHaveClass("motion-safe:animate-pulse");
  });

  // ─── className and attribute forwarding ─────────────────────────────────────

  it("merges custom className", () => {
    const { container } = render(<Skeleton className="size-10" />);
    expect(container.firstChild).toHaveClass("size-10");
  });

  it("forwards html attributes", () => {
    const { container } = render(<Skeleton data-testid="skeleton-el" />);
    expect(
      container.querySelector('[data-testid="skeleton-el"]'),
    ).toBeInTheDocument();
  });

  // ─── Accessibility ──────────────────────────────────────────────────────────

  it("has no WCAG violations (text shape)", async () => {
    const { container } = render(<Skeleton />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("has no WCAG violations (circle shape)", async () => {
    const { container } = render(
      <Skeleton shape="circle" className="size-10" />,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("has no WCAG violations (rect shape)", async () => {
    const { container } = render(<Skeleton shape="rect" className="h-48" />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("has no WCAG violations (aria-busy container pattern)", async () => {
    const { container } = render(
      <div role="status" aria-busy="true" aria-label="Loading profile">
        <Skeleton shape="circle" className="size-10" />
        <Skeleton shape="text" />
        <Skeleton shape="text" className="w-3/4" />
      </div>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
