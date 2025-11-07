/**
 * Bridge utilities to connect Preact Signals with React
 * This allows us to use signals internally while exposing standard React hooks
 *
 * Note: This file intentionally mutates signal values, which is the core API of signals.
 * The React hooks linter rules are disabled for signal mutations as they conflict with
 * the signals programming model where mutation is the intended behavior.
 */

import { computed as signalComputed, signal as createSignal } from '@preact/signals-core';
import type { Signal } from '@preact/signals-core';
import { useEffect, useState, useCallback } from 'react';

/**
 * Hook to subscribe to a signal and re-render when it changes
 * @param signal - The signal to subscribe to
 * @returns The current value of the signal
 */
export function useSignal<T>(signal: Signal<T>): T {
  const [value, setValue] = useState<T>(signal.value);

  useEffect(() => {
    // Subscribe to signal changes
    const unsubscribe = signal.subscribe(() => {
      setValue(signal.value);
    });

    return unsubscribe;
  }, [signal]);

  return value;
}

/**
 * Hook to create a signal with React-like API
 * @param initialValue - The initial value
 * @returns A tuple of [value, setValue] similar to useState
 */
export function useSignalState<T>(initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  // Use useState to create the signal instance only once
  const [signal] = useState(() => createSignal(initialValue));

  const value = useSignal(signal);

  const setValue = useCallback(
    (newValue: T | ((prev: T) => T)) => {
      // Signals are designed to be mutated - this is the intended API
      if (typeof newValue === 'function') {
        const updater = newValue as (prev: T) => T;
        signal.value = updater(signal.value);
      } else {
        signal.value = newValue;
      }
    },
    [signal]
  );

  return [value, setValue];
}

/**
 * Hook to create a computed signal (derived state)
 * This is a simplified version - for complex derived state, consider using useSignal directly
 * @param compute - Function that computes the derived value
 * @returns The computed value
 */
export function useComputed<T>(compute: () => T): T {
  // Create a computed signal once and subscribe to it
  const [computed] = useState(() => signalComputed(compute));

  return useSignal(computed);
}

/**
 * Re-export signal utilities for internal use
 */
export { signal, computed, effect, batch } from '@preact/signals-core';
export type { Signal, ReadonlySignal } from '@preact/signals-core';
