import { describe, it, expect, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchOffers, offerReducer } from './slice';
import { makeFakeOffer } from '@/shared/lib/test-utils';

describe('offer async actions', () => {
  const api = axios.create();
  const mockApi = new MockAdapter(api);

  const createTestStore = () =>
    configureStore({
      reducer: { offer: offerReducer },
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

  describe('fetchOffers', () => {
    it('should dispatch pending and fulfilled when server responds 200', async () => {
      const mockOffers = [makeFakeOffer(), makeFakeOffer()];
      mockApi.onGet('/offers').reply(200, mockOffers);

      const store = createTestStore();
      await store.dispatch(fetchOffers());

      const state = store.getState();
      expect(state.offer.offers).toEqual(mockOffers);
      expect(state.offer.isLoading).toBe(false);
      expect(state.offer.error).toBeNull();
    });

    it('should set isLoading to true while pending', async () => {
      const mockOffers = [makeFakeOffer()];
      mockApi.onGet('/offers').reply(200, mockOffers);

      const store = createTestStore();
      const promise = store.dispatch(fetchOffers());

      expect(store.getState().offer.isLoading).toBe(true);

      await promise;

      expect(store.getState().offer.isLoading).toBe(false);
    });

    it('should dispatch pending and rejected when server responds with error', async () => {
      mockApi.onGet('/offers').reply(500);

      const store = createTestStore();
      await store.dispatch(fetchOffers());

      const state = store.getState();
      expect(state.offer.offers).toEqual([]);
      expect(state.offer.isLoading).toBe(false);
      expect(state.offer.error).toBeTruthy();
    });
  });
});
