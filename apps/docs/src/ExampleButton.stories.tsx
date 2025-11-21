import type { Meta, StoryObj } from '@storybook/react';

// Example component for testing Playwright setup
function ExampleButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
      type="button"
    >
      {children}
    </button>
  );
}

const meta: Meta<typeof ExampleButton> = {
  title: 'Examples/Button',
  component: ExampleButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Example button component for testing Playwright E2E setup.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ExampleButton>;

export const Primary: Story = {
  args: {
    children: 'Click me',
  },
};

export const WithClick: Story = {
  args: {
    children: 'Click me',
    onClick: () => {
      alert('Button clicked!');
    },
  },
};
