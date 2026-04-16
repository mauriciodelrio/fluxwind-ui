import type { Meta, StoryObj } from "@storybook/react-vite";
import { ComponentShowcase } from "./ComponentShowcase";
import { Button } from "@/atoms/Button";
import { Badge } from "@/atoms/Badge";
import { Avatar } from "@/atoms/Avatar";
import { Progress } from "@/atoms/Progress";
import { Switch } from "@/atoms/Switch";
import { Text } from "@/atoms/Text";

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof ComponentShowcase.Root> = {
  title: "Organisms/ComponentShowcase",
  component: ComponentShowcase.Root,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "ComponentShowcase is a tabbed organism for presenting interactive component previews " +
          "grouped into named categories. It uses a compound component pattern: " +
          "`Root`, `Header`, `TabList`, `Tab`, `Panel`, `Items`, and `Item`.\n\n" +
          "## Usage\n\n" +
          "```tsx\n" +
          '<ComponentShowcase.Root defaultTab="buttons" aria-label="UI Examples">\n' +
          "  <ComponentShowcase.Header>\n" +
          "    <h2>Components</h2>\n" +
          "  </ComponentShowcase.Header>\n" +
          "  <ComponentShowcase.TabList>\n" +
          '    <ComponentShowcase.Tab value="buttons">Buttons</ComponentShowcase.Tab>\n' +
          '    <ComponentShowcase.Tab value="badges">Badges</ComponentShowcase.Tab>\n' +
          "  </ComponentShowcase.TabList>\n" +
          '  <ComponentShowcase.Panel value="buttons">\n' +
          "    <ComponentShowcase.Items columns={3}>\n" +
          '      <ComponentShowcase.Item label="Primary button">\n' +
          '        <Button variant="solid">Primary</Button>\n' +
          "      </ComponentShowcase.Item>\n" +
          "    </ComponentShowcase.Items>\n" +
          "  </ComponentShowcase.Panel>\n" +
          "</ComponentShowcase.Root>\n" +
          "```\n\n" +
          "## Design decisions\n\n" +
          "| Decision | Rationale |\n" +
          "|---|---|\n" +
          "| Compound component | Caller controls tab content and grid layout freely |\n" +
          "| Signal store in Root | `activeTab` signal avoids prop drilling |\n" +
          "| Panel renders null when inactive | Keeps DOM clean; avoids hidden-tab confusion |\n" +
          "| Roving tabIndex on tabs | ARIA APG tabs keyboard pattern |\n" +
          "| `defaultTab` uncontrolled | Simpler API for static showcases |\n",
      },
    },
  },
  argTypes: {
    padding: {
      description: "Vertical padding of the section.",
      control: "select",
      options: ["none", "sm", "md", "lg"],
    },
    maxWidth: {
      description: "Max-width of the container.",
      control: "select",
      options: ["sm", "md", "lg", "full"],
    },
    defaultTab: {
      description: "The initial active tab value.",
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ComponentShowcase.Root>;

// ─── Fixtures ─────────────────────────────────────────────────────────────────

const TABS = ["Buttons", "Badges", "Avatars", "Progress"];

// ─── Stories ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    defaultTab: "Buttons",
    padding: "md",
    maxWidth: "lg",
  },
  render: (args) => (
    <ComponentShowcase.Root {...args}>
      <ComponentShowcase.Header>
        <h2 className="text-2xl font-bold text-[var(--color-fw-foreground)]">
          Interactive Showcase
        </h2>
        <p className="text-sm text-[var(--color-fw-muted-foreground)]">
          Explore components across multiple categories.
        </p>
      </ComponentShowcase.Header>
      <ComponentShowcase.TabList aria-label="Component categories">
        {TABS.map((tab) => (
          <ComponentShowcase.Tab key={tab} value={tab}>
            {tab}
          </ComponentShowcase.Tab>
        ))}
      </ComponentShowcase.TabList>

      <ComponentShowcase.Panel value="Buttons">
        <ComponentShowcase.Items columns={3}>
          <ComponentShowcase.Item label="Solid button">
            <Text size="xs" className="text-[var(--color-fw-muted-foreground)]">
              solid
            </Text>
            <Button variant="solid">Primary</Button>
          </ComponentShowcase.Item>
          <ComponentShowcase.Item label="Outline button">
            <Text size="xs" className="text-[var(--color-fw-muted-foreground)]">
              outline
            </Text>
            <Button variant="outline">Secondary</Button>
          </ComponentShowcase.Item>
          <ComponentShowcase.Item label="Ghost button">
            <Text size="xs" className="text-[var(--color-fw-muted-foreground)]">
              ghost
            </Text>
            <Button variant="ghost">Ghost</Button>
          </ComponentShowcase.Item>
        </ComponentShowcase.Items>
      </ComponentShowcase.Panel>

      <ComponentShowcase.Panel value="Badges">
        <ComponentShowcase.Items columns={4}>
          {(["default", "success", "warning", "error"] as const).map((v) => (
            <ComponentShowcase.Item key={v} label={`${v} badge`}>
              <Text
                size="xs"
                className="text-[var(--color-fw-muted-foreground)]"
              >
                {v}
              </Text>
              <Badge variant={v}>{v}</Badge>
            </ComponentShowcase.Item>
          ))}
        </ComponentShowcase.Items>
      </ComponentShowcase.Panel>

      <ComponentShowcase.Panel value="Avatars">
        <ComponentShowcase.Items columns={4}>
          {(["xs", "sm", "md", "lg"] as const).map((s) => (
            <ComponentShowcase.Item key={s} label={`Avatar ${s}`}>
              <Text
                size="xs"
                className="text-[var(--color-fw-muted-foreground)]"
              >
                {s}
              </Text>
              <Avatar size={s} fallback="MW" />
            </ComponentShowcase.Item>
          ))}
        </ComponentShowcase.Items>
      </ComponentShowcase.Panel>

      <ComponentShowcase.Panel value="Progress">
        <ComponentShowcase.Items columns={2}>
          <ComponentShowcase.Item label="Progress 40%">
            <Text size="xs" className="text-[var(--color-fw-muted-foreground)]">
              value=40
            </Text>
            <Progress value={40} aria-label="Progress 40%" />
          </ComponentShowcase.Item>
          <ComponentShowcase.Item label="Progress 75%">
            <Text size="xs" className="text-[var(--color-fw-muted-foreground)]">
              value=75
            </Text>
            <Progress value={75} aria-label="Progress 75%" />
          </ComponentShowcase.Item>
        </ComponentShowcase.Items>
      </ComponentShowcase.Panel>
    </ComponentShowcase.Root>
  ),
};

export const SingleTab: Story = {
  args: { defaultTab: "controls" },
  render: (args) => (
    <ComponentShowcase.Root {...args}>
      <ComponentShowcase.TabList>
        <ComponentShowcase.Tab value="controls">Controls</ComponentShowcase.Tab>
      </ComponentShowcase.TabList>
      <ComponentShowcase.Panel value="controls">
        <ComponentShowcase.Items columns={2}>
          <ComponentShowcase.Item label="Switch on">
            <Switch defaultChecked aria-label="Notifications on" />
          </ComponentShowcase.Item>
          <ComponentShowcase.Item label="Switch off">
            <Switch aria-label="Notifications off" />
          </ComponentShowcase.Item>
        </ComponentShowcase.Items>
      </ComponentShowcase.Panel>
    </ComponentShowcase.Root>
  ),
};

export const NoPadding: Story = {
  args: { defaultTab: "badges", padding: "none" },
  render: (args) => (
    <ComponentShowcase.Root {...args}>
      <ComponentShowcase.TabList>
        <ComponentShowcase.Tab value="badges">Badges</ComponentShowcase.Tab>
      </ComponentShowcase.TabList>
      <ComponentShowcase.Panel value="badges">
        <ComponentShowcase.Items columns={2}>
          <ComponentShowcase.Item>
            <Badge variant="success">Active</Badge>
          </ComponentShowcase.Item>
          <ComponentShowcase.Item>
            <Badge variant="error">Error</Badge>
          </ComponentShowcase.Item>
        </ComponentShowcase.Items>
      </ComponentShowcase.Panel>
    </ComponentShowcase.Root>
  ),
};
