import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormField, useFormField } from "./FormField";

// ─── Shared native input style (mimics DS Input atom without its built-in label) ─

const inputCls =
  "w-full h-10 px-3 rounded-md border border-[var(--color-fw-border)] bg-[var(--color-fw-background)] text-sm text-[var(--color-fw-foreground)] placeholder:text-[var(--color-fw-muted)] focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[var(--color-fw-ring)]";

const errorInputCls =
  "w-full h-10 px-3 rounded-md border border-[var(--color-fw-destructive)] bg-[var(--color-fw-background)] text-sm text-[var(--color-fw-foreground)] focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[var(--color-fw-destructive)]";

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof FormField> = {
  title: "Molecules/FormField",
  component: FormField,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "FormField wraps any form control with an accessible label, optional hint, and error message.\n\n" +
          "## Design decisions\n\n" +
          "| Decision | Rationale |\n" +
          "|---|---|\n" +
          "| `cloneElement` prop injection | Automatically wires `id`, `aria-describedby`, `aria-invalid`, `aria-required`, `disabled` to any child |\n" +
          "| `useFormField()` hook | Escape hatch for custom/composite controls that need explicit wiring |\n" +
          "| Both hint and error shown | Both are linked via `aria-describedby`; neither hides the other |\n" +
          '| `role="alert"` on error | Immediately announced by screen readers when the error appears |\n' +
          "| `aria-hidden` on `*` indicator | Conveyed semantically via `aria-required` on the control — not by the asterisk |\n\n" +
          "## When to use\n\n" +
          "Use `FormField` when wrapping **native inputs** (`<input>`, `<textarea>`, `<select>`) or **third-party controls** " +
          "(date pickers, rich text editors) that do not have their own built-in label system.\n\n" +
          "For built-in DS atoms (Input, Textarea, Select) that already render their own label, " +
          "use those atoms' `label`, `hint`, and `error` props directly.",
      },
    },
  },
  argTypes: {
    label: {
      description: "**Required.** Visible label text.",
      control: "text",
    },
    hint: {
      description: "Helper text below the control.",
      control: "text",
    },
    error: {
      description:
        'Validation error message. Renders a `role="alert"` paragraph.',
      control: "text",
    },
    required: {
      description: "Shows `*` indicator and sets `aria-required` on the child.",
      control: "boolean",
    },
    disabled: {
      description: "Propagates `disabled` to the wrapped control.",
      control: "boolean",
    },
    size: {
      description: "Text size for label, hint, and error.",
      control: "radio",
      options: ["sm", "md", "lg"],
    },
  },
  args: {
    label: "Full name",
    children: <input type="text" placeholder="John Doe" className={inputCls} />,
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Default: Story = {};

export const WithHint: Story = {
  args: { hint: "As it appears on your official ID." },
};

export const WithError: Story = {
  args: {
    error: "This field is required.",
    children: (
      <input type="text" placeholder="John Doe" className={errorInputCls} />
    ),
  },
};

export const HintAndError: Story = {
  name: "Hint + Error (both visible)",
  args: {
    label: "Email address",
    hint: "We'll never share your email.",
    error: "Please enter a valid email address.",
    children: <input type="email" className={errorInputCls} />,
  },
};

export const Required: Story = {
  args: {
    label: "Email address",
    required: true,
    children: (
      <input type="email" placeholder="you@company.com" className={inputCls} />
    ),
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const RequiredAndError: Story = {
  name: "Required + Error",
  args: {
    label: "Password",
    required: true,
    error: "Password must be at least 8 characters.",
    children: <input type="password" className={errorInputCls} />,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8 max-w-md">
      {(["sm", "md", "lg"] as const).map((size) => (
        <FormField
          key={size}
          label={`Label size: ${size}`}
          hint="Helper text matches the label scale."
          size={size}
        >
          <input
            type="text"
            placeholder="Placeholder text"
            className={inputCls}
          />
        </FormField>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The `size` prop scales the label and message text while the control remains at its own size.",
      },
    },
  },
};

// ─── Native controls showcase ─────────────────────────────────────────────────

export const NativeControls: Story = {
  name: "Various native controls",
  render: () => (
    <div className="flex flex-col gap-6 max-w-md">
      <FormField label="Text input" hint="Native <input type='text'>">
        <input type="text" className={inputCls} />
      </FormField>

      <FormField label="Email address" hint="Native <input type='email'>">
        <input type="email" className={inputCls} />
      </FormField>

      <FormField label="Password" hint="Native <input type='password'>">
        <input type="password" className={inputCls} />
      </FormField>

      <FormField label="Description" hint="Native <textarea>">
        <textarea
          rows={3}
          className="w-full px-3 py-2 rounded-md border border-[var(--color-fw-border)] bg-[var(--color-fw-background)] text-sm text-[var(--color-fw-foreground)] placeholder:text-[var(--color-fw-muted)] resize-none focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[var(--color-fw-ring)]"
        />
      </FormField>

      <FormField label="Country" hint="Native <select>">
        <select className="w-full h-10 px-3 rounded-md border border-[var(--color-fw-border)] bg-[var(--color-fw-background)] text-sm text-[var(--color-fw-foreground)]">
          <option value="">Choose a country…</option>
          <option value="cl">Chile</option>
          <option value="mx">México</option>
          <option value="us">United States</option>
        </select>
      </FormField>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "FormField works with any native HTML form element. The label, hint, and error are wired automatically.",
      },
    },
  },
};

// ─── useFormField hook ────────────────────────────────────────────────────────

/**
 * Custom control that reads its ARIA state from the FormField context
 * instead of relying on cloneElement prop injection.
 */
function StyledCustomInput() {
  const { id, describedBy, hasError, disabled, required } = useFormField();
  return (
    <input
      id={id}
      type="text"
      aria-describedby={describedBy}
      aria-invalid={hasError || undefined}
      aria-required={required || undefined}
      disabled={disabled}
      placeholder="Custom control wired via useFormField()"
      className={[
        "w-full h-10 px-3 rounded-md border text-sm",
        "bg-[var(--color-fw-background)] text-[var(--color-fw-foreground)]",
        "placeholder:text-[var(--color-fw-muted)]",
        "focus-visible:outline-2 focus-visible:outline-offset-0",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--color-fw-surface)]",
        hasError
          ? "border-[var(--color-fw-destructive)] focus-visible:outline-[var(--color-fw-destructive)]"
          : "border-[var(--color-fw-border)] focus-visible:outline-[var(--color-fw-ring)]",
      ].join(" ")}
    />
  );
}

export const WithHookConsumer: Story = {
  name: "Custom control (useFormField)",
  render: () => (
    <div className="flex flex-col gap-6 max-w-md">
      <FormField
        label="Custom input — default"
        hint="This control reads its id and ARIA state via useFormField()."
      >
        <StyledCustomInput />
      </FormField>

      <FormField
        label="Custom input — error state"
        error="Something went wrong with this field."
      >
        <StyledCustomInput />
      </FormField>

      <FormField
        label="Custom input — required + disabled"
        hint="Both states cascade from the FormField."
        required
        disabled
      >
        <StyledCustomInput />
      </FormField>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The `useFormField()` hook is the escape hatch for composite controls " +
          "(date pickers, rich text editors, comboboxes) that cannot rely on prop injection. " +
          "It returns `{ id, hintId, errorId, describedBy, hasError, disabled, required }`.",
      },
    },
  },
};
