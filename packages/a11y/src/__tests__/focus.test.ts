import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  getFocusableElements,
  getFirstFocusable,
  getLastFocusable,
  trapFocus,
  focusFirst,
  focusLast,
  FocusManager,
} from '../utils/focus';

describe('@fluxwind/a11y - focus utils', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe('getFocusableElements', () => {
    it('should find all focusable elements', () => {
      container.innerHTML = `
        <button>Button 1</button>
        <a href="#">Link</a>
        <input type="text" />
        <button>Button 2</button>
      `;

      const focusable = getFocusableElements(container);
      expect(focusable).toHaveLength(4);
    });

    it('should exclude disabled elements', () => {
      container.innerHTML = `
        <button>Button 1</button>
        <button disabled>Button 2</button>
        <input type="text" disabled />
      `;

      const focusable = getFocusableElements(container);
      expect(focusable).toHaveLength(1);
    });

    it('should exclude elements with tabindex -1', () => {
      container.innerHTML = `
        <button>Button 1</button>
        <button tabindex="-1">Button 2</button>
      `;

      const focusable = getFocusableElements(container);
      expect(focusable).toHaveLength(1);
    });

    it('should exclude hidden elements', () => {
      container.innerHTML = `
        <button>Visible</button>
        <button hidden>Hidden</button>
        <button style="display: none;">Display None</button>
        <button style="visibility: hidden;">Visibility Hidden</button>
      `;

      const focusable = getFocusableElements(container);
      expect(focusable).toHaveLength(1);
    });
  });

  describe('getFirstFocusable', () => {
    it('should return first focusable element', () => {
      container.innerHTML = `
        <button>Button 1</button>
        <button>Button 2</button>
      `;

      const first = getFirstFocusable(container);
      expect(first?.textContent).toBe('Button 1');
    });

    it('should return null when no focusable elements', () => {
      container.innerHTML = '<div>No focusable elements</div>';
      const first = getFirstFocusable(container);
      expect(first).toBeNull();
    });
  });

  describe('getLastFocusable', () => {
    it('should return last focusable element', () => {
      container.innerHTML = `
        <button>Button 1</button>
        <button>Button 2</button>
        <button>Button 3</button>
      `;

      const last = getLastFocusable(container);
      expect(last?.textContent).toBe('Button 3');
    });

    it('should return null when no focusable elements', () => {
      container.innerHTML = '<div>No focusable elements</div>';
      const last = getLastFocusable(container);
      expect(last).toBeNull();
    });
  });

  describe('trapFocus', () => {
    beforeEach(() => {
      container.innerHTML = `
        <button id="first">First</button>
        <button id="middle">Middle</button>
        <button id="last">Last</button>
      `;
      document.body.appendChild(container);
    });

    it('should trap focus on Tab from last element', () => {
      const last = document.getElementById('last')!;
      document.getElementById('first')!; // Ensure first element exists
      last.focus();

      const event = new KeyboardEvent('keydown', {
        key: 'Tab',
        bubbles: true,
        cancelable: true,
      });

      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
      trapFocus(container, event);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('should trap focus on Shift+Tab from first element', () => {
      const first = document.getElementById('first')!;
      first.focus();

      const event = new KeyboardEvent('keydown', {
        key: 'Tab',
        shiftKey: true,
        bubbles: true,
        cancelable: true,
      });

      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
      trapFocus(container, event);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('should not trap focus on middle elements', () => {
      const middle = document.getElementById('middle')!;
      middle.focus();

      const event = new KeyboardEvent('keydown', {
        key: 'Tab',
        bubbles: true,
        cancelable: true,
      });

      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
      trapFocus(container, event);

      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });

    it('should do nothing when no focusable elements', () => {
      container.innerHTML = '<div>No buttons</div>';
      const event = new KeyboardEvent('keydown', { key: 'Tab' });

      expect(() => {
        trapFocus(container, event);
      }).not.toThrow();
    });

    it('should do nothing on non-Tab keys', () => {
      const first = document.getElementById('first')!;
      first.focus();

      const event = new KeyboardEvent('keydown', {
        key: 'Enter',
        bubbles: true,
        cancelable: true,
      });

      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
      trapFocus(container, event);

      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });
  });

  describe('focusFirst', () => {
    it('should focus first element', () => {
      container.innerHTML = `
        <button id="first">First</button>
        <button>Second</button>
      `;

      focusFirst(container);
      expect(document.activeElement?.id).toBe('first');
    });

    it('should do nothing when no focusable elements', () => {
      container.innerHTML = '<div>No buttons</div>';
      expect(() => {
        focusFirst(container);
      }).not.toThrow();
    });
  });

  describe('focusLast', () => {
    it('should focus last element', () => {
      container.innerHTML = `
        <button>First</button>
        <button id="last">Last</button>
      `;

      focusLast(container);
      expect(document.activeElement?.id).toBe('last');
    });

    it('should do nothing when no focusable elements', () => {
      container.innerHTML = '<div>No buttons</div>';
      expect(() => {
        focusLast(container);
      }).not.toThrow();
    });
  });

  describe('FocusManager', () => {
    it('should save and restore focus', () => {
      container.innerHTML = `
        <button id="button1">Button 1</button>
        <button id="button2">Button 2</button>
      `;

      const button1 = document.getElementById('button1')!;
      const button2 = document.getElementById('button2')!;

      button1.focus();
      expect(document.activeElement).toBe(button1);

      const manager = new FocusManager();
      manager.save();

      button2.focus();
      expect(document.activeElement).toBe(button2);

      manager.restore();
      expect(document.activeElement).toBe(button1);
    });

    it('should not restore when element is removed', () => {
      container.innerHTML = '<button id="temp">Temporary</button>';
      const temp = document.getElementById('temp')!;
      temp.focus();

      const manager = new FocusManager();
      manager.save();

      container.innerHTML = '';
      manager.restore();

      // Should not throw or cause issues
      expect(document.activeElement).toBe(document.body);
    });

    it('should clear saved focus', () => {
      container.innerHTML = '<button id="button">Button</button>';
      const button = document.getElementById('button')!;
      button.focus();

      const manager = new FocusManager();
      manager.save();
      manager.clear();

      button.blur();
      manager.restore();

      // Should not restore after clearing
      expect(document.activeElement).not.toBe(button);
    });
  });
});
