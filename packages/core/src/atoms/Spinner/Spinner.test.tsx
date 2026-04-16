import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { Spinner } from "./Spinner";

describe("Spinner", () => {
  it('renders with default label "Loading"', () => {
    render(<Spinner />);
    expect(screen.getByRole("status", { name: "Loading" })).toBeInTheDocument();
  });

  it("renders with custom label", () => {
    render(<Spinner label="Saving changes" />);
    expect(
      screen.getByRole("status", { name: "Saving changes" }),
    ).toBeInTheDocument();
  });

  it("inner spin element is aria-hidden", () => {
    const { container } = render(<Spinner />);
    const inner = container.querySelector('[aria-hidden="true"]');
    expect(inner).toBeInTheDocument();
  });

  it("applies custom className to wrapper", () => {
    const { container } = render(<Spinner className="my-class" />);
    expect(container.firstChild).toHaveClass("my-class");
  });

  it("forwards additional html attributes", () => {
    render(<Spinner data-testid="spinner-el" />);
    expect(screen.getByTestId("spinner-el")).toBeInTheDocument();
  });

  it("has no WCAG violations", async () => {
    const { container } = render(<Spinner />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
