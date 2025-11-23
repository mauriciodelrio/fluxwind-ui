/**
 * Label Tests
 *
 * Unit tests using Vitest and Testing Library.
 *
 * @module @fluxwind/core/components
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Label } from './Label';

describe('Label', () => {
  it('renders correctly', () => {
    render(<Label>Test Content</Label>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Label className="custom-class">Content</Label>);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders different sizes', () => {
    const { rerender, container } = render(<Label size="sm">Content</Label>);
    expect(container.firstChild).toHaveClass('h-8');

    rerender(<Label size="lg">Content</Label>);
    expect(container.firstChild).toHaveClass('h-12');
  });

  it('renders different variants', () => {
    const { rerender, container } = render(<Label variant="primary">Content</Label>);
    expect(container.firstChild).toHaveClass('bg-primary-500');

    rerender(<Label variant="error">Content</Label>);
    expect(container.firstChild).toHaveClass('bg-error-500');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Label ref={ref}>Content</Label>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
