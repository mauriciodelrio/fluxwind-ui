import { describe, it, expect } from 'vitest';
import { colorTokens, spacingTokens, fluxwindConfig } from './index';

describe('@fluxwind/themes', () => {
  describe('colorTokens', () => {
    it('exports color tokens', () => {
      expect(colorTokens).toBeDefined();
      expect(colorTokens.slate).toBeDefined();
      expect(colorTokens.ocean).toBeDefined();
    });

    it('has custom colors', () => {
      expect(colorTokens.ocean).toHaveProperty('500');
      expect(colorTokens.tangerine).toHaveProperty('500');
      expect(colorTokens.sapphire).toHaveProperty('500');
    });
  });

  describe('spacingTokens', () => {
    it('exports spacing tokens', () => {
      expect(spacingTokens).toBeDefined();
      expect(spacingTokens['0']).toBe('0');
      expect(spacingTokens['4']).toBe('1rem');
    });
  });

  describe('fluxwindConfig', () => {
    it('exports Tailwind config', () => {
      expect(fluxwindConfig).toBeDefined();
      expect(fluxwindConfig.theme).toBeDefined();
      expect(fluxwindConfig.theme?.extend).toBeDefined();
    });

    it('extends colors', () => {
      expect(fluxwindConfig.theme?.extend?.colors).toBeDefined();
    });

    it('extends spacing', () => {
      expect(fluxwindConfig.theme?.extend?.spacing).toBeDefined();
    });
  });
});
