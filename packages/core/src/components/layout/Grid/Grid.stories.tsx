/**
 * Grid Stories
 *
 * Storybook stories for visual testing and documentation.
 *
 * @module @fluxwind/core/components
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from './Grid';

const meta = {
  title: 'Core/Layouts/Grid',
  component: Grid,
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
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Grid Component',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Grid size="xs">Extra Small</Grid>
      <Grid size="sm">Small</Grid>
      <Grid size="md">Medium</Grid>
      <Grid size="lg">Large</Grid>
      <Grid size="xl">Extra Large</Grid>
      <Grid size="2xl">2X Large</Grid>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Grid variant="default">Default</Grid>
      <Grid variant="primary">Primary</Grid>
      <Grid variant="secondary">Secondary</Grid>
      <Grid variant="success">Success</Grid>
      <Grid variant="error">Error</Grid>
      <Grid variant="warning">Warning</Grid>
      <Grid variant="info">Info</Grid>
    </div>
  ),
};
