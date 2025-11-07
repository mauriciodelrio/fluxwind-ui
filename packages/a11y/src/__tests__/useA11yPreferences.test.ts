import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useA11yPreferences } from '../hooks/useA11yPreferences';
import { setPreferences } from '../store';

describe('@fluxwind/a11y - useA11yPreferences', () => {
  beforeEach(() => {
    // Reset to defaults
    setPreferences({
      reducedMotion: false,
      highContrast: false,
      focusVisible: true,
      prefersDark: false,
      reducedTransparency: false,
      direction: 'ltr',
      screenReaderActive: false,
      custom: {},
    });
  });

  it('should return all preference values', () => {
    const { result } = renderHook(() => useA11yPreferences());

    expect(result.current.shouldReduceMotion).toBe(false);
    expect(result.current.isHighContrast).toBe(false);
    expect(result.current.isFocusVisible).toBe(true);
    expect(result.current.prefersDarkMode).toBe(false);
    expect(result.current.shouldReduceTransparency).toBe(false);
    expect(result.current.isRTL).toBe(false);
    expect(result.current.preferences.screenReaderActive).toBe(false);
  });

  it('should return setPreferences function', () => {
    const { result } = renderHook(() => useA11yPreferences());

    expect(result.current.setPreferences).toBeDefined();
    expect(typeof result.current.setPreferences).toBe('function');
  });

  it('should return setCustomPreference function', () => {
    const { result } = renderHook(() => useA11yPreferences());

    expect(result.current.setCustomPreference).toBeDefined();
    expect(typeof result.current.setCustomPreference).toBe('function');
  });

  it('should return getCustomPreference function', () => {
    const { result } = renderHook(() => useA11yPreferences());

    expect(result.current.getCustomPreference).toBeDefined();
    expect(typeof result.current.getCustomPreference).toBe('function');
  });

  it('should update when reducedMotion changes', () => {
    const { result } = renderHook(() => useA11yPreferences());

    expect(result.current.shouldReduceMotion).toBe(false);

    act(() => {
      setPreferences({ reducedMotion: true });
    });

    expect(result.current.shouldReduceMotion).toBe(true);
  });

  it('should update when highContrast changes', () => {
    const { result } = renderHook(() => useA11yPreferences());

    expect(result.current.isHighContrast).toBe(false);

    act(() => {
      setPreferences({ highContrast: true });
    });

    expect(result.current.isHighContrast).toBe(true);
  });

  it('should update when focusVisible changes', () => {
    const { result } = renderHook(() => useA11yPreferences());

    expect(result.current.isFocusVisible).toBe(true);

    act(() => {
      setPreferences({ focusVisible: false });
    });

    expect(result.current.isFocusVisible).toBe(false);
  });

  it('should update when prefersDark changes', () => {
    const { result } = renderHook(() => useA11yPreferences());

    expect(result.current.prefersDarkMode).toBe(false);

    act(() => {
      setPreferences({ prefersDark: true });
    });

    expect(result.current.prefersDarkMode).toBe(true);
  });

  it('should update when reducedTransparency changes', () => {
    const { result } = renderHook(() => useA11yPreferences());

    expect(result.current.shouldReduceTransparency).toBe(false);

    act(() => {
      setPreferences({ reducedTransparency: true });
    });

    expect(result.current.shouldReduceTransparency).toBe(true);
  });

  it('should update when direction changes to rtl', () => {
    const { result } = renderHook(() => useA11yPreferences());

    expect(result.current.isRTL).toBe(false);

    act(() => {
      setPreferences({ direction: 'rtl' });
    });

    expect(result.current.isRTL).toBe(true);
  });

  it('should update when direction changes to ltr', () => {
    const { result } = renderHook(() => useA11yPreferences());

    act(() => {
      setPreferences({ direction: 'rtl' });
    });

    expect(result.current.isRTL).toBe(true);

    act(() => {
      setPreferences({ direction: 'ltr' });
    });

    expect(result.current.isRTL).toBe(false);
  });

  it('should update when screenReaderActive changes', () => {
    const { result } = renderHook(() => useA11yPreferences());

    expect(result.current.preferences.screenReaderActive).toBe(false);

    act(() => {
      setPreferences({ screenReaderActive: true });
    });

    expect(result.current.preferences.screenReaderActive).toBe(true);
  });

  it('should handle custom preferences via setCustomPreference', () => {
    const { result } = renderHook(() => useA11yPreferences());

    act(() => {
      result.current.setCustomPreference('fontSize', 18);
    });

    expect(result.current.getCustomPreference('fontSize')).toBe(18);
  });

  it('should handle boolean custom preferences', () => {
    const { result } = renderHook(() => useA11yPreferences());

    act(() => {
      result.current.setCustomPreference('enableAnimations', false);
    });

    expect(result.current.getCustomPreference('enableAnimations')).toBe(false);
  });

  it('should handle string custom preferences', () => {
    const { result } = renderHook(() => useA11yPreferences());

    act(() => {
      result.current.setCustomPreference('theme', 'blue');
    });

    expect(result.current.getCustomPreference('theme')).toBe('blue');
  });

  it('should return undefined for non-existent custom preference', () => {
    const { result } = renderHook(() => useA11yPreferences());

    expect(result.current.getCustomPreference('nonexistent')).toBeUndefined();
  });

  it('should update multiple preferences at once', () => {
    const { result } = renderHook(() => useA11yPreferences());

    act(() => {
      result.current.setPreferences({
        reducedMotion: true,
        highContrast: true,
        prefersDark: true,
      });
    });

    expect(result.current.shouldReduceMotion).toBe(true);
    expect(result.current.isHighContrast).toBe(true);
    expect(result.current.prefersDarkMode).toBe(true);
  });

  it('should merge custom preferences', () => {
    const { result } = renderHook(() => useA11yPreferences());

    act(() => {
      result.current.setCustomPreference('fontSize', 18);
    });

    act(() => {
      result.current.setCustomPreference('lineHeight', 1.6);
    });

    expect(result.current.getCustomPreference('fontSize')).toBe(18);
    expect(result.current.getCustomPreference('lineHeight')).toBe(1.6);
  });
});
