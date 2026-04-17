import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { Logo } from "./Logo";

describe("Logo", () => {
  it("renders an SVG element", () => {
    const { container } = render(<Logo />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("is decorative (aria-hidden) by default", () => {
    const { container } = render(<Logo />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).not.toHaveAttribute("aria-label");
  });

  it("gets role=img and aria-label when label is provided", () => {
    const { container } = render(<Logo label="FluxWind logo" />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("role", "img");
    expect(svg).toHaveAttribute("aria-label", "FluxWind logo");
  });

  it("renders a <title> element when label is provided", () => {
    const { container } = render(<Logo label="FluxWind logo" />);
    expect(container.querySelector("title")).toHaveTextContent("FluxWind logo");
  });

  it("applies a custom className", () => {
    const { container } = render(<Logo className="custom-class" />);
    expect(container.querySelector("svg")).toHaveClass("custom-class");
  });

  it("has no WCAG violations when decorative", async () => {
    const { container } = render(<Logo />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("has no WCAG violations when labelled", async () => {
    const { container } = render(<Logo label="FluxWind logo" />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("is accessible by role when labelled", () => {
    render(<Logo label="FluxWind logo" />);
    expect(
      screen.getByRole("img", { name: "FluxWind logo" }),
    ).toBeInTheDocument();
  });
});
