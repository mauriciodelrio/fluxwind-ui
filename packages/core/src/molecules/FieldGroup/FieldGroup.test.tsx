import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { FieldGroup } from "./FieldGroup";

// ─── Render básico ────────────────────────────────────────────────────────────

describe("FieldGroup", () => {
  it("renders a <fieldset> element", () => {
    const { container } = render(
      <FieldGroup legend="Preferences">
        <input type="checkbox" />
      </FieldGroup>,
    );
    expect(container.querySelector("fieldset")).toBeInTheDocument();
  });

  it("renders legend text", () => {
    render(<FieldGroup legend="Notification options" />);
    expect(screen.getByText("Notification options")).toBeInTheDocument();
  });

  it("renders hint text when provided", () => {
    render(
      <FieldGroup legend="Preferences" hint="Select at least one option." />,
    );
    expect(screen.getByText("Select at least one option.")).toBeInTheDocument();
  });

  it("renders error message when error is set", () => {
    render(
      <FieldGroup legend="Preferences" error="Please select an option." />,
    );
    expect(screen.getByText("Please select an option.")).toBeInTheDocument();
  });

  // ─── aria-describedby ───────────────────────────────────────────────────────

  it("links aria-describedby to hint element", () => {
    const { container } = render(
      <FieldGroup legend="Preferences" hint="Pick one." />,
    );
    const fieldset = container.querySelector("fieldset")!;
    const hint = screen.getByText("Pick one.");
    expect(fieldset.getAttribute("aria-describedby")).toContain(hint.id);
  });

  it("links aria-describedby to error element", () => {
    const { container } = render(
      <FieldGroup legend="Preferences" error="Required." />,
    );
    const fieldset = container.querySelector("fieldset")!;
    const error = screen.getByText("Required.");
    expect(fieldset.getAttribute("aria-describedby")).toContain(error.id);
  });

  it("includes both hint and error ids in aria-describedby when both provided", () => {
    const { container } = render(
      <FieldGroup legend="Preferences" hint="Pick one." error="Required." />,
    );
    const fieldset = container.querySelector("fieldset")!;
    const describedBy = fieldset.getAttribute("aria-describedby") ?? "";
    const hint = screen.getByText("Pick one.");
    const error = screen.getByText("Required.");
    expect(describedBy).toContain(hint.id);
    expect(describedBy).toContain(error.id);
  });

  // ─── aria-invalid ───────────────────────────────────────────────────────────

  it("sets aria-invalid when error is provided", () => {
    const { container } = render(
      <FieldGroup legend="Preferences" error="Required." />,
    );
    expect(container.querySelector("fieldset")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("does not set aria-invalid when no error", () => {
    const { container } = render(<FieldGroup legend="Preferences" />);
    expect(container.querySelector("fieldset")).not.toHaveAttribute(
      "aria-invalid",
    );
  });

  // ─── required ───────────────────────────────────────────────────────────────

  it("does not set aria-required on fieldset (not valid on group role)", () => {
    const { container } = render(<FieldGroup legend="Preferences" required />);
    expect(container.querySelector("fieldset")).not.toHaveAttribute(
      "aria-required",
    );
  });

  it("renders * indicator when required", () => {
    render(<FieldGroup legend="Preferences" required />);
    // The aria-hidden span with * should be present
    expect(document.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });

  // ─── disabled ───────────────────────────────────────────────────────────────

  it("sets disabled attribute on fieldset when disabled prop is true", () => {
    const { container } = render(
      <FieldGroup legend="Preferences" disabled>
        <input type="checkbox" />
      </FieldGroup>,
    );
    expect(container.querySelector("fieldset")).toBeDisabled();
  });

  it("does not set disabled when disabled is false", () => {
    const { container } = render(<FieldGroup legend="Preferences" />);
    expect(container.querySelector("fieldset")).not.toBeDisabled();
  });

  // ─── children ───────────────────────────────────────────────────────────────

  it("renders children inside the group", () => {
    render(
      <FieldGroup legend="Options">
        <label>
          <input type="checkbox" /> Email
        </label>
        <label>
          <input type="checkbox" /> SMS
        </label>
      </FieldGroup>,
    );
    expect(screen.getAllByRole("checkbox")).toHaveLength(2);
  });

  // ─── Axe a11y ────────────────────────────────────────────────────────────────

  it("passes axe with no error (default)", async () => {
    const { container } = render(
      <FieldGroup legend="Notification preferences" hint="Choose at least one.">
        <label>
          <input type="checkbox" /> Email
        </label>
      </FieldGroup>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("passes axe with error state", async () => {
    const { container } = render(
      <FieldGroup
        legend="Notification preferences"
        error="Please select an option."
      >
        <label>
          <input type="checkbox" /> Email
        </label>
      </FieldGroup>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
