/**
 * Icon Tests
 *
 * Unit tests using Vitest and Testing Library.
 *
 * @module @fluxwind/core/components
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Icon } from './Icon';

describe('Icon', () => {
  it('renders correctly', () => {
    render(<Icon>Test Content</Icon>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Icon className="custom-class">Content</Icon>);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders different sizes', () => {
    const { rerender, container } = render(<Icon size="sm">Content</Icon>);
    expect(container.firstChild).toHaveClass('h-8');

    rerender(<Icon size="lg">Content</Icon>);
    expect(container.firstChild).toHaveClass('h-12');
  });

  it('renders different variants', () => {
    const { rerender, container } = render(<Icon variant="primary">Content</Icon>);
    expect(container.firstChild).toHaveClass('bg-primary-500');

    rerender(<Icon variant="error">Content</Icon>);
    expect(container.firstChild).toHaveClass('bg-error-500');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Icon ref={ref}>Content</Icon>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
