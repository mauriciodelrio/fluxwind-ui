import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState, type ComponentPropsWithoutRef } from "react";
import { Rocket } from "lucide-react";
import { Alert } from "./Alert";

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Alert> = {
  title: "Molecules/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Alert surfaces contextual feedback messages with semantic colour, an intent icon, and an optional dismiss action.\n\n" +
          "## Design decisions\n\n" +
          "| Decision | Rationale |\n" +
          "|---|---|\n" +
          '| `role="alert"` for error / warning | Assertive live region — announced immediately by screen readers |\n' +
          '| `role="status"` for info / success | Polite live region — announced when the reader is idle |\n' +
          "| Icon `aria-hidden` | Intent is communicated via role + colour; the icon is decorative |\n" +
          "| `onDismiss` callback (not internal state) | Caller controls visibility — enables animation, logging, etc. |\n" +
          "| `icon=null` to suppress icon | Explicit opt-out — avoids implicit empty space in title-only variants |\n\n" +
          "## Live region tip\n\n" +
          "For screen readers to announce an `<Alert>` that appears **after** initial render " +
          "(e.g., after form submit), render it conditionally so the element is inserted into the DOM dynamically. " +
          "Changing only the text inside a pre-rendered Alert also works.",
      },
    },
  },
  argTypes: {
    intent: {
      description: "Semantic intent — controls colour, icon, and ARIA role.",
      control: "select",
      options: ["info", "success", "warning", "error"],
    },
    title: {
      description: "Optional bold title above the body.",
      control: "text",
    },
    children: {
      description: "Alert body content.",
      control: "text",
    },
    onDismiss: {
      description:
        "When provided, renders a dismiss (×) button. Caller removes the Alert from the tree.",
      control: false,
    },
    dismissLabel: {
      description: "Accessible label for the dismiss button.",
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

// ─── Intents ─────────────────────────────────────────────────────────────────

export const Info: Story = {
  args: {
    intent: "info",
    title: "Did you know?",
    children: "You can customise your notification preferences in Settings.",
  },
};

export const Success: Story = {
  args: {
    intent: "success",
    title: "Changes saved",
    children: "Your profile has been updated successfully.",
  },
};

export const Warning: Story = {
  args: {
    intent: "warning",
    title: "Subscription expiring",
    children: "Your plan expires in 3 days. Renew to avoid interruption.",
  },
};

export const ErrorAlert: Story = {
  name: "Error",
  args: {
    intent: "error",
    title: "Upload failed",
    children: "The file exceeds the 10 MB limit. Please choose a smaller file.",
  },
};

// ─── Dismiss ──────────────────────────────────────────────────────────────────

function DismissibleAlert(args: ComponentPropsWithoutRef<typeof Alert>) {
  const [visible, setVisible] = useState(true);
  return visible ? (
    <Alert
      {...args}
      onDismiss={() => {
        setVisible(false);
      }}
    />
  ) : (
    <p className="text-sm text-[var(--color-fw-muted)]">
      Alert dismissed — refresh to see it again.
    </p>
  );
}

export const Dismissible: Story = {
  render: (args) => <DismissibleAlert {...args} />,
  args: {
    intent: "info",
    title: "Update available",
    children: "A new version of the app is ready to install.",
  },
};

// ─── Body only ───────────────────────────────────────────────────────────────

export const BodyOnly: Story = {
  args: {
    intent: "warning",
    children: "Your session will expire in 5 minutes.",
  },
};

export const TitleOnly: Story = {
  args: {
    intent: "success",
    title: "Verification email sent.",
  },
};

// ─── No icon ─────────────────────────────────────────────────────────────────

export const NoIcon: Story = {
  args: {
    intent: "error",
    icon: null,
    title: "Payment declined",
    children: "Please check your card details and try again.",
  },
};

// ─── Custom icon ─────────────────────────────────────────────────────────────

export const CustomIcon: Story = {
  args: {
    intent: "info",
    icon: Rocket,
    title: "Deployment started",
    children: "Your app is being deployed. This usually takes 2–3 minutes.",
  },
};

// ─── All four intents at once ─────────────────────────────────────────────────

export const AllIntents: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-lg">
      <Alert intent="info" title="Info">
        Informational feedback — polite live region.
      </Alert>
      <Alert intent="success" title="Success">
        Action completed — polite live region.
      </Alert>
      <Alert intent="warning" title="Warning">
        Potential issue — assertive live region.
      </Alert>
      <Alert intent="error" title="Error">
        Something went wrong — assertive live region.
      </Alert>
    </div>
  ),
};
