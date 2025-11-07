import { describe, it, expect, beforeEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { AriaLive } from '../components/AriaLive';
import { announce, clearAnnouncements } from '../store';

describe('@fluxwind/a11y - AriaLive', () => {
  beforeEach(() => {
    clearAnnouncements();
  });

  it('should render nothing when no announcements', () => {
    const { container } = render(<AriaLive />);
    expect(container.firstChild).toBeNull();
  });

  it('should render polite announcements', () => {
    announce('Polite message', 'polite');
    const { getByText } = render(<AriaLive politeness="polite" />);
    expect(getByText('Polite message')).toBeInTheDocument();
  });

  it('should render assertive announcements', () => {
    announce('Urgent message', 'assertive');
    const { getByText } = render(<AriaLive politeness="assertive" />);
    expect(getByText('Urgent message')).toBeInTheDocument();
  });

  it('should filter announcements by politeness', () => {
    announce('Polite message', 'polite');
    announce('Assertive message', 'assertive');

    const { queryByText } = render(<AriaLive politeness="polite" />);
    expect(queryByText('Polite message')).toBeInTheDocument();
    expect(queryByText('Assertive message')).not.toBeInTheDocument();
  });

  it('should have correct ARIA attributes', () => {
    announce('Test message', 'polite');
    const { container } = render(<AriaLive politeness="polite" />);

    const liveRegion = container.firstChild as HTMLElement;
    expect(liveRegion).toHaveAttribute('role', 'status');
    expect(liveRegion).toHaveAttribute('aria-live', 'polite');
    expect(liveRegion).toHaveAttribute('aria-atomic', 'true');
  });

  it('should apply assertive politeness', () => {
    announce('Urgent', 'assertive');
    const { container } = render(<AriaLive politeness="assertive" />);

    const liveRegion = container.firstChild as HTMLElement;
    expect(liveRegion).toHaveAttribute('aria-live', 'assertive');
  });

  it('should apply visually hidden styles', () => {
    announce('Test message', 'polite');
    const { container } = render(<AriaLive />);

    const element = container.firstChild as HTMLElement;
    expect(element.style.position).toBe('absolute');
    expect(element.style.width).toBe('1px');
    expect(element.style.height).toBe('1px');
  });

  it('should accept custom className', () => {
    announce('Test message', 'polite');
    const { container } = render(<AriaLive className="custom-class" />);

    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('custom-class');
  });

  it('should update when announcements change', async () => {
    const { getByText } = render(<AriaLive />);

    announce('First message', 'polite');

    // Wait for signal update
    await waitFor(() => {
      expect(getByText('First message')).toBeInTheDocument();
    });
  });

  it('should have correct displayName', () => {
    expect(AriaLive.displayName).toBe('AriaLive');
  });

  it('should handle multiple announcements', () => {
    announce('Message 1', 'polite');
    announce('Message 2', 'polite');

    const { getByText } = render(<AriaLive />);
    expect(getByText('Message 1')).toBeInTheDocument();
    expect(getByText('Message 2')).toBeInTheDocument();
  });
});
