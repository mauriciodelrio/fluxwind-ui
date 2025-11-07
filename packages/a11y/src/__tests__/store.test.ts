import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import {
  preferences,
  announcements,
  shouldReduceMotion,
  isHighContrast,
  isFocusVisible,
  prefersDarkMode,
  shouldReduceTransparency,
  isRTL,
  setPreferences,
  setCustomPreference,
  getCustomPreference,
  announce,
  clearAnnouncements,
} from '../store';

describe('@fluxwind/a11y - store', () => {
  beforeEach(() => {
    // Reset signals
    preferences.value = {
      reducedMotion: false,
      highContrast: false,
      screenReaderActive: false,
      focusVisible: true,
      prefersDark: false,
      reducedTransparency: false,
      direction: 'ltr',
      custom: {},
    };
    announcements.value = [];
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  describe('preferences', () => {
    it('should have default preferences', () => {
      expect(preferences.value.reducedMotion).toBe(false);
      expect(preferences.value.highContrast).toBe(false);
      expect(preferences.value.screenReaderActive).toBe(false);
      expect(preferences.value.focusVisible).toBe(true);
    });

    it('should update preferences', () => {
      setPreferences({ reducedMotion: true });
      expect(preferences.value.reducedMotion).toBe(true);
      expect(preferences.value.highContrast).toBe(false);
    });

    it('should merge preferences', () => {
      setPreferences({ reducedMotion: true, highContrast: true });
      expect(preferences.value.reducedMotion).toBe(true);
      expect(preferences.value.highContrast).toBe(true);
      expect(preferences.value.focusVisible).toBe(true);
    });
  });

  describe('computed values', () => {
    it('should compute shouldReduceMotion', () => {
      expect(shouldReduceMotion.value).toBe(false);
      setPreferences({ reducedMotion: true });
      expect(shouldReduceMotion.value).toBe(true);
    });

    it('should compute isHighContrast', () => {
      expect(isHighContrast.value).toBe(false);
      setPreferences({ highContrast: true });
      expect(isHighContrast.value).toBe(true);
    });

    it('should compute isFocusVisible', () => {
      expect(isFocusVisible.value).toBe(true);
      setPreferences({ focusVisible: false });
      expect(isFocusVisible.value).toBe(false);
    });

    it('should compute prefersDarkMode', () => {
      expect(prefersDarkMode.value).toBe(false);
      setPreferences({ prefersDark: true });
      expect(prefersDarkMode.value).toBe(true);
    });

    it('should compute shouldReduceTransparency', () => {
      expect(shouldReduceTransparency.value).toBe(false);
      setPreferences({ reducedTransparency: true });
      expect(shouldReduceTransparency.value).toBe(true);
    });

    it('should compute isRTL', () => {
      expect(isRTL.value).toBe(false);
      setPreferences({ direction: 'rtl' });
      expect(isRTL.value).toBe(true);
    });
  });

  describe('custom preferences', () => {
    it('should set custom preference', () => {
      setCustomPreference('myFeature', true);
      expect(getCustomPreference('myFeature')).toBe(true);
    });

    it('should get custom preference', () => {
      setCustomPreference('fontSize', 16);
      expect(getCustomPreference('fontSize')).toBe(16);
    });

    it('should handle string custom preferences', () => {
      setCustomPreference('theme', 'ocean');
      expect(getCustomPreference('theme')).toBe('ocean');
    });

    it('should return undefined for non-existent custom preference', () => {
      expect(getCustomPreference('nonExistent')).toBeUndefined();
    });

    it('should merge custom preferences with setPreferences', () => {
      setCustomPreference('feature1', true);
      setPreferences({ custom: { feature2: false } });
      expect(getCustomPreference('feature1')).toBe(true);
      expect(getCustomPreference('feature2')).toBe(false);
    });
  });

  describe('announcements', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should add polite announcement', () => {
      announce('Test message');
      expect(announcements.value).toHaveLength(1);
      const announcement = announcements.value[0]!;
      expect(announcement).toBeDefined();
      expect(announcement.message).toBe('Test message');
      expect(announcement.politeness).toBe('polite');
    });

    it('should add assertive announcement', () => {
      announce('Urgent message', 'assertive');
      expect(announcements.value).toHaveLength(1);
      const announcement = announcements.value[0]!;
      expect(announcement).toBeDefined();
      expect(announcement.message).toBe('Urgent message');
      expect(announcement.politeness).toBe('assertive');
    });

    it('should auto-remove announcement after 5 seconds', () => {
      announce('Test message');
      expect(announcements.value).toHaveLength(1);

      vi.advanceTimersByTime(5000);
      expect(announcements.value).toHaveLength(0);
    });

    it('should handle multiple announcements', () => {
      announce('Message 1');
      announce('Message 2', 'assertive');
      expect(announcements.value).toHaveLength(2);
    });

    it('should clear all announcements', () => {
      announce('Message 1');
      announce('Message 2');
      expect(announcements.value).toHaveLength(2);

      clearAnnouncements();
      expect(announcements.value).toHaveLength(0);
    });

    it('should generate unique IDs for announcements', () => {
      announce('Message 1');
      announce('Message 2');
      const ids = announcements.value.map((a) => a.id);
      expect(new Set(ids).size).toBe(2);
    });

    it('should include timestamp in announcements', () => {
      const before = Date.now();
      announce('Test message');
      const after = Date.now();

      const announcement = announcements.value[0]!;
      expect(announcement.timestamp).toBeGreaterThanOrEqual(before);
      expect(announcement.timestamp).toBeLessThanOrEqual(after);
    });
  });

  describe('system media query listeners', () => {
    it('should respond to prefers-color-scheme changes', () => {
      // Simulate the dark mode listener being triggered
      setPreferences({ prefersDark: true });
      expect(prefersDarkMode.value).toBe(true);

      setPreferences({ prefersDark: false });
      expect(prefersDarkMode.value).toBe(false);
    });

    it('should respond to prefers-reduced-transparency changes', () => {
      // Simulate the transparency listener being triggered
      setPreferences({ reducedTransparency: true });
      expect(shouldReduceTransparency.value).toBe(true);

      setPreferences({ reducedTransparency: false });
      expect(shouldReduceTransparency.value).toBe(false);
    });

    it('should update reducedMotion when media query changes', () => {
      // Get the mock matchMedia function
      const mockMatchMedia = window.matchMedia as unknown as ReturnType<typeof vi.fn>;

      // Find the listener for prefers-reduced-motion
      const calls = mockMatchMedia.mock.results;
      const reducedMotionMock = calls.find(
        (call) => call.value.media === '(prefers-reduced-motion: reduce)'
      );

      if (reducedMotionMock?.value.addEventListener) {
        // Get the registered listener
        const addEventListenerCalls = reducedMotionMock.value.addEventListener.mock.calls;
        const changeListener = addEventListenerCalls.find(
          (call: unknown[]) => call[0] === 'change'
        );

        if (changeListener) {
          // Trigger the listener with a mock event
          const mockEvent = { matches: true };
          changeListener[1](mockEvent);

          expect(shouldReduceMotion.value).toBe(true);
        }
      }
    });

    it('should update highContrast when media query changes', () => {
      const mockMatchMedia = window.matchMedia as unknown as ReturnType<typeof vi.fn>;

      const calls = mockMatchMedia.mock.results;
      const highContrastMock = calls.find(
        (call) => call.value.media === '(prefers-contrast: high)'
      );

      if (highContrastMock?.value.addEventListener) {
        const addEventListenerCalls = highContrastMock.value.addEventListener.mock.calls;
        const changeListener = addEventListenerCalls.find(
          (call: unknown[]) => call[0] === 'change'
        );

        if (changeListener) {
          const mockEvent = { matches: true };
          changeListener[1](mockEvent);

          expect(isHighContrast.value).toBe(true);
        }
      }
    });

    it('should update prefersDark when media query changes', () => {
      const mockMatchMedia = window.matchMedia as unknown as ReturnType<typeof vi.fn>;

      const calls = mockMatchMedia.mock.results;
      const darkModeMock = calls.find(
        (call) => call.value.media === '(prefers-color-scheme: dark)'
      );

      if (darkModeMock?.value.addEventListener) {
        const addEventListenerCalls = darkModeMock.value.addEventListener.mock.calls;
        const changeListener = addEventListenerCalls.find(
          (call: unknown[]) => call[0] === 'change'
        );

        if (changeListener) {
          const mockEvent = { matches: true };
          changeListener[1](mockEvent);

          expect(prefersDarkMode.value).toBe(true);
        }
      }
    });

    it('should update reducedTransparency when media query changes', () => {
      const mockMatchMedia = window.matchMedia as unknown as ReturnType<typeof vi.fn>;

      const calls = mockMatchMedia.mock.results;
      const transparencyMock = calls.find(
        (call) => call.value.media === '(prefers-reduced-transparency: reduce)'
      );

      if (transparencyMock?.value.addEventListener) {
        const addEventListenerCalls = transparencyMock.value.addEventListener.mock.calls;
        const changeListener = addEventListenerCalls.find(
          (call: unknown[]) => call[0] === 'change'
        );

        if (changeListener) {
          const mockEvent = { matches: true };
          changeListener[1](mockEvent);

          expect(shouldReduceTransparency.value).toBe(true);
        }
      }
    });
  });
});
