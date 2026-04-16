import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { Card } from "./Card";

// ─── Structure ────────────────────────────────────────────────────────────────

describe("Card – structure", () => {
  it("renders children", () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("renders Card.Header children", () => {
    render(
      <Card>
        <Card.Header>Header content</Card.Header>
      </Card>,
    );
    expect(screen.getByText("Header content")).toBeInTheDocument();
  });

  it("renders Card.Body children", () => {
    render(
      <Card>
        <Card.Body>Body content</Card.Body>
      </Card>,
    );
    expect(screen.getByText("Body content")).toBeInTheDocument();
  });

  it("renders Card.Footer children", () => {
    render(
      <Card>
        <Card.Footer>Footer content</Card.Footer>
      </Card>,
    );
    expect(screen.getByText("Footer content")).toBeInTheDocument();
  });

  it("renders all sub-components together", () => {
    render(
      <Card>
        <Card.Header>Title</Card.Header>
        <Card.Body>Description</Card.Body>
        <Card.Footer>Actions</Card.Footer>
      </Card>,
    );
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });

  it("forwards ref to the root div", () => {
    const ref = { current: null };
    render(<Card ref={ref}>Ref test</Card>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("forwards ref to Card.Header", () => {
    const ref = { current: null };
    render(
      <Card>
        <Card.Header ref={ref}>Header</Card.Header>
      </Card>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("forwards ref to Card.Body", () => {
    const ref = { current: null };
    render(
      <Card>
        <Card.Body ref={ref}>Body</Card.Body>
      </Card>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("forwards ref to Card.Footer", () => {
    const ref = { current: null };
    render(
      <Card>
        <Card.Footer ref={ref}>Footer</Card.Footer>
      </Card>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("accepts and applies a custom className", () => {
    const { container } = render(<Card className="custom-class">Content</Card>);
    expect(container.firstChild).toHaveClass("custom-class");
  });
});

// ─── Interactivity ────────────────────────────────────────────────────────────

describe("Card – interactivity", () => {
  it("is not focusable by default", () => {
    render(<Card>Content</Card>);
    const card = screen.getByText("Content").closest("div")!;
    expect(card).not.toHaveAttribute("tabindex");
    expect(card).not.toHaveAttribute("role");
  });

  it("is focusable when isInteractive=true", () => {
    render(<Card isInteractive>Content</Card>);
    const card = screen.getByText("Content").closest("div")!;
    expect(card).toHaveAttribute("tabindex", "0");
  });

  it("has role=article when isInteractive=true so aria-label is valid", () => {
    render(
      <Card isInteractive aria-label="Product card">
        Content
      </Card>,
    );
    expect(
      screen.getByRole("article", { name: "Product card" }),
    ).toBeInTheDocument();
  });

  it("allows overriding role via props", () => {
    render(
      <Card isInteractive role="button" aria-label="Select card">
        Content
      </Card>,
    );
    expect(
      screen.getByRole("button", { name: "Select card" }),
    ).toBeInTheDocument();
  });

  it("receives focus on Tab when isInteractive=true", async () => {
    const user = userEvent.setup();
    render(<Card isInteractive>Focusable card</Card>);
    const card = screen.getByText("Focusable card").closest("div")!;
    await user.tab();
    expect(card).toHaveFocus();
  });

  it("does not receive focus on Tab when isInteractive=false", async () => {
    const user = userEvent.setup();
    render(<Card>Non-focusable card</Card>);
    const card = screen.getByText("Non-focusable card").closest("div");
    await user.tab();
    expect(card).not.toHaveFocus();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <Card isInteractive onClick={handleClick}>
        Clickable
      </Card>,
    );
    await user.click(screen.getByText("Clickable"));
    expect(handleClick).toHaveBeenCalledOnce();
  });
});

// ─── Variants ─────────────────────────────────────────────────────────────────

describe("Card – variants", () => {
  it("applies outlined variant by default", () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.firstChild).toHaveClass("border");
  });

  it("applies elevated variant", () => {
    const { container } = render(<Card variant="elevated">Content</Card>);
    expect(container.firstChild).toHaveClass("shadow-md");
  });

  it("applies ghost variant", () => {
    const { container } = render(<Card variant="ghost">Content</Card>);
    expect(container.firstChild).toHaveClass("bg-transparent");
  });

  it("applies filled variant", () => {
    const { container } = render(<Card variant="filled">Content</Card>);
    expect(container.firstChild).toHaveClass("bg-[var(--color-fw-surface)]");
  });

  it("applies interactive styles when isInteractive=true", () => {
    const { container } = render(<Card isInteractive>Content</Card>);
    expect(container.firstChild).toHaveClass("cursor-pointer");
  });
});

// ─── Accessibility ────────────────────────────────────────────────────────────

describe("Card – accessibility", () => {
  it("passes axe audit for a static card", async () => {
    const { container } = render(
      <Card>
        <Card.Header>
          <h2>Card title</h2>
        </Card.Header>
        <Card.Body>
          <p>Card description with enough text.</p>
        </Card.Body>
        <Card.Footer>
          <button type="button">Action</button>
        </Card.Footer>
      </Card>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("passes axe audit for an interactive card", async () => {
    const { container } = render(
      <Card isInteractive aria-label="View product details">
        <Card.Body>
          <p>Product description</p>
        </Card.Body>
      </Card>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("passes axe audit for all variants", async () => {
    const { container } = render(
      <div>
        {(["outlined", "elevated", "ghost", "filled"] as const).map((v) => (
          <Card key={v} variant={v}>
            <Card.Body>
              <p>{v} card</p>
            </Card.Body>
          </Card>
        ))}
      </div>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
