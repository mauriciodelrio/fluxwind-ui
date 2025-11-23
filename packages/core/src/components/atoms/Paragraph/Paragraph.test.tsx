/**
 * Paragraph Tests
 *
 * Unit tests using Vitest and Testing Library.
 *
 * @module @fluxwind/core/components
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Paragraph } from './Paragraph';

describe('Paragraph', () => {
  it('renders correctly', () => {
    render(<Paragraph>Test Content</Paragraph>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Paragraph className="custom-class">Content</Paragraph>);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders different sizes', () => {
    const { rerender, container } = render(<Paragraph size="sm">Content</Paragraph>);
    expect(container.firstChild).toHaveClass('h-8');

    rerender(<Paragraph size="lg">Content</Paragraph>);
    expect(container.firstChild).toHaveClass('h-12');
  });

  it('renders different variants', () => {
    const { rerender, container } = render(<Paragraph variant="primary">Content</Paragraph>);
    expect(container.firstChild).toHaveClass('bg-primary-500');

    rerender(<Paragraph variant="error">Content</Paragraph>);
    expect(container.firstChild).toHaveClass('bg-error-500');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Paragraph ref={ref}>Content</Paragraph>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
