import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useId,
  useRef,
  type DialogHTMLAttributes,
  type HTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import {
  modalVariants,
  modalHeaderVariants,
  modalBodyVariants,
  modalFooterVariants,
  modalCloseButtonVariants,
  type ModalSize,
} from "./Modal.variants";

// ─── Context ──────────────────────────────────────────────────────────────────

interface ModalContextValue {
  titleId: string;
  close: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

function useModalContext(displayName: string) {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error(`<${displayName}> must be rendered inside <Modal>`);
  return ctx;
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export interface ModalRootProps extends Omit<
  DialogHTMLAttributes<HTMLDialogElement>,
  "open"
> {
  /** Controls whether the dialog is open. */
  open: boolean;
  /** Called when the dialog requests to be closed (Escape, backdrop click, or Modal.Close). */
  onClose: () => void;
  /**
   * Width preset of the dialog panel.
   * @default "md"
   */
  size?: ModalSize;
  children: ReactNode;
}

const ModalRoot = forwardRef<HTMLDialogElement, ModalRootProps>(
  (
    { open, onClose, size = "md", className, children, ...props },
    forwardedRef,
  ) => {
    const internalRef = useRef<HTMLDialogElement>(null);
    const prevOpen = useRef(false);
    const titleId = useId();

    // Combine internal ref with the consumer's forwarded ref
    const setRef = (node: HTMLDialogElement | null) => {
      internalRef.current = node;
      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      }
    };

    // Drive open/close via the native showModal() / close() API
    useEffect(() => {
      const dialog = internalRef.current;
      if (!dialog) return;
      if (open && !prevOpen.current) {
        dialog.showModal();
      } else if (!open && prevOpen.current) {
        dialog.close();
      }
      prevOpen.current = open;
    }, [open]);

    // Sync native `close` event (Escape key or programmatic close) back to consumer
    useEffect(() => {
      const dialog = internalRef.current;
      if (!dialog) return;
      const handler = () => {
        onClose();
      };
      dialog.addEventListener("close", handler);
      return () => {
        dialog.removeEventListener("close", handler);
      };
    }, [onClose]);

    // Click on the ::backdrop closes the modal
    function handleDialogClick(e: React.MouseEvent<HTMLDialogElement>) {
      if (e.target === internalRef.current) onClose();
    }

    // Keyboard handler — Escape is already handled natively by <dialog>;
    // declared here to satisfy jsx-a11y/click-events-have-key-events
    function handleDialogKeyDown(e: React.KeyboardEvent<HTMLDialogElement>) {
      if (e.key === "Escape") onClose();
    }

    return (
      <ModalContext.Provider value={{ titleId, close: onClose }}>
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- <dialog> backdrop click is an established UX pattern; keyboard (Escape) is handled natively and via onKeyDown */}
        <dialog
          ref={setRef}
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={handleDialogClick}
          onKeyDown={handleDialogKeyDown}
          className={cn(modalVariants({ size }), className)}
          {...props}
        >
          {children}
        </dialog>
      </ModalContext.Provider>
    );
  },
);
ModalRoot.displayName = "Modal";

// ─── Header ───────────────────────────────────────────────────────────────────

export interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Hide the built-in × close button. @default false */
  hideClose?: boolean;
  /**
   * Accessible label for the × close button.
   * Required for i18n — pass a translated string.
   * @default "Close"
   */
  closeLabel?: string;
  children: ReactNode;
}

const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  (
    { hideClose = false, closeLabel = "Close", className, children, ...props },
    ref,
  ) => {
    const { titleId, close } = useModalContext("Modal.Header");

    return (
      <div
        ref={ref}
        className={cn(modalHeaderVariants(), className)}
        {...props}
      >
        <div id={titleId} className="flex-1">
          {children}
        </div>

        {!hideClose && (
          <button
            type="button"
            onClick={close}
            aria-label={closeLabel}
            className={modalCloseButtonVariants()}
          >
            {/* X icon — inline SVG, zero external dependency */}
            <svg
              aria-hidden="true"
              className="size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    );
  },
);
ModalHeader.displayName = "Modal.Header";

// ─── Body ─────────────────────────────────────────────────────────────────────

export interface ModalBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn(modalBodyVariants(), className)} {...props}>
      {children}
    </div>
  ),
);
ModalBody.displayName = "Modal.Body";

// ─── Footer ───────────────────────────────────────────────────────────────────

export interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn(modalFooterVariants(), className)} {...props}>
      {children}
    </div>
  ),
);
ModalFooter.displayName = "Modal.Footer";

// ─── Close — convenience trigger that injects the close handler ───────────────

export interface ModalCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const ModalClose = forwardRef<HTMLButtonElement, ModalCloseProps>(
  ({ className, children, ...props }, ref) => {
    const { close } = useModalContext("Modal.Close");

    return (
      <button
        ref={ref}
        type="button"
        onClick={close}
        className={className}
        {...props}
      >
        {children}
      </button>
    );
  },
);
ModalClose.displayName = "Modal.Close";

// ─── Compound export ──────────────────────────────────────────────────────────

export const Modal = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
  Close: ModalClose,
});
