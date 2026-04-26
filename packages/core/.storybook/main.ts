import { createRequire } from "module";
import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";

// Vite 8 generates __vite-optional-peer-dep stubs for packages declared as
// optional peer deps — even when they ARE installed as devDependencies.
// We resolve to the actual ESM entry point so the stub is never hit.
const _require = createRequire(import.meta.url);
function resolveOptionalPeerEntry(pkg: string): string | undefined {
  try {
    return _require.resolve(pkg);
  } catch {
    return undefined;
  }
}

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.{ts,tsx}"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-themes",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  viteFinal: (config) => {
    config.plugins = [...(config.plugins ?? []), tailwindcss()];
    const tablerEntry = resolveOptionalPeerEntry("@tabler/icons-react");
    if (tablerEntry) {
      config.resolve ??= {};
      config.resolve.alias = {
        ...(config.resolve.alias as Record<string, string> | undefined),
        "@tabler/icons-react": tablerEntry,
      };
    }
    return config;
  },
};

export default config;
