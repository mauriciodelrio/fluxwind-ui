import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { Radio } from "./Radio";
import { RadioGroup } from "./RadioGroup";

// ─── Radio ────────────────────────────────────────────────────────────────────

describe("Radio", () => {
  it("renders the label text", () => {
    render(<Radio label="Option A" name="test" value="a" />);
    expect(screen.getByLabelText("Option A")).toBeInTheDocument();
  });

  it("renders hint text when provided", () => {
    render(
      <Radio
        label="Option A"
        name="test"
        value="a"
        hint="Recommended option."
      />,
    );
    expect(screen.getByText("Recommended option.")).toBeInTheDocument();
  });

  it("renders error message when error is set", () => {
    render(
      <Radio
        label="Option A"
        name="test"
        value="a"
        error="Selection required."
      />,
    );
    expect(screen.getByText("Selection required.")).toBeInTheDocument();
  });

  it("does not set aria-invalid on the radio input (unsupported by the radio role)", () => {
    // Error state is communicated via aria-describedby → error message,
    // and visually via destructive colour tokens. aria-invalid is only
    // placed on the wrapping <fieldset> inside RadioGroup.
    render(<Radio label="Option A" name="test" value="a" error="Required." />);
    expect(screen.getByRole("radio", { name: "Option A" })).not.toHaveAttribute(
      "aria-invalid",
    );
  });

  it("links aria-describedby to hint element", () => {
    render(
      <Radio label="Option A" name="test" value="a" hint="Helpful hint." />,
    );
    const input = screen.getByRole("radio", { name: "Option A" });
    const hint = screen.getByText("Helpful hint.");
    expect(input.getAttribute("aria-describedby")).toContain(hint.id);
  });

  it("links aria-describedby to error element", () => {
    render(<Radio label="Option A" name="test" value="a" error="Required." />);
    const input = screen.getByRole("radio", { name: "Option A" });
    const error = screen.getByText("Required.");
    expect(input.getAttribute("aria-describedby")).toContain(error.id);
  });

  it("is disabled when disabled prop is set", () => {
    render(<Radio label="Option A" name="test" value="a" disabled />);
    expect(screen.getByRole("radio", { name: "Option A" })).toBeDisabled();
  });

  it("becomes checked when clicked", async () => {
    const user = userEvent.setup();
    render(<Radio label="Option A" name="test" value="a" />);
    const input = screen.getByRole("radio", { name: "Option A" });
    expect(input).not.toBeChecked();
    await user.click(input);
    expect(input).toBeChecked();
  });

  it("forwards additional html attributes to the input", () => {
    render(
      <Radio label="Option A" name="test" value="a" data-testid="radio-el" />,
    );
    expect(screen.getByTestId("radio-el")).toBeInTheDocument();
  });

  it("applies custom className to the outer wrapper", () => {
    const { container } = render(
      <Radio label="Option A" name="test" value="a" className="custom-class" />,
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("has no WCAG violations — default", async () => {
    const { container } = render(
      <Radio label="Option A" name="test" value="a" />,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("has no WCAG violations — with error", async () => {
    const { container } = render(
      <Radio
        label="Option A"
        name="test"
        value="a"
        error="Selection required."
      />,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});

// ─── RadioGroup ───────────────────────────────────────────────────────────────

describe("RadioGroup", () => {
  it("renders the legend text", () => {
    render(
      <RadioGroup legend="Preferred contact">
        <Radio label="Email" name="contact" value="email" />
        <Radio label="Phone" name="contact" value="phone" />
      </RadioGroup>,
    );
    expect(screen.getByText("Preferred contact")).toBeInTheDocument();
  });

  it("renders all child radios", () => {
    render(
      <RadioGroup legend="Plan">
        <Radio label="Basic" name="plan" value="basic" />
        <Radio label="Pro" name="plan" value="pro" />
        <Radio label="Enterprise" name="plan" value="enterprise" />
      </RadioGroup>,
    );
    expect(screen.getAllByRole("radio")).toHaveLength(3);
  });

  it("renders hint text when provided", () => {
    render(
      <RadioGroup legend="Plan" hint="Choose the plan that fits your needs.">
        <Radio label="Basic" name="plan" value="basic" />
      </RadioGroup>,
    );
    expect(
      screen.getByText("Choose the plan that fits your needs."),
    ).toBeInTheDocument();
  });

  it("renders error message when error is set", () => {
    render(
      <RadioGroup legend="Plan" error="Please select a plan.">
        <Radio label="Basic" name="plan" value="basic" />
      </RadioGroup>,
    );
    expect(screen.getByText("Please select a plan.")).toBeInTheDocument();
  });

  it("sets aria-invalid on fieldset when error is provided", () => {
    const { container } = render(
      <RadioGroup legend="Plan" error="Required.">
        <Radio label="Basic" name="plan" value="basic" />
      </RadioGroup>,
    );
    const fieldset = container.querySelector("fieldset");
    expect(fieldset).toHaveAttribute("aria-invalid", "true");
  });

  it("links fieldset aria-describedby to error element", () => {
    const { container } = render(
      <RadioGroup legend="Plan" error="Required.">
        <Radio label="Basic" name="plan" value="basic" />
      </RadioGroup>,
    );
    const fieldset = container.querySelector("fieldset");
    const error = screen.getByText("Required.");
    expect(fieldset?.getAttribute("aria-describedby")).toContain(error.id);
  });

  it("enforces mutual exclusion — only one radio checked at a time", async () => {
    const user = userEvent.setup();
    render(
      <RadioGroup legend="Plan">
        <Radio label="Basic" name="plan" value="basic" />
        <Radio label="Pro" name="plan" value="pro" />
      </RadioGroup>,
    );
    const basic = screen.getByRole("radio", { name: "Basic" });
    const pro = screen.getByRole("radio", { name: "Pro" });
    await user.click(basic);
    expect(basic).toBeChecked();
    expect(pro).not.toBeChecked();
    await user.click(pro);
    expect(pro).toBeChecked();
    expect(basic).not.toBeChecked();
  });

  it("has no WCAG violations — default group", async () => {
    const { container } = render(
      <RadioGroup legend="Preferred contact">
        <Radio label="Email" name="contact" value="email" />
        <Radio label="Phone" name="contact" value="phone" />
      </RadioGroup>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("has no WCAG violations — with group error", async () => {
    const { container } = render(
      <RadioGroup legend="Plan" error="Please select a plan.">
        <Radio label="Basic" name="plan" value="basic" />
        <Radio label="Pro" name="plan" value="pro" />
      </RadioGroup>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
