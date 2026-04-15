import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from './Text';

const meta: Meta<typeof Text> = {
  title: 'Atoms/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['body', 'lead', 'small', 'caption', 'code', 'label'],
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
    },
    truncate: { control: 'boolean' },
    as: { control: 'select', options: ['p', 'span', 'div', 'h1', 'h2', 'h3', 'label'] },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: { children: 'The quick brown fox jumps over the lazy dog.' },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {(['body', 'lead', 'small', 'caption', 'label'] as const).map((v) => (
        <Text key={v} variant={v}>
          {v.charAt(0).toUpperCase() + v.slice(1)} — The quick brown fox
        </Text>
      ))}
      <Text variant="code">const answer = 42;</Text>
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {(['normal', 'medium', 'semibold', 'bold'] as const).map((w) => (
        <Text key={w} weight={w}>
          Weight {w}
        </Text>
      ))}
    </div>
  ),
};

export const Truncated: Story = {
  render: () => (
    <div className="w-48">
      <Text truncate>
        This very long text will be truncated at the container boundary.
      </Text>
    </div>
  ),
};

export const PolymorphicHeading: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Text as="h1" variant="lead" weight="bold">
        H1 via as prop
      </Text>
      <Text as="h2" variant="body" weight="semibold">
        H2 via as prop
      </Text>
      <Text as="span" variant="caption">
        span via as prop
      </Text>
    </div>
  ),
};
