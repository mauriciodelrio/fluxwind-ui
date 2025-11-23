/**
 * Tooltip Stories
 *
 * Storybook stories for visual testing and documentation.
 *
 * @module @fluxwind/core/components
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';

const meta = {
  title: 'Core/Molecules/Tooltip',
  component: Tooltip,
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
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Tooltip Component',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Tooltip size="xs">Extra Small</Tooltip>
      <Tooltip size="sm">Small</Tooltip>
      <Tooltip size="md">Medium</Tooltip>
      <Tooltip size="lg">Large</Tooltip>
      <Tooltip size="xl">Extra Large</Tooltip>
      <Tooltip size="2xl">2X Large</Tooltip>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Tooltip variant="default">Default</Tooltip>
      <Tooltip variant="primary">Primary</Tooltip>
      <Tooltip variant="secondary">Secondary</Tooltip>
      <Tooltip variant="success">Success</Tooltip>
      <Tooltip variant="error">Error</Tooltip>
      <Tooltip variant="warning">Warning</Tooltip>
      <Tooltip variant="info">Info</Tooltip>
    </div>
  ),
};
