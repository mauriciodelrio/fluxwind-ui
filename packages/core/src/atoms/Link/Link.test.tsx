import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { Link } from "./Link";

describe("Link", () => {
  // ─── Rendering ────────────────────────────────────────────────────────────

  it("renders an <a> element", () => {
    render(<Link href="/home">Home</Link>);
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
  });

  it("forwards href to the native anchor", () => {
    render(<Link href="/about">About</Link>);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/about");
  });

  it("forwards ref to the <a> element", () => {
    const ref = { current: null };
    render(
      <Link href="/" ref={ref}>
        Ref test
      </Link>,
    );
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });

  it("applies a custom className", () => {
    render(
      <Link href="/" className="custom-class">
        Styled
      </Link>,
    );
    expect(screen.getByRole("link")).toHaveClass("custom-class");
  });

  // ─── External ─────────────────────────────────────────────────────────────

  it("does NOT add target or rel by default", () => {
    render(<Link href="/internal">Internal</Link>);
    const a = screen.getByRole("link");
    expect(a).not.toHaveAttribute("target");
    expect(a).not.toHaveAttribute("rel");
  });

  it("adds target=_blank and rel=noopener noreferrer when external", () => {
    render(
      <Link href="https://example.com" external>
        External
      </Link>,
    );
    const a = screen.getByRole("link");
    expect(a).toHaveAttribute("target", "_blank");
    expect(a).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders the external icon when external is true", () => {
    const { container } = render(
      <Link href="https://example.com" external>
        Docs
      </Link>,
    );
    // ExternalLink icon renders an SVG with aria-hidden
    const icons = container.querySelectorAll('svg[aria-hidden="true"]');
    expect(icons.length).toBeGreaterThan(0);
  });

  it("does NOT render the external icon when external is false", () => {
    const { container } = render(<Link href="/">No icon</Link>);
    expect(container.querySelectorAll('svg[aria-hidden="true"]')).toHaveLength(
      0,
    );
  });

  // ─── Variants ─────────────────────────────────────────────────────────────

  it("renders variant=muted without throwing", () => {
    render(
      <Link href="/" variant="muted">
        Muted
      </Link>,
    );
    expect(screen.getByRole("link")).toBeInTheDocument();
  });

  it("renders variant=destructive without throwing", () => {
    render(
      <Link href="/" variant="destructive">
        Delete
      </Link>,
    );
    expect(screen.getByRole("link")).toBeInTheDocument();
  });

  // ─── Accessibility ─────────────────────────────────────────────────────────

  it("has no WCAG violations on a basic link", async () => {
    const { container } = render(<Link href="/home">Home</Link>);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("has no WCAG violations on an external link", async () => {
    const { container } = render(
      <Link href="https://example.com" external>
        Docs
      </Link>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
