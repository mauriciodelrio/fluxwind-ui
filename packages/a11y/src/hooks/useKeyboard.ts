import { useCallback } from 'react';
import { handleKeyboardNavigation, type KeyboardKey } from '../utils/keyboard';

type KeyboardHandler = (event: KeyboardEvent) => void;
type KeyboardHandlers = Partial<Record<KeyboardKey, KeyboardHandler>>;

/**
 * Hook to handle keyboard navigation
 */
export const useKeyboard = (handlers: KeyboardHandlers) => {
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      handleKeyboardNavigation(event.nativeEvent, handlers);
    },
    [handlers]
  );

  return { onKeyDown: handleKeyDown };
};
