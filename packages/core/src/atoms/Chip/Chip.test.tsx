import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { Chip } from "./Chip";

describe("Chip", () => {
  // ─── Element & structure ────────────────────────────────────────────────────

  it("renders label text", () => {
    render(<Chip label="React" />);
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("renders a <span> when neither onClick nor onDismiss is provided", () => {
    const { container } = render(<Chip label="React" />);
    expect(container.querySelector("span")).toBeInTheDocument();
    expect(container.querySelector("button")).not.toBeInTheDocument();
  });

  it("renders a <button> root when onClick is provided", () => {
    render(<Chip label="React" onClick={vi.fn()} />);
    // The root button contains the label
    const btn = screen.getByRole("button", { name: /react/i });
    expect(btn).toBeInTheDocument();
  });

  it("root button has type=button", () => {
    render(<Chip label="React" onClick={vi.fn()} />);
    expect(screen.getByRole("button", { name: /react/i })).toHaveAttribute(
      "type",
      "button",
    );
  });

  // ─── Dismiss button ─────────────────────────────────────────────────────────

  it("renders dismiss button when onDismiss is provided", () => {
    render(<Chip label="React" onDismiss={vi.fn()} />);
    expect(
      screen.getByRole("button", { name: "Remove React" }),
    ).toBeInTheDocument();
  });

  it("dismiss button has aria-label with label text", () => {
    render(<Chip label="TypeScript" onDismiss={vi.fn()} />);
    expect(
      screen.getByRole("button", { name: "Remove TypeScript" }),
    ).toBeInTheDocument();
  });

  it("does not render dismiss button when onDismiss is absent", () => {
    render(<Chip label="React" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("dismiss button has type=button", () => {
    render(<Chip label="React" onDismiss={vi.fn()} />);
    expect(
      screen.getByRole("button", { name: "Remove React" }),
    ).toHaveAttribute("type", "button");
  });

  // ─── Interactivity ─────────────────────────────────────────────────────────

  it("calls onClick when root button is clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Chip label="React" onClick={handleClick} />);
    await user.click(screen.getByRole("button", { name: /react/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("calls onDismiss when dismiss button is clicked", async () => {
    const user = userEvent.setup();
    const handleDismiss = vi.fn();
    render(<Chip label="React" onDismiss={handleDismiss} />);
    await user.click(screen.getByRole("button", { name: "Remove React" }));
    expect(handleDismiss).toHaveBeenCalledTimes(1);
  });

  it("dismiss button is keyboard operable via Enter", async () => {
    const user = userEvent.setup();
    const handleDismiss = vi.fn();
    render(<Chip label="React" onDismiss={handleDismiss} />);
    const btn = screen.getByRole("button", { name: "Remove React" });
    btn.focus();
    await user.keyboard("{Enter}");
    expect(handleDismiss).toHaveBeenCalledTimes(1);
  });

  // ─── Icon slot ──────────────────────────────────────────────────────────────

  it("renders icon when provided", () => {
    const icon = <svg data-testid="chip-icon" />;
    render(<Chip label="React" icon={icon} />);
    expect(screen.getByTestId("chip-icon")).toBeInTheDocument();
  });

  it("icon wrapper is aria-hidden", () => {
    const icon = <svg data-testid="chip-icon" />;
    const { container } = render(<Chip label="React" icon={icon} />);
    const wrapper = container.querySelector('span[aria-hidden="true"]');
    expect(wrapper).toBeInTheDocument();
  });

  it("does not render icon wrapper when icon is absent", () => {
    const { container } = render(<Chip label="React" />);
    expect(
      container.querySelector('span[aria-hidden="true"]'),
    ).not.toBeInTheDocument();
  });

  // ─── Variant classes ────────────────────────────────────────────────────────

  it("applies cursor-pointer class when onClick is provided", () => {
    render(<Chip label="React" onClick={vi.fn()} />);
    expect(screen.getByRole("button", { name: /react/i })).toHaveClass(
      "cursor-pointer",
    );
  });

  it("applies cursor-default class when onClick is absent", () => {
    const { container } = render(<Chip label="React" />);
    expect(container.firstChild).toHaveClass("cursor-default");
  });

  it("applies custom className", () => {
    const { container } = render(
      <Chip label="React" className="custom-class" />,
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  // ─── Accessibility ──────────────────────────────────────────────────────────

  it("has no WCAG violations (plain chip)", async () => {
    const { container } = render(<Chip label="React" />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("has no WCAG violations (dismissible chip)", async () => {
    const { container } = render(<Chip label="React" onDismiss={vi.fn()} />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("has no WCAG violations (clickable chip)", async () => {
    const { container } = render(<Chip label="Filter" onClick={vi.fn()} />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("has no WCAG violations (chip with icon and dismiss)", async () => {
    const { container } = render(
      <Chip
        label="TypeScript"
        icon={<svg aria-hidden="true" />}
        onDismiss={vi.fn()}
      />,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
