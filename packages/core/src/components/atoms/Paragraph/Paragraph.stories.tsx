/**
 * Paragraph Stories
 *
 * Storybook stories for visual testing and documentation.
 *
 * @module @fluxwind/core/components
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Paragraph } from './Paragraph';

const meta = {
  title: 'Core/Atoms/Paragraph',
  component: Paragraph,
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
} satisfies Meta<typeof Paragraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Paragraph Component',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Paragraph size="xs">Extra Small</Paragraph>
      <Paragraph size="sm">Small</Paragraph>
      <Paragraph size="md">Medium</Paragraph>
      <Paragraph size="lg">Large</Paragraph>
      <Paragraph size="xl">Extra Large</Paragraph>
      <Paragraph size="2xl">2X Large</Paragraph>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Paragraph variant="default">Default</Paragraph>
      <Paragraph variant="primary">Primary</Paragraph>
      <Paragraph variant="secondary">Secondary</Paragraph>
      <Paragraph variant="success">Success</Paragraph>
      <Paragraph variant="error">Error</Paragraph>
      <Paragraph variant="warning">Warning</Paragraph>
      <Paragraph variant="info">Info</Paragraph>
    </div>
  ),
};
