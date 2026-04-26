import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { FileInput } from "./FileInput";

const meta: Meta<typeof FileInput> = {
  title: "Atoms/FileInput",
  component: FileInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Accessible file input atom with optional drag-and-drop zone, multi-file support, per-file removal, and WCAG 2.2 AA compliance.\n\n" +
          "- `label` is **always required** for accessibility.\n" +
          "- `draggable` (default `false`) switches between a plain trigger button and a drag-and-drop zone.\n" +
          "- `multiple` (default `true`) controls whether multiple files can be selected.\n" +
          "- `onChange` emits a native `FileList` on every change.\n" +
          "- Files are listed below the input with name, size, and a remove button.",
      },
    },
  },
  argTypes: {
    label: {
      description: "**Required.** Visible `<label>` text.",
      control: "text",
      table: { type: { summary: "string" } },
    },
    draggable: {
      description:
        "Switches the input to a drag-and-drop zone. Default `false`.",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    dropZoneText: {
      description:
        "Text shown inside the drag-and-drop zone. Only visible when `draggable=true`.",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"Drag files here or click to browse"' },
      },
    },
    triggerLabel: {
      description: "Label text for the trigger button (non-draggable mode).",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"Choose files"' },
      },
    },
    accept: {
      description:
        "Comma-separated MIME types or file extensions, e.g. `\"image/*,.pdf\"`.",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    multiple: {
      description: "Allow selecting multiple files. Default `true`.",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "true" } },
    },
    hint: {
      description: "Helper text below the input.",
      control: "text",
      table: { type: { summary: "string" }, defaultValue: { summary: "undefined" } },
    },
    error: {
      description: "Error message. Sets `aria-invalid` and links via `aria-describedby`.",
      control: "text",
      table: { type: { summary: "string" }, defaultValue: { summary: "undefined" } },
    },
    disabled: {
      description: "Disables the input and remove buttons.",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    radius: {
      description: "Border radius via `radiusMap` token.",
      control: "select",
      options: ["none", "sm", "md", "lg", "xl", "full"],
      table: {
        type: { summary: "'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'" },
        defaultValue: { summary: "'md'" },
      },
    },
    onChange: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof FileInput>;

export const Default: Story = {
  args: {
    label: "Attach documents",
    triggerLabel: "Choose files",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Default mode: a plain button opens the native file picker. Selected files appear as a list below.",
      },
    },
  },
};

export const Draggable: Story = {
  args: {
    label: "Upload files",
    draggable: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "`draggable=true` renders a dashed drop zone. You can drag files onto it or click to open the picker.",
      },
    },
  },
};

export const WithAcceptFilter: Story = {
  args: {
    label: "Upload images",
    accept: "image/*",
    hint: "PNG, JPG or WebP accepted.",
    triggerLabel: "Choose image",
  },
  parameters: {
    docs: {
      description: {
        story:
          "`accept=\"image/*\"` restricts the native picker to image files.",
      },
    },
  },
};

export const SingleFile: Story = {
  args: {
    label: "Upload CV",
    multiple: false,
    accept: ".pdf",
    triggerLabel: "Choose PDF",
    hint: "PDF only. Max 5 MB.",
  },
  parameters: {
    docs: {
      description: {
        story:
          "`multiple=false` — each new selection replaces the previous file.",
      },
    },
  },
};

export const WithError: Story = {
  args: {
    label: "Attach invoice",
    error: "File exceeds the 10 MB limit.",
  },
  parameters: {
    docs: {
      description: {
        story:
          "`error` turns the border destructive-colored and links the message via `aria-describedby`.",
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    label: "Upload (read-only)",
    disabled: true,
    hint: "File upload is currently unavailable.",
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled state: button and remove buttons are non-interactive.",
      },
    },
  },
};

export const DraggableWithError: Story = {
  args: {
    label: "Upload contract",
    draggable: true,
    error: "Only PDF files are accepted.",
    dropZoneText: "Drop your PDF here",
  },
  parameters: {
    docs: {
      description: {
        story: "Draggable zone with an error state — border turns destructive-colored.",
      },
    },
  },
};

function ControlledDemo() {
  const [fileNames, setFileNames] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-4 w-96">
      <FileInput
        label="Upload files"
        onChange={(files) => {
          setFileNames(Array.from(files).map((f) => f.name));
        }}
      />
      {fileNames.length > 0 && (
        <pre className="text-xs bg-[var(--color-fw-surface)] p-3 rounded-md">
          {JSON.stringify(fileNames, null, 2)}
        </pre>
      )}
    </div>
  );
}

export const Controlled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Example reading `onChange` — selected file names are logged below the input.",
      },
    },
  },
  render: () => <ControlledDemo />,
};
