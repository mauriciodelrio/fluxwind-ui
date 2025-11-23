/**
 * Dialog Stories
 *
 * Storybook stories for visual testing and documentation.
 *
 * @module @fluxwind/core/components
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Dialog } from './Dialog';

const meta = {
  title: 'Core/Molecules/Dialog',
  component: Dialog,
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
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Dialog Component',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Dialog size="xs">Extra Small</Dialog>
      <Dialog size="sm">Small</Dialog>
      <Dialog size="md">Medium</Dialog>
      <Dialog size="lg">Large</Dialog>
      <Dialog size="xl">Extra Large</Dialog>
      <Dialog size="2xl">2X Large</Dialog>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Dialog variant="default">Default</Dialog>
      <Dialog variant="primary">Primary</Dialog>
      <Dialog variant="secondary">Secondary</Dialog>
      <Dialog variant="success">Success</Dialog>
      <Dialog variant="error">Error</Dialog>
      <Dialog variant="warning">Warning</Dialog>
      <Dialog variant="info">Info</Dialog>
    </div>
  ),
};
