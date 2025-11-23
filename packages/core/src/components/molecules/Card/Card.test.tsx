/**
 * Card Tests
 *
 * Unit tests using Vitest and Testing Library.
 *
 * @module @fluxwind/core/components
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('renders correctly', () => {
    render(<Card>Test Content</Card>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Card className="custom-class">Content</Card>);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders different sizes', () => {
    const { rerender, container } = render(<Card size="sm">Content</Card>);
    expect(container.firstChild).toHaveClass('h-8');

    rerender(<Card size="lg">Content</Card>);
    expect(container.firstChild).toHaveClass('h-12');
  });

  it('renders different variants', () => {
    const { rerender, container } = render(<Card variant="primary">Content</Card>);
    expect(container.firstChild).toHaveClass('bg-primary-500');

    rerender(<Card variant="error">Content</Card>);
    expect(container.firstChild).toHaveClass('bg-error-500');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Card ref={ref}>Content</Card>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
