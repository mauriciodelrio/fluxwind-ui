import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { Select, type SelectItem } from "./Select";

const FLAT_OPTIONS: SelectItem[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
];

const GROUPED_OPTIONS: SelectItem[] = [
  {
    group: "Frontend",
    options: [
      { value: "react", label: "React" },
      { value: "vue", label: "Vue" },
    ],
  },
  {
    group: "Backend",
    options: [
      { value: "node", label: "Node.js" },
      { value: "django", label: "Django" },
    ],
  },
];

describe("Select", () => {
  it("renders a labelled select element", () => {
    render(<Select label="Framework" options={FLAT_OPTIONS} />);
    expect(screen.getByLabelText("Framework")).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: "Framework" }),
    ).toBeInTheDocument();
  });

  it("associates label with select via htmlFor", () => {
    render(<Select label="Framework" options={FLAT_OPTIONS} id="fw-select" />);
    expect(screen.getByLabelText("Framework")).toHaveAttribute(
      "id",
      "fw-select",
    );
  });

  it("renders all flat options", () => {
    render(<Select label="Framework" options={FLAT_OPTIONS} />);
    expect(screen.getByRole("option", { name: "React" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Vue" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Svelte" })).toBeInTheDocument();
  });

  it("renders grouped options with optgroup labels", () => {
    render(<Select label="Tech" options={GROUPED_OPTIONS} />);
    expect(screen.getByRole("option", { name: "React" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Node.js" })).toBeInTheDocument();
  });

  it("renders placeholder as the first hidden option", () => {
    const { container } = render(
      <Select
        label="Framework"
        options={FLAT_OPTIONS}
        placeholder="Choose a framework…"
      />,
    );
    // The placeholder uses `disabled hidden` — hidden removes it from the a11y tree,
    // so we query the DOM directly rather than via role.
    const placeholder = container.querySelector('option[value=""]');
    expect(placeholder).toBeInTheDocument();
    expect(placeholder).toHaveAttribute("value", "");
    expect(placeholder).toHaveAttribute("disabled");
    expect(placeholder).toHaveTextContent("Choose a framework…");
  });

  it("renders hint text when provided", () => {
    render(
      <Select
        label="Framework"
        options={FLAT_OPTIONS}
        hint="Select the framework you use most."
      />,
    );
    expect(
      screen.getByText("Select the framework you use most."),
    ).toBeInTheDocument();
  });

  it("renders error message when error is set", () => {
    render(
      <Select
        label="Framework"
        options={FLAT_OPTIONS}
        error="Please select an option."
      />,
    );
    expect(screen.getByText("Please select an option.")).toBeInTheDocument();
  });

  it("sets aria-invalid when error is provided", () => {
    render(
      <Select label="Framework" options={FLAT_OPTIONS} error="Required." />,
    );
    expect(screen.getByRole("combobox", { name: "Framework" })).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("does not set aria-invalid when no error", () => {
    render(<Select label="Framework" options={FLAT_OPTIONS} />);
    expect(
      screen.getByRole("combobox", { name: "Framework" }),
    ).not.toHaveAttribute("aria-invalid");
  });

  it("links aria-describedby to hint element", () => {
    render(
      <Select label="Framework" options={FLAT_OPTIONS} hint="Pick one." />,
    );
    const select = screen.getByRole("combobox", { name: "Framework" });
    const hint = screen.getByText("Pick one.");
    expect(select.getAttribute("aria-describedby")).toContain(hint.id);
  });

  it("links aria-describedby to error element", () => {
    render(
      <Select label="Framework" options={FLAT_OPTIONS} error="Required." />,
    );
    const select = screen.getByRole("combobox", { name: "Framework" });
    const error = screen.getByText("Required.");
    expect(select.getAttribute("aria-describedby")).toContain(error.id);
  });

  it("is disabled when disabled prop is set", () => {
    render(<Select label="Framework" options={FLAT_OPTIONS} disabled />);
    expect(screen.getByRole("combobox", { name: "Framework" })).toBeDisabled();
  });

  it("changes selected value on user interaction", async () => {
    const user = userEvent.setup();
    render(<Select label="Framework" options={FLAT_OPTIONS} />);
    const select = screen.getByRole("combobox", { name: "Framework" });
    await user.selectOptions(select, "vue");
    expect(select).toHaveValue("vue");
  });

  it("renders the trailing chevron icon", () => {
    const { container } = render(
      <Select label="Framework" options={FLAT_OPTIONS} />,
    );
    const chevron = container.querySelector('span[aria-hidden="true"] svg');
    expect(chevron).toBeInTheDocument();
  });

  it("applies custom className to the select element", () => {
    render(
      <Select
        label="Framework"
        options={FLAT_OPTIONS}
        className="custom-class"
      />,
    );
    expect(screen.getByRole("combobox", { name: "Framework" })).toHaveClass(
      "custom-class",
    );
  });

  it("forwards additional html attributes to the select", () => {
    render(
      <Select label="Framework" options={FLAT_OPTIONS} data-testid="sel-el" />,
    );
    expect(screen.getByTestId("sel-el")).toBeInTheDocument();
  });

  it("has no WCAG violations — default", async () => {
    const { container } = render(
      <Select label="Framework" options={FLAT_OPTIONS} placeholder="Choose…" />,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("has no WCAG violations — with error", async () => {
    const { container } = render(
      <Select
        label="Framework"
        options={FLAT_OPTIONS}
        error="Please select an option."
      />,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
