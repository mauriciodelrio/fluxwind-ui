/**
 * Icon Stories
 *
 * Storybook stories for visual testing and documentation.
 *
 * @module @fluxwind/core/components
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';

const meta = {
  title: 'Core/Atoms/Icon',
  component: Icon,
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
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Icon Component',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Icon size="xs">Extra Small</Icon>
      <Icon size="sm">Small</Icon>
      <Icon size="md">Medium</Icon>
      <Icon size="lg">Large</Icon>
      <Icon size="xl">Extra Large</Icon>
      <Icon size="2xl">2X Large</Icon>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Icon variant="default">Default</Icon>
      <Icon variant="primary">Primary</Icon>
      <Icon variant="secondary">Secondary</Icon>
      <Icon variant="success">Success</Icon>
      <Icon variant="error">Error</Icon>
      <Icon variant="warning">Warning</Icon>
      <Icon variant="info">Info</Icon>
    </div>
  ),
};
