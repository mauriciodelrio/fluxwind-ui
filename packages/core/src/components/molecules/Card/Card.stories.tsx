/**
 * Card Stories
 *
 * Storybook stories for visual testing and documentation.
 *
 * @module @fluxwind/core/components
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta = {
  title: 'Core/Molecules/Card',
  component: Card,
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
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Card Component',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Card size="xs">Extra Small</Card>
      <Card size="sm">Small</Card>
      <Card size="md">Medium</Card>
      <Card size="lg">Large</Card>
      <Card size="xl">Extra Large</Card>
      <Card size="2xl">2X Large</Card>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Card variant="default">Default</Card>
      <Card variant="primary">Primary</Card>
      <Card variant="secondary">Secondary</Card>
      <Card variant="success">Success</Card>
      <Card variant="error">Error</Card>
      <Card variant="warning">Warning</Card>
      <Card variant="info">Info</Card>
    </div>
  ),
};
