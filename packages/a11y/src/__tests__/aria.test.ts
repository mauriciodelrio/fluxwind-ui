import { describe, it, expect } from 'vitest';
import {
  getButtonAriaProps,
  getDialogAriaProps,
  getMenuAriaProps,
  getMenuItemAriaProps,
  getLiveRegionAriaProps,
  buildAriaLabelledBy,
  buildAriaDescribedBy,
} from '../utils/aria';

describe('@fluxwind/a11y - aria utils', () => {
  describe('getButtonAriaProps', () => {
    it('should return basic button props', () => {
      const props = getButtonAriaProps({});
      expect(props.role).toBe('button');
    });

    it('should include pressed state', () => {
      const props = getButtonAriaProps({ pressed: true });
      expect(props['aria-pressed']).toBe(true);
    });

    it('should include expanded state', () => {
      const props = getButtonAriaProps({ expanded: false });
      expect(props['aria-expanded']).toBe(false);
    });

    it('should include disabled state', () => {
      const props = getButtonAriaProps({ disabled: true });
      expect(props['aria-disabled']).toBe(true);
    });

    it('should include label', () => {
      const props = getButtonAriaProps({ label: 'Click me' });
      expect(props['aria-label']).toBe('Click me');
    });

    it('should include describedby', () => {
      const props = getButtonAriaProps({ describedBy: 'description-id' });
      expect(props['aria-describedby']).toBe('description-id');
    });
  });

  describe('getDialogAriaProps', () => {
    it('should return basic dialog props', () => {
      const props = getDialogAriaProps({});
      expect(props.role).toBe('dialog');
      expect(props['aria-modal']).toBe(true);
    });

    it('should allow non-modal dialogs', () => {
      const props = getDialogAriaProps({ modal: false });
      expect(props['aria-modal']).toBe(false);
    });

    it('should include label', () => {
      const props = getDialogAriaProps({ label: 'My Dialog' });
      expect(props['aria-label']).toBe('My Dialog');
    });

    it('should include labelledby', () => {
      const props = getDialogAriaProps({ labelledBy: 'title-id' });
      expect(props['aria-labelledby']).toBe('title-id');
    });

    it('should include describedby', () => {
      const props = getDialogAriaProps({ describedBy: 'desc-id' });
      expect(props['aria-describedby']).toBe('desc-id');
    });
  });

  describe('getMenuAriaProps', () => {
    it('should return basic menu props', () => {
      const props = getMenuAriaProps({});
      expect(props.role).toBe('menu');
      expect(props['aria-orientation']).toBe('vertical');
    });

    it('should support horizontal orientation', () => {
      const props = getMenuAriaProps({ orientation: 'horizontal' });
      expect(props['aria-orientation']).toBe('horizontal');
    });

    it('should include label', () => {
      const props = getMenuAriaProps({ label: 'Main Menu' });
      expect(props['aria-label']).toBe('Main Menu');
    });

    it('should include labelledby', () => {
      const props = getMenuAriaProps({ labelledBy: 'menu-title' });
      expect(props['aria-labelledby']).toBe('menu-title');
    });
  });

  describe('getMenuItemAriaProps', () => {
    it('should return basic menuitem props', () => {
      const props = getMenuItemAriaProps({});
      expect(props.role).toBe('menuitem');
    });

    it('should include disabled state', () => {
      const props = getMenuItemAriaProps({ disabled: true });
      expect(props['aria-disabled']).toBe(true);
    });

    it('should include checked state', () => {
      const props = getMenuItemAriaProps({ checked: true });
      expect(props['aria-checked']).toBe(true);
    });
  });

  describe('getLiveRegionAriaProps', () => {
    it('should return basic live region props', () => {
      const props = getLiveRegionAriaProps({});
      expect(props.role).toBe('status');
      expect(props['aria-live']).toBe('polite');
      expect(props['aria-atomic']).toBe(true);
      expect(props['aria-relevant']).toBe('additions text');
    });

    it('should support assertive politeness', () => {
      const props = getLiveRegionAriaProps({ politeness: 'assertive' });
      expect(props['aria-live']).toBe('assertive');
    });

    it('should support off politeness', () => {
      const props = getLiveRegionAriaProps({ politeness: 'off' });
      expect(props['aria-live']).toBe('off');
    });

    it('should allow non-atomic updates', () => {
      const props = getLiveRegionAriaProps({ atomic: false });
      expect(props['aria-atomic']).toBe(false);
    });

    it('should support custom relevant', () => {
      const props = getLiveRegionAriaProps({ relevant: 'all' });
      expect(props['aria-relevant']).toBe('all');
    });
  });

  describe('buildAriaLabelledBy', () => {
    it('should combine multiple IDs', () => {
      const result = buildAriaLabelledBy('id1', 'id2', 'id3');
      expect(result).toBe('id1 id2 id3');
    });

    it('should filter undefined values', () => {
      const result = buildAriaLabelledBy('id1', undefined, 'id2');
      expect(result).toBe('id1 id2');
    });

    it('should return undefined for empty array', () => {
      const result = buildAriaLabelledBy();
      expect(result).toBeUndefined();
    });

    it('should return undefined when all values are undefined', () => {
      const result = buildAriaLabelledBy(undefined, undefined);
      expect(result).toBeUndefined();
    });
  });

  describe('buildAriaDescribedBy', () => {
    it('should combine multiple IDs', () => {
      const result = buildAriaDescribedBy('desc1', 'desc2');
      expect(result).toBe('desc1 desc2');
    });

    it('should filter undefined values', () => {
      const result = buildAriaDescribedBy('desc1', undefined, 'desc2');
      expect(result).toBe('desc1 desc2');
    });

    it('should return undefined for empty array', () => {
      const result = buildAriaDescribedBy();
      expect(result).toBeUndefined();
    });
  });
});
