/**
 * Dialog Tests
 *
 * Unit tests using Vitest and Testing Library.
 *
 * @module @fluxwind/core/components
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Dialog } from './Dialog';

describe('Dialog', () => {
  it('renders correctly', () => {
    render(<Dialog>Test Content</Dialog>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Dialog className="custom-class">Content</Dialog>);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders different sizes', () => {
    const { rerender, container } = render(<Dialog size="sm">Content</Dialog>);
    expect(container.firstChild).toHaveClass('h-8');

    rerender(<Dialog size="lg">Content</Dialog>);
    expect(container.firstChild).toHaveClass('h-12');
  });

  it('renders different variants', () => {
    const { rerender, container } = render(<Dialog variant="primary">Content</Dialog>);
    expect(container.firstChild).toHaveClass('bg-primary-500');

    rerender(<Dialog variant="error">Content</Dialog>);
    expect(container.firstChild).toHaveClass('bg-error-500');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Dialog ref={ref}>Content</Dialog>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
