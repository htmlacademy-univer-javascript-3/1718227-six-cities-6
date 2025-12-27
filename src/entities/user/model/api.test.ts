import { describe, it, expect, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { checkAuth, userReducer } from './slice';
import { AuthorizationStatus } from './types';
import { makeFakeAuthInfo } from '@/shared/lib/test-utils';

describe('user async actions', () => {
  const api = axios.create();
  const mockApi = new MockAdapter(api);

  const createTestStore = () =>
    configureStore({
      reducer: { user: userReducer },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: {
            extraArgument: api,
          },
        }),
    });

  beforeEach(() => {
    mockApi.reset();
  });

  describe('checkAuth', () => {
    it('should dispatch fulfilled and set Auth status when server responds 200', async () => {
      const mockAuthInfo = makeFakeAuthInfo();
      mockApi.onGet('/login').reply(200, mockAuthInfo);

      const store = createTestStore();
      await store.dispatch(checkAuth());

      const state = store.getState();
      expect(state.user.authorizationStatus).toBe(AuthorizationStatus.Auth);
      expect(state.user.userInfo).toEqual(mockAuthInfo);
    });

    it('should dispatch rejected and set NoAuth status when server responds 401', async () => {
      mockApi.onGet('/login').reply(401);

      const store = createTestStore();
      await store.dispatch(checkAuth());

      const state = store.getState();
      expect(state.user.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
      expect(state.user.userInfo).toBeNull();
    });

    it('should dispatch rejected and set NoAuth status when server responds with error', async () => {
      mockApi.onGet('/login').reply(500);

      const store = createTestStore();
      await store.dispatch(checkAuth());

      const state = store.getState();
      expect(state.user.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
      expect(state.user.userInfo).toBeNull();
    });
  });
});
