import { useEffect, useRef } from 'react';
import { trapFocus, FocusManager } from '../utils/focus';

interface UseFocusTrapOptions {
  /**
   * Whether the focus trap is active
   */
  active?: boolean;
  /**
   * Whether to focus the first element on mount
   */
  autoFocus?: boolean;
  /**
   * Whether to restore focus when trap is deactivated
   */
  restoreFocus?: boolean;
}

/**
 * Hook to trap focus within a container
 */
export const useFocusTrap = <T extends HTMLElement>(
  options: UseFocusTrapOptions = {}
): React.RefObject<T> => {
  const { active = true, autoFocus = true, restoreFocus = true } = options;
  const containerRef = useRef<T>(null);
  const focusManagerRef = useRef(new FocusManager());

  useEffect(() => {
    if (!active || !containerRef.current) return;

    const container = containerRef.current;
    const focusManager = focusManagerRef.current;

    // Save current focus
    if (restoreFocus) {
      focusManager.save();
    }

    // Auto focus first element
    if (autoFocus) {
      const firstFocusable = container.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (firstFocusable) {
        firstFocusable.focus();
      }
    }

    // Trap focus
    const handleKeyDown = (event: KeyboardEvent) => {
      trapFocus(container, event);
    };

    container.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
      if (restoreFocus) {
        focusManager.restore();
      }
    };
  }, [active, autoFocus, restoreFocus]);

  return containerRef;
};
