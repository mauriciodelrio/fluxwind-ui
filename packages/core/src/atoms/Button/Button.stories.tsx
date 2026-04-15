import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'destructive', 'ghost', 'outline', 'link'],
    },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    radius: { control: 'select', options: ['none', 'sm', 'md', 'lg', 'xl', 'full'] },
    transition: { control: 'select', options: ['none', 'smooth', 'snappy', 'spring', 'slow'] },
    fullWidth: { control: 'boolean' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { children: 'Button' },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(['primary', 'secondary', 'destructive', 'ghost', 'outline', 'link'] as const).map(
        (v) => (
          <Button key={v} variant={v}>
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </Button>
        ),
      )}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
        <Button key={s} size={s}>
          {s.toUpperCase()}
        </Button>
      ))}
    </div>
  ),
};

export const Loading: Story = {
  args: { children: 'Saving…', loading: true },
};

export const Disabled: Story = {
  args: { children: 'Disabled', disabled: true },
};

export const FullWidth: Story = {
  args: { children: 'Full width', fullWidth: true },
};
