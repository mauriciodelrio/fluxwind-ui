import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Atoms/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "User identity atom with three rendering tiers (in priority order):\n\n" +
          "1. **Image** — renders `<img>` when `src` is provided and loads successfully\n" +
          "2. **Initials** — renders up to 2 uppercase characters when `src` is absent or errors\n" +
          "3. **Silhouette** — renders an `aria-hidden` SVG fallback when neither `src` nor `initials` are provided\n\n" +
          '**A11y:** When showing initials or silhouette, the wrapper has `role="img"` + `aria-label`. Always pass `alt` (used as the label) for meaningful screen reader output.',
      },
    },
  },
  argTypes: {
    src: {
      description:
        "Image URL. When provided, renders an `<img>` with the supplied `alt` text.",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    alt: {
      description:
        "Accessible name for the avatar. **Required when `src` is provided** (WCAG 1.1.1). " +
        "Also used as the `aria-label` for the initials/silhouette fallback.",
      control: "text",
      table: { type: { summary: "string" }, defaultValue: { summary: "''" } },
    },
    initials: {
      description:
        "Fallback text shown when the image is absent or fails to load. Maximum 2 characters — longer strings are automatically truncated and uppercased.",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    size: {
      description:
        "Avatar diameter using the shared size scale.\n\n" +
        "| Value | Size |\n" +
        "|---|---|\n" +
        "| `xs` | 24px |\n" +
        "| `sm` | 32px |\n" +
        "| `md` | 40px |\n" +
        "| `lg` | 48px |\n" +
        "| `xl` | 64px |",
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      table: {
        type: { summary: "'xs' | 'sm' | 'md' | 'lg' | 'xl'" },
        defaultValue: { summary: "'md'" },
      },
    },
    radius: {
      description:
        "Border radius. Defaults to `full` (circle). Use `md` or `lg` for a softer square style.",
      control: "select",
      options: ["none", "sm", "md", "lg", "full"],
      table: {
        type: { summary: "'none' | 'sm' | 'md' | 'lg' | 'full'" },
        defaultValue: { summary: "'full'" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=47",
    alt: "Jane Doe",
    size: "md",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Image variant. The `<img>` fills the container with `object-cover`. If the image fails to load, the component automatically falls back to `initials` or the silhouette.",
      },
    },
  },
};

export const WithInitials: Story = {
  args: {
    initials: "JD",
    alt: "Jane Doe",
    size: "md",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Initials fallback — use when the user has no profile photo. Strings longer than 2 chars are truncated automatically.",
      },
    },
  },
};

export const Silhouette: Story = {
  args: {
    alt: "Unknown user",
    size: "md",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Generic silhouette rendered when neither `src` nor `initials` are provided.",
      },
    },
  },
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "All 5 sizes. Match the avatar size to its context — `xs`/`sm` for lists and mentions, `lg`/`xl` for profile pages.",
      },
    },
  },
  render: () => (
    <div className="flex items-end gap-3">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
        <Avatar key={s} size={s} initials="JD" alt={`Jane Doe — ${s}`} />
      ))}
    </div>
  ),
};

export const Radii: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Border radius variants. `full` (circle) is the default; switch to `md` or `lg` for a rounded-square style common in enterprise UIs.",
      },
    },
  },
  render: () => (
    <div className="flex items-center gap-3">
      {(["none", "sm", "md", "lg", "full"] as const).map((r) => (
        <Avatar
          key={r}
          size="lg"
          radius={r}
          initials="JD"
          alt={`Jane Doe — radius ${r}`}
        />
      ))}
    </div>
  ),
};

export const Group: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Stacked avatar group pattern using negative margin. This composition is done in the consumer — Avatar has no group-specific API.",
      },
    },
  },
  render: () => (
    <div className="flex -space-x-2">
      <Avatar
        src="https://i.pravatar.cc/150?img=1"
        alt="User 1"
        size="md"
        className="ring-2 ring-[var(--color-fw-background)]"
      />
      <Avatar
        src="https://i.pravatar.cc/150?img=2"
        alt="User 2"
        size="md"
        className="ring-2 ring-[var(--color-fw-background)]"
      />
      <Avatar
        src="https://i.pravatar.cc/150?img=3"
        alt="User 3"
        size="md"
        className="ring-2 ring-[var(--color-fw-background)]"
      />
      <Avatar
        initials="+4"
        alt="4 more users"
        size="md"
        className="ring-2 ring-[var(--color-fw-background)]"
      />
    </div>
  ),
};
