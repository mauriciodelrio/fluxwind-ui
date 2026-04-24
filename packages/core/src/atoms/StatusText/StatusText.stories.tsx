import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { StatusText } from "./StatusText";

const meta: Meta<typeof StatusText> = {
  title: "Atoms/StatusText",
  component: StatusText,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          'Live region atom built on the native `<output>` element, which carries `role="status"` implicitly. ' +
          "Content changes inside `StatusText` are announced **politely** by screen readers — no ARIA attributes required.\n\n" +
          "**When to use `StatusText` vs `Alert`:**\n" +
          "- **`StatusText`** → polite, non-critical feedback: auto-save confirmations, search result counts, character counters, form field validation success.\n" +
          "- **`Alert`** → assertive, time-sensitive feedback: error messages, session expiry warnings.\n\n" +
          '**Accessibility note:** When `as` is anything other than `"output"`, `role="status"` is added automatically so the live region is preserved.',
      },
    },
  },
  argTypes: {
    children: {
      description: "**Required.** The status message to announce.",
      table: { type: { summary: "ReactNode" } },
      control: "text",
    },
    as: {
      description:
        'HTML element to render. Defaults to `<output>` (implicit `role="status"`). ' +
        'When changed, `role="status"` is applied automatically.',
      control: "select",
      options: ["output", "p", "span", "div"],
      table: {
        type: { summary: "ElementType" },
        defaultValue: { summary: "'output'" },
      },
    },
    variant: {
      description:
        "Typographic scale of the status message. Color is controlled separately via `color`.\n\n" +
        "| Value | Size | Style | Use case |\n" +
        "|---|---|---|---|\n" +
        "| `body` | `text-base` | normal | Default paragraph-scale feedback |\n" +
        "| `caption` | `text-xs` | normal | Small helper/supporting feedback |\n" +
        "| `label` | `text-sm` | medium | Form field feedback, counters |\n" +
        "| `code` | `text-sm` | mono | HTTP status codes, API responses |",
      control: "select",
      options: ["body", "caption", "label", "code"],
      table: {
        type: { summary: "'body' | 'caption' | 'label' | 'code'" },
        defaultValue: { summary: "'body'" },
      },
    },
    color: {
      description:
        "Semantic color token applied to the text.\n\n" +
        "| Value | Token | Semantic use |\n" +
        "|---|---|---|\n" +
        "| `inherit` | — | Inherits color from parent (default) |\n" +
        "| `muted` | `fw-muted-foreground` | Secondary / dimmed feedback |\n" +
        "| `primary` | `fw-primary-text` | Brand-colored status |\n" +
        "| `destructive` | `fw-destructive-text` | Error / failure feedback |\n" +
        "| `success` | `fw-success-text` | Positive / completed feedback |\n" +
        "| `warning` | `fw-warning-text` | Caution / near-limit feedback |",
      control: "select",
      options: [
        "inherit",
        "muted",
        "primary",
        "destructive",
        "success",
        "warning",
      ],
      table: {
        type: {
          summary:
            "'inherit' | 'muted' | 'primary' | 'destructive' | 'success' | 'warning'",
        },
        defaultValue: { summary: "'inherit'" },
      },
    },
    "aria-label": {
      description:
        "Identifies this live region when multiple `StatusText` instances exist on the same page. " +
        "Screen readers prepend the label to each announcement.",
      control: "text",
      table: { type: { summary: "string" } },
    },
    "aria-atomic": {
      description:
        "When `true` (default), the entire region is re-announced on every change. " +
        "When `false`, only the changed nodes are announced.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    "aria-live": {
      description:
        "`'polite'` waits for the user to finish their current activity before announcing. " +
        "`'off'` silences the region without unmounting it.",
      control: "select",
      options: ["polite", "off"],
      table: {
        type: { summary: "'polite' | 'off'" },
        defaultValue: { summary: "'polite' (from <output> implicit)" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusText>;

// ─── Default ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    children: "Changes saved",
    "aria-label": "Save status",
  },
};

// ─── Colors ──────────────────────────────────────────────────────────────────

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <StatusText color="inherit" aria-label="Inherit status">
        inherit — color comes from parent
      </StatusText>
      <StatusText color="muted" aria-label="Muted status">
        muted — secondary feedback
      </StatusText>
      <StatusText color="primary" aria-label="Primary status">
        primary — brand-colored status
      </StatusText>
      <StatusText color="success" aria-label="Success status">
        success — operation completed
      </StatusText>
      <StatusText color="warning" aria-label="Warning status">
        warning — approaching limit
      </StatusText>
      <StatusText color="destructive" aria-label="Destructive status">
        destructive — error occurred
      </StatusText>
    </div>
  ),
};

// ─── Variants ────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <StatusText variant="body" color="success" aria-label="Body status">
        body — 3 items uploaded successfully
      </StatusText>
      <StatusText variant="label" color="muted" aria-label="Label status">
        label — 248 / 280 characters
      </StatusText>
      <StatusText variant="caption" color="muted" aria-label="Caption status">
        caption — Last saved 2 minutes ago
      </StatusText>
      <StatusText variant="code" color="primary" aria-label="Code status">
        200 OK
      </StatusText>
    </div>
  ),
};

// ─── AutoSave — interactive live region demo ─────────────────────────────────

export const AutoSave: Story = {
  name: "Auto-save (live region demo)",
  parameters: {
    docs: {
      description: {
        story:
          "Click **Save** to trigger a polite announcement. Screen readers announce the updated text without interrupting the user. " +
          'The `<output>` element\'s implicit `role="status"` handles this natively.',
      },
    },
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [message, setMessage] = useState("No unsaved changes.");

    const handleSave = () => {
      const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setMessage(`Saved at ${time}`);
    };

    return (
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={handleSave}
          className="rounded-md px-4 py-2 text-sm font-medium bg-[var(--color-fw-primary)] text-[var(--color-fw-primary-foreground)] hover:opacity-90 transition-opacity"
        >
          Save
        </button>
        <StatusText color="muted" variant="label" aria-label="Auto-save status">
          {message}
        </StatusText>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const status = canvas.getByRole("status", { name: "Auto-save status" });
    await expect(status).toHaveTextContent("No unsaved changes.");

    await userEvent.click(canvas.getByRole("button", { name: "Save" }));

    await expect(status).toHaveTextContent(/Saved at/);
  },
};

// ─── Character counter ────────────────────────────────────────────────────────

export const CharacterCounter: Story = {
  name: "Character counter",
  parameters: {
    docs: {
      description: {
        story:
          "A common pattern for textarea character counters. " +
          "The `label` variant with `aria-label` ensures screen readers announce remaining characters politely as the user types.",
      },
    },
  },
  render: () => {
    const MAX = 140;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState("");
    const remaining = MAX - value.length;
    let color: "destructive" | "warning" | "muted" = "muted";
    if (remaining < 0) color = "destructive";
    else if (remaining < 20) color = "warning";

    return (
      <div className="flex flex-col gap-2 w-72">
        <textarea
          className="w-full rounded-md border border-[var(--color-fw-border)] p-2 text-sm resize-none"
          rows={3}
          maxLength={MAX + 20}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          aria-label="Message"
          placeholder="Type a message…"
        />
        <div className="flex justify-end">
          <StatusText
            variant="label"
            color={color}
            aria-label="Characters remaining"
          >
            {remaining}
          </StatusText>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const textarea = canvas.getByRole("textbox", { name: "Message" });
    const counter = canvas.getByRole("status", {
      name: "Characters remaining",
    });

    await expect(counter).toHaveTextContent("140");

    await userEvent.type(textarea, "Hello");
    await expect(counter).toHaveTextContent("135");
  },
};

// ─── As prop — custom element ─────────────────────────────────────────────────

export const AsElement: Story = {
  name: "Custom element (`as` prop)",
  parameters: {
    docs: {
      description: {
        story:
          'When the `as` prop is set to any element other than `"output"`, `role="status"` is applied automatically — ' +
          "so the live region behaviour is preserved regardless of the rendered tag.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-2">
      <StatusText as="output" color="muted" aria-label="Default">
        as=&quot;output&quot; — implicit role (no explicit role attribute)
      </StatusText>
      <StatusText as="p" color="muted" aria-label="Paragraph status">
        as=&quot;p&quot; — explicit role=&quot;status&quot; added automatically
      </StatusText>
      <StatusText as="span" color="muted" aria-label="Span status">
        as=&quot;span&quot; — explicit role=&quot;status&quot; added
        automatically
      </StatusText>
    </div>
  ),
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const allStatus = canvas.getAllByRole("status");
    await expect(allStatus).toHaveLength(3);
  },
};
