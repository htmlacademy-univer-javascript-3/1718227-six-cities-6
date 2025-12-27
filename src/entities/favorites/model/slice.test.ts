import { describe, it, expect } from 'vitest';
import {
  favoritesReducer,
  clearFavorites,
  fetchFavorites,
  toggleFavorite,
} from './slice';
import { makeFakeOffer } from '@/shared/lib/test-utils';

describe('favoritesSlice', () => {
  const initialState = {
    favorites: [],
    isLoading: false,
    error: null,
  };

  describe('initial state', () => {
    it('should return initial state with empty action', () => {
      const emptyAction = { type: '' };
      const result = favoritesReducer(undefined, emptyAction);

      expect(result).toEqual(initialState);
    });
  });

  describe('clearFavorites', () => {
    it('should clear favorites', () => {
      const stateWithFavorites = {
        ...initialState,
        favorites: [makeFakeOffer(), makeFakeOffer()],
      };

      const result = favoritesReducer(stateWithFavorites, clearFavorites());

      expect(result.favorites).toEqual([]);
    });
  });

  describe('fetchFavorites', () => {
    it('should set isLoading to true on pending', () => {
      const result = favoritesReducer(
        initialState,
        fetchFavorites.pending('', undefined)
      );

      expect(result.isLoading).toBe(true);
      expect(result.error).toBeNull();
    });

    it('should set favorites and isLoading to false on fulfilled', () => {
      const mockFavorites = [makeFakeOffer(), makeFakeOffer()];
      const result = favoritesReducer(
        { ...initialState, isLoading: true },
        fetchFavorites.fulfilled(mockFavorites, '', undefined)
      );

      expect(result.isLoading).toBe(false);
      expect(result.favorites).toEqual(mockFavorites);
    });

    it('should set error and isLoading to false on rejected', () => {
      const error = new Error('Failed to fetch');
      const result = favoritesReducer(
        { ...initialState, isLoading: true },
        fetchFavorites.rejected(error, '', undefined)
      );

      expect(result.isLoading).toBe(false);
      expect(result.error).toBe('Failed to fetch');
    });
  });

  describe('toggleFavorite', () => {
    it('should add offer to favorites when isFavorite is true', () => {
      const offer = makeFakeOffer();
      offer.isFavorite = true;

      const result = favoritesReducer(
        initialState,
        toggleFavorite.fulfilled(offer, '', { offerId: offer.id, status: 1 })
      );

      expect(result.favorites).toHaveLength(1);
      expect(result.favorites[0]).toEqual(offer);
    });

    it('should not add duplicate offer to favorites', () => {
      const offer = makeFakeOffer();
      offer.isFavorite = true;
      const stateWithOffer = {
        ...initialState,
        favorites: [offer],
      };

      const result = favoritesReducer(
        stateWithOffer,
        toggleFavorite.fulfilled(offer, '', { offerId: offer.id, status: 1 })
      );

      expect(result.favorites).toHaveLength(1);
    });

    it('should remove offer from favorites when isFavorite is false', () => {
      const offer = makeFakeOffer();
      offer.isFavorite = true;
      const stateWithOffer = {
        ...initialState,
        favorites: [offer],
      };

      const updatedOffer = { ...offer, isFavorite: false };

      const result = favoritesReducer(
        stateWithOffer,
        toggleFavorite.fulfilled(updatedOffer, '', { offerId: offer.id, status: 0 })
      );

      expect(result.favorites).toHaveLength(0);
    });
  });
});
