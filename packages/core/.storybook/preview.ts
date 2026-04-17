import type { Preview } from "@storybook/react-vite";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import "../src/styles/index.css";
import "../src/styles/themes/creative.css";
import "../src/styles/themes/commerce.css";
import "../src/styles/themes/education.css";
import "../src/styles/themes/finance.css";
import "../src/styles/themes/health.css";
import "../src/styles/themes/legal.css";
import "../src/styles/themes/high-contrast.css";
import "./preview.css";

const preview: Preview = {
  parameters: {
    a11y: {
      config: {
        rules: [{ id: "color-contrast", enabled: true }],
      },
    },
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: "centered",
  },
  decorators: [
    withThemeByDataAttribute({
      themes: {
        Creative: "creative",
        Health: "health",
        Commerce: "commerce",
        Finance: "finance",
        Education: "education",
        Legal: "legal",
        "High Contrast ♿": "high-contrast",
      },
      defaultTheme: "Creative",
      attributeName: "data-fw-theme",
      parentSelector: "html",
    }),
    withThemeByDataAttribute({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
      attributeName: "data-theme",
      parentSelector: "html",
    }),
  ],
};

export default preview;
