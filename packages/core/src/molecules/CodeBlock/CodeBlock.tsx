import { forwardRef, useCallback, useRef, type HTMLAttributes } from "react";
import { useSignal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import { Highlight, themes, type Language } from "prism-react-renderer";
import { cn } from "@/lib/cn";
import { useDarkMode } from "@/lib/useDarkMode";
import {
  codeBlockVariants,
  codeBlockHeaderVariants,
  codeBlockFilenameVariants,
  codeBlockCopyButtonVariants,
  codeBlockScrollAreaVariants,
  codeBlockPreVariants,
  codeBlockLineVariants,
  codeBlockLineNumberVariants,
} from "./CodeBlock.variants";

// ─── Types ────────────────────────────────────────────────────────────────────

export type { Language };

export interface CodeBlockProps extends HTMLAttributes<HTMLDivElement> {
  /** Source code to display. */
  code: string;
  /**
   * Prism language identifier.
   * @default "tsx"
   */
  language?: Language;
  /** Optional filename shown in the header bar. */
  filename?: string;
  /** Show line numbers. @default false */
  showLineNumbers?: boolean;
  /** Show copy-to-clipboard button. @default true */
  showCopyButton?: boolean;
  /**
   * 1-based line numbers to highlight (e.g. `[3, 5, 6]`).
   * Highlighted lines get a subtle background tint.
   */
  highlightLines?: number[];
}

// ─── Copy icon (inline SVG, no extra dep) ────────────────────────────────────

function CopyIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// ─── CodeBlock ────────────────────────────────────────────────────────────────

export const CodeBlock = forwardRef<HTMLDivElement, CodeBlockProps>(
  (
    {
      code,
      language = "tsx",
      filename,
      showLineNumbers = false,
      showCopyButton = true,
      highlightLines = [],
      className,
      ...props
    },
    ref,
  ) => {
    useSignals();
    const isDark = useDarkMode();
    const copied = useSignal(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleCopy = useCallback(() => {
      void navigator.clipboard.writeText(code).then(() => {
        copied.value = true;
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          copied.value = false;
        }, 2000);
      });
    }, [code, copied]);

    const showHeader = filename !== undefined || showCopyButton;
    const highlightSet = new Set(highlightLines);

    /* eslint-disable jsx-a11y/no-noninteractive-tabindex */
    return (
      <div ref={ref} className={cn(codeBlockVariants(), className)} {...props}>
        {showHeader ? (
          <div className={codeBlockHeaderVariants()}>
            <span className={codeBlockFilenameVariants()}>{filename}</span>
            {showCopyButton ? (
              <button
                type="button"
                onClick={handleCopy}
                className={codeBlockCopyButtonVariants()}
                aria-label={copied.value ? "Copied!" : "Copy code"}
              >
                {copied.value ? <CheckIcon /> : <CopyIcon />}
                <span>{copied.value ? "Copied!" : "Copy"}</span>
              </button>
            ) : null}
          </div>
        ) : null}

        <div
          className={codeBlockScrollAreaVariants()}
          tabIndex={0}
          role="region"
          aria-label={filename ? `Code: ${filename}` : "Code block"}
        >
          <Highlight
            code={code.trimEnd()}
            language={language}
            theme={isDark ? themes.vsDark : themes.github}
          >
            {({
              className: preClassName,
              style,
              tokens,
              getLineProps,
              getTokenProps,
            }) => (
              <pre
                className={cn(codeBlockPreVariants(), preClassName)}
                style={{ ...style, backgroundColor: "transparent" }}
              >
                {tokens.map((line, lineIndex) => {
                  const lineNumber = lineIndex + 1;
                  const isHighlighted = highlightSet.has(lineNumber);
                  const {
                    key: _lineKey,
                    className: lineClassName,
                    ...restLineProps
                  } = getLineProps({ line });

                  return (
                    <div
                      key={lineNumber}
                      className={cn(
                        codeBlockLineVariants({ highlighted: isHighlighted }),
                        lineClassName,
                      )}
                      {...restLineProps}
                    >
                      {showLineNumbers ? (
                        <span
                          aria-hidden="true"
                          className={codeBlockLineNumberVariants()}
                        >
                          {lineNumber}
                        </span>
                      ) : null}
                      <span>
                        {line.map((token, tokenIndex) => {
                          const { key: _tokenKey, ...tokenProps } =
                            getTokenProps({ token });
                          return (
                            // eslint-disable-next-line react/no-array-index-key -- prism token index is the only stable key
                            <span key={tokenIndex} {...tokenProps} />
                          );
                        })}
                      </span>
                    </div>
                  );
                })}
              </pre>
            )}
          </Highlight>
        </div>
      </div>
    );
  },
);

CodeBlock.displayName = "CodeBlock";
