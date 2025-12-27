import { describe, it, expect } from 'vitest';
import {
  userReducer,
  checkAuth,
  login,
  logout,
} from './slice';
import { AuthorizationStatus } from './types';
import { makeFakeAuthInfo } from '@/shared/lib/test-utils';

describe('userSlice', () => {
  const initialState = {
    authorizationStatus: AuthorizationStatus.Unknown,
    userInfo: null,
  };

  describe('initial state', () => {
    it('should return initial state with empty action', () => {
      const emptyAction = { type: '' };
      const result = userReducer(undefined, emptyAction);

      expect(result).toEqual(initialState);
    });
  });

  describe('checkAuth', () => {
    it('should set Auth status and userInfo on fulfilled', () => {
      const mockAuthInfo = makeFakeAuthInfo();
      const result = userReducer(
        initialState,
        checkAuth.fulfilled(mockAuthInfo, '', undefined)
      );

      expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
      expect(result.userInfo).toEqual(mockAuthInfo);
    });

    it('should set NoAuth status and clear userInfo on rejected', () => {
      const error = new Error('Not authorized');
      const stateWithUser = {
        ...initialState,
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: makeFakeAuthInfo(),
      };

      const result = userReducer(
        stateWithUser,
        checkAuth.rejected(error, '', undefined)
      );

      expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
      expect(result.userInfo).toBeNull();
    });
  });

  describe('login', () => {
    it('should set Auth status and userInfo on fulfilled', () => {
      const mockAuthInfo = makeFakeAuthInfo();
      const loginData = { email: 'test@test.com', password: 'password123' };

      const result = userReducer(
        initialState,
        login.fulfilled(mockAuthInfo, '', loginData)
      );

      expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
      expect(result.userInfo).toEqual(mockAuthInfo);
    });

    it('should set NoAuth status on rejected', () => {
      const error = new Error('Login failed');
      const loginData = { email: 'test@test.com', password: 'password123' };

      const result = userReducer(
        initialState,
        login.rejected(error, '', loginData)
      );

      expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    });
  });

  describe('logout', () => {
    it('should set NoAuth status and clear userInfo on fulfilled', () => {
      const stateWithUser = {
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: makeFakeAuthInfo(),
      };

      const result = userReducer(
        stateWithUser,
        logout.fulfilled(undefined, '', undefined)
      );

      expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
      expect(result.userInfo).toBeNull();
    });
  });
});
