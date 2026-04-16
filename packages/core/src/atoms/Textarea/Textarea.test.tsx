import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { Textarea } from "./Textarea";

describe("Textarea", () => {
  it("renders label and textarea", () => {
    render(<Textarea label="Message" />);
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
  });

  it("associates label with textarea via htmlFor", () => {
    render(<Textarea label="Bio" id="bio-field" />);
    const textarea = screen.getByLabelText("Bio");
    expect(textarea).toHaveAttribute("id", "bio-field");
  });

  it("renders hint text when provided", () => {
    render(<Textarea label="Message" hint="Max 500 characters." />);
    expect(screen.getByText("Max 500 characters.")).toBeInTheDocument();
  });

  it("renders error message when error is set", () => {
    render(<Textarea label="Message" error="This field is required." />);
    expect(screen.getByText("This field is required.")).toBeInTheDocument();
  });

  it("sets aria-invalid when error is provided", () => {
    render(<Textarea label="Message" error="Required." />);
    expect(screen.getByLabelText("Message")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("does not set aria-invalid when no error", () => {
    render(<Textarea label="Message" />);
    expect(screen.getByLabelText("Message")).not.toHaveAttribute(
      "aria-invalid",
    );
  });

  it("sets aria-describedby to hint id when hint is present", () => {
    render(<Textarea label="Message" hint="Some hint." />);
    const textarea = screen.getByLabelText("Message");
    const hint = screen.getByText("Some hint.");
    expect(textarea.getAttribute("aria-describedby")).toContain(hint.id);
  });

  it("sets aria-describedby to error id when error is present", () => {
    render(<Textarea label="Message" error="Required." />);
    const textarea = screen.getByLabelText("Message");
    const error = screen.getByText("Required.");
    expect(textarea.getAttribute("aria-describedby")).toContain(error.id);
  });

  it("is disabled when disabled prop is set", () => {
    render(<Textarea label="Message" disabled />);
    expect(screen.getByLabelText("Message")).toBeDisabled();
  });

  it("accepts user input", async () => {
    const user = userEvent.setup();
    render(<Textarea label="Message" />);
    const textarea = screen.getByLabelText("Message");
    await user.type(textarea, "Hello world");
    expect(textarea).toHaveValue("Hello world");
  });

  it("renders character counter when maxLength and value are provided", () => {
    render(
      <Textarea
        label="Bio"
        maxLength={200}
        value="Hello"
        onChange={() => {}}
      />,
    );
    expect(screen.getByText("5/200")).toBeInTheDocument();
  });

  it("does not render counter when maxLength is absent", () => {
    render(<Textarea label="Bio" value="Hello" onChange={() => {}} />);
    expect(screen.queryByText(/\/\d+/)).not.toBeInTheDocument();
  });

  it("counter is announced via aria-live", () => {
    render(
      <Textarea label="Bio" maxLength={100} value="Hi" onChange={() => {}} />,
    );
    expect(screen.getByText("2/100")).toHaveAttribute("aria-live", "polite");
  });

  it("applies custom className", () => {
    render(<Textarea label="Message" className="custom-class" />);
    expect(screen.getByLabelText("Message")).toHaveClass("custom-class");
  });

  it("forwards additional html attributes", () => {
    render(<Textarea label="Message" data-testid="ta-el" />);
    expect(screen.getByTestId("ta-el")).toBeInTheDocument();
  });

  it("has no WCAG violations — default", async () => {
    const { container } = render(
      <Textarea label="Message" placeholder="Type here…" />,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("has no WCAG violations — with error", async () => {
    const { container } = render(
      <Textarea label="Message" error="This field is required." />,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
