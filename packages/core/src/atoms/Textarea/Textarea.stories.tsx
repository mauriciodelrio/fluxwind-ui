import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "./Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Atoms/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Multi-line text input atom. Shares the same design language as `Input` (tokens, focus ring, error/hint pattern) " +
          "but wraps `<textarea>` instead of `<input>`.\n\n" +
          "**Extra features vs Input:**\n" +
          "- `resize` prop controls user resizability (`vertical` by default, `none` for fixed-height layouts, etc.)\n" +
          "- Optional character counter: pass `maxLength` + a controlled `value` to show a live `current / max` badge\n\n" +
          "**A11y:** Label is always required. " +
          'The counter uses `aria-live="polite"` so screen readers announce the remaining characters without interrupting the user.',
      },
    },
  },
  argTypes: {
    label: {
      description: "Visible label — always required for accessibility.",
      control: "text",
      table: { type: { summary: "string" } },
    },
    hint: {
      description: "Helper text shown below the field.",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    error: {
      description:
        "Validation error. Sets `aria-invalid=true` and links the message via `aria-describedby`.",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    resize: {
      description: "Controls user resizability.",
      control: "select",
      options: ["none", "vertical", "horizontal", "both"],
      table: {
        type: { summary: "'none' | 'vertical' | 'horizontal' | 'both'" },
        defaultValue: { summary: "'vertical'" },
      },
    },
    radius: {
      description: "Border radius.",
      control: "select",
      options: ["none", "sm", "md", "lg", "xl"],
      table: {
        type: { summary: "'none' | 'sm' | 'md' | 'lg' | 'xl'" },
        defaultValue: { summary: "'md'" },
      },
    },
    maxLength: {
      description:
        "When set and `value` is also provided, renders a live `current / max` character counter.",
      control: "number",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "undefined" },
      },
    },
    disabled: {
      description: "Disables the textarea.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    label: "Message",
    placeholder: "Type your message here…",
  },
};

export const WithHint: Story = {
  args: {
    label: "Bio",
    hint: "Tell us a bit about yourself.",
    placeholder: "I'm a software engineer who…",
  },
};

export const WithError: Story = {
  args: {
    label: "Message",
    error: "This field is required.",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Error state — sets `aria-invalid=true` and highlights the border.",
      },
    },
  },
};

export const WithCounter: Story = {
  args: {
    label: "Bio",
    maxLength: 160,
    defaultValue: "Passionate about building great UIs.",
    hint: "Appears on your public profile.",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Character counter appears when `maxLength` + `value` are both provided. " +
          'The counter uses `aria-live="polite"` for screen reader announcements.',
      },
    },
  },
};

export const ResizeNone: Story = {
  args: {
    label: "Fixed height message",
    resize: "none",
    placeholder: "This textarea cannot be resized by the user.",
  },
  parameters: {
    docs: {
      description: {
        story:
          'Use `resize="none"` in layouts where the field height is controlled by the design.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    label: "Internal notes",
    value: "Read-only content for this account tier.",
    disabled: true,
    resize: "none",
  },
};
