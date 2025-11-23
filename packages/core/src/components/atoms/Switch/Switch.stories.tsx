/**
 * Switch Stories
 *
 * Storybook stories for visual testing and documentation.
 *
 * @module @fluxwind/core/components
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';

const meta = {
  title: 'Core/Atoms/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'error', 'warning', 'info'],
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Switch Component',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch size="xs">Extra Small</Switch>
      <Switch size="sm">Small</Switch>
      <Switch size="md">Medium</Switch>
      <Switch size="lg">Large</Switch>
      <Switch size="xl">Extra Large</Switch>
      <Switch size="2xl">2X Large</Switch>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Switch variant="default">Default</Switch>
      <Switch variant="primary">Primary</Switch>
      <Switch variant="secondary">Secondary</Switch>
      <Switch variant="success">Success</Switch>
      <Switch variant="error">Error</Switch>
      <Switch variant="warning">Warning</Switch>
      <Switch variant="info">Info</Switch>
    </div>
  ),
};
