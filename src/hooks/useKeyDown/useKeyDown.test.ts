import { renderHook, act } from '@testing-library/react';
import { useKeyDown } from './useKeyDown';

describe('useKeyDown hook', () => {
  it('calls callback when specified key is pressed', () => {
    const mockCallback = jest.fn();
    const keys = ['Escape'];

    renderHook(() => useKeyDown(keys, mockCallback));

    act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });

    expect(mockCallback).toHaveBeenCalled();
  });

  it('does not call callback when a different key is pressed', () => {
    const mockCallback = jest.fn();
    const keys = ['Escape'];

    renderHook(() => useKeyDown(keys, mockCallback));

    act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    });

    expect(mockCallback).not.toHaveBeenCalled();
  });
});
