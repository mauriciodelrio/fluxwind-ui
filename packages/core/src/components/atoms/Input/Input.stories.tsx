/**
 * Input Stories
 *
 * Storybook stories for visual testing and documentation.
 *
 * @module @fluxwind/core/components
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta = {
  title: 'Core/Atoms/Input',
  component: Input,
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
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Input Component',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Input size="xs">Extra Small</Input>
      <Input size="sm">Small</Input>
      <Input size="md">Medium</Input>
      <Input size="lg">Large</Input>
      <Input size="xl">Extra Large</Input>
      <Input size="2xl">2X Large</Input>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Input variant="default">Default</Input>
      <Input variant="primary">Primary</Input>
      <Input variant="secondary">Secondary</Input>
      <Input variant="success">Success</Input>
      <Input variant="error">Error</Input>
      <Input variant="warning">Warning</Input>
      <Input variant="info">Info</Input>
    </div>
  ),
};
