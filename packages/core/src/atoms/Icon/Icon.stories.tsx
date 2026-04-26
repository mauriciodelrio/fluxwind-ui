import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Star,
  Info,
  AlertCircle,
  CheckCircle2,
  Heart,
  Search,
  Settings,
  User,
  Bell,
  Home,
} from "lucide-react";
import {
  IconMapPin,
  IconStar,
  IconHeart,
  IconSearch,
  IconBell,
  IconHome,
  IconSettings,
  IconUser,
  IconInfoCircle,
  IconAlertCircle,
} from "@tabler/icons-react";
import {
  siGithub,
  siNpm,
  siReact,
  siNextdotjs,
  siVercel,
  siTypescript,
} from "simple-icons";
import { Icon } from "./Icon";

const meta: Meta<typeof Icon> = {
  title: "Atoms/Icon",
  component: Icon,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Thin SVG wrapper with four usage modes:\n\n" +
          "**Mode 1 — Lucide** (`icon` prop): pass any `lucide-react` icon component. " +
          "Renders a consistent, stroke-based UI icon. Best for navigation, actions, and status.\n\n" +
          "**Mode 2 — Brand** (`simpleIcon` prop): pass a `simple-icons` icon object. " +
          "Embeds the SVG path inline — zero fetch, fully tree-shakeable. Best for tech logos.\n\n" +
          "**Mode 3 — Custom** (`children`): bring-your-own SVG paths. Backward-compatible escape hatch.\n\n" +
          '**Mode 4 — Tabler** (`icon` + `library="tabler"`): pass any `@tabler/icons-react` component. ' +
          "Optional peer dependency — only needed if you use this mode.\n\n" +
          '**Accessibility:** pass `label` to make the icon meaningful (`role="img" aria-label`). ' +
          'Omit `label` for decorative icons (`aria-hidden="true"`).',
      },
    },
  },
  argTypes: {
    size: {
      description:
        "Controls `width` and `height` via the shared `sizeMap` token.",
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      table: { defaultValue: { summary: "'md'" } },
    },
    label: {
      description:
        'Accessible name. Adds `role="img"` + `aria-label`. Omit for decorative icons.',
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

// ─── Mode 1: Lucide ───────────────────────────────────────────────────────────

export const LucideDecorative: Story = {
  name: "Lucide — Decorative",
  parameters: {
    docs: {
      description: {
        story:
          'No `label` → `aria-hidden="true"`. Use when the icon is purely visual and text nearby conveys the meaning.',
      },
    },
  },
  render: () => <Icon icon={Star} />,
};

export const LucideWithLabel: Story = {
  name: "Lucide — With label",
  parameters: {
    docs: {
      description: {
        story:
          '`label` provided → `role="img" aria-label`. **Required** when the icon is the only element conveying meaning.',
      },
    },
  },
  render: () => <Icon icon={Star} label="Favourite" />,
};

export const LucideSizes: Story = {
  name: "Lucide — Sizes",
  render: () => (
    <div className="flex items-center gap-4">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
        <Icon key={s} icon={Star} size={s} label={`${s} icon`} />
      ))}
    </div>
  ),
};

export const LucideShowcase: Story = {
  name: "Lucide — Showcase",
  parameters: {
    docs: {
      description: {
        story: "A sample of common Lucide UI icons at `md` size.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {[
        Info,
        AlertCircle,
        CheckCircle2,
        Heart,
        Search,
        Settings,
        User,
        Bell,
        Home,
      ].map((Ic, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <Icon key={i} icon={Ic} label={Ic.displayName ?? "icon"} />
      ))}
    </div>
  ),
};

// ─── Mode 2: Brand (Simple Icons) ────────────────────────────────────────────

export const BrandWithLabel: Story = {
  name: "Brand — GitHub",
  parameters: {
    docs: {
      description: {
        story:
          "Simple Icons path embedded inline — no fetch, fully bundled. " +
          'Use `fill="currentColor"` (via className) to control color.',
      },
    },
  },
  render: () => <Icon simpleIcon={siGithub} label="GitHub" />,
};

export const BrandShowcase: Story = {
  name: "Brand — Showcase",
  parameters: {
    docs: {
      description: {
        story:
          'Tech brand icons via `simple-icons`. All use `fill="currentColor"`.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      {[
        { si: siGithub, name: "GitHub" },
        { si: siNpm, name: "npm" },
        { si: siReact, name: "React" },
        { si: siNextdotjs, name: "Next.js" },
        { si: siVercel, name: "Vercel" },
        { si: siTypescript, name: "TypeScript" },
      ].map(({ si, name }) => (
        <div key={name} className="flex flex-col items-center gap-1">
          <Icon simpleIcon={si} label={name} size="lg" />
          <span className="text-xs text-[var(--color-fw-muted)]">{name}</span>
        </div>
      ))}
    </div>
  ),
};

// ─── Mode 3: Custom children ──────────────────────────────────────────────────

export const CustomChildren: Story = {
  name: "Custom — Children",
  parameters: {
    docs: {
      description: {
        story:
          "Bring-your-own SVG paths. Backward-compatible escape hatch for custom icons.",
      },
    },
  },
  render: () => (
    <Icon label="Custom star">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </Icon>
  ),
};

// ─── Mode 4: Tabler ───────────────────────────────────────────────────────────

export const TablerDecorative: Story = {
  name: "Tabler — Decorative",
  parameters: {
    docs: {
      description: {
        story:
          'Pass any `@tabler/icons-react` component via `icon` + `library="tabler"`. ' +
          'No `label` → `aria-hidden="true"`. Same size tokens as Lucide.',
      },
    },
  },
  render: () => <Icon icon={IconMapPin} library="tabler" />,
};

export const TablerWithLabel: Story = {
  name: "Tabler — With label",
  parameters: {
    docs: {
      description: {
        story:
          'Setting `label` adds `role="img"` + `aria-label` for screen readers.',
      },
    },
  },
  render: () => (
    <Icon icon={IconMapPin} library="tabler" label="Location pin" />
  ),
};

export const TablerStrokeWidth: Story = {
  name: "Tabler — strokeWidth",
  parameters: {
    docs: {
      description: {
        story:
          "Control stroke weight via `strokeWidth`. Tabler default is `2`.",
      },
    },
  },
  render: () => (
    <div className="flex items-end gap-6">
      {([1, 1.5, 2, 3] as const).map((sw) => (
        <div key={sw} className="flex flex-col items-center gap-1">
          <Icon
            icon={IconStar}
            library="tabler"
            size="lg"
            label={`strokeWidth ${String(sw)}`}
            strokeWidth={sw}
          />
          <span className="text-xs text-[var(--color-fw-muted)]">{sw}</span>
        </div>
      ))}
    </div>
  ),
};

export const TablerSizeComparison: Story = {
  name: "Tabler — Sizes",
  render: () => (
    <div className="flex items-end gap-4">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
        <div key={s} className="flex flex-col items-center gap-1">
          <Icon
            icon={IconHeart}
            library="tabler"
            size={s}
            label={`${s} icon`}
          />
          <span className="text-xs text-[var(--color-fw-muted)]">{s}</span>
        </div>
      ))}
    </div>
  ),
};

export const TablerShowcase: Story = {
  name: "Tabler — Showcase",
  parameters: {
    docs: {
      description: {
        story:
          "A sample of Tabler UI icons at `md` size. Same visual weight as Lucide counterparts.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {[
        { Ic: IconSearch, name: "Search" },
        { Ic: IconBell, name: "Bell" },
        { Ic: IconHome, name: "Home" },
        { Ic: IconSettings, name: "Settings" },
        { Ic: IconUser, name: "User" },
        { Ic: IconInfoCircle, name: "Info" },
        { Ic: IconAlertCircle, name: "Alert" },
      ].map(({ Ic, name }) => (
        <div key={name} className="flex flex-col items-center gap-1">
          <Icon icon={Ic} library="tabler" label={name} />
          <span className="text-xs text-[var(--color-fw-muted)]">{name}</span>
        </div>
      ))}
    </div>
  ),
};

export const LucideVsTabler: Story = {
  name: "Lucide vs Tabler",
  parameters: {
    docs: {
      description: {
        story:
          "Side-by-side comparison of the same icon from Lucide and Tabler using identical props.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-start gap-8">
      <div className="flex flex-col items-center gap-1">
        <Icon icon={Star} label="Lucide Star" />
        <span className="text-xs text-[var(--color-fw-muted)]">Lucide</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Icon icon={IconStar} library="tabler" label="Tabler Star" />
        <span className="text-xs text-[var(--color-fw-muted)]">Tabler</span>
      </div>
    </div>
  ),
};
