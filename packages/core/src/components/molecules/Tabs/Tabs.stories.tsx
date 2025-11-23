/**
 * Tabs Stories
 *
 * Storybook stories for visual testing and documentation.
 *
 * @module @fluxwind/core/components
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';

const meta = {
  title: 'Core/Molecules/Tabs',
  component: Tabs,
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
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Tabs Component',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Tabs size="xs">Extra Small</Tabs>
      <Tabs size="sm">Small</Tabs>
      <Tabs size="md">Medium</Tabs>
      <Tabs size="lg">Large</Tabs>
      <Tabs size="xl">Extra Large</Tabs>
      <Tabs size="2xl">2X Large</Tabs>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Tabs variant="default">Default</Tabs>
      <Tabs variant="primary">Primary</Tabs>
      <Tabs variant="secondary">Secondary</Tabs>
      <Tabs variant="success">Success</Tabs>
      <Tabs variant="error">Error</Tabs>
      <Tabs variant="warning">Warning</Tabs>
      <Tabs variant="info">Info</Tabs>
    </div>
  ),
};
