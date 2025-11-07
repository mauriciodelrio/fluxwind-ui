import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useId } from '../hooks/useId';

describe('@fluxwind/a11y - useId', () => {
  it('should generate a unique ID', () => {
    const { result } = renderHook(() => useId());
    expect(result.current).toBeTruthy();
    expect(typeof result.current).toBe('string');
  });

  it('should generate different IDs for different hooks', () => {
    const { result: result1 } = renderHook(() => useId());
    const { result: result2 } = renderHook(() => useId());
    expect(result1.current).not.toBe(result2.current);
  });

  it('should add prefix when provided', () => {
    const { result } = renderHook(() => useId('my-prefix'));
    expect(result.current).toContain('my-prefix-');
  });

  it('should generate consistent ID within same render', () => {
    const { result, rerender } = renderHook(() => useId());
    const firstId = result.current;

    rerender();
    expect(result.current).toBe(firstId);
  });
});
