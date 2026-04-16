import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Flexible interactive button atom. Supports 6 visual variants, 5 sizes, configurable border radius and motion transitions. Renders a native `<button>` with forwarded ref, built-in loading state, and optional leading/trailing icons.\n\n" +
          "**Accessibility:** always provide `aria-label` when the button contains only an icon (no visible text).",
      },
    },
  },
  argTypes: {
    children: {
      description:
        "**Required.** Visible button label. Use a string for text-only buttons.",
      table: { type: { summary: "ReactNode" } },
      control: "text",
    },
    variant: {
      description:
        "Visual style of the button.\n\n" +
        "| Value | Use case |\n" +
        "|---|---|\n" +
        "| `primary` | Main call-to-action |\n" +
        "| `secondary` | Supporting action |\n" +
        "| `destructive` | Irreversible / dangerous action |\n" +
        "| `ghost` | Low-emphasis, transparent background |\n" +
        "| `outline` | Bordered, transparent background |\n" +
        "| `link` | Inline text-link style |",
      control: "select",
      options: [
        "primary",
        "secondary",
        "destructive",
        "ghost",
        "outline",
        "link",
      ],
      table: {
        type: {
          summary:
            "'primary' | 'secondary' | 'destructive' | 'ghost' | 'outline' | 'link'",
        },
        defaultValue: { summary: "'primary'" },
      },
    },
    size: {
      description:
        "Controls height, horizontal padding, and font size via the shared `sizeMap` token.",
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      table: {
        type: { summary: "'xs' | 'sm' | 'md' | 'lg' | 'xl'" },
        defaultValue: { summary: "'md'" },
      },
    },
    radius: {
      description:
        "Border radius applied to all corners via the shared `radiusMap` token.",
      control: "select",
      options: ["none", "sm", "md", "lg", "xl", "full"],
      table: {
        type: { summary: "'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'" },
        defaultValue: { summary: "'md'" },
      },
    },
    transition: {
      description:
        "Motion preset for hover/focus transitions via the shared `transitionMap` token. Set to `none` to respect `prefers-reduced-motion`.",
      control: "select",
      options: ["none", "smooth", "snappy", "spring", "slow"],
      table: {
        type: { summary: "'none' | 'smooth' | 'snappy' | 'spring' | 'slow'" },
        defaultValue: { summary: "'smooth'" },
      },
    },
    fullWidth: {
      description:
        "Stretches the button to fill its container (`width: 100%`).",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    loading: {
      description:
        "Shows a spinning indicator, sets `aria-busy`, and disables pointer events. The button remains in the DOM and accessible.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      description:
        "Disables the button. Inherited from `ButtonHTMLAttributes`. Also disabled automatically when `loading` is `true`.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    iconLeft: {
      description:
        "Icon rendered to the left of the label. Hidden from screen readers (`aria-hidden`). Accepts any `ReactNode` — typically an `<Icon>` atom.",
      control: false,
      table: {
        type: { summary: "ReactNode" },
        defaultValue: { summary: "undefined" },
      },
    },
    iconRight: {
      description:
        "Icon rendered to the right of the label. Hidden from screen readers (`aria-hidden`). Accepts any `ReactNode` — typically an `<Icon>` atom.",
      control: false,
      table: {
        type: { summary: "ReactNode" },
        defaultValue: { summary: "undefined" },
      },
    },
    "aria-label": {
      description:
        "**Required when the button contains only an icon** (no visible children). Provides an accessible name for screen readers.",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { children: "Button" },
  parameters: {
    docs: {
      description: {
        story:
          "Default `primary` variant at `md` size. Adjust any prop in the Controls panel below.",
      },
    },
  },
};

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "All 6 visual variants side by side. Choose the variant that matches the action hierarchy of your UI.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(
        [
          "primary",
          "secondary",
          "destructive",
          "ghost",
          "outline",
          "link",
        ] as const
      ).map((v) => (
        <Button key={v} variant={v}>
          {v.charAt(0).toUpperCase() + v.slice(1)}
        </Button>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "All 5 sizes from `xs` to `xl`. Sizes map to the shared `sizeMap` token (WCAG 2.5.5 touch target ≥ 44 × 44 px for `md` and above).",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
        <Button key={s} size={s}>
          {s.toUpperCase()}
        </Button>
      ))}
    </div>
  ),
};

export const Loading: Story = {
  args: { children: "Saving…", loading: true },
  parameters: {
    docs: {
      description: {
        story:
          "When `loading` is `true` a spinner replaces the icons, `aria-busy` is set, and pointer events are disabled. The button keeps its dimensions to prevent layout shift.",
      },
    },
  },
};

export const Disabled: Story = {
  args: { children: "Disabled", disabled: true },
  parameters: {
    docs: {
      description: {
        story:
          "Disabled state applies `opacity-50` and removes pointer events. Avoid using disabled buttons as the primary feedback mechanism — prefer inline validation errors instead.",
      },
    },
  },
};

export const FullWidth: Story = {
  args: { children: "Full width", fullWidth: true },
  parameters: {
    docs: {
      description: {
        story:
          "`fullWidth` stretches the button to 100% of its container. Useful for mobile layouts or form submit buttons.",
      },
    },
  },
};
