import { makeFakeOffer } from '@/shared/lib/test-utils';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { beforeEach, describe, expect, it } from 'vitest';
import { favoritesReducer, fetchFavorites, toggleFavorite } from './slice';

describe('favorites async actions', () => {
  const api = axios.create();
  const mockApi = new MockAdapter(api);

  const createTestStore = () =>
    configureStore({
      reducer: { favorites: favoritesReducer },
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

  describe('fetchFavorites', () => {
    it('should dispatch pending and fulfilled when server responds 200', async () => {
      const mockFavorites = [makeFakeOffer(), makeFakeOffer()];
      mockApi.onGet('/favorite').reply(200, mockFavorites);

      const store = createTestStore();
      await store.dispatch(fetchFavorites());

      const actions = store.getState();
      expect(actions.favorites.favorites).toEqual(mockFavorites);
      expect(actions.favorites.isLoading).toBe(false);
    });

    it('should dispatch pending and rejected when server responds with error', async () => {
      mockApi.onGet('/favorite').reply(500);

      const store = createTestStore();
      await store.dispatch(fetchFavorites());

      const actions = store.getState();
      expect(actions.favorites.favorites).toEqual([]);
      expect(actions.favorites.isLoading).toBe(false);
      expect(actions.favorites.error).toBeTruthy();
    });
  });

  describe('toggleFavorite', () => {
    it('should dispatch fulfilled when adding to favorites', async () => {
      const offer = makeFakeOffer();
      offer.isFavorite = true;
      mockApi.onPost(`/favorite/${offer.id}/1`).reply(200, offer);

      const store = createTestStore();
      await store.dispatch(toggleFavorite({ offerId: offer.id, status: 1 }));

      const actions = store.getState();
      expect(actions.favorites.favorites).toContainEqual(offer);
    });

    it('should dispatch fulfilled when removing from favorites', async () => {
      const offer = makeFakeOffer();
      offer.isFavorite = false;
      mockApi.onPost(`/favorite/${offer.id}/0`).reply(200, offer);

      const store = createTestStore();
      await store.dispatch(toggleFavorite({ offerId: offer.id, status: 0 }));

      const actions = store.getState();
      expect(actions.favorites.favorites).not.toContainEqual(offer);
    });

    it('should dispatch rejected when server responds with error', async () => {
      const offerId = 'test-id';
      mockApi.onPost(`/favorite/${offerId}/1`).reply(500);

      const store = createTestStore();
      const result = await store.dispatch(
        toggleFavorite({ offerId, status: 1 })
      );

      expect(result.type).toBe('favorites/toggleFavorite/rejected');
    });
  });
});
