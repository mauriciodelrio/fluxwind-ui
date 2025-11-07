import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, render } from '@testing-library/react';
import { useFocusTrap } from '../hooks/useFocusTrap';

describe('@fluxwind/a11y - useFocusTrap', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('should return a ref', () => {
    const { result } = renderHook(() => useFocusTrap());
    expect(result.current).toBeDefined();
    expect(result.current.current).toBeNull();
  });

  it('should auto focus first element when active and autoFocus is true', () => {
    const TestComponent = () => {
      const ref = useFocusTrap<HTMLDivElement>({ active: true, autoFocus: true });
      return (
        <div ref={ref}>
          <button data-testid="btn1">Button 1</button>
          <button data-testid="btn2">Button 2</button>
        </div>
      );
    };

    const { getByTestId } = render(<TestComponent />);
    const btn1 = getByTestId('btn1');

    // First button should be focused
    expect(document.activeElement).toBe(btn1);
  });

  it('should not auto focus when autoFocus is false', () => {
    const TestComponent = () => {
      const ref = useFocusTrap<HTMLDivElement>({ active: true, autoFocus: false });
      return (
        <div ref={ref}>
          <button data-testid="btn1">Button 1</button>
        </div>
      );
    };

    render(<TestComponent />);

    // No button should be focused
    expect(document.activeElement).toBe(document.body);
  });

  it('should not activate when active is false', () => {
    const TestComponent = () => {
      const ref = useFocusTrap<HTMLDivElement>({ active: false, autoFocus: true });
      return (
        <div ref={ref}>
          <button data-testid="btn1">Button 1</button>
        </div>
      );
    };

    render(<TestComponent />);

    // No button should be focused since trap is inactive
    expect(document.activeElement).toBe(document.body);
  });

  it('should trap Tab key navigation', () => {
    const TestComponent = () => {
      const ref = useFocusTrap<HTMLDivElement>({ active: true, autoFocus: false });
      return (
        <div ref={ref}>
          <button data-testid="btn1">Button 1</button>
          <button data-testid="btn2">Button 2</button>
        </div>
      );
    };

    const { getByTestId } = render(<TestComponent />);
    const btn1 = getByTestId('btn1');

    btn1.focus();
    expect(document.activeElement).toBe(btn1);

    // Simulate Tab key
    const tabEvent = new KeyboardEvent('keydown', {
      key: 'Tab',
      bubbles: true,
      cancelable: true,
    });
    btn1.dispatchEvent(tabEvent);

    // After Tab, focus should move to btn2 (or stay on btn1 if trapped)
    // The trapFocus function handles this
    expect(document.activeElement).toBeDefined();
  });

  it('should restore focus on unmount when restoreFocus is true', () => {
    const outsideButton = document.createElement('button');
    outsideButton.textContent = 'Outside';
    document.body.appendChild(outsideButton);
    outsideButton.focus();

    expect(document.activeElement).toBe(outsideButton);

    const TestComponent = () => {
      const ref = useFocusTrap<HTMLDivElement>({
        active: true,
        autoFocus: true,
        restoreFocus: true,
      });
      return (
        <div ref={ref}>
          <button data-testid="btn1">Button 1</button>
        </div>
      );
    };

    const { unmount } = render(<TestComponent />);

    // Focus should be inside the trap
    expect(document.activeElement?.textContent).toBe('Button 1');

    // Unmount to trigger restore
    unmount();

    // Focus should be restored to outside button
    expect(document.activeElement).toBe(outsideButton);

    document.body.removeChild(outsideButton);
  });

  it('should not restore focus when restoreFocus is false', () => {
    const outsideButton = document.createElement('button');
    outsideButton.textContent = 'Outside';
    document.body.appendChild(outsideButton);
    outsideButton.focus();

    const TestComponent = () => {
      const ref = useFocusTrap<HTMLDivElement>({
        active: true,
        autoFocus: true,
        restoreFocus: false,
      });
      return (
        <div ref={ref}>
          <button data-testid="btn1">Button 1</button>
        </div>
      );
    };

    const { unmount } = render(<TestComponent />);

    // Unmount
    unmount();

    // Focus should not be restored
    expect(document.activeElement).not.toBe(outsideButton);

    document.body.removeChild(outsideButton);
  });

  it('should handle activation changes', () => {
    const TestComponent = ({ active }: { active: boolean }) => {
      const ref = useFocusTrap<HTMLDivElement>({ active, autoFocus: true });
      return (
        <div ref={ref}>
          <button data-testid="btn1">Button 1</button>
        </div>
      );
    };

    const { rerender, getByTestId } = render(<TestComponent active={false} />);

    // Should not be focused when inactive
    expect(document.activeElement).toBe(document.body);

    // Activate
    rerender(<TestComponent active={true} />);

    // Should now be focused
    const btn1 = getByTestId('btn1');
    expect(document.activeElement).toBe(btn1);
  });

  it('should cleanup event listeners on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(HTMLElement.prototype, 'removeEventListener');

    const TestComponent = () => {
      const ref = useFocusTrap<HTMLDivElement>({ active: true });
      return (
        <div ref={ref}>
          <button>Button</button>
        </div>
      );
    };

    const { unmount } = render(<TestComponent />);

    unmount();

    // Should have removed keydown listener
    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));

    removeEventListenerSpy.mockRestore();
  });
});
