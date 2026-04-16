import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { Input } from "./Input";

describe("Input", () => {
  it("renders label and input", () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("associates label with input via htmlFor", () => {
    render(<Input label="Username" id="user-input" />);
    const input = screen.getByLabelText("Username");
    expect(input).toHaveAttribute("id", "user-input");
  });

  it("renders hint text when provided", () => {
    render(<Input label="Name" hint="At least 2 characters." />);
    expect(screen.getByText("At least 2 characters.")).toBeInTheDocument();
  });

  it("renders error message when error is set", () => {
    render(<Input label="Email" error="Invalid email." />);
    expect(screen.getByText("Invalid email.")).toBeInTheDocument();
  });

  it("sets aria-invalid when error is provided", () => {
    render(<Input label="Email" error="Required." />);
    expect(screen.getByLabelText("Email")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("does not set aria-invalid when no error", () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText("Email")).not.toHaveAttribute("aria-invalid");
  });

  it("sets aria-describedby to hint id when hint is present", () => {
    render(<Input label="Name" hint="Some hint" />);
    const input = screen.getByLabelText("Name");
    const describedBy = input.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();
  });

  it("sets aria-describedby to error id when error is present", () => {
    render(<Input label="Name" error="Some error" />);
    const input = screen.getByLabelText("Name");
    const errorEl = screen.getByText("Some error");
    expect(input.getAttribute("aria-describedby")).toContain(errorEl.id);
  });

  it("shows both hint and error when both are provided", () => {
    render(<Input label="Field" hint="A hint" error="An error" />);
    expect(screen.getByText("An error")).toBeInTheDocument();
    expect(screen.getByText("A hint")).toBeInTheDocument();
  });

  it("is disabled when disabled prop is set", () => {
    render(<Input label="Field" disabled />);
    expect(screen.getByLabelText("Field")).toBeDisabled();
  });

  it("accepts user input", async () => {
    const user = userEvent.setup();
    render(<Input label="Search" />);
    const input = screen.getByLabelText("Search");
    await user.type(input, "hello");
    expect(input).toHaveValue("hello");
  });

  it("renders iconLeft when provided", () => {
    render(<Input label="Search" iconLeft={<svg data-testid="icon-left" />} />);
    expect(screen.getByTestId("icon-left")).toBeInTheDocument();
  });

  it("renders iconRight when provided", () => {
    render(
      <Input label="Search" iconRight={<svg data-testid="icon-right" />} />,
    );
    expect(screen.getByTestId("icon-right")).toBeInTheDocument();
  });

  it("has no WCAG violations — default", async () => {
    const { container } = render(
      <Input label="Email" placeholder="you@example.com" />,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("has no WCAG violations — with error", async () => {
    const { container } = render(
      <Input label="Email" error="Invalid email address." />,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("has no WCAG violations — disabled", async () => {
    const { container } = render(<Input label="Email" disabled />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
