import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { Modal } from "./Modal";

// jsdom doesn't implement showModal/close natively — define then spy
let showModalSpy: ReturnType<typeof vi.spyOn>;

function defineDialogMethods() {
  if (
    !Object.getOwnPropertyDescriptor(HTMLDialogElement.prototype, "showModal")
  ) {
    Object.defineProperty(HTMLDialogElement.prototype, "showModal", {
      writable: true,
      configurable: true,
      value(this: HTMLDialogElement) {
        this.setAttribute("open", "");
      },
    });
  }
  if (!Object.getOwnPropertyDescriptor(HTMLDialogElement.prototype, "close")) {
    Object.defineProperty(HTMLDialogElement.prototype, "close", {
      writable: true,
      configurable: true,
      value(this: HTMLDialogElement) {
        this.removeAttribute("open");
        this.dispatchEvent(new Event("close"));
      },
    });
  }
}

beforeEach(() => {
  defineDialogMethods();
  showModalSpy = vi
    .spyOn(HTMLDialogElement.prototype, "showModal")
    .mockImplementation(function (this: HTMLDialogElement) {
      this.setAttribute("open", "");
    });
  vi.spyOn(HTMLDialogElement.prototype, "close").mockImplementation(function (
    this: HTMLDialogElement,
  ) {
    this.removeAttribute("open");
    this.dispatchEvent(new Event("close"));
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

function renderModal(
  overrides: Partial<React.ComponentProps<typeof Modal>> = {},
) {
  const onClose = vi.fn();
  const result = render(
    <Modal open={true} onClose={onClose} {...overrides}>
      <Modal.Header>Dialog title</Modal.Header>
      <Modal.Body>Dialog body</Modal.Body>
      <Modal.Footer>
        <Modal.Close>Cancel</Modal.Close>
      </Modal.Footer>
    </Modal>,
  );
  return { ...result, onClose };
}

// ─── Structure ────────────────────────────────────────────────────────────────

describe("Modal – structure", () => {
  it("renders a dialog element", () => {
    renderModal();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("renders header content", () => {
    renderModal();
    expect(screen.getByText("Dialog title")).toBeInTheDocument();
  });

  it("renders body content", () => {
    renderModal();
    expect(screen.getByText("Dialog body")).toBeInTheDocument();
  });

  it("renders footer content", () => {
    renderModal();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("renders the close button in header by default", () => {
    renderModal();
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  it("hides the close button when hideClose is true", () => {
    render(
      <Modal open={true} onClose={vi.fn()}>
        <Modal.Header hideClose>Title</Modal.Header>
      </Modal>,
    );
    expect(
      screen.queryByRole("button", { name: "Close" }),
    ).not.toBeInTheDocument();
  });

  it("has aria-labelledby pointing to the header title", () => {
    renderModal();
    const dialog = screen.getByRole("dialog");
    const labelledById = dialog.getAttribute("aria-labelledby");
    expect(labelledById).toBeTruthy();
    expect(document.getElementById(labelledById!)).toBeInTheDocument();
  });

  it("has aria-modal attribute", () => {
    renderModal();
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
  });
});

// ─── Interactions ─────────────────────────────────────────────────────────────

describe("Modal – interactions", () => {
  it("calls onClose when the header × button is clicked", async () => {
    const user = userEvent.setup();
    const { onClose } = renderModal();
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("calls onClose when Modal.Close is clicked", async () => {
    const user = userEvent.setup();
    const { onClose } = renderModal();
    await user.click(screen.getByRole("button", { name: "Cancel" }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("uses custom closeLabel on the × button", () => {
    render(
      <Modal open={true} onClose={vi.fn()}>
        <Modal.Header closeLabel="Cerrar">Title</Modal.Header>
      </Modal>,
    );
    expect(screen.getByRole("button", { name: "Cerrar" })).toBeInTheDocument();
  });
});

// ─── Open/close state ─────────────────────────────────────────────────────────

describe("Modal – open/close state", () => {
  it("calls showModal when open is true", () => {
    renderModal({ open: true });
    expect(showModalSpy).toHaveBeenCalled();
  });

  it("does not call showModal when open is false", () => {
    renderModal({ open: false });
    expect(showModalSpy).not.toHaveBeenCalled();
  });
});

// ─── Accessibility ────────────────────────────────────────────────────────────

describe("Modal – a11y", () => {
  it("has no WCAG violations when open", async () => {
    const { container } = renderModal();
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});

// ─── Sub-component guard ──────────────────────────────────────────────────────

describe("Modal – context guard", () => {
  it("throws when Modal.Header is used outside Modal.Root", () => {
    // Suppress expected error output in test logs
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Modal.Header>Title</Modal.Header>)).toThrow(
      "<Modal.Header> must be rendered inside <Modal>",
    );
    spy.mockRestore();
  });
});
