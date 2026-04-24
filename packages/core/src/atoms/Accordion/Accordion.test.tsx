import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { Accordion } from "./Accordion";

// ─── Accordion.Item standalone ────────────────────────────────────────────────

describe("Accordion.Item", () => {
  it("renders as a <details> element with implicit group role", () => {
    render(
      <Accordion.Item trigger="What is FluxWind?">
        A design system built with React and Tailwind CSS.
      </Accordion.Item>,
    );
    expect(screen.getByRole("group")).toBeInTheDocument();
  });

  it("renders trigger text inside summary", () => {
    render(
      <Accordion.Item trigger="What is FluxWind?">Content</Accordion.Item>,
    );
    expect(screen.getByText("What is FluxWind?")).toBeInTheDocument();
  });

  it("renders panel content", () => {
    render(<Accordion.Item trigger="Question">Answer content</Accordion.Item>);
    expect(screen.getByText("Answer content")).toBeInTheDocument();
  });

  it("is closed by default", () => {
    const { container } = render(
      <Accordion.Item trigger="Question">Answer</Accordion.Item>,
    );
    const details = container.querySelector("details");
    expect(details).not.toHaveAttribute("open");
  });

  it("is open when defaultOpen is true", () => {
    const { container } = render(
      <Accordion.Item trigger="Question" defaultOpen>
        Answer
      </Accordion.Item>,
    );
    const details = container.querySelector("details");
    expect(details).toHaveAttribute("open");
  });

  it("opens when the summary is clicked (uncontrolled)", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Accordion.Item trigger="Click me">Panel content</Accordion.Item>,
    );
    const details = container.querySelector("details")!;
    expect(details.open).toBe(false);
    await user.click(screen.getByText("Click me"));
    expect(details.open).toBe(true);
  });

  it("calls onToggle with true when opened", async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    const { container } = render(
      <Accordion.Item trigger="Click me" onToggle={onToggle}>
        Panel
      </Accordion.Item>,
    );
    const details = container.querySelector("details")!;
    // Close initial state is false — click to open
    expect(details.open).toBe(false);
    await user.click(screen.getByText("Click me"));
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it("does not open when disabled", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Accordion.Item trigger="Locked" disabled>
        Hidden content
      </Accordion.Item>,
    );
    const details = container.querySelector("details")!;
    await user.click(screen.getByText("Locked"));
    expect(details.open).toBe(false);
  });

  it("sets aria-disabled on summary when disabled", () => {
    render(
      <Accordion.Item trigger="Locked" disabled>
        Content
      </Accordion.Item>,
    );
    const summary = screen.getByText("Locked").closest("summary");
    expect(summary).toHaveAttribute("aria-disabled", "true");
  });

  it("renders leading icon when icon prop is provided", () => {
    render(
      <Accordion.Item
        trigger="With icon"
        icon={<span data-testid="my-icon">★</span>}
      >
        Content
      </Accordion.Item>,
    );
    expect(screen.getByTestId("my-icon")).toBeInTheDocument();
  });

  it("applies custom className to the details element", () => {
    const { container } = render(
      <Accordion.Item trigger="Q" className="custom-class">
        A
      </Accordion.Item>,
    );
    expect(container.querySelector("details")).toHaveClass("custom-class");
  });

  it("has no WCAG violations — default item", async () => {
    const { container } = render(
      <Accordion.Item trigger="Accessible question">
        Accessible answer
      </Accordion.Item>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});

// ─── Accordion Root ───────────────────────────────────────────────────────────

describe("Accordion (Root)", () => {
  it("renders multiple items", () => {
    render(
      <Accordion>
        <Accordion.Item trigger="Item 1">Content 1</Accordion.Item>
        <Accordion.Item trigger="Item 2">Content 2</Accordion.Item>
      </Accordion>,
    );
    expect(screen.getAllByRole("group")).toHaveLength(2);
  });

  it("applies variant class to root wrapper", () => {
    const { container } = render(
      <Accordion variant="bordered">
        <Accordion.Item trigger="Item 1">Content</Accordion.Item>
      </Accordion>,
    );
    // bordered variant adds a border class
    expect(container.firstChild).toHaveClass("border");
  });

  it("applies custom className to root wrapper", () => {
    const { container } = render(
      <Accordion className="custom-root">
        <Accordion.Item trigger="Item 1">Content</Accordion.Item>
      </Accordion>,
    );
    expect(container.firstChild).toHaveClass("custom-root");
  });

  it("exclusive mode — opening one item closes the other", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Accordion exclusive>
        <Accordion.Item trigger="First" id="first">
          Panel A
        </Accordion.Item>
        <Accordion.Item trigger="Second" id="second">
          Panel B
        </Accordion.Item>
      </Accordion>,
    );

    const allDetails = container.querySelectorAll("details");
    const [first, second] = Array.from(allDetails);

    // Open first
    await user.click(screen.getByText("First"));
    expect(first.open).toBe(true);
    expect(second.open).toBe(false);

    // Open second — first should close
    await user.click(screen.getByText("Second"));
    expect(first.open).toBe(false);
    expect(second.open).toBe(true);
  });

  it("exclusive mode — clicking open item closes it (toggle off)", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Accordion exclusive>
        <Accordion.Item trigger="Toggle me" id="toggle">
          Panel
        </Accordion.Item>
      </Accordion>,
    );

    const details = container.querySelector("details")!;

    await user.click(screen.getByText("Toggle me"));
    expect(details.open).toBe(true);

    await user.click(screen.getByText("Toggle me"));
    expect(details.open).toBe(false);
  });

  it("has no WCAG violations — bordered variant with multiple items", async () => {
    const { container } = render(
      <Accordion variant="bordered">
        <Accordion.Item trigger="Question one">Answer one</Accordion.Item>
        <Accordion.Item trigger="Question two">Answer two</Accordion.Item>
      </Accordion>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("has no WCAG violations — exclusive mode", async () => {
    const { container } = render(
      <Accordion exclusive>
        <Accordion.Item trigger="First" id="first">
          Panel A
        </Accordion.Item>
        <Accordion.Item trigger="Second" id="second">
          Panel B
        </Accordion.Item>
      </Accordion>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
