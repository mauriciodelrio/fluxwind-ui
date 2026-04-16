import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { Divider } from "./Divider";

describe("Divider", () => {
  // ─── Element & role ─────────────────────────────────────────────────────────

  it("renders an <hr> for horizontal without label", () => {
    const { container } = render(<Divider />);
    expect(container.querySelector("hr")).toBeInTheDocument();
  });

  it("<hr> is reachable via role=separator", () => {
    render(<Divider />);
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("renders a div[role=separator] for vertical", () => {
    const { container } = render(<Divider orientation="vertical" />);
    expect(
      container.querySelector('div[role="separator"]'),
    ).toBeInTheDocument();
  });

  it("vertical div has aria-orientation=vertical", () => {
    render(<Divider orientation="vertical" />);
    expect(screen.getByRole("separator")).toHaveAttribute(
      "aria-orientation",
      "vertical",
    );
  });

  it("renders a div[role=separator] for labeled horizontal", () => {
    const { container } = render(<Divider label="or" />);
    expect(
      container.querySelector('div[role="separator"]'),
    ).toBeInTheDocument();
  });

  it("labeled divider does not have aria-orientation attribute", () => {
    render(<Divider label="or" />);
    expect(screen.getByRole("separator")).not.toHaveAttribute(
      "aria-orientation",
    );
  });

  it("label text is rendered in the DOM", () => {
    render(<Divider label="continue with" />);
    expect(screen.getByText("continue with")).toBeInTheDocument();
  });

  it("label is ignored when orientation is vertical", () => {
    render(<Divider orientation="vertical" label="ignored" />);
    expect(screen.queryByText("ignored")).not.toBeInTheDocument();
  });

  // ─── Variant classes ────────────────────────────────────────────────────────

  it("dashed variant applies border-dashed on horizontal", () => {
    const { container } = render(<Divider variant="dashed" />);
    expect(container.querySelector("hr")).toHaveClass("border-dashed");
  });

  it("dotted variant applies border-dotted on horizontal", () => {
    const { container } = render(<Divider variant="dotted" />);
    expect(container.querySelector("hr")).toHaveClass("border-dotted");
  });

  it("solid variant does not apply border-dashed or border-dotted", () => {
    const { container } = render(<Divider variant="solid" />);
    const hr = container.querySelector("hr");
    expect(hr).not.toHaveClass("border-dashed");
    expect(hr).not.toHaveClass("border-dotted");
  });

  it("dashed variant applies border-dashed on vertical", () => {
    const { container } = render(
      <Divider orientation="vertical" variant="dashed" />,
    );
    expect(container.querySelector('div[role="separator"]')).toHaveClass(
      "border-dashed",
    );
  });

  // ─── Spacing classes ────────────────────────────────────────────────────────

  it("spacing md applies my-4 on horizontal", () => {
    const { container } = render(<Divider spacing="md" />);
    expect(container.querySelector("hr")).toHaveClass("my-4");
  });

  it("spacing sm applies my-2 on horizontal", () => {
    const { container } = render(<Divider spacing="sm" />);
    expect(container.querySelector("hr")).toHaveClass("my-2");
  });

  it("spacing lg applies my-8 on horizontal", () => {
    const { container } = render(<Divider spacing="lg" />);
    expect(container.querySelector("hr")).toHaveClass("my-8");
  });

  it("spacing none applies my-0 on horizontal", () => {
    const { container } = render(<Divider spacing="none" />);
    expect(container.querySelector("hr")).toHaveClass("my-0");
  });

  it("spacing md applies mx-4 on vertical", () => {
    const { container } = render(
      <Divider orientation="vertical" spacing="md" />,
    );
    expect(container.querySelector('div[role="separator"]')).toHaveClass(
      "mx-4",
    );
  });

  it("spacing applies my-4 on labeled divider wrapper", () => {
    const { container } = render(<Divider label="or" spacing="md" />);
    expect(container.querySelector('div[role="separator"]')).toHaveClass(
      "my-4",
    );
  });

  // ─── className & attribute forwarding ───────────────────────────────────────

  it("merges custom className on horizontal", () => {
    const { container } = render(<Divider className="custom-class" />);
    expect(container.querySelector("hr")).toHaveClass("custom-class");
  });

  it("merges custom className on vertical", () => {
    render(<Divider orientation="vertical" className="custom-class" />);
    expect(screen.getByRole("separator")).toHaveClass("custom-class");
  });

  it("forwards html attributes on horizontal", () => {
    const { container } = render(<Divider data-testid="divider-hr" />);
    expect(
      container.querySelector('[data-testid="divider-hr"]'),
    ).toBeInTheDocument();
  });

  it("forwards html attributes on vertical", () => {
    render(<Divider orientation="vertical" data-testid="divider-v" />);
    expect(screen.getByTestId("divider-v")).toBeInTheDocument();
  });

  // ─── Accessibility ──────────────────────────────────────────────────────────

  it("has no WCAG violations (horizontal)", async () => {
    const { container } = render(<Divider />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("has no WCAG violations (horizontal dashed)", async () => {
    const { container } = render(<Divider variant="dashed" />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("has no WCAG violations (labeled)", async () => {
    const { container } = render(<Divider label="or" />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("has no WCAG violations (vertical)", async () => {
    const { container } = render(
      <div style={{ display: "flex", height: "40px" }}>
        <span>A</span>
        <Divider orientation="vertical" />
        <span>B</span>
      </div>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
