import type { Meta, StoryObj } from "@storybook/react";
import { CodeBlock } from "./CodeBlock";

const meta: Meta<typeof CodeBlock> = {
  title: "Molecules/CodeBlock",
  component: CodeBlock,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    language: {
      control: "select",
      options: [
        "tsx",
        "typescript",
        "javascript",
        "css",
        "json",
        "bash",
        "markdown",
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof CodeBlock>;

// ─── Snippets ─────────────────────────────────────────────────────────────────

const TSX_SNIPPET = `import { useState } from "react";

interface CounterProps {
  initialCount?: number;
}

export function Counter({ initialCount = 0 }: CounterProps) {
  const [count, setCount] = useState(initialCount);

  return (
    <div className="flex items-center gap-4">
      <button onClick={() => setCount((c) => c - 1)}>-</button>
      <span>{count}</span>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
    </div>
  );
}`;

const TS_SNIPPET = `type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

async function fetchUser(id: string): Promise<Result<User>> {
  const res = await fetch(\`/api/users/\${id}\`);
  if (!res.ok) return { ok: false, error: new Error(res.statusText) };
  return { ok: true, value: await res.json() };
}`;

const CSS_SNIPPET = `:root {
  --color-primary: oklch(0.44 0.22 264);
  --radius-md: 0.375rem;
}

.button {
  display: inline-flex;
  align-items: center;
  border-radius: var(--radius-md);
  background-color: var(--color-primary);
  color: white;
  padding: 0.5rem 1rem;
  transition: opacity 150ms ease;
}

.button:hover {
  opacity: 0.9;
}`;

const JSON_SNIPPET = `{
  "name": "@fluxwind/core",
  "version": "0.1.0",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "peerDependencies": {
    "react": ">=19",
    "react-dom": ">=19"
  }
}`;

const BASH_SNIPPET = `# Install FluxWind
pnpm add @fluxwind/core

# Set up Tailwind config
npx fluxwind init

# Start Storybook
pnpm storybook`;

// ─── Stories ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    code: TSX_SNIPPET,
    language: "tsx",
  },
};

export const WithFilename: Story = {
  args: {
    code: TSX_SNIPPET,
    language: "tsx",
    filename: "Counter.tsx",
  },
};

export const WithLineNumbers: Story = {
  args: {
    code: TSX_SNIPPET,
    language: "tsx",
    filename: "Counter.tsx",
    showLineNumbers: true,
  },
};

export const WithHighlightedLines: Story = {
  args: {
    code: TSX_SNIPPET,
    language: "tsx",
    filename: "Counter.tsx",
    showLineNumbers: true,
    highlightLines: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
  },
};

export const NoCopyButton: Story = {
  args: {
    code: BASH_SNIPPET,
    language: "bash",
    filename: "install.sh",
    showCopyButton: false,
  },
};

export const TypeScript: Story = {
  args: {
    code: TS_SNIPPET,
    language: "typescript",
    filename: "fetchUser.ts",
    showLineNumbers: true,
    highlightLines: [3, 4],
  },
};

export const CSS: Story = {
  args: {
    code: CSS_SNIPPET,
    language: "css",
    filename: "tokens.css",
    showLineNumbers: true,
  },
};

export const JSON: Story = {
  args: {
    code: JSON_SNIPPET,
    language: "json",
    filename: "package.json",
  },
};

export const Bash: Story = {
  args: {
    code: BASH_SNIPPET,
    language: "bash",
    filename: "install.sh",
    showLineNumbers: true,
  },
};

export const MinimalNoHeader: Story = {
  name: "Minimal (no header)",
  args: {
    code: `const greeting = "Hello, world!";`,
    language: "typescript",
    showCopyButton: false,
  },
};
