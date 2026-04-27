"use client";

import {
  forwardRef,
  useId,
  useRef,
  useImperativeHandle,
  useState,
  useCallback,
  type DragEvent,
  type ChangeEvent,
} from "react";
import { cn } from "@/lib/cn";
import {
  fileInputTriggerVariants,
  fileInputZoneVariants,
  type FileInputVariants,
} from "./FileInput.variants";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const BYTE_UNITS = ["B", "KB", "MB", "GB"] as const;

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const i = Math.min(
    Math.floor(Math.log(bytes) / Math.log(k)),
    BYTE_UNITS.length - 1,
  );
  const unit = BYTE_UNITS[i];
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${unit}`;
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FileInputProps extends FileInputVariants {
  /** Visible label — always required for a11y. */
  label: string;
  /**
   * When `true`, renders a drag-and-drop zone instead of a plain button.
   * Defaults to `false`.
   */
  draggable?: boolean;
  /**
   * Text shown inside the drag-and-drop zone.
   * Only used when `draggable=true`.
   * Defaults to `"Drag files here or click to browse"`.
   */
  dropZoneText?: string;
  /** Label text for the trigger button. Defaults to `"Choose files"`. */
  triggerLabel?: string;
  /** Comma-separated list of accepted MIME types or extensions, e.g. `"image/*,.pdf"`. */
  accept?: string;
  /** Allow selecting multiple files. Defaults to `true`. */
  multiple?: boolean;
  /** Called when the file selection changes. */
  onChange?: (files: FileList) => void;
  /** Helper text rendered below the component. */
  hint?: string;
  /** Error message — triggers invalid state and `aria-describedby`. */
  error?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      label,
      draggable = false,
      dropZoneText = "Drag files here or click to browse",
      triggerLabel = "Choose files",
      accept,
      multiple = true,
      onChange,
      hint,
      error,
      disabled,
      id: externalId,
      className,
      radius,
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = externalId ?? generatedId;
    const hintId = hint ? `${id}-hint` : undefined;
    const errorId = error ? `${id}-error` : undefined;
    const describedBy =
      [hintId, errorId].filter(Boolean).join(" ") || undefined;

    const inputRef = useRef<HTMLInputElement | null>(null);
    useImperativeHandle(ref, () => {
      const { current } = inputRef;
      if (current === null)
        throw new Error("[FileInput] input ref not attached");
      return current;
    });

    const [files, setFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    const applyFiles = useCallback(
      (incoming: FileList | null) => {
        if (!incoming) return;
        const next = multiple
          ? [...files, ...Array.from(incoming)]
          : [incoming[0]];
        setFiles(next);

        // Reconstruct a FileList-like object using a DataTransfer
        const dt = new DataTransfer();
        next.forEach((f) => dt.items.add(f));
        onChange?.(dt.files);
      },
      [files, multiple, onChange],
    );

    const handleInputChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        applyFiles(e.target.files);
        // Reset so re-selecting the same file still fires onChange
        e.target.value = "";
      },
      [applyFiles],
    );

    const handleRemove = useCallback(
      (index: number) => {
        const next = files.filter((_, i) => i !== index);
        setFiles(next);
        const dt = new DataTransfer();
        next.forEach((f) => dt.items.add(f));
        onChange?.(dt.files);
      },
      [files, onChange],
    );

    // ─── Drag & drop handlers ─────────────────────────────────────────────────
    const handleDragOver = useCallback(
      (e: DragEvent<HTMLElement>) => {
        if (disabled) return;
        e.preventDefault();
        setIsDragging(true);
      },
      [disabled],
    );

    const handleDragLeave = useCallback((e: DragEvent<HTMLElement>) => {
      // Only clear if leaving the zone itself, not a child element
      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
        setIsDragging(false);
      }
    }, []);

    const handleDrop = useCallback(
      (e: DragEvent<HTMLElement>) => {
        if (disabled) return;
        e.preventDefault();
        setIsDragging(false);
        applyFiles(e.dataTransfer.files);
      },
      [disabled, applyFiles],
    );

    const openPicker = () => {
      if (!disabled) inputRef.current?.click();
    };

    // ─── Shared hidden input ──────────────────────────────────────────────────
    const hiddenInput = (
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className="sr-only"
        onChange={handleInputChange}
        tabIndex={-1}
      />
    );

    // ─── File list ────────────────────────────────────────────────────────────
    const fileList =
      files.length > 0 ? (
        <ul
          aria-label="Selected files"
          className="flex flex-col gap-1 mt-2 w-full"
        >
          {files.map((file) => (
            <li
              key={`${file.name}-${String(file.size)}-${String(file.lastModified)}`}
              className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-md bg-[var(--color-fw-surface)] text-sm"
            >
              <span className="truncate text-[var(--color-fw-foreground)]">
                {file.name}
              </span>
              <span className="shrink-0 text-[var(--color-fw-muted)]">
                {formatBytes(file.size)}
              </span>
              <button
                type="button"
                aria-label={`Remove ${file.name}`}
                onClick={() => handleRemove(files.indexOf(file))}
                disabled={disabled}
                className="shrink-0 text-[var(--color-fw-muted)] hover:text-[var(--color-fw-destructive)] transition-colors"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      ) : null;

    return (
      <div className={cn("flex flex-col gap-1.5 w-full", className)}>
        {/* Label — always rendered, linked to hidden input via htmlFor */}
        <label
          htmlFor={id}
          className="text-sm font-medium text-[var(--color-fw-foreground)]"
        >
          {label}
        </label>

        {/*
         * Hidden input is rendered OUTSIDE any interactive wrapper to avoid
         * the axe `nested-interactive` violation. It is sr-only and
         * programmatically triggered via inputRef.current.click().
         */}
        {hiddenInput}

        {draggable ? (
          /* ─── Drag & drop zone ─── */
          <div
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-disabled={disabled}
            data-dragging={isDragging ? "true" : undefined}
            className={cn(
              fileInputZoneVariants({ radius }),
              error && "border-[var(--color-fw-destructive)]",
              disabled && "opacity-50 cursor-not-allowed pointer-events-none",
            )}
            onClick={openPicker}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openPicker();
              }
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <span
              aria-hidden="true"
              className="text-2xl text-[var(--color-fw-muted)]"
            >
              ↑
            </span>
            <span className="text-[var(--color-fw-muted)]">{dropZoneText}</span>
          </div>
        ) : (
          /* ─── Plain trigger button ─── */
          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={disabled}
              onClick={openPicker}
              className={cn(
                fileInputTriggerVariants({ radius }),
                error && "border-[var(--color-fw-destructive)]",
              )}
            >
              {triggerLabel}
            </button>
            {files.length > 0 && (
              <span className="text-sm text-[var(--color-fw-muted)]">
                {files.length} file{files.length !== 1 ? "s" : ""} selected
              </span>
            )}
          </div>
        )}

        {fileList}

        {error ? (
          <span
            id={errorId}
            className="text-xs text-[var(--color-fw-destructive-text)]"
          >
            {error}
          </span>
        ) : null}
        {hint ? (
          <span id={hintId} className="text-xs text-[var(--color-fw-muted)]">
            {hint}
          </span>
        ) : null}
      </div>
    );
  },
);

FileInput.displayName = "FileInput";

export { FileInput };
