/**
 * Text Tests
 *
 * Unit tests using Vitest and Testing Library.
 *
 * @module @fluxwind/core/components
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Text } from './Text';

describe('Text', () => {
  it('renders correctly', () => {
    render(<Text>Test Content</Text>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Text className="custom-class">Content</Text>);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders different sizes', () => {
    const { rerender, container } = render(<Text size="sm">Content</Text>);
    expect(container.firstChild).toHaveClass('h-8');

    rerender(<Text size="lg">Content</Text>);
    expect(container.firstChild).toHaveClass('h-12');
  });

  it('renders different variants', () => {
    const { rerender, container } = render(<Text variant="primary">Content</Text>);
    expect(container.firstChild).toHaveClass('bg-primary-500');

    rerender(<Text variant="error">Content</Text>);
    expect(container.firstChild).toHaveClass('bg-error-500');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Text ref={ref}>Content</Text>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
