/**
 * Toast Tests
 *
 * Unit tests using Vitest and Testing Library.
 *
 * @module @fluxwind/core/components
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Toast } from './Toast';

describe('Toast', () => {
  it('renders correctly', () => {
    render(<Toast>Test Content</Toast>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Toast className="custom-class">Content</Toast>);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders different sizes', () => {
    const { rerender, container } = render(<Toast size="sm">Content</Toast>);
    expect(container.firstChild).toHaveClass('h-8');

    rerender(<Toast size="lg">Content</Toast>);
    expect(container.firstChild).toHaveClass('h-12');
  });

  it('renders different variants', () => {
    const { rerender, container } = render(<Toast variant="primary">Content</Toast>);
    expect(container.firstChild).toHaveClass('bg-primary-500');

    rerender(<Toast variant="error">Content</Toast>);
    expect(container.firstChild).toHaveClass('bg-error-500');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Toast ref={ref}>Content</Toast>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
