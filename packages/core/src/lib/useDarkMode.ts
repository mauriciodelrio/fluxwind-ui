import { useEffect } from "react";
import { useSignal } from "@preact/signals-react";

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Reads the current dark-mode state by checking the three mechanisms
 * used by fluxwind's CSS token system (styles/index.css):
 *
 *   1. `data-theme="dark"` attribute on <html>
 *   2. `.dark` class on <html>
 *   3. `@media (prefers-color-scheme: dark)` system preference
 *      (unless explicitly overridden by `data-theme="light"` / `.light`)
 */
function detectDarkMode(): boolean {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return false;
  }

  const root = document.documentElement;
  const dataTheme = root.getAttribute("data-theme");

  if (dataTheme === "dark" || root.classList.contains("dark")) return true;
  if (dataTheme === "light" || root.classList.contains("light")) return false;

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Reactively detects whether dark mode is active by observing all three
 * mechanisms supported by fluxwind's token system.
 *
 * Works with signals — any component that calls `useSignals()` and then reads
 * the return value in JSX will automatically re-render when the mode changes.
 *
 * @returns `true` when dark mode is active.
 */
export function useDarkMode(): boolean {
  const isDark = useSignal(detectDarkMode());

  useEffect(() => {
    const update = () => {
      isDark.value = detectDarkMode();
    };

    // Watch class / data-theme attribute changes on <html>
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    // Watch system preference changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", update);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", update);
    };
  }, [isDark]);

  return isDark.value;
}
