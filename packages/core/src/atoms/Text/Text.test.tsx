import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { Text } from "./Text";

describe("Text", () => {
  it("renders children text", () => {
    render(<Text>Hello world</Text>);
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  it("renders as <p> by default", () => {
    const { container } = render(<Text>Paragraph</Text>);
    expect(container.querySelector("p")).toBeInTheDocument();
  });

  it("renders as the element specified by the as prop", () => {
    const { container } = render(<Text as="h2">Heading</Text>);
    expect(container.querySelector("h2")).toBeInTheDocument();
  });

  it("renders as span", () => {
    const { container } = render(<Text as="span">Inline</Text>);
    expect(container.querySelector("span")).toBeInTheDocument();
  });

  it("applies the code variant class", () => {
    const { container } = render(<Text variant="code">const x = 1;</Text>);
    expect(container.firstChild).toHaveClass("font-mono");
  });

  it("applies weight semibold", () => {
    const { container } = render(<Text weight="semibold">Bold text</Text>);
    expect(container.firstChild).toHaveClass("font-semibold");
  });

  it("applies truncate class when truncate is true", () => {
    const { container } = render(<Text truncate>Long text</Text>);
    expect(container.firstChild).toHaveClass("truncate");
  });

  it("applies text-center when align is center", () => {
    const { container } = render(<Text align="center">Centered</Text>);
    expect(container.firstChild).toHaveClass("text-center");
  });

  it("applies custom className", () => {
    const { container } = render(<Text className="custom">Text</Text>);
    expect(container.firstChild).toHaveClass("custom");
  });

  it("has no WCAG violations", async () => {
    const { container } = render(<Text>Accessible text</Text>);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
