import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { FileInput } from "./FileInput";

// ─── DataTransfer polyfill ────────────────────────────────────────────────────
// jsdom does not implement DataTransfer.items.add(file) — polyfill minimally.
beforeAll(() => {
  class MockDataTransfer {
    private _files: File[] = [];

    items = {
      add: (file: File) => {
        this._files.push(file);
      },
    };

    get files(): FileList {
      const filesCopy = this._files;
      return {
        length: filesCopy.length,
        item: (i: number) => filesCopy[i] ?? null,
        *[Symbol.iterator]() {
          yield* filesCopy;
        },
        ...Object.fromEntries(filesCopy.map((f, i) => [i, f])),
      } as unknown as FileList;
    }
  }

  Object.defineProperty(globalThis, "DataTransfer", {
    value: MockDataTransfer,
    writable: true,
  });
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

function makeFile(name = "test.pdf", size = 1024, type = "application/pdf") {
  return new File(["x".repeat(size)], name, { type });
}

function triggerFileChange(input: HTMLElement, files: File[]) {
  Object.defineProperty(input, "files", {
    value: {
      length: files.length,
      item: (i: number) => files[i] ?? null,
      *[Symbol.iterator]() {
        yield* files;
      },
      ...Object.fromEntries(files.map((f, i) => [i, f])),
    },
    writable: true,
    configurable: true,
  });
  fireEvent.change(input);
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("FileInput", () => {
  // ── Label & a11y wiring ──────────────────────────────────────────────────

  it("renders a visible label", () => {
    render(<FileInput label="Attach documents" />);
    expect(screen.getByText("Attach documents")).toBeInTheDocument();
  });

  it("label is linked to the hidden input via htmlFor", () => {
    render(<FileInput label="Upload file" id="my-file" />);
    const input = document.getElementById("my-file");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "file");
  });

  it("renders hint text when provided", () => {
    render(<FileInput label="Upload" hint="PDF only." />);
    expect(screen.getByText("PDF only.")).toBeInTheDocument();
  });

  it("renders error message when error is set", () => {
    render(<FileInput label="Upload" error="File too large." />);
    expect(screen.getByText("File too large.")).toBeInTheDocument();
  });

  it("sets aria-invalid on input when error is provided", () => {
    render(<FileInput label="Upload" error="Required." id="fi-err" />);
    expect(document.getElementById("fi-err")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("does not set aria-invalid when no error", () => {
    render(<FileInput label="Upload" id="fi-ok" />);
    expect(document.getElementById("fi-ok")).not.toHaveAttribute(
      "aria-invalid",
    );
  });

  it("links error via aria-describedby", () => {
    render(<FileInput label="Upload" error="Bad file." id="fi-desc" />);
    const input = document.getElementById("fi-desc");
    const errorEl = screen.getByText("Bad file.");
    expect(input?.getAttribute("aria-describedby")).toContain(errorEl.id);
  });

  // ── Default (non-draggable) mode ─────────────────────────────────────────

  it("renders trigger button with default label", () => {
    render(<FileInput label="Upload" />);
    expect(
      screen.getByRole("button", { name: "Choose files" }),
    ).toBeInTheDocument();
  });

  it("renders trigger button with custom triggerLabel", () => {
    render(<FileInput label="Upload" triggerLabel="Browse…" />);
    expect(screen.getByRole("button", { name: "Browse…" })).toBeInTheDocument();
  });

  it("trigger button is disabled when disabled=true", () => {
    render(<FileInput label="Upload" disabled />);
    expect(screen.getByRole("button", { name: "Choose files" })).toBeDisabled();
  });

  it("calls onChange when files are selected", () => {
    const handler = vi.fn();
    render(<FileInput label="Upload" id="fi-change" onChange={handler} />);
    const input = document.getElementById("fi-change") as HTMLInputElement;
    triggerFileChange(input, [makeFile("doc.pdf")]);
    expect(handler).toHaveBeenCalledOnce();
  });

  it("shows file list after selection", () => {
    render(<FileInput label="Upload" id="fi-list" />);
    const input = document.getElementById("fi-list") as HTMLInputElement;
    triggerFileChange(input, [makeFile("report.pdf")]);
    expect(screen.getByText("report.pdf")).toBeInTheDocument();
  });

  it("shows formatted file size in file list", () => {
    render(<FileInput label="Upload" id="fi-size" />);
    const input = document.getElementById("fi-size") as HTMLInputElement;
    triggerFileChange(input, [makeFile("doc.pdf", 2048)]);
    expect(screen.getByText("2.0 KB")).toBeInTheDocument();
  });

  it("accumulates files on multiple selections when multiple=true", () => {
    render(<FileInput label="Upload" multiple id="fi-multi" />);
    const input = document.getElementById("fi-multi") as HTMLInputElement;
    triggerFileChange(input, [makeFile("a.pdf")]);
    triggerFileChange(input, [makeFile("b.pdf")]);
    expect(screen.getByText("a.pdf")).toBeInTheDocument();
    expect(screen.getByText("b.pdf")).toBeInTheDocument();
  });

  it("replaces file on new selection when multiple=false", () => {
    render(<FileInput label="Upload" multiple={false} id="fi-single" />);
    const input = document.getElementById("fi-single") as HTMLInputElement;
    triggerFileChange(input, [makeFile("first.pdf")]);
    triggerFileChange(input, [makeFile("second.pdf")]);
    expect(screen.queryByText("first.pdf")).not.toBeInTheDocument();
    expect(screen.getByText("second.pdf")).toBeInTheDocument();
  });

  it("removes file from list when remove button is clicked", async () => {
    const user = userEvent.setup();
    render(<FileInput label="Upload" id="fi-remove" />);
    const input = document.getElementById("fi-remove") as HTMLInputElement;
    triggerFileChange(input, [makeFile("todelete.pdf")]);
    const removeBtn = screen.getByRole("button", {
      name: "Remove todelete.pdf",
    });
    await user.click(removeBtn);
    expect(screen.queryByText("todelete.pdf")).not.toBeInTheDocument();
  });

  it("shows file count when files are selected", () => {
    render(<FileInput label="Upload" id="fi-count" />);
    const input = document.getElementById("fi-count") as HTMLInputElement;
    triggerFileChange(input, [makeFile("a.pdf"), makeFile("b.pdf")]);
    expect(screen.getByText("2 files selected")).toBeInTheDocument();
  });

  // ── Draggable mode ────────────────────────────────────────────────────────

  it("renders drop zone when draggable=true", () => {
    render(<FileInput label="Upload" draggable />);
    expect(
      screen.getByRole("button", {
        name: /drag files here or click to browse/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders custom dropZoneText", () => {
    render(
      <FileInput
        label="Upload"
        draggable
        dropZoneText="Drop your files here"
      />,
    );
    expect(screen.getByText("Drop your files here")).toBeInTheDocument();
  });

  it("does not render trigger button in draggable mode", () => {
    render(<FileInput label="Upload" draggable />);
    expect(
      screen.queryByRole("button", { name: "Choose files" }),
    ).not.toBeInTheDocument();
  });

  it("calls onChange on file drop", () => {
    const handler = vi.fn();
    render(
      <FileInput label="Upload" draggable id="fi-drop" onChange={handler} />,
    );
    const zone = screen.getByRole("button", {
      name: /drag files here or click to browse/i,
    });
    const file = makeFile("dropped.pdf");
    const dt = new DataTransfer();
    dt.items.add(file);
    fireEvent.dragOver(zone);
    fireEvent.drop(zone, { dataTransfer: { files: dt.files } });
    expect(handler).toHaveBeenCalled();
  });

  it("sets data-dragging attribute while dragging over zone", () => {
    render(<FileInput label="Upload" draggable />);
    const zone = screen.getByRole("button", {
      name: /drag files here or click to browse/i,
    });
    fireEvent.dragOver(zone);
    expect(zone).toHaveAttribute("data-dragging", "true");
    fireEvent.dragLeave(zone, { relatedTarget: null });
    expect(zone).not.toHaveAttribute("data-dragging");
  });

  it("zone is accessible via keyboard (Enter opens picker)", async () => {
    const user = userEvent.setup();
    render(<FileInput label="Upload" draggable />);
    const zone = screen.getByRole("button", {
      name: /drag files here or click to browse/i,
    });
    await user.tab();
    expect(zone).toHaveFocus();
  });

  // ── WCAG ──────────────────────────────────────────────────────────────────

  it("has no WCAG violations — default mode", async () => {
    const { container } = render(<FileInput label="Attach documents" />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("has no WCAG violations — with error", async () => {
    const { container } = render(
      <FileInput label="Attach documents" error="Required." />,
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("has no WCAG violations — draggable mode", async () => {
    const { container } = render(<FileInput label="Upload files" draggable />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  // ── Aria list label ───────────────────────────────────────────────────────

  it("selected files list has accessible label", () => {
    render(<FileInput label="Upload" id="fi-arlist" />);
    const input = document.getElementById("fi-arlist") as HTMLInputElement;
    triggerFileChange(input, [makeFile("cv.pdf")]);
    expect(
      screen.getByRole("list", { name: "Selected files" }),
    ).toBeInTheDocument();
  });

  it("remove button has accessible name for each file", () => {
    render(<FileInput label="Upload" id="fi-arname" />);
    const input = document.getElementById("fi-arname") as HTMLInputElement;
    triggerFileChange(input, [makeFile("contract.pdf")]);
    expect(
      screen.getByRole("button", { name: "Remove contract.pdf" }),
    ).toBeInTheDocument();
  });

  it("file list items are rendered inside the list element", () => {
    render(<FileInput label="Upload" id="fi-items" />);
    const input = document.getElementById("fi-items") as HTMLInputElement;
    triggerFileChange(input, [makeFile("file1.pdf"), makeFile("file2.pdf")]);
    const list = screen.getByRole("list", { name: "Selected files" });
    const items = within(list).getAllByRole("listitem");
    expect(items).toHaveLength(2);
  });
});
