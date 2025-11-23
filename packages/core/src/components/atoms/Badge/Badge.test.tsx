/**
 * Badge Tests
 *
 * Unit tests using Vitest and Testing Library.
 *
 * @module @fluxwind/core/components
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders correctly', () => {
    render(<Badge>Test Content</Badge>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Badge className="custom-class">Content</Badge>);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders different sizes', () => {
    const { rerender, container } = render(<Badge size="sm">Content</Badge>);
    expect(container.firstChild).toHaveClass('h-8');

    rerender(<Badge size="lg">Content</Badge>);
    expect(container.firstChild).toHaveClass('h-12');
  });

  it('renders different variants', () => {
    const { rerender, container } = render(<Badge variant="primary">Content</Badge>);
    expect(container.firstChild).toHaveClass('bg-primary-500');

    rerender(<Badge variant="error">Content</Badge>);
    expect(container.firstChild).toHaveClass('bg-error-500');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Badge ref={ref}>Content</Badge>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
