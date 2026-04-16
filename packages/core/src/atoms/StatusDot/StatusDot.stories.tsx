import type { Meta, StoryObj } from "@storybook/react-vite";
import { StatusDot } from "./StatusDot";

const meta: Meta<typeof StatusDot> = {
  title: "Atoms/StatusDot",
  component: StatusDot,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A small coloured dot for presence and status indicators.\n\n" +
          'Renders as `<span role="status" aria-label="{Status}">` — no visible text, ' +
          "fully accessible. Pass a custom `label` for richer screen-reader context " +
          '(e.g. `"Alice is online"`).\n\n' +
          "| Status | Colour | CSS variable |\n" +
          "|--------|--------|--------------|\n" +
          "| online | green | `--color-fw-success` |\n" +
          "| away | yellow | `--color-fw-warning` |\n" +
          "| busy | red | `--color-fw-destructive` |\n" +
          "| offline | gray | `--color-fw-muted` |\n" +
          "| info | blue | `--color-fw-info` |",
      },
    },
  },
  argTypes: {
    status: {
      description: "Presence / status value that drives the dot colour.",
      control: "select",
      options: ["online", "away", "busy", "offline", "info"],
      table: {
        type: { summary: "'online' | 'away' | 'busy' | 'offline' | 'info'" },
        defaultValue: { summary: "'offline'" },
      },
    },
    size: {
      description: "Diameter of the dot.",
      control: "select",
      options: ["xs", "sm", "md", "lg"],
      table: {
        type: { summary: "'xs' | 'sm' | 'md' | 'lg'" },
        defaultValue: { summary: "'sm'" },
      },
    },
    pulse: {
      description: "Adds `animate-pulse` to draw attention to a live status.",
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    label: {
      description:
        "Custom `aria-label` — overrides the default derived from `status`.",
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusDot>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Default: Story = {
  args: { status: "online", size: "sm" },
};

// ─── All statuses ─────────────────────────────────────────────────────────────

export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {(["online", "away", "busy", "offline", "info"] as const).map((s) => (
        <div key={s} className="flex items-center gap-2">
          <StatusDot status={s} size="md" />
          <span className="text-sm capitalize text-[var(--color-fw-foreground)]">
            {s}
          </span>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: { description: { story: "All five status values at `md` size." } },
  },
};

// ─── All sizes ────────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {(["xs", "sm", "md", "lg"] as const).map((s) => (
        <div key={s} className="flex flex-col items-center gap-1.5">
          <StatusDot status="online" size={s} />
          <span className="text-xs text-[var(--color-fw-muted)]">{s}</span>
        </div>
      ))}
    </div>
  ),
};

// ─── Pulse ────────────────────────────────────────────────────────────────────

export const Pulsing: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <StatusDot status="online" size="md" pulse />
        <span className="text-sm text-[var(--color-fw-foreground)]">
          Live — pulse=true
        </span>
      </div>
      <div className="flex items-center gap-2">
        <StatusDot status="online" size="md" />
        <span className="text-sm text-[var(--color-fw-foreground)]">
          Static — pulse=false
        </span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`pulse` adds `motion-safe:animate-pulse` — respects `prefers-reduced-motion`.",
      },
    },
  },
};

// ─── Next to an avatar (real-world) ──────────────────────────────────────────

export const AvatarPresence: Story = {
  render: () => (
    <div className="flex gap-4">
      {(["online", "away", "busy", "offline"] as const).map((status) => (
        <div key={status} className="relative inline-flex">
          {/* Simulated avatar circle */}
          <span
            aria-hidden="true"
            className="size-10 rounded-full bg-[var(--color-fw-surface)] border border-[var(--color-fw-border)] flex items-center justify-center text-xs text-[var(--color-fw-muted)]"
          >
            A
          </span>
          <StatusDot
            status={status}
            size="sm"
            label={`User is ${status}`}
            className="absolute bottom-0 right-0 ring-2 ring-[var(--color-fw-background)]"
          />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Typical avatar badge pattern — `absolute bottom-0 right-0` with a `ring` to " +
          "separate the dot from the avatar background. Pass a custom `label` for full " +
          'screen-reader context (`"User is online"`).',
      },
    },
  },
};

// ─── User list (real-world) ───────────────────────────────────────────────────

export const UserList: Story = {
  render: () => {
    const users = [
      { name: "Alice", role: "Engineer", status: "online" as const },
      { name: "Bob", role: "Designer", status: "away" as const },
      { name: "Carol", role: "Product", status: "busy" as const },
      { name: "Dave", role: "Marketing", status: "offline" as const },
    ];

    return (
      <ul className="flex flex-col gap-1 w-56">
        {users.map((u) => (
          <li
            key={u.name}
            className="flex items-center gap-2.5 px-3 py-2 rounded-md hover:bg-[var(--color-fw-surface)] transition-colors"
          >
            <StatusDot
              status={u.status}
              size="sm"
              label={`${u.name} is ${u.status}`}
            />
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium text-[var(--color-fw-foreground)] truncate">
                {u.name}
              </span>
              <span className="text-xs text-[var(--color-fw-muted)] truncate">
                {u.role}
              </span>
            </div>
          </li>
        ))}
      </ul>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Inline dot at the start of each list row — the most common real-world usage.",
      },
    },
  },
};
