import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'destructive', 'info', 'outline'],
    },
    radius: { control: 'select', options: ['none', 'sm', 'md', 'lg', 'full'] },
    dot: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { children: 'Badge' },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(['default', 'primary', 'success', 'warning', 'destructive', 'info', 'outline'] as const).map(
        (v) => (
          <Badge key={v} variant={v}>
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </Badge>
        ),
      )}
    </div>
  ),
};

export const WithDot: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success" dot>
        Online
      </Badge>
      <Badge variant="warning" dot>
        Away
      </Badge>
      <Badge variant="destructive" dot>
        Offline
      </Badge>
    </div>
  ),
};

export const Radii: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(['none', 'sm', 'md', 'lg', 'full'] as const).map((r) => (
        <Badge key={r} radius={r}>
          {r}
        </Badge>
      ))}
    </div>
  ),
};
