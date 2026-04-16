import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("renders the label text", () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByLabelText("Accept terms")).toBeInTheDocument();
  });

  it("renders hint text when provided", () => {
    render(<Checkbox label="Subscribe" hint="You can unsubscribe anytime." />);
    expect(
      screen.getByText("You can unsubscribe anytime."),
    ).toBeInTheDocument();
  });

  it("renders error message when error is set", () => {
    render(<Checkbox label="Accept" error="You must accept the terms." />);
    expect(screen.getByText("You must accept the terms.")).toBeInTheDocument();
  });

  it("sets aria-invalid when error is provided", () => {
    render(<Checkbox label="Accept" error="Required." />);
    expect(screen.getByRole("checkbox", { name: "Accept" })).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("does not set aria-invalid when no error", () => {
    render(<Checkbox label="Accept" />);
    expect(
      screen.getByRole("checkbox", { name: "Accept" }),
    ).not.toHaveAttribute("aria-invalid");
  });

  it("links aria-describedby to hint element", () => {
    render(<Checkbox label="Subscribe" hint="Optional." />);
    const input = screen.getByRole("checkbox", { name: "Subscribe" });
    const hint = screen.getByText("Optional.");
    expect(input.getAttribute("aria-describedby")).toContain(hint.id);
  });

  it("links aria-describedby to error element", () => {
    render(<Checkbox label="Accept" error="Required." />);
    const input = screen.getByRole("checkbox", { name: "Accept" });
    const error = screen.getByText("Required.");
    expect(input.getAttribute("aria-describedby")).toContain(error.id);
  });

  it("is disabled when disabled prop is set", () => {
    render(<Checkbox label="Accept" disabled />);
    expect(screen.getByRole("checkbox", { name: "Accept" })).toBeDisabled();
  });

  it("toggles state when clicked", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Accept" />);
    const input = screen.getByRole("checkbox", { name: "Accept" });
    expect(input).not.toBeChecked();
    await user.click(input);
    expect(input).toBeChecked();
  });

  it("sets the indeterminate DOM property when indeterminate prop is true", () => {
    render(<Checkbox label="Select all" indeterminate />);
    const input = screen.getByRole("checkbox", { name: "Select all" });
    expect((input as HTMLInputElement).indeterminate).toBe(true);
  });

  it("applies custom className to the outer wrapper", () => {
    const { container } = render(
      <Checkbox label="Accept" className="custom-class" />,
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("forwards additional html attributes to the input", () => {
    render(<Checkbox label="Accept" data-testid="cb-el" />);
    expect(screen.getByTestId("cb-el")).toBeInTheDocument();
  });

  it("has no WCAG violations — default", async () => {
    const { container } = render(<Checkbox label="Accept terms" />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("has no WCAG violations — with error", async () => {
    const { container } = render(
      <Checkbox label="Accept terms" error="You must accept the terms." />,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
