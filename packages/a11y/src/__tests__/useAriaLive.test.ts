import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useAriaLive, useAnnouncement } from '../hooks/useAriaLive';
import { announcements, clearAnnouncements } from '../store';

describe('@fluxwind/a11y - useAriaLive', () => {
  beforeEach(() => {
    clearAnnouncements();
  });

  describe('useAriaLive', () => {
    it('should provide announcePolite function', () => {
      const { result } = renderHook(() => useAriaLive());
      expect(result.current.announcePolite).toBeInstanceOf(Function);
    });

    it('should provide announceAssertive function', () => {
      const { result } = renderHook(() => useAriaLive());
      expect(result.current.announceAssertive).toBeInstanceOf(Function);
    });

    it('should announce polite message', () => {
      const { result } = renderHook(() => useAriaLive());
      result.current.announcePolite('Polite message');

      expect(announcements.value).toHaveLength(1);
      expect(announcements.value[0]!.politeness).toBe('polite');
      expect(announcements.value[0]!.message).toBe('Polite message');
    });

    it('should announce assertive message', () => {
      const { result } = renderHook(() => useAriaLive());
      result.current.announceAssertive('Urgent message');

      expect(announcements.value).toHaveLength(1);
      expect(announcements.value[0]!.politeness).toBe('assertive');
      expect(announcements.value[0]!.message).toBe('Urgent message');
    });
  });

  describe('useAnnouncement', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should announce message on mount', () => {
      renderHook(() => useAnnouncement('Test message'));

      expect(announcements.value).toHaveLength(1);
      expect(announcements.value[0]!.message).toBe('Test message');
    });

    it('should announce assertive message', () => {
      renderHook(() => useAnnouncement('Urgent', 'assertive'));

      expect(announcements.value).toHaveLength(1);
      expect(announcements.value[0]!.politeness).toBe('assertive');
    });

    it('should not announce when message is undefined', () => {
      renderHook(() => useAnnouncement(undefined));
      expect(announcements.value).toHaveLength(0);
    });

    it('should re-announce when dependencies change', () => {
      const { rerender } = renderHook(({ msg }) => useAnnouncement(msg, 'polite', [msg]), {
        initialProps: { msg: 'First' },
      });

      expect(announcements.value).toHaveLength(1);
      expect(announcements.value[0]!.message).toBe('First');

      clearAnnouncements();

      rerender({ msg: 'Second' });

      expect(announcements.value).toHaveLength(1);
      expect(announcements.value[0]!.message).toBe('Second');
    });
  });
});
