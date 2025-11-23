/**
 * Spinner Stories
 *
 * Storybook stories for visual testing and documentation.
 *
 * @module @fluxwind/core/components
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';

const meta = {
  title: 'Core/Atoms/Spinner',
  component: Spinner,
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
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Spinner Component',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Spinner size="xs">Extra Small</Spinner>
      <Spinner size="sm">Small</Spinner>
      <Spinner size="md">Medium</Spinner>
      <Spinner size="lg">Large</Spinner>
      <Spinner size="xl">Extra Large</Spinner>
      <Spinner size="2xl">2X Large</Spinner>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Spinner variant="default">Default</Spinner>
      <Spinner variant="primary">Primary</Spinner>
      <Spinner variant="secondary">Secondary</Spinner>
      <Spinner variant="success">Success</Spinner>
      <Spinner variant="error">Error</Spinner>
      <Spinner variant="warning">Warning</Spinner>
      <Spinner variant="info">Info</Spinner>
    </div>
  ),
};
