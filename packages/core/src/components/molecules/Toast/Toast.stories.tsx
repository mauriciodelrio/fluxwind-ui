/**
 * Toast Stories
 *
 * Storybook stories for visual testing and documentation.
 *
 * @module @fluxwind/core/components
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';

const meta = {
  title: 'Core/Molecules/Toast',
  component: Toast,
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
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Toast Component',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Toast size="xs">Extra Small</Toast>
      <Toast size="sm">Small</Toast>
      <Toast size="md">Medium</Toast>
      <Toast size="lg">Large</Toast>
      <Toast size="xl">Extra Large</Toast>
      <Toast size="2xl">2X Large</Toast>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Toast variant="default">Default</Toast>
      <Toast variant="primary">Primary</Toast>
      <Toast variant="secondary">Secondary</Toast>
      <Toast variant="success">Success</Toast>
      <Toast variant="error">Error</Toast>
      <Toast variant="warning">Warning</Toast>
      <Toast variant="info">Info</Toast>
    </div>
  ),
};
