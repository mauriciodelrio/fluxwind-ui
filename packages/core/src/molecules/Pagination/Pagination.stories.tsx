import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pagination } from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Molecules/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A pagination navigation molecule that computes a smart page range with optional ellipsis.\n\n" +
          "## Design decisions\n\n" +
          "| Decision | Rationale |\n" +
          "|---|---|\n" +
          "| `<nav>` with `aria-label` | WCAG landmark; screen readers can jump to it |\n" +
          "| `aria-current='page'` on active | Screen readers announce 'Page X, current' |\n" +
          "| `aria-hidden` on ellipsis | Non-informative decoration — not read aloud |\n" +
          "| `disabled` on active page | Prevents double-clicks and is semantically correct |\n" +
          "| Customisable labels | `previousLabel` / `nextLabel` / `aria-label` enable full i18n |\n" +
          "| `showEdges` prop | Controls whether first/last pages always appear |\n" +
          "| `siblingCount` prop | Controls the window of pages around the active page |\n\n" +
          "## Keyboard\n\n" +
          "- `Tab` — moves focus through buttons\n" +
          "- `Enter` / `Space` — activates focused button\n",
      },
    },
  },
  argTypes: {
    page: {
      description: "Current active page (1-based).",
      control: { type: "number", min: 1 },
    },
    totalPages: {
      description: "Total number of pages.",
      control: { type: "number", min: 1 },
    },
    siblingCount: {
      description: "Number of page buttons on each side of the active page.",
      control: { type: "number", min: 0, max: 3 },
      table: { defaultValue: { summary: "1" } },
    },
    showEdges: {
      description: "Always show first and last page buttons.",
      control: "boolean",
      table: { defaultValue: { summary: "true" } },
    },
    size: {
      description: "Size of all buttons.",
      control: "select",
      options: ["sm", "md", "lg"],
      table: { defaultValue: { summary: "'md'" } },
    },
    "aria-label": {
      description: "Accessible label for the nav landmark.",
      control: "text",
      table: { defaultValue: { summary: "'Pagination'" } },
    },
    previousLabel: {
      description: "Accessible label for the previous-page button.",
      control: "text",
      table: { defaultValue: { summary: "'Previous page'" } },
    },
    nextLabel: {
      description: "Accessible label for the next-page button.",
      control: "text",
      table: { defaultValue: { summary: "'Next page'" } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

// ─── Controlled wrapper ───────────────────────────────────────────────────────

function Controlled(args: Parameters<typeof Pagination>[0]) {
  const [page, setPage] = useState(args.page);
  return <Pagination {...args} page={page} onPageChange={setPage} />;
}

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    page: 5,
    totalPages: 12,
    siblingCount: 1,
    showEdges: true,
    size: "md",
  },
};

export const SmallSize: Story = {
  render: (args) => <Controlled {...args} />,
  args: { ...Default.args, size: "sm" },
};

export const LargeSize: Story = {
  render: (args) => <Controlled {...args} />,
  args: { ...Default.args, size: "lg" },
};

export const WideSiblings: Story = {
  name: "Wide siblings (siblingCount=2)",
  render: (args) => <Controlled {...args} />,
  args: { ...Default.args, siblingCount: 2 },
};

export const NoEdges: Story = {
  name: "No edges (showEdges=false)",
  render: (args) => <Controlled {...args} />,
  args: { ...Default.args, showEdges: false },
};

export const FewPages: Story = {
  name: "Few pages (no ellipsis)",
  render: (args) => <Controlled {...args} />,
  args: {
    page: 2,
    totalPages: 5,
    siblingCount: 1,
    showEdges: true,
    size: "md",
  },
};

export const FirstPage: Story = {
  render: (args) => <Controlled {...args} />,
  args: { ...Default.args, page: 1 },
};

export const LastPage: Story = {
  render: (args) => <Controlled {...args} />,
  args: { ...Default.args, page: 12 },
};

export const SinglePage: Story = {
  name: "Single page",
  render: (args) => <Controlled {...args} />,
  args: {
    page: 1,
    totalPages: 1,
    siblingCount: 1,
    showEdges: true,
    size: "md",
  },
};

export const Localised: Story = {
  name: "Localised labels (Spanish)",
  render: (args) => <Controlled {...args} />,
  args: {
    ...Default.args,
    "aria-label": "Paginación",
    previousLabel: "Página anterior",
    nextLabel: "Página siguiente",
  },
};
