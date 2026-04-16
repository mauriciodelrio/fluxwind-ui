import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Atoms/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Accessible text input atom with an integrated `<label>`, optional helper/error messages, and leading/trailing icon slots.\n\n" +
          "- `label` is **always required** — never use a placeholder as the only accessible name.\n" +
          "- `error` triggers `aria-invalid` and links the message via `aria-describedby`.\n" +
          "- `hint` and `error` can coexist; both are linked via `aria-describedby` (space-separated IDs).\n" +
          "- All ID generation is automatic via `useId()`, but can be overridden with the `id` prop.",
      },
    },
  },
  argTypes: {
    label: {
      description:
        "**Required.** Visible `<label>` text. Always displayed above the input. Never omit this — use `hint` for supplementary guidance.",
      control: "text",
      table: { type: { summary: "string" } },
    },
    hint: {
      description:
        "Helper text rendered below the input. Linked to the input via `aria-describedby`. Shown alongside `error` when both are provided.",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    error: {
      description:
        'Error message rendered below the input in a destructive color. Sets `aria-invalid="true"` on the input and links the message via `aria-describedby`. Takes visual precedence over `hint`.',
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    size: {
      description:
        "Controls height, horizontal padding, and font size via the shared `sizeMap` token.",
      control: "select",
      options: ["sm", "md", "lg"],
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: "'md'" },
      },
    },
    radius: {
      description:
        "Border radius of the input element via the shared `radiusMap` token.",
      control: "select",
      options: ["none", "sm", "md", "lg", "xl", "full"],
      table: {
        type: { summary: "'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'" },
        defaultValue: { summary: "'md'" },
      },
    },
    transition: {
      description: "Motion preset for focus/border transitions.",
      control: "select",
      options: ["none", "smooth", "snappy"],
      table: {
        type: { summary: "'none' | 'smooth' | 'snappy'" },
        defaultValue: { summary: "'smooth'" },
      },
    },
    disabled: {
      description:
        "Disables the input. Applies reduced opacity and a `not-allowed` cursor. Inherited from `InputHTMLAttributes`.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    iconLeft: {
      description:
        "Icon rendered inside the leading (left) edge of the input. Adjusts `padding-left` automatically. Accepts any `ReactNode` — typically an `<Icon>` atom. Hidden from screen readers.",
      control: false,
      table: {
        type: { summary: "ReactNode" },
        defaultValue: { summary: "undefined" },
      },
    },
    iconRight: {
      description:
        "Icon rendered inside the trailing (right) edge of the input. Adjusts `padding-right` automatically. Accepts any `ReactNode` — typically an `<Icon>` atom. Hidden from screen readers.",
      control: false,
      table: {
        type: { summary: "ReactNode" },
        defaultValue: { summary: "undefined" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
    type: "email",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Minimal usage: `label` (required) + `placeholder`. Use the Controls panel to explore all prop combinations.",
      },
    },
  },
};

export const WithHint: Story = {
  args: {
    label: "Username",
    hint: "Must be at least 3 characters.",
    placeholder: "johndoe",
  },
  parameters: {
    docs: {
      description: {
        story:
          "`hint` renders helper text below the input, linked via `aria-describedby`. Always visible regardless of validation state.",
      },
    },
  },
};

export const WithError: Story = {
  args: {
    label: "Password",
    type: "password",
    error: "Password must be at least 8 characters.",
    defaultValue: "abc",
  },
  parameters: {
    docs: {
      description: {
        story:
          '`error` sets `aria-invalid="true"` on the `<input>` and links the message via `aria-describedby`. The input border turns destructive-colored to provide a visual cue alongside the message.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    label: "Read only field",
    defaultValue: "Cannot edit this",
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Disabled state applies `opacity-50`, a `not-allowed` cursor, and a surface background. Prefer `readOnly` over `disabled` when you still want the value to be submitted with a form.",
      },
    },
  },
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "All 3 size tokens. `md` is the default. Use `sm` for dense forms or secondary inputs, `lg` for prominent hero-level inputs.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      {(["sm", "md", "lg"] as const).map((s) => (
        <Input
          key={s}
          label={`Size ${s.toUpperCase()}`}
          size={s}
          placeholder={`size ${s}`}
        />
      ))}
    </div>
  ),
};
