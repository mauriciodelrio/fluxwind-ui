import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Search, Icon, Home, Menu, Settings } from './index';

describe('@fluxwind/icons', () => {
  it('package exports Icon wrapper', async () => {
    const { Icon } = await import('./index');
    expect(Icon).toBeDefined();
    expect(typeof Icon).toBe('function');
  });

  it('package exports Lucide icons', async () => {
    const icons = await import('./index');

    // UI & Navigation
    expect(icons.Home).toBeDefined();
    expect(icons.Menu).toBeDefined();
    expect(icons.Search).toBeDefined();
    expect(icons.Settings).toBeDefined();
    expect(icons.ChevronDown).toBeDefined();

    // User & Profile
    expect(icons.User).toBeDefined();
    expect(icons.Users).toBeDefined();

    // Files & Folders
    expect(icons.File).toBeDefined();
    expect(icons.Folder).toBeDefined();

    // Communication
    expect(icons.Mail).toBeDefined();
    expect(icons.MessageSquare).toBeDefined();

    // Media
    expect(icons.Image).toBeDefined();
    expect(icons.Video).toBeDefined();

    // Status
    expect(icons.Check).toBeDefined();
    expect(icons.X).toBeDefined();
    expect(icons.AlertCircle).toBeDefined();
  });

  it('exports 100+ icons from Lucide', async () => {
    const icons = await import('./index');
    const iconCount = Object.keys(icons).filter(
      (key) => key !== 'Icon' && typeof icons[key as keyof typeof icons] === 'object'
    ).length;

    expect(iconCount).toBeGreaterThan(100);
  });

  it('all exported icons should be valid', async () => {
    const icons = await import('./index');

    Object.entries(icons).forEach(([name, icon]) => {
      if (name === 'Icon') {
        expect(typeof icon).toBe('function');
      } else {
        // Lucide icons are objects with $$typeof symbol
        expect(typeof icon).toBe('object');
      }
    });
  });

  describe('Icon rendering', () => {
    it('renders Lucide icon', () => {
      const { container } = render(<Search aria-label="Search icon" />);
      const svg = container.querySelector('svg');

      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('aria-label', 'Search icon');
    });

    it('renders with custom size', () => {
      const { container } = render(<Home size={32} />);
      const svg = container.querySelector('svg');

      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('width', '32');
      expect(svg).toHaveAttribute('height', '32');
    });

    it('renders with custom color', () => {
      const { container } = render(<Menu color="red" />);
      const svg = container.querySelector('svg');

      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('stroke', 'red');
    });

    it('renders with custom className', () => {
      const { container } = render(<Settings className="custom-class" />);
      const svg = container.querySelector('svg');

      expect(svg).toBeInTheDocument();
      expect(svg).toHaveClass('custom-class');
    });

    it('renders as decorative when aria-hidden is true', () => {
      const { container } = render(<Search aria-hidden={true} />);
      const svg = container.querySelector('svg');

      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Icon wrapper', () => {
    it('renders custom SVG icon', () => {
      const CustomIcon = (props: Record<string, unknown>) => (
        <svg {...props} data-testid="custom-icon" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
        </svg>
      );

      render(<Icon as={CustomIcon} size={24} aria-label="Custom icon" />);
      const svg = screen.getByTestId('custom-icon');

      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('aria-label', 'Custom icon');
    });

    it('normalizes size prop for custom icons', () => {
      const CustomIcon = (props: Record<string, unknown>) => (
        <svg {...props} data-testid="sized-icon" />
      );

      const { container } = render(<Icon as={CustomIcon} size={48} />);
      const svg = screen.getByTestId('sized-icon');

      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('width', '48px');
      expect(svg).toHaveAttribute('height', '48px');
    });

    it('handles string size prop', () => {
      const CustomIcon = (props: Record<string, unknown>) => (
        <svg {...props} data-testid="string-sized-icon" />
      );

      render(<Icon as={CustomIcon} size="32" />);
      const svg = screen.getByTestId('string-sized-icon');

      expect(svg).toHaveAttribute('width', '32px');
      expect(svg).toHaveAttribute('height', '32px');
    });

    it('handles invalid string size prop and defaults to 24', () => {
      const CustomIcon = (props: Record<string, unknown>) => (
        <svg {...props} data-testid="invalid-sized-icon" />
      );

      render(<Icon as={CustomIcon} size="invalid" />);
      const svg = screen.getByTestId('invalid-sized-icon');

      expect(svg).toHaveAttribute('width', '24px');
      expect(svg).toHaveAttribute('height', '24px');
    });

    it('passes color to custom icons', () => {
      const CustomIcon = (props: Record<string, unknown>) => (
        <svg {...props} data-testid="colored-icon" />
      );

      render(<Icon as={CustomIcon} color="blue" />);
      const svg = screen.getByTestId('colored-icon');

      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('stroke', 'blue');
      expect(svg).toHaveAttribute('color', 'blue');
    });

    it('passes strokeWidth to custom icons', () => {
      const CustomIcon = (props: Record<string, unknown>) => (
        <svg {...props} data-testid="stroke-icon" />
      );

      render(<Icon as={CustomIcon} strokeWidth={3} />);
      const svg = screen.getByTestId('stroke-icon');

      // strokeWidth is passed as a prop in the object
      expect(svg).toHaveAttribute('stroke-width', '3');
    });

    it('passes className to custom icons', () => {
      const CustomIcon = (props: Record<string, unknown>) => (
        <svg {...props} data-testid="classed-icon" />
      );

      render(<Icon as={CustomIcon} className="my-custom-class" />);
      const svg = screen.getByTestId('classed-icon');

      expect(svg).toBeInTheDocument();
      expect(svg).toHaveClass('my-custom-class');
    });

    it('sets fontSize to "large" for sizes > 24', () => {
      const CustomIcon = ({ fontSize, ...props }: Record<string, unknown>) => (
        <svg {...props} data-testid="large-icon" data-fontsize={fontSize as string} />
      );

      render(<Icon as={CustomIcon} size={32} />);
      const svg = screen.getByTestId('large-icon');

      expect(svg).toHaveAttribute('data-fontsize', 'large');
    });

    it('sets fontSize to "small" for sizes < 20', () => {
      const CustomIcon = ({ fontSize, ...props }: Record<string, unknown>) => (
        <svg {...props} data-testid="small-icon" data-fontsize={fontSize as string} />
      );

      render(<Icon as={CustomIcon} size={16} />);
      const svg = screen.getByTestId('small-icon');

      expect(svg).toHaveAttribute('data-fontsize', 'small');
    });

    it('sets fontSize to "medium" for sizes between 20 and 24', () => {
      const CustomIcon = ({ fontSize, ...props }: Record<string, unknown>) => (
        <svg {...props} data-testid="medium-icon" data-fontsize={fontSize as string} />
      );

      render(<Icon as={CustomIcon} size={22} />);
      const svg = screen.getByTestId('medium-icon');

      expect(svg).toHaveAttribute('data-fontsize', 'medium');
    });

    it('passes through additional props', () => {
      const CustomIcon = (props: Record<string, unknown>) => (
        <svg {...props} data-testid="props-icon" />
      );

      render(<Icon as={CustomIcon} data-custom="test-value" />);
      const svg = screen.getByTestId('props-icon');

      expect(svg).toHaveAttribute('data-custom', 'test-value');
    });

    it('applies inline styles', () => {
      const CustomIcon = (props: Record<string, unknown>) => (
        <svg {...props} data-testid="styled-icon" />
      );

      render(<Icon as={CustomIcon} size={30} color="red" />);
      const svg = screen.getByTestId('styled-icon');

      expect(svg).toHaveAttribute('style');
      // The style object should contain width, height, and color
      const style = svg.getAttribute('style');
      expect(style).toContain('width: 30px');
      expect(style).toContain('height: 30px');
      expect(style).toContain('color: red');
    });

    it('returns null and warns when no component provided', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { container } = render(<Icon as={undefined as any} />);

      expect(container.firstChild).toBeNull();
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'Icon: No icon component provided. Use the "as" prop to specify an icon.'
      );

      consoleWarnSpy.mockRestore();
    });
  });
});
