import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { FieldGroup } from "./FieldGroup";

// ─── Shared checkbox style (mimics DS Checkbox atom without built-in label) ────

const checkboxRowCls =
  "flex items-center gap-2 text-sm text-[var(--color-fw-foreground)]";

function DemoCheckbox({ label, id }: { label: string; id: string }) {
  return (
    <label htmlFor={id} className={checkboxRowCls}>
      <input
        id={id}
        type="checkbox"
        className="h-4 w-4 rounded border border-[var(--color-fw-border)] accent-[var(--color-fw-primary)]"
      />
      {label}
    </label>
  );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof FieldGroup> = {
  title: "Molecules/FieldGroup",
  component: FieldGroup,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "FieldGroup wraps any set of related form controls in a semantic `<fieldset>` + `<legend>`, " +
          "fulfilling **WCAG 1.3.1 (Info and Relationships, Level A)**.\n\n" +
          "## Design decisions\n\n" +
          "| Decision | Rationale |\n" +
          "|---|---|\n" +
          "| Native `<fieldset disabled>` | Browser natively disables all form controls inside — no JS simulation |\n" +
          "| `aria-describedby` on fieldset | Links both hint and error to the group programmatically |\n" +
          "| `aria-invalid` on fieldset | Communicates group-level validation state to assistive technology |\n" +
          "| `*` in legend | Communicates visually that the group is required — `aria-required` is not valid on the `group` role |\n\n" +
          "## When to use\n\n" +
          "Use `FieldGroup` when grouping **multiple related controls** (Checkboxes, Switches, Radios) " +
          "where a shared group label is required for accessibility.\n\n" +
          "For a single control with a label, use `FormField` instead.",
      },
    },
  },
  argTypes: {
    legend: {
      description: "**Required.** Visible group legend text.",
      control: "text",
    },
    hint: {
      description: "Helper text shown below the legend.",
      control: "text",
    },
    error: {
      description:
        'Validation error message. Renders a `role="alert"` paragraph.',
      control: "text",
    },
    required: {
      description:
        "Shows `*` indicator next to the legend. Individual controls inside should set their own `required` attribute.",
      control: "boolean",
    },
    disabled: {
      description: "Disables all controls inside the fieldset natively.",
      control: "boolean",
    },
    direction: {
      description: "Layout direction of the children container.",
      control: "radio",
      options: ["vertical", "horizontal"],
    },
    size: {
      description: "Text size for legend, hint, and error.",
      control: "radio",
      options: ["sm", "md", "lg"],
    },
  },
  args: {
    legend: "Notification preferences",
    children: (
      <>
        <DemoCheckbox id="cb-email" label="Email" />
        <DemoCheckbox id="cb-sms" label="SMS" />
        <DemoCheckbox id="cb-push" label="Push notifications" />
      </>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof FieldGroup>;

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Default: Story = {};

export const WithHint: Story = {
  args: {
    hint: "You can change these preferences at any time.",
  },
};

export const WithError: Story = {
  args: {
    error: "Please select at least one notification method.",
  },
};

export const HintAndError: Story = {
  name: "Hint + Error (both visible)",
  args: {
    hint: "You can change these preferences at any time.",
    error: "Please select at least one notification method.",
  },
};

export const Required: Story = {
  args: {
    legend: "Contact method",
    required: true,
    hint: "At least one is required.",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    hint: "These options are currently unavailable.",
  },
};

export const HorizontalLayout: Story = {
  name: "Horizontal layout",
  args: {
    direction: "horizontal",
    legend: "Preferred contact",
  },
};

export const SizeSmall: Story = {
  name: "Size: sm",
  args: {
    size: "sm",
    hint: "Small size for dense layouts.",
  },
};

export const SizeLarge: Story = {
  name: "Size: lg",
  args: {
    size: "lg",
    hint: "Large size for prominent groups.",
  },
};

// ─── Canonical use case: CheckboxGroup ────────────────────────────────────────

export const CheckboxGroup: Story = {
  name: "CheckboxGroup (canonical use case)",
  args: {
    legend: "Areas of interest",
    hint: "Select all that apply.",
    required: true,
    children: (
      <>
        <DemoCheckbox id="interest-design" label="Design systems" />
        <DemoCheckbox id="interest-a11y" label="Accessibility" />
        <DemoCheckbox id="interest-perf" label="Performance" />
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Legend is present
    const legend = canvas.getByText("Areas of interest");
    await expect(legend).toBeInTheDocument();

    // Hint is present
    const hint = canvas.getByText("Select all that apply.");
    await expect(hint).toBeInTheDocument();

    // 3 checkboxes are rendered
    const checkboxes = canvas.getAllByRole("checkbox");
    await expect(checkboxes).toHaveLength(3);

    // Fieldset exists and is not disabled
    const fieldset = canvasElement.querySelector("fieldset");
    await expect(fieldset).not.toBeNull();
    await expect(fieldset).not.toBeDisabled();
  },
};
