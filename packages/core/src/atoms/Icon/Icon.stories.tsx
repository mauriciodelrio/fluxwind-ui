import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from './Icon';

// Sample SVG path — a simple star shape for demo purposes
const StarPath = () => (
  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
);

const meta: Meta<typeof Icon> = {
  title: 'Atoms/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Decorative: Story = {
  render: () => (
    <Icon>
      <StarPath />
    </Icon>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <Icon label="Favourite">
      <StarPath />
    </Icon>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
        <Icon key={s} size={s} label={`${s} icon`}>
          <StarPath />
        </Icon>
      ))}
    </div>
  ),
};
