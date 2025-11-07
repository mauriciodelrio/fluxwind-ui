import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useKeyboard } from '../hooks/useKeyboard';
import { KEYS } from '../utils/keyboard';
import type React from 'react';

describe('@fluxwind/a11y - useKeyboard', () => {
  it('should return onKeyDown handler', () => {
    const { result } = renderHook(() => useKeyboard({}));
    expect(result.current.onKeyDown).toBeInstanceOf(Function);
  });

  it('should call handler for matching key', () => {
    const handler = vi.fn();
    const { result } = renderHook(() =>
      useKeyboard({
        [KEYS.ENTER]: handler,
      })
    );

    const event = {
      nativeEvent: new KeyboardEvent('keydown', { key: 'Enter' }),
    } as React.KeyboardEvent;

    result.current.onKeyDown(event);
    expect(handler).toHaveBeenCalled();
  });

  it('should not call handler for non-matching key', () => {
    const handler = vi.fn();
    const { result } = renderHook(() =>
      useKeyboard({
        [KEYS.ENTER]: handler,
      })
    );

    const event = {
      nativeEvent: new KeyboardEvent('keydown', { key: 'Escape' }),
    } as React.KeyboardEvent;

    result.current.onKeyDown(event);
    expect(handler).not.toHaveBeenCalled();
  });

  it('should handle multiple key handlers', () => {
    const enterHandler = vi.fn();
    const escapeHandler = vi.fn();

    const { result } = renderHook(() =>
      useKeyboard({
        [KEYS.ENTER]: enterHandler,
        [KEYS.ESCAPE]: escapeHandler,
      })
    );

    const enterEvent = {
      nativeEvent: new KeyboardEvent('keydown', { key: 'Enter' }),
    } as React.KeyboardEvent;

    result.current.onKeyDown(enterEvent);

    expect(enterHandler).toHaveBeenCalled();
    expect(escapeHandler).not.toHaveBeenCalled();
  });

  it('should update when handlers change', () => {
    const handler1 = vi.fn();
    const handler2 = vi.fn();

    const { result, rerender } = renderHook(({ handlers }) => useKeyboard(handlers), {
      initialProps: {
        handlers: { [KEYS.ENTER]: handler1 },
      },
    });

    const event = {
      nativeEvent: new KeyboardEvent('keydown', { key: 'Enter' }),
    } as React.KeyboardEvent;

    result.current.onKeyDown(event);
    expect(handler1).toHaveBeenCalled();
    expect(handler2).not.toHaveBeenCalled();

    vi.clearAllMocks();

    rerender({ handlers: { [KEYS.ENTER]: handler2 } });
    result.current.onKeyDown(event);

    expect(handler1).not.toHaveBeenCalled();
    expect(handler2).toHaveBeenCalled();
  });
});
