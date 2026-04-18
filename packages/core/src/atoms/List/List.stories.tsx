import type { Meta, StoryObj } from "@storybook/react-vite";
import { List } from "./List";

const meta: Meta<typeof List> = {
  title: "Atoms/List",
  component: List,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Flexible list atom. Renders a `<ul>` or `<ol>` depending on the `variant` prop. " +
          "Supports three sizes and a `none` variant for unstyled lists. " +
          "Use `List.Item` for individual items with optional muted color.\n\n" +
          "**Accessibility:** uses native `<ul>`/`<ol>` + `<li>` elements — screen-reader friendly by default.",
      },
    },
  },
  argTypes: {
    variant: {
      description: "Marker style for list items.",
      control: "select",
      options: ["unordered", "ordered", "none"],
      table: {
        type: { summary: "'unordered' | 'ordered' | 'none'" },
        defaultValue: { summary: "'unordered'" },
      },
    },
    size: {
      description: "Controls item spacing and font size.",
      control: "select",
      options: ["sm", "md", "lg"],
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: "'md'" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  "Design tokens",
  "CVA variants",
  "WCAG 2.2 AA",
  "Storybook stories",
];

export const Unordered: Story = {
  render: (args) => (
    <List {...args}>
      {items.map((item) => (
        <List.Item key={item}>{item}</List.Item>
      ))}
    </List>
  ),
  args: { variant: "unordered", size: "md" },
};

export const Ordered: Story = {
  render: (args) => (
    <List {...args}>
      {items.map((item) => (
        <List.Item key={item}>{item}</List.Item>
      ))}
    </List>
  ),
  args: { variant: "ordered", size: "md" },
};

export const Unstyled: Story = {
  render: (args) => (
    <List {...args}>
      {items.map((item) => (
        <List.Item key={item}>{item}</List.Item>
      ))}
    </List>
  ),
  args: { variant: "none", size: "md" },
};

export const WithMutedItems: Story = {
  render: (args) => (
    <List {...args}>
      <List.Item>Primary item</List.Item>
      <List.Item muted>Muted secondary item</List.Item>
      <List.Item>Primary item</List.Item>
      <List.Item muted>Muted secondary item</List.Item>
    </List>
  ),
  args: { variant: "unordered", size: "md" },
};

export const Small: Story = {
  render: (args) => (
    <List {...args}>
      {items.map((item) => (
        <List.Item key={item}>{item}</List.Item>
      ))}
    </List>
  ),
  args: { variant: "unordered", size: "sm" },
};

export const Large: Story = {
  render: (args) => (
    <List {...args}>
      {items.map((item) => (
        <List.Item key={item}>{item}</List.Item>
      ))}
    </List>
  ),
  args: { variant: "unordered", size: "lg" },
};
