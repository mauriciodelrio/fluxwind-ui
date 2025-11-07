import { describe, it, expect, vi } from 'vitest';
import {
  KEYS,
  isKey,
  isActivationKey,
  isArrowKey,
  handleKeyboardNavigation,
} from '../utils/keyboard';

describe('@fluxwind/a11y - keyboard utils', () => {
  describe('KEYS constants', () => {
    it('should have all keyboard keys defined', () => {
      expect(KEYS.ENTER).toBe('Enter');
      expect(KEYS.SPACE).toBe(' ');
      expect(KEYS.ESCAPE).toBe('Escape');
      expect(KEYS.TAB).toBe('Tab');
      expect(KEYS.ARROW_UP).toBe('ArrowUp');
      expect(KEYS.ARROW_DOWN).toBe('ArrowDown');
      expect(KEYS.ARROW_LEFT).toBe('ArrowLeft');
      expect(KEYS.ARROW_RIGHT).toBe('ArrowRight');
      expect(KEYS.HOME).toBe('Home');
      expect(KEYS.END).toBe('End');
      expect(KEYS.PAGE_UP).toBe('PageUp');
      expect(KEYS.PAGE_DOWN).toBe('PageDown');
    });
  });

  describe('isKey', () => {
    it('should return true for matching key', () => {
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      expect(isKey(event, KEYS.ENTER)).toBe(true);
    });

    it('should return false for non-matching key', () => {
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      expect(isKey(event, KEYS.ESCAPE)).toBe(false);
    });
  });

  describe('isActivationKey', () => {
    it('should return true for Enter key', () => {
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      expect(isActivationKey(event)).toBe(true);
    });

    it('should return true for Space key', () => {
      const event = new KeyboardEvent('keydown', { key: ' ' });
      expect(isActivationKey(event)).toBe(true);
    });

    it('should return false for other keys', () => {
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      expect(isActivationKey(event)).toBe(false);
    });
  });

  describe('isArrowKey', () => {
    it('should return true for ArrowUp', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      expect(isArrowKey(event)).toBe(true);
    });

    it('should return true for ArrowDown', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      expect(isArrowKey(event)).toBe(true);
    });

    it('should return true for ArrowLeft', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
      expect(isArrowKey(event)).toBe(true);
    });

    it('should return true for ArrowRight', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      expect(isArrowKey(event)).toBe(true);
    });

    it('should return false for non-arrow keys', () => {
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      expect(isArrowKey(event)).toBe(false);
    });
  });

  describe('handleKeyboardNavigation', () => {
    it('should call handler for matching key', () => {
      const handler = vi.fn();
      const event = new KeyboardEvent('keydown', { key: 'Enter' });

      handleKeyboardNavigation(event, {
        [KEYS.ENTER]: handler,
      });

      expect(handler).toHaveBeenCalledWith(event);
    });

    it('should not call handler for non-matching key', () => {
      const handler = vi.fn();
      const event = new KeyboardEvent('keydown', { key: 'Enter' });

      handleKeyboardNavigation(event, {
        [KEYS.ESCAPE]: handler,
      });

      expect(handler).not.toHaveBeenCalled();
    });

    it('should handle multiple handlers', () => {
      const enterHandler = vi.fn();
      const escapeHandler = vi.fn();
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });

      handleKeyboardNavigation(enterEvent, {
        [KEYS.ENTER]: enterHandler,
        [KEYS.ESCAPE]: escapeHandler,
      });

      expect(enterHandler).toHaveBeenCalledWith(enterEvent);
      expect(escapeHandler).not.toHaveBeenCalled();
    });

    it('should do nothing when no handler is defined', () => {
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      expect(() => {
        handleKeyboardNavigation(event, {});
      }).not.toThrow();
    });
  });
});
