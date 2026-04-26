import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { PhoneInput } from "./PhoneInput";
import type { PhoneValue } from "./PhoneInput";

const meta: Meta<typeof PhoneInput> = {
  title: "Atoms/PhoneInput",
  component: PhoneInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Accessible phone number input atom built on top of `react-phone-input-2`, wrapped in the FluxWind DS chrome (label, hint, error, WCAG 2.2 AA).\n\n" +
          "- `label` is **always required** for accessibility.\n" +
          '- `defaultCountry` sets the initial flag and dial prefix (ISO alpha-2, default `"CL"`).\n' +
          "- `showCountrySelector` (default `false`) enables a searchable dropdown to change the country.\n" +
          "- `onChange` emits `{ countryCode: string, number: string }` where `countryCode` is the ISO alpha-2 code.\n" +
          "- `error` triggers `aria-invalid` and links the message via `aria-describedby`.",
      },
    },
  },
  argTypes: {
    label: {
      description: "**Required.** Visible `<label>` text above the input.",
      control: "text",
      table: { type: { summary: "string" } },
    },
    defaultCountry: {
      description:
        'Initial country for the flag and dial prefix. ISO alpha-2 code (case-insensitive). Defaults to `"CL"` (Chile).',
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"CL"' },
      },
    },
    showCountrySelector: {
      description:
        "When `true`, the flag button opens a searchable country dropdown. When `false` (default), the flag is decorative.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    hint: {
      description: "Helper text rendered below the input.",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    error: {
      description:
        'Error message. Sets `aria-invalid="true"` and links via `aria-describedby`.',
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    disabled: {
      description: "Disables the input and the country button.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    size: {
      description: "Height and text size via `sizeMap` token.",
      control: "select",
      options: ["sm", "md", "lg"],
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: "'md'" },
      },
    },
    radius: {
      description: "Border radius via `radiusMap` token.",
      control: "select",
      options: ["none", "sm", "md", "lg", "xl", "full"],
      table: {
        type: { summary: "'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'" },
        defaultValue: { summary: "'md'" },
      },
    },
    transition: {
      description: "Motion preset for focus transitions.",
      control: "select",
      options: ["none", "smooth", "snappy"],
      table: {
        type: { summary: "'none' | 'smooth' | 'snappy'" },
        defaultValue: { summary: "'smooth'" },
      },
    },
    onChange: { table: { disable: true } },
    value: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof PhoneInput>;

export const Default: Story = {
  args: {
    label: "Phone number",
    placeholder: "+56 9 XXXX XXXX",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Default state: Chile flag (`CL`) displayed as a decorative prefix. Country selector is disabled.",
      },
    },
  },
};

export const WithCountrySelector: Story = {
  args: {
    label: "Phone number",
    showCountrySelector: true,
    placeholder: "Enter phone number",
  },
  parameters: {
    docs: {
      description: {
        story:
          "`showCountrySelector=true` makes the flag clickable and opens a searchable dropdown of all countries.",
      },
    },
  },
};

export const WithHint: Story = {
  args: {
    label: "Contact phone",
    hint: "We'll only use this to contact you about your appointment.",
    placeholder: "+56 9 XXXX XXXX",
  },
  parameters: {
    docs: {
      description: {
        story:
          "`hint` renders helper text below the input, linked via `aria-describedby`.",
      },
    },
  },
};

export const WithError: Story = {
  args: {
    label: "Phone number",
    error: "Invalid phone number. Please include your country code.",
    defaultValue: "123",
  },
  parameters: {
    docs: {
      description: {
        story:
          '`error` sets `aria-invalid="true"`, turns the border destructive-colored, and links the message via `aria-describedby`.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    label: "Phone number",
    defaultValue: "56912345678",
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Disabled state: reduced opacity, `not-allowed` cursor, country selector non-interactive.",
      },
    },
  },
};

export const CustomDefaultCountry: Story = {
  args: {
    label: "Phone number",
    defaultCountry: "US",
    showCountrySelector: true,
    placeholder: "+1 (XXX) XXX-XXXX",
  },
  parameters: {
    docs: {
      description: {
        story:
          'Custom `defaultCountry="US"` sets the initial flag and dial code prefix.',
      },
    },
  },
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: "All 3 size tokens. `md` is the default for most forms.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <PhoneInput label="Small" size="sm" placeholder="+56 9 XXXX XXXX" />
      <PhoneInput
        label="Medium (default)"
        size="md"
        placeholder="+56 9 XXXX XXXX"
      />
      <PhoneInput label="Large" size="lg" placeholder="+56 9 XXXX XXXX" />
    </div>
  ),
};

function ControlledDemo() {
  const [phoneValue, setPhoneValue] = useState<PhoneValue>({
    countryCode: "CL",
    number: "",
  });

  return (
    <div className="flex flex-col gap-4 w-80">
      <PhoneInput
        label="Phone number"
        showCountrySelector
        value={phoneValue.number}
        onChange={setPhoneValue}
        placeholder="Enter a number..."
      />
      <pre className="text-xs bg-[var(--color-fw-surface)] p-3 rounded-md">
        {JSON.stringify(phoneValue, null, 2)}
      </pre>
    </div>
  );
}

export const Controlled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Fully controlled example: `value` + `onChange`. The emitted `PhoneValue` is displayed below the input.",
      },
    },
  },
  render: () => <ControlledDemo />,
};
