import { act, renderHook } from '@testing-library/react';
import { useAuthorization } from './useAuthorization';
import { LoginPayload } from 'types';
import { authorizeUser } from '../../api';

jest.mock('../../api');

describe('useAuthorization hook', () => {
  it('authorizes user and sets isAuthorized to true', async () => {
    const mockHandleSuccess = jest.fn();
    const mockHandleError = jest.fn();
    const mockData: LoginPayload = {
      email: 'test@example.com',
      password: '12345678',
    };

    (authorizeUser as jest.Mock).mockResolvedValueOnce(true);

    const { result } = renderHook(() =>
      useAuthorization({
        handleSuccess: mockHandleSuccess,
        handleError: mockHandleError,
      })
    );

    await act(async () => {
      await result.current.authorize(mockData);
    });

    expect(mockHandleSuccess).toHaveBeenCalledWith(mockData);
    expect(result.current.isAuthorized).toBe(true);
  });

  it('handles authorization error and sets isAuthorized to false', async () => {
    const mockHandleSuccess = jest.fn();
    const mockHandleError = jest.fn();
    const mockData: LoginPayload = {
      email: 'test@example.com',
      password: '11111111',
    };

    (authorizeUser as jest.Mock).mockRejectedValueOnce(new Error());

    const { result } = renderHook(() =>
      useAuthorization({
        handleSuccess: mockHandleSuccess,
        handleError: mockHandleError,
      })
    );

    await act(async () => {
      await result.current.authorize(mockData);
    });

    expect(mockHandleError).toHaveBeenCalled();
    expect(result.current.isAuthorized).toBe(false);
  });

  it('logs out user and sets isAuthorized to false', () => {
    const { result } = renderHook(() => useAuthorization({}));

    act(() => {
      result.current.logout();
    });

    expect(result.current.isAuthorized).toBe(false);
  });
});
