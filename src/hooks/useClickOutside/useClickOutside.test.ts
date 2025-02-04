import { renderHook, act } from '@testing-library/react';
import { useClickOutside } from './useClickOutside';

describe('useClickOutside hook', () => {
  it('calls callback when clicking outside the element', () => {
    const mockCallback = jest.fn();
    const elementRef = { current: document.createElement('div') };

    renderHook(() => useClickOutside(mockCallback, elementRef));

    act(() => {
      document.body.click();
    });

    expect(mockCallback).toHaveBeenCalled();
  });

  it('does not call callback when clicking inside the element', () => {
    const mockCallback = jest.fn();
    const elementRef = { current: document.createElement('div') };

    renderHook(() => useClickOutside(mockCallback, elementRef));

    act(() => {
      elementRef.current.click();
    });

    expect(mockCallback).not.toHaveBeenCalled();
  });
});
