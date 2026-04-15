import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    radius: { control: 'select', options: ['none', 'sm', 'md', 'lg', 'xl', 'full'] },
    transition: { control: 'select', options: ['none', 'smooth', 'snappy'] },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    type: 'email',
  },
};

export const WithHint: Story = {
  args: {
    label: 'Username',
    hint: 'Must be at least 3 characters.',
    placeholder: 'johndoe',
  },
};

export const WithError: Story = {
  args: {
    label: 'Password',
    type: 'password',
    error: 'Password must be at least 8 characters.',
    defaultValue: 'abc',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Read only field',
    defaultValue: 'Cannot edit this',
    disabled: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      {(['sm', 'md', 'lg'] as const).map((s) => (
        <Input key={s} label={`Size ${s.toUpperCase()}`} size={s} placeholder={`size ${s}`} />
      ))}
    </div>
  ),
};
