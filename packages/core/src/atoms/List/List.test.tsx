import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { List } from "./List";

// ─── Structure ────────────────────────────────────────────────────────────────

describe("List – structure", () => {
  it("renders as <ul> by default", () => {
    render(
      <List>
        <List.Item>Item A</List.Item>
      </List>,
    );
    expect(screen.getByRole("list").tagName).toBe("UL");
  });

  it("renders as <ol> when variant is ordered", () => {
    render(
      <List variant="ordered">
        <List.Item>Item A</List.Item>
      </List>,
    );
    expect(screen.getByRole("list").tagName).toBe("OL");
  });

  it("renders as <ul> when variant is none", () => {
    render(
      <List variant="none">
        <List.Item>Item A</List.Item>
      </List>,
    );
    expect(screen.getByRole("list").tagName).toBe("UL");
  });

  it("renders List.Item children", () => {
    render(
      <List>
        <List.Item>Alpha</List.Item>
        <List.Item>Beta</List.Item>
      </List>,
    );
    expect(screen.getByText("Alpha")).toBeInTheDocument();
    expect(screen.getByText("Beta")).toBeInTheDocument();
  });

  it("forwards ref to root element", () => {
    const ref = { current: null };
    render(
      <List ref={ref}>
        <List.Item>Item</List.Item>
      </List>,
    );
    expect(ref.current).toBeInstanceOf(HTMLUListElement);
  });

  it("forwards ref to List.Item", () => {
    const ref = { current: null };
    render(
      <List>
        <List.Item ref={ref}>Item</List.Item>
      </List>,
    );
    expect(ref.current).toBeInstanceOf(HTMLLIElement);
  });
});

// ─── Variants ─────────────────────────────────────────────────────────────────

describe("List – variants", () => {
  it("applies disc class for unordered", () => {
    render(
      <List variant="unordered">
        <List.Item>Item</List.Item>
      </List>,
    );
    expect(screen.getByRole("list").className).toMatch(/list-disc/);
  });

  it("applies decimal class for ordered", () => {
    render(
      <List variant="ordered">
        <List.Item>Item</List.Item>
      </List>,
    );
    expect(screen.getByRole("list").className).toMatch(/list-decimal/);
  });

  it("applies list-none for none variant", () => {
    render(
      <List variant="none">
        <List.Item>Item</List.Item>
      </List>,
    );
    expect(screen.getByRole("list").className).toMatch(/list-none/);
  });

  it("applies muted class to List.Item when muted is true", () => {
    render(
      <List>
        <List.Item muted>Muted item</List.Item>
      </List>,
    );
    expect(screen.getByRole("listitem").className).toMatch(
      /color-fw-muted-foreground/,
    );
  });

  it("merges custom className on root", () => {
    render(
      <List className="custom-class">
        <List.Item>Item</List.Item>
      </List>,
    );
    expect(screen.getByRole("list").className).toMatch(/custom-class/);
  });
});

// ─── Accessibility ────────────────────────────────────────────────────────────

describe("List – a11y", () => {
  it("has no WCAG violations (unordered)", async () => {
    const { container } = render(
      <List>
        <List.Item>First</List.Item>
        <List.Item>Second</List.Item>
      </List>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("has no WCAG violations (ordered)", async () => {
    const { container } = render(
      <List variant="ordered">
        <List.Item>Step one</List.Item>
        <List.Item>Step two</List.Item>
      </List>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
