import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Tabs } from "./Tabs";

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Tabs> = {
  title: "Molecules/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Tabs organise content into labelled panels, showing one at a time.\n\n" +
          "## Usage\n\n" +
          "```tsx\n" +
          '<Tabs defaultValue="general">\n' +
          '  <Tabs.List aria-label="Settings">\n' +
          '    <Tabs.Trigger value="general">General</Tabs.Trigger>\n' +
          '    <Tabs.Trigger value="security">Security</Tabs.Trigger>\n' +
          "  </Tabs.List>\n" +
          '  <Tabs.Panel value="general">General content</Tabs.Panel>\n' +
          '  <Tabs.Panel value="security">Security content</Tabs.Panel>\n' +
          "</Tabs>\n" +
          "```\n\n" +
          "## Design decisions\n\n" +
          "| Decision | Rationale |\n" +
          "|---|---|\n" +
          "| Compound component | Maximum layout flexibility — caller controls the DOM structure |\n" +
          "| Roving tabindex | ARIA authoring practices for tab widgets — only active tab in tab sequence |\n" +
          "| Arrow keys activate on focus | Follow-focus pattern; matches majority of production implementations |\n" +
          "| `aria-disabled` on triggers | Keeps disabled tabs in the DOM and accessible to screen readers |\n" +
          "| Keyboard skips disabled tabs | Left/Right arrow navigation ignores `aria-disabled` tabs |\n" +
          "| Panels stay in DOM | Preserves component state (forms, scroll) when switching tabs |\n",
      },
    },
  },
  argTypes: {
    variant: {
      description: "Visual style of the tab list.",
      control: "select",
      options: ["line", "pill"],
    },
    size: {
      description: "Size of the tab triggers.",
      control: "select",
      options: ["sm", "md", "lg"],
    },
    defaultValue: {
      description: "Default active tab (uncontrolled mode).",
      control: "text",
    },
    onChange: {
      description: "Called when the active tab changes.",
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

// ─── Shared content ───────────────────────────────────────────────────────────

function PanelContent({ label }: { label: string }) {
  return (
    <div className="rounded-md border border-[var(--color-fw-border)] bg-[var(--color-fw-surface)] p-6">
      <p className="text-sm text-[var(--color-fw-foreground)]">
        Content for the <strong>{label}</strong> tab.
      </p>
      <p className="mt-2 text-sm text-[var(--color-fw-muted)]">
        Switch tabs with the mouse, or navigate with Arrow keys. Press Tab to
        move focus to this panel.
      </p>
    </div>
  );
}

// ─── Stories ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: "Line (default)",
  render: (args) => (
    <Tabs {...args} defaultValue="general">
      <Tabs.List aria-label="Account settings">
        <Tabs.Trigger value="general">General</Tabs.Trigger>
        <Tabs.Trigger value="security">Security</Tabs.Trigger>
        <Tabs.Trigger value="notifications">Notifications</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Panel value="general">
        <PanelContent label="General" />
      </Tabs.Panel>
      <Tabs.Panel value="security">
        <PanelContent label="Security" />
      </Tabs.Panel>
      <Tabs.Panel value="notifications">
        <PanelContent label="Notifications" />
      </Tabs.Panel>
    </Tabs>
  ),
  args: { variant: "line", size: "md" },
};

export const Pill: Story = {
  name: "Pill variant",
  render: (args) => (
    <Tabs {...args} defaultValue="overview">
      <Tabs.List aria-label="Dashboard sections">
        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
        <Tabs.Trigger value="analytics">Analytics</Tabs.Trigger>
        <Tabs.Trigger value="reports">Reports</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Panel value="overview">
        <PanelContent label="Overview" />
      </Tabs.Panel>
      <Tabs.Panel value="analytics">
        <PanelContent label="Analytics" />
      </Tabs.Panel>
      <Tabs.Panel value="reports">
        <PanelContent label="Reports" />
      </Tabs.Panel>
    </Tabs>
  ),
  args: { variant: "pill", size: "md" },
};

export const Sizes: Story = {
  name: "All sizes",
  render: () => (
    <div className="flex flex-col gap-10">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size}>
          <p className="mb-3 text-xs font-mono text-[var(--color-fw-muted)]">
            size="{size}"
          </p>
          <Tabs defaultValue="one" size={size}>
            <Tabs.List aria-label={`${size} tabs`}>
              <Tabs.Trigger value="one">One</Tabs.Trigger>
              <Tabs.Trigger value="two">Two</Tabs.Trigger>
              <Tabs.Trigger value="three">Three</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Panel value="one">
              <PanelContent label="One" />
            </Tabs.Panel>
            <Tabs.Panel value="two">
              <PanelContent label="Two" />
            </Tabs.Panel>
            <Tabs.Panel value="three">
              <PanelContent label="Three" />
            </Tabs.Panel>
          </Tabs>
        </div>
      ))}
    </div>
  ),
};

export const WithDisabled: Story = {
  name: "Disabled trigger",
  render: (args) => (
    <Tabs {...args} defaultValue="active">
      <Tabs.List aria-label="Tabs with disabled">
        <Tabs.Trigger value="active">Active</Tabs.Trigger>
        <Tabs.Trigger value="disabled" disabled>
          Disabled
        </Tabs.Trigger>
        <Tabs.Trigger value="another">Another</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Panel value="active">
        <PanelContent label="Active" />
      </Tabs.Panel>
      <Tabs.Panel value="disabled">
        <PanelContent label="Disabled" />
      </Tabs.Panel>
      <Tabs.Panel value="another">
        <PanelContent label="Another" />
      </Tabs.Panel>
    </Tabs>
  ),
  args: { variant: "line", size: "md" },
};

export const Controlled: Story = {
  name: "Controlled",
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeTab, setActiveTab] = useState("profile");
    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-[var(--color-fw-muted)]">
          Active tab:{" "}
          <code className="font-mono text-[var(--color-fw-foreground)]">
            {activeTab}
          </code>
        </p>
        <Tabs {...args} value={activeTab} onChange={setActiveTab}>
          <Tabs.List aria-label="Controlled tabs">
            <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
            <Tabs.Trigger value="preferences">Preferences</Tabs.Trigger>
            <Tabs.Trigger value="billing">Billing</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Panel value="profile">
            <PanelContent label="Profile" />
          </Tabs.Panel>
          <Tabs.Panel value="preferences">
            <PanelContent label="Preferences" />
          </Tabs.Panel>
          <Tabs.Panel value="billing">
            <PanelContent label="Billing" />
          </Tabs.Panel>
        </Tabs>
      </div>
    );
  },
  args: { variant: "line", size: "md" },
};

export const AllVariants: Story = {
  name: "All variants",
  render: () => (
    <div className="flex flex-col gap-12">
      {(["line", "pill"] as const).map((variant) => (
        <div key={variant}>
          <p className="mb-3 text-xs font-mono text-[var(--color-fw-muted)]">
            variant="{variant}"
          </p>
          <Tabs defaultValue="one" variant={variant}>
            <Tabs.List aria-label={`${variant} variant`}>
              <Tabs.Trigger value="one">One</Tabs.Trigger>
              <Tabs.Trigger value="two">Two</Tabs.Trigger>
              <Tabs.Trigger value="three">Three</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Panel value="one">
              <PanelContent label="One" />
            </Tabs.Panel>
            <Tabs.Panel value="two">
              <PanelContent label="Two" />
            </Tabs.Panel>
            <Tabs.Panel value="three">
              <PanelContent label="Three" />
            </Tabs.Panel>
          </Tabs>
        </div>
      ))}
    </div>
  ),
};
