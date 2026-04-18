import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Modal } from "./Modal";
import { Button } from "../../atoms/Button/Button";

const meta: Meta<typeof Modal> = {
  title: "Organisms/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Accessible dialog organism built on the native `<dialog>` element. " +
          "Supports `showModal()` / `close()` API for true modal behavior " +
          "(backdrop, focus trap, Escape key) out of the box.\n\n" +
          "**Compound API:** `Modal.Header` · `Modal.Body` · `Modal.Footer` · `Modal.Close`\n\n" +
          '**Accessibility:** `role="dialog"`, `aria-modal="true"`, `aria-labelledby` wired automatically. ' +
          "Pass a translated `closeLabel` to the header for i18n support.",
      },
    },
  },
  argTypes: {
    open: {
      description: "Controls whether the dialog is open.",
      control: "boolean",
      table: { type: { summary: "boolean" } },
    },
    size: {
      description: "Width preset of the dialog panel.",
      control: "select",
      options: ["sm", "md", "lg", "xl", "full"],
      table: {
        type: { summary: "'sm' | 'md' | 'lg' | 'xl' | 'full'" },
        defaultValue: { summary: "'md'" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Controlled wrapper ───────────────────────────────────────────────────────

function ModalDemo(props: Partial<React.ComponentProps<typeof Modal>>) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Open modal
      </Button>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        {...props}
      >
        <Modal.Header>Confirm action</Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete this item? This action cannot be
            undone.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close>
            <Button variant="ghost">Cancel</Button>
          </Modal.Close>
          <Button
            variant="destructive"
            onClick={() => {
              setOpen(false);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export const Default: Story = {
  render: (args) => <ModalDemo {...args} />,
  args: { size: "md" },
};

export const Small: Story = {
  render: (args) => <ModalDemo {...args} />,
  args: { size: "sm" },
};

export const Large: Story = {
  render: (args) => <ModalDemo {...args} />,
  args: { size: "lg" },
};

function WithoutCloseButtonDemo(args: React.ComponentProps<typeof Modal>) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Open modal
      </Button>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        {...args}
      >
        <Modal.Header hideClose>No close button</Modal.Header>
        <Modal.Body>
          <p>
            This modal has no × button in the header. Use the footer actions to
            dismiss.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close>
            <Button variant="secondary">Dismiss</Button>
          </Modal.Close>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export const WithoutCloseButton: Story = {
  render: (args) => <WithoutCloseButtonDemo {...args} />,
  args: { size: "md" },
};

function LocalizedDemo(args: React.ComponentProps<typeof Modal>) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Abrir modal
      </Button>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        {...args}
      >
        <Modal.Header closeLabel="Cerrar">Confirmar acción</Modal.Header>
        <Modal.Body>
          <p>¿Estás seguro de que deseas continuar?</p>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close>
            <Button variant="ghost">Cancelar</Button>
          </Modal.Close>
          <Button
            variant="primary"
            onClick={() => {
              setOpen(false);
            }}
          >
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export const Localized: Story = {
  render: (args) => <LocalizedDemo {...args} />,
  args: { size: "md" },
};
