import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { FormField, useFormField } from "./FormField";

// ─── Helper: custom control that consumes context via useFormField() ──────────

function HookConsumer() {
  const { id, describedBy, hasError, disabled, required } = useFormField();
  return (
    <input
      id={id}
      data-testid="hook-input"
      aria-describedby={describedBy}
      aria-invalid={hasError || undefined}
      aria-required={required || undefined}
      disabled={disabled}
      readOnly
    />
  );
}

// ─── Structure ────────────────────────────────────────────────────────────────

describe("FormField – structure", () => {
  it("renders the label text", () => {
    render(
      <FormField label="Email address">
        <input />
      </FormField>,
    );
    expect(screen.getByText("Email address")).toBeInTheDocument();
  });

  it("renders a <label> element", () => {
    render(
      <FormField label="Name">
        <input />
      </FormField>,
    );
    expect(screen.getByText("Name").tagName).toBe("LABEL");
  });

  it("renders children", () => {
    render(
      <FormField label="Name">
        <input data-testid="ctrl" />
      </FormField>,
    );
    expect(screen.getByTestId("ctrl")).toBeInTheDocument();
  });

  it("renders hint when provided", () => {
    render(
      <FormField label="Name" hint="At least 2 characters">
        <input />
      </FormField>,
    );
    expect(screen.getByText("At least 2 characters")).toBeInTheDocument();
  });

  it("renders error when provided", () => {
    render(
      <FormField label="Name" error="This field is required">
        <input />
      </FormField>,
    );
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("renders hint AND error simultaneously", () => {
    render(
      <FormField label="Name" hint="Helper text" error="Validation failed">
        <input />
      </FormField>,
    );
    expect(screen.getByText("Helper text")).toBeInTheDocument();
    expect(screen.getByText("Validation failed")).toBeInTheDocument();
  });

  it("renders required indicator when required=true", () => {
    render(
      <FormField label="Email" required>
        <input />
      </FormField>,
    );
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("does not render required indicator by default", () => {
    render(
      <FormField label="Email">
        <input />
      </FormField>,
    );
    expect(screen.queryByText("*")).not.toBeInTheDocument();
  });

  it("required indicator is aria-hidden", () => {
    render(
      <FormField label="Email" required>
        <input />
      </FormField>,
    );
    const indicator = screen.getByText("*");
    expect(indicator).toHaveAttribute("aria-hidden", "true");
  });

  it("error element has role='alert'", () => {
    render(
      <FormField label="Name" error="Something went wrong">
        <input />
      </FormField>,
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Something went wrong");
  });

  it("has displayName 'FormField'", () => {
    expect(FormField.displayName).toBe("FormField");
  });
});

// ─── ARIA linkage ─────────────────────────────────────────────────────────────

describe("FormField – ARIA linkage", () => {
  it("label for attribute matches child id (explicit id)", () => {
    render(
      <FormField label="Full name" id="name-field">
        <input data-testid="ctrl" />
      </FormField>,
    );
    const label = screen.getByText("Full name").closest("label");
    expect(label).toHaveAttribute("for", "name-field");
    expect(screen.getByTestId("ctrl")).toHaveAttribute("id", "name-field");
  });

  it("label for attribute matches auto-generated child id", () => {
    render(
      <FormField label="Full name">
        <input data-testid="ctrl" />
      </FormField>,
    );
    const label = screen.getByText("Full name").closest("label");
    const input = screen.getByTestId("ctrl");
    const forAttr = label?.getAttribute("for");
    expect(forAttr).toBeTruthy();
    expect(input).toHaveAttribute("id", forAttr);
  });

  it("child has aria-describedby pointing to the hint element id", () => {
    render(
      <FormField label="Name" hint="Some hint">
        <input data-testid="ctrl" />
      </FormField>,
    );
    const input = screen.getByTestId("ctrl");
    const hintEl = screen.getByText("Some hint");
    const describedBy = input.getAttribute("aria-describedby") ?? "";
    expect(describedBy).toContain(hintEl.id);
  });

  it("child has aria-describedby pointing to the error element id", () => {
    render(
      <FormField label="Name" error="Some error">
        <input data-testid="ctrl" />
      </FormField>,
    );
    const input = screen.getByTestId("ctrl");
    const errorEl = screen.getByRole("alert");
    const describedBy = input.getAttribute("aria-describedby") ?? "";
    expect(describedBy).toContain(errorEl.id);
  });

  it("aria-describedby includes both hint and error ids when both present", () => {
    render(
      <FormField label="Name" hint="Hint text" error="Error text">
        <input data-testid="ctrl" />
      </FormField>,
    );
    const input = screen.getByTestId("ctrl");
    const hintEl = screen.getByText("Hint text");
    const errorEl = screen.getByRole("alert");
    const describedBy = input.getAttribute("aria-describedby") ?? "";
    expect(describedBy).toContain(hintEl.id);
    expect(describedBy).toContain(errorEl.id);
  });

  it("child has no aria-describedby when neither hint nor error provided", () => {
    render(
      <FormField label="Name">
        <input data-testid="ctrl" />
      </FormField>,
    );
    expect(screen.getByTestId("ctrl")).not.toHaveAttribute("aria-describedby");
  });

  it("child has aria-invalid=true when error is present", () => {
    render(
      <FormField label="Name" error="Required">
        <input data-testid="ctrl" />
      </FormField>,
    );
    expect(screen.getByTestId("ctrl")).toHaveAttribute("aria-invalid", "true");
  });

  it("child does not have aria-invalid when no error", () => {
    render(
      <FormField label="Name">
        <input data-testid="ctrl" />
      </FormField>,
    );
    expect(screen.getByTestId("ctrl")).not.toHaveAttribute("aria-invalid");
  });

  it("child has aria-required=true when required=true", () => {
    render(
      <FormField label="Name" required>
        <input data-testid="ctrl" />
      </FormField>,
    );
    expect(screen.getByTestId("ctrl")).toHaveAttribute("aria-required", "true");
  });

  it("child does not have aria-required when required=false (default)", () => {
    render(
      <FormField label="Name">
        <input data-testid="ctrl" />
      </FormField>,
    );
    expect(screen.getByTestId("ctrl")).not.toHaveAttribute("aria-required");
  });

  it("child is disabled when FormField disabled=true", () => {
    render(
      <FormField label="Name" disabled>
        <input data-testid="ctrl" />
      </FormField>,
    );
    expect(screen.getByTestId("ctrl")).toBeDisabled();
  });

  it("child is not disabled by default", () => {
    render(
      <FormField label="Name">
        <input data-testid="ctrl" />
      </FormField>,
    );
    expect(screen.getByTestId("ctrl")).not.toBeDisabled();
  });
});

// ─── useFormField hook ────────────────────────────────────────────────────────

describe("FormField – useFormField", () => {
  it("throws when used outside a FormField", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(vi.fn());
    expect(() => render(<HookConsumer />)).toThrow(
      "useFormField must be called inside a <FormField>",
    );
    spy.mockRestore();
  });

  it("provides the correct id to the context consumer", () => {
    render(
      <FormField label="Email" id="hook-test">
        <HookConsumer />
      </FormField>,
    );
    expect(screen.getByTestId("hook-input")).toHaveAttribute("id", "hook-test");
  });

  it("hasError=true when error is present", () => {
    render(
      <FormField label="Name" error="Required" id="x">
        <HookConsumer />
      </FormField>,
    );
    expect(screen.getByTestId("hook-input")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("hasError=false when no error", () => {
    render(
      <FormField label="Name" id="x">
        <HookConsumer />
      </FormField>,
    );
    expect(screen.getByTestId("hook-input")).not.toHaveAttribute(
      "aria-invalid",
    );
  });

  it("disabled=true propagated via context", () => {
    render(
      <FormField label="Name" disabled id="x">
        <HookConsumer />
      </FormField>,
    );
    expect(screen.getByTestId("hook-input")).toBeDisabled();
  });

  it("required=true propagated via context", () => {
    render(
      <FormField label="Name" required id="x">
        <HookConsumer />
      </FormField>,
    );
    expect(screen.getByTestId("hook-input")).toHaveAttribute(
      "aria-required",
      "true",
    );
  });

  it("aria-describedby includes hint id via context consumer", () => {
    render(
      <FormField label="Name" hint="Helpful hint" id="ctx-test">
        <HookConsumer />
      </FormField>,
    );
    const input = screen.getByTestId("hook-input");
    const hintEl = screen.getByText("Helpful hint");
    const describedBy = input.getAttribute("aria-describedby") ?? "";
    expect(describedBy).toContain(hintEl.id);
  });
});

// ─── Accessibility ────────────────────────────────────────────────────────────

describe("FormField – a11y", () => {
  it("passes axe in default state", async () => {
    const { container } = render(
      <FormField label="Full name">
        <input type="text" />
      </FormField>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("passes axe with hint and error", async () => {
    const { container } = render(
      <FormField
        label="Email address"
        hint="Work email preferred"
        error="Invalid email"
      >
        <input type="email" />
      </FormField>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("passes axe when required", async () => {
    const { container } = render(
      <FormField label="Email address" required>
        <input type="email" />
      </FormField>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("passes axe when disabled", async () => {
    const { container } = render(
      <FormField label="Email address" disabled>
        <input type="email" />
      </FormField>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("passes axe with a textarea child", async () => {
    const { container } = render(
      <FormField label="Description" hint="Max 200 characters">
        <textarea rows={3} />
      </FormField>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("passes axe with a select child", async () => {
    const { container } = render(
      <FormField label="Country">
        <select>
          <option value="">Choose…</option>
          <option value="cl">Chile</option>
        </select>
      </FormField>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("passes axe with useFormField hook consumer", async () => {
    const { container } = render(
      <FormField label="Custom field" hint="Using hook" error="Hook error">
        <HookConsumer />
      </FormField>,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
