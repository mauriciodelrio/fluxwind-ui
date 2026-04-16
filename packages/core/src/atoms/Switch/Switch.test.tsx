import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { Switch } from "./Switch";

describe("Switch", () => {
  it("renders the label text", () => {
    render(<Switch label="Dark mode" />);
    expect(
      screen.getByRole("switch", { name: "Dark mode" }),
    ).toBeInTheDocument();
  });

  it("renders hint text when provided", () => {
    render(<Switch label="Notifications" hint="Push notifications only." />);
    expect(screen.getByText("Push notifications only.")).toBeInTheDocument();
  });

  it("renders error message when error is set", () => {
    render(<Switch label="Terms" error="You must agree to continue." />);
    expect(screen.getByText("You must agree to continue.")).toBeInTheDocument();
  });

  it("sets aria-invalid when error is provided", () => {
    render(<Switch label="Terms" error="Required." />);
    expect(screen.getByRole("switch", { name: "Terms" })).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("does not set aria-invalid when no error", () => {
    render(<Switch label="Dark mode" />);
    expect(
      screen.getByRole("switch", { name: "Dark mode" }),
    ).not.toHaveAttribute("aria-invalid");
  });

  it("links aria-describedby to hint element", () => {
    render(<Switch label="Notifications" hint="Push only." />);
    const input = screen.getByRole("switch", { name: "Notifications" });
    const hint = screen.getByText("Push only.");
    expect(input.getAttribute("aria-describedby")).toContain(hint.id);
  });

  it("links aria-describedby to error element", () => {
    render(<Switch label="Terms" error="Required." />);
    const input = screen.getByRole("switch", { name: "Terms" });
    const error = screen.getByText("Required.");
    expect(input.getAttribute("aria-describedby")).toContain(error.id);
  });

  it("is disabled when disabled prop is set", () => {
    render(<Switch label="Dark mode" disabled />);
    expect(screen.getByRole("switch", { name: "Dark mode" })).toBeDisabled();
  });

  it("toggles state when clicked", async () => {
    const user = userEvent.setup();
    render(<Switch label="Dark mode" />);
    const input = screen.getByRole("switch", { name: "Dark mode" });
    expect(input).not.toBeChecked();
    await user.click(input);
    expect(input).toBeChecked();
  });

  it("applies custom className to the outer wrapper", () => {
    const { container } = render(
      <Switch label="Dark mode" className="custom-class" />,
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("forwards additional html attributes to the input", () => {
    render(<Switch label="Dark mode" data-testid="sw-el" />);
    expect(screen.getByTestId("sw-el")).toBeInTheDocument();
  });

  it("has no WCAG violations — default", async () => {
    const { container } = render(<Switch label="Dark mode" />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("has no WCAG violations — with error", async () => {
    const { container } = render(
      <Switch label="Terms" error="You must agree to continue." />,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
