import type { Preview } from '@storybook/react-vite';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import '../src/styles/index.css';

const preview: Preview = {
  parameters: {
    a11y: {
      config: {
        rules: [{ id: 'color-contrast', enabled: true }],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: 'centered',
  },
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
      attributeName: 'data-theme',
    }),
  ],
};

export default preview;
