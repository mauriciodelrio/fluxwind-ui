import { cva } from "class-variance-authority";

// ─── Root container ───────────────────────────────────────────────────────────

export const codeBlockVariants = cva([
  "relative rounded-lg overflow-hidden",
  "border border-[var(--color-fw-border)]",
  "bg-[var(--color-fw-surface)]",
  "font-mono text-sm leading-relaxed",
]);

// ─── Top bar (filename + copy button) ────────────────────────────────────────

export const codeBlockHeaderVariants = cva([
  "flex items-center justify-between",
  "px-4 py-2",
  "border-b border-[var(--color-fw-border)]",
  "bg-[var(--color-fw-secondary)]",
]);

export const codeBlockFilenameVariants = cva([
  "text-xs font-medium text-[var(--color-fw-muted)]",
  "select-none",
]);

export const codeBlockCopyButtonVariants = cva([
  "inline-flex items-center gap-1.5",
  "rounded px-2 py-1 text-xs font-medium",
  "text-[var(--color-fw-muted)]",
  "hover:text-[var(--color-fw-foreground)]",
  "hover:bg-[var(--color-fw-border)]",
  "transition-colors duration-150",
  "focus-visible:outline-2 focus-visible:outline-[var(--color-fw-ring)] focus-visible:outline-offset-1",
  "select-none",
]);

// ─── Scroll area ──────────────────────────────────────────────────────────────

export const codeBlockScrollAreaVariants = cva(["overflow-x-auto"]);

// ─── Code / pre ───────────────────────────────────────────────────────────────

export const codeBlockPreVariants = cva([
  "py-4",
  "text-[var(--color-fw-foreground)]",
  "!bg-transparent",
]);

// ─── Line ─────────────────────────────────────────────────────────────────────

export const codeBlockLineVariants = cva(["flex min-w-max px-4"], {
  variants: {
    highlighted: {
      true: "bg-[var(--color-fw-primary)]/10",
      false: "",
    },
  },
  defaultVariants: { highlighted: false },
});

// ─── Line number ──────────────────────────────────────────────────────────────

export const codeBlockLineNumberVariants = cva([
  "select-none text-right pr-6 w-10",
  "text-[var(--color-fw-muted)] opacity-50",
  "shrink-0",
]);
