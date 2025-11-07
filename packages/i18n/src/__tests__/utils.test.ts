import { describe, it, expect } from 'vitest';
import { interpolate } from '../utils/interpolate';
import { pluralize, getPluralForm } from '../utils/pluralize';
import { getNested } from '../utils/get-nested';

describe('@fluxwind/i18n - Utils', () => {
  describe('interpolate', () => {
    it('should replace single parameter', () => {
      const result = interpolate('Hello, {{name}}!', { name: 'World' });
      expect(result).toBe('Hello, World!');
    });

    it('should replace multiple parameters', () => {
      const result = interpolate('{{greeting}}, {{name}}!', {
        greeting: 'Hi',
        name: 'John',
      });
      expect(result).toBe('Hi, John!');
    });

    it('should handle numbers', () => {
      const result = interpolate('You have {{count}} items', { count: 5 });
      expect(result).toBe('You have 5 items');
    });

    it('should keep unreplaced parameters', () => {
      const result = interpolate('Hello, {{name}}!', {});
      expect(result).toBe('Hello, {{name}}!');
    });

    it('should handle empty string', () => {
      const result = interpolate('', { name: 'Test' });
      expect(result).toBe('');
    });

    it('should handle string without parameters', () => {
      const result = interpolate('No parameters here', { name: 'Test' });
      expect(result).toBe('No parameters here');
    });
  });

  describe('getPluralForm', () => {
    it('should return "zero" for count 0', () => {
      expect(getPluralForm(0)).toBe('zero');
    });

    it('should return "one" for count 1', () => {
      expect(getPluralForm(1)).toBe('one');
    });

    it('should return "other" for count > 1', () => {
      expect(getPluralForm(2)).toBe('other');
      expect(getPluralForm(5)).toBe('other');
      expect(getPluralForm(100)).toBe('other');
    });

    it('should return "other" for negative numbers', () => {
      expect(getPluralForm(-1)).toBe('other');
      expect(getPluralForm(-5)).toBe('other');
    });
  });

  describe('pluralize', () => {
    it('should select "zero" form', () => {
      const obj = {
        zero: 'No items',
        one: '1 item',
        other: '{{count}} items',
      };
      expect(pluralize(obj, 0)).toBe('No items');
    });

    it('should select "one" form', () => {
      const obj = {
        zero: 'No items',
        one: '1 item',
        other: '{{count}} items',
      };
      expect(pluralize(obj, 1)).toBe('1 item');
    });

    it('should select "other" form', () => {
      const obj = {
        zero: 'No items',
        one: '1 item',
        other: '{{count}} items',
      };
      expect(pluralize(obj, 5)).toBe('{{count}} items');
    });

    it('should fallback to "other" if specific form missing', () => {
      const obj = {
        other: 'Some items',
      };
      expect(pluralize(obj, 0)).toBe('Some items');
      expect(pluralize(obj, 1)).toBe('Some items');
      expect(pluralize(obj, 5)).toBe('Some items');
    });

    it('should handle all plural forms', () => {
      const obj = {
        zero: 'Zero',
        one: 'One',
        two: 'Two',
        few: 'Few',
        many: 'Many',
        other: 'Other',
      };
      expect(pluralize(obj, 0)).toBe('Zero');
      expect(pluralize(obj, 1)).toBe('One');
      expect(pluralize(obj, 2)).toBe('Other'); // getPluralForm returns 'other' for 2
    });
  });

  describe('getNested', () => {
    const obj = {
      user: {
        profile: {
          name: 'John',
          age: '30',
        },
        settings: {
          theme: 'dark',
        },
      },
      simple: 'value',
    };

    it('should get nested value with dot notation', () => {
      expect(getNested(obj, 'user.profile.name')).toBe('John');
      expect(getNested(obj, 'user.profile.age')).toBe('30');
      expect(getNested(obj, 'user.settings.theme')).toBe('dark');
    });

    it('should get simple value', () => {
      expect(getNested(obj, 'simple')).toBe('value');
    });

    it('should return undefined for non-existent path', () => {
      expect(getNested(obj, 'user.profile.email')).toBeUndefined();
      expect(getNested(obj, 'nonexistent')).toBeUndefined();
      expect(getNested(obj, 'user.invalid.path')).toBeUndefined();
    });

    it('should return nested object', () => {
      const result = getNested(obj, 'user.profile');
      expect(result).toEqual({ name: 'John', age: '30' });
    });

    it('should handle empty path', () => {
      expect(getNested(obj, '')).toBe(obj);
    });
  });
});
