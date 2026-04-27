import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { DatePicker } from "./DatePicker";

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof DatePicker> = {
  title: "Molecules/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A fully accessible, zero-dependency date picker built with the native `Date` API.\n\n" +
          "Click the trigger to open a popover calendar. Navigate with ←↓→↑ keys, close with Escape.\n\n" +
          "## Design decisions\n\n" +
          "| Decision | Rationale |\n" +
          "|---|---|\n" +
          "| `role=combobox` on trigger | Semantic — announces expanded state to screen readers |\n" +
          "| `role=grid` on calendar | Exposes 2-D keyboard navigation to AT |\n" +
          '| `aria-label` per day cell | Full date string announced on focus (e.g. "Saturday, April 26, 2025") |\n' +
          "| `role=dialog aria-modal` on popover | Traps announcement scope without focus trap |\n" +
          "| `formatOutput` prop | Caller chooses `Date` object or `YYYY-MM-DD` string — no implicit coercion |",
      },
    },
  },
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    hint: { control: "text" },
    error: { control: "text" },
    disabled: { control: "boolean" },
    formatOutput: {
      control: "select",
      options: ["date", "iso"],
      description: "Output format passed to `onChange`.",
    },
    radius: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl", "2xl", "full"],
      description: "Border radius of the trigger input.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    label: "Select a date",
    placeholder: "Select a date",
  },
};

export const WithValue: Story = {
  args: {
    label: "Birth date",
    value: new Date(1990, 5, 15), // June 15, 1990
  },
};

export const WithHint: Story = {
  args: {
    label: "Appointment date",
    hint: "Choose your preferred appointment date.",
  },
};

export const WithError: Story = {
  args: {
    label: "Start date",
    error: "Please select a valid start date.",
  },
};

export const Disabled: Story = {
  args: {
    label: "End date",
    placeholder: "Not available",
    disabled: true,
  },
};

export const WithMinMaxDate: Story = {
  args: {
    label: "Available dates",
    hint: "Only dates within the next 30 days are selectable.",
    minDate: new Date(),
    maxDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  },
};

export const ISOOutput: Story = {
  render: function ISOOutputStory() {
    const [value, setValue] = useState<string | null>(null);
    return (
      <div className="flex flex-col gap-4 w-72">
        <DatePicker
          label="ISO format date"
          formatOutput="iso"
          onChange={(v) => {
            setValue(v as string);
          }}
        />
        {value ? (
          <p className="text-sm">
            Selected ISO: <code>{value}</code>
          </p>
        ) : null}
      </div>
    );
  },
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <div className="flex flex-col gap-4 w-72">
        <DatePicker
          label="Controlled date"
          value={date}
          onChange={(v) => {
            setDate(v as Date);
          }}
        />
        {date ? (
          <p className="text-sm">
            Selected:{" "}
            {date.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        ) : null}
        <button
          type="button"
          className="text-xs underline text-left"
          onClick={() => {
            setDate(null);
          }}
        >
          Clear
        </button>
      </div>
    );
  },
};

export const AllRadii: Story = {
  render: function AllRadiiStory() {
    const radii = ["none", "sm", "md", "lg", "xl", "2xl", "full"] as const;
    return (
      <div className="flex flex-col gap-4 w-72">
        {radii.map((r) => (
          <DatePicker key={r} label={`radius=${r}`} radius={r} />
        ))}
      </div>
    );
  },
};
