/**
 * Checkbox Stories
 *
 * Storybook stories for visual testing and documentation.
 *
 * @module @fluxwind/core/components
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Core/Atoms/Checkbox',
  component: Checkbox,
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
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Checkbox Component',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox size="xs">Extra Small</Checkbox>
      <Checkbox size="sm">Small</Checkbox>
      <Checkbox size="md">Medium</Checkbox>
      <Checkbox size="lg">Large</Checkbox>
      <Checkbox size="xl">Extra Large</Checkbox>
      <Checkbox size="2xl">2X Large</Checkbox>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Checkbox variant="default">Default</Checkbox>
      <Checkbox variant="primary">Primary</Checkbox>
      <Checkbox variant="secondary">Secondary</Checkbox>
      <Checkbox variant="success">Success</Checkbox>
      <Checkbox variant="error">Error</Checkbox>
      <Checkbox variant="warning">Warning</Checkbox>
      <Checkbox variant="info">Info</Checkbox>
    </div>
  ),
};
