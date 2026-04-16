import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  // ─── DOM structure ──────────────────────────────────────────────────────────

  it("renders the trigger children", () => {
    render(
      <Tooltip content="Save document">
        <button type="button">Save</button>
      </Tooltip>,
    );
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });

  it("renders the tooltip bubble with role tooltip", () => {
    render(
      <Tooltip content="Save document">
        <button type="button">Save</button>
      </Tooltip>,
    );
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
  });

  it("renders the tooltip content text", () => {
    render(
      <Tooltip content="Delete this item permanently">
        <button type="button">Delete</button>
      </Tooltip>,
    );
    expect(screen.getByRole("tooltip")).toHaveTextContent(
      "Delete this item permanently",
    );
  });

  // ─── A11y wiring ────────────────────────────────────────────────────────────

  it("wrapper has aria-describedby pointing to the tooltip id", () => {
    const { container } = render(
      <Tooltip content="More info">
        <button type="button">Info</button>
      </Tooltip>,
    );
    const wrapper = container.firstChild as HTMLElement;
    const tooltip = screen.getByRole("tooltip");
    expect(wrapper.getAttribute("aria-describedby")).toBe(tooltip.id);
  });

  it("tooltip element has a non-empty id", () => {
    render(
      <Tooltip content="More info">
        <button type="button">Info</button>
      </Tooltip>,
    );
    const tooltip = screen.getByRole("tooltip");
    expect(tooltip.id).toBeTruthy();
  });

  // ─── Placement ──────────────────────────────────────────────────────────────

  it("applies top placement classes by default", () => {
    render(
      <Tooltip content="Tip">
        <button type="button">Hover me</button>
      </Tooltip>,
    );
    const tooltip = screen.getByRole("tooltip");
    expect(tooltip.className).toContain("bottom-full");
  });

  it("applies bottom placement classes when placement is bottom", () => {
    render(
      <Tooltip content="Tip" placement="bottom">
        <button type="button">Hover me</button>
      </Tooltip>,
    );
    expect(screen.getByRole("tooltip").className).toContain("top-full");
  });

  it("applies left placement classes when placement is left", () => {
    render(
      <Tooltip content="Tip" placement="left">
        <button type="button">Hover me</button>
      </Tooltip>,
    );
    expect(screen.getByRole("tooltip").className).toContain("right-full");
  });

  it("applies right placement classes when placement is right", () => {
    render(
      <Tooltip content="Tip" placement="right">
        <button type="button">Hover me</button>
      </Tooltip>,
    );
    expect(screen.getByRole("tooltip").className).toContain("left-full");
  });

  // ─── Styling ────────────────────────────────────────────────────────────────

  it("applies custom className to the outer wrapper", () => {
    const { container } = render(
      <Tooltip content="Tip" className="custom-wrap">
        <button type="button">Hover me</button>
      </Tooltip>,
    );
    expect(container.firstChild).toHaveClass("custom-wrap");
  });

  // ─── Accessibility ──────────────────────────────────────────────────────────

  it("has no WCAG violations — default (top)", async () => {
    const { container } = render(
      <Tooltip content="Save this document">
        <button type="button">Save</button>
      </Tooltip>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("has no WCAG violations — bottom placement", async () => {
    const { container } = render(
      <Tooltip content="Delete permanently" placement="bottom">
        <button type="button">Delete</button>
      </Tooltip>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
