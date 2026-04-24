import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { StatusText } from "./StatusText";

describe("StatusText", () => {
  // ─── Rendering ─────────────────────────────────────────────────────────────

  it("renders an <output> element by default", () => {
    const { container } = render(<StatusText>Saved</StatusText>);
    expect(container.querySelector("output")).toBeInTheDocument();
  });

  it("renders children text", () => {
    render(<StatusText>3 results found</StatusText>);
    expect(screen.getByText("3 results found")).toBeInTheDocument();
  });

  // ─── AC-1: role="status" via getByRole ─────────────────────────────────────

  it("is accessible as role='status' when rendered as <output>", () => {
    render(<StatusText>Changes saved</StatusText>);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("does NOT add an explicit role attribute when rendered as <output>", () => {
    const { container } = render(<StatusText>Saved</StatusText>);
    // role is implicit on <output> — adding it explicitly would be redundant
    expect(container.querySelector("output")).not.toHaveAttribute("role");
  });

  // ─── AC-4: `as` prop adds explicit role="status" ───────────────────────────

  it("adds role='status' explicitly when rendered as <p>", () => {
    const { container } = render(<StatusText as="p">Saved</StatusText>);
    expect(container.querySelector("p")).toHaveAttribute("role", "status");
  });

  it("adds role='status' explicitly when rendered as <span>", () => {
    const { container } = render(<StatusText as="span">Saved</StatusText>);
    expect(container.querySelector("span")).toHaveAttribute("role", "status");
  });

  it("is accessible as role='status' when rendered as <p>", () => {
    render(<StatusText as="p">Saved</StatusText>);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  // ─── AC-5: aria-label ──────────────────────────────────────────────────────

  it("passes aria-label to the element", () => {
    render(
      <StatusText aria-label="Auto-save status">Changes saved</StatusText>,
    );
    expect(
      screen.getByRole("status", { name: "Auto-save status" }),
    ).toBeInTheDocument();
  });

  // ─── AC-6: aria-atomic defaults to true ────────────────────────────────────

  it("sets aria-atomic='true' by default", () => {
    const { container } = render(<StatusText>Saved</StatusText>);
    expect(container.querySelector("output")).toHaveAttribute(
      "aria-atomic",
      "true",
    );
  });

  it("accepts aria-atomic='false' override", () => {
    const { container } = render(
      <StatusText aria-atomic={false}>Saved</StatusText>,
    );
    expect(container.querySelector("output")).toHaveAttribute(
      "aria-atomic",
      "false",
    );
  });

  // ─── AC-7: aria-live override ──────────────────────────────────────────────

  it("accepts aria-live='off' to silence the region", () => {
    const { container } = render(
      <StatusText aria-live="off">Saved</StatusText>,
    );
    expect(container.querySelector("output")).toHaveAttribute(
      "aria-live",
      "off",
    );
  });

  it("accepts aria-live='polite'", () => {
    const { container } = render(
      <StatusText aria-live="polite">Saved</StatusText>,
    );
    expect(container.querySelector("output")).toHaveAttribute(
      "aria-live",
      "polite",
    );
  });

  // ─── AC-8: className and native props passthrough ──────────────────────────

  it("applies custom className", () => {
    const { container } = render(
      <StatusText className="custom-class">Saved</StatusText>,
    );
    expect(container.querySelector("output")).toHaveClass("custom-class");
  });

  it("forwards native HTML attributes", () => {
    const { container } = render(
      <StatusText data-testid="status-region">Saved</StatusText>,
    );
    expect(container.querySelector("output")).toHaveAttribute(
      "data-testid",
      "status-region",
    );
  });

  // ─── Variants ──────────────────────────────────────────────────────────────

  it("applies caption variant class", () => {
    const { container } = render(
      <StatusText variant="caption">Small feedback</StatusText>,
    );
    expect(container.querySelector("output")).toHaveClass("text-xs");
  });

  it("applies label variant class", () => {
    const { container } = render(
      <StatusText variant="label">Status label</StatusText>,
    );
    expect(container.querySelector("output")).toHaveClass("font-medium");
  });

  it("applies code variant class", () => {
    const { container } = render(
      <StatusText variant="code">200 OK</StatusText>,
    );
    expect(container.querySelector("output")).toHaveClass("font-mono");
  });

  it("applies success color class", () => {
    const { container } = render(
      <StatusText color="success">Saved successfully</StatusText>,
    );
    expect(container.querySelector("output")).toHaveClass(
      "text-[var(--color-fw-success-text)]",
    );
  });

  it("applies warning color class", () => {
    const { container } = render(
      <StatusText color="warning">Almost full</StatusText>,
    );
    expect(container.querySelector("output")).toHaveClass(
      "text-[var(--color-fw-warning-text)]",
    );
  });

  // ─── AC-10: axe-core accessibility ─────────────────────────────────────────

  it("has no WCAG violations in default state", async () => {
    const { container } = render(
      <StatusText aria-label="Save status">Changes saved</StatusText>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("has no WCAG violations with destructive color", async () => {
    const { container } = render(
      <StatusText color="destructive" aria-label="Error status">
        Upload failed
      </StatusText>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("has no WCAG violations when rendered as <p>", async () => {
    const { container } = render(
      <StatusText as="p" aria-label="Result count">
        5 results
      </StatusText>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
