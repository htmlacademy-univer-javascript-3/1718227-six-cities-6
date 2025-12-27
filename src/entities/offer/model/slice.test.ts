import { describe, it, expect } from 'vitest';
import {
  offerReducer,
  setCity,
  setSortType,
  fetchOffers,
} from './slice';
import { SortType } from './types';
import { toggleFavorite } from '@/entities/favorites';
import { makeFakeOffer } from '@/shared/lib/test-utils';
import { CITIES } from '@/shared/const/cities';

describe('offerSlice', () => {
  const initialState = {
    city: CITIES[0],
    offers: [],
    sortType: SortType.Popular,
    isLoading: false,
    error: null,
  };

  describe('initial state', () => {
    it('should return initial state with empty action', () => {
      const emptyAction = { type: '' };
      const result = offerReducer(undefined, emptyAction);

      expect(result).toEqual(initialState);
    });
  });

  describe('setCity', () => {
    it('should set city', () => {
      const newCity = CITIES[1];
      const result = offerReducer(initialState, setCity(newCity));

      expect(result.city).toEqual(newCity);
    });
  });

  describe('setSortType', () => {
    it('should set sort type', () => {
      const newSortType = SortType.PriceHighToLow;
      const result = offerReducer(initialState, setSortType(newSortType));

      expect(result.sortType).toEqual(newSortType);
    });
  });

  describe('fetchOffers', () => {
    it('should set isLoading to true on pending', () => {
      const result = offerReducer(
        initialState,
        fetchOffers.pending('', undefined)
      );

      expect(result.isLoading).toBe(true);
      expect(result.error).toBeNull();
    });

    it('should set offers and isLoading to false on fulfilled', () => {
      const mockOffers = [makeFakeOffer(), makeFakeOffer()];
      const result = offerReducer(
        { ...initialState, isLoading: true },
        fetchOffers.fulfilled(mockOffers, '', undefined)
      );

      expect(result.isLoading).toBe(false);
      expect(result.offers).toEqual(mockOffers);
    });

    it('should set error and isLoading to false on rejected', () => {
      const error = new Error('Failed to fetch');
      const result = offerReducer(
        { ...initialState, isLoading: true },
        fetchOffers.rejected(error, '', undefined)
      );

      expect(result.isLoading).toBe(false);
      expect(result.error).toBe('Failed to fetch');
    });
  });

  describe('toggleFavorite.fulfilled', () => {
    it('should update isFavorite status for offer in list', () => {
      const offer = makeFakeOffer();
      offer.isFavorite = false;
      const stateWithOffers = {
        ...initialState,
        offers: [offer],
      };

      const updatedOffer = { ...offer, isFavorite: true };
      const result = offerReducer(
        stateWithOffers,
        toggleFavorite.fulfilled(updatedOffer, '', { offerId: offer.id, status: 1 })
      );

      expect(result.offers[0].isFavorite).toBe(true);
    });

    it('should not modify offers if offer is not in list', () => {
      const offer = makeFakeOffer();
      const anotherOffer = makeFakeOffer();
      const stateWithOffers = {
        ...initialState,
        offers: [offer],
      };

      const result = offerReducer(
        stateWithOffers,
        toggleFavorite.fulfilled(anotherOffer, '', { offerId: anotherOffer.id, status: 1 })
      );

      expect(result.offers).toEqual(stateWithOffers.offers);
    });
  });
});
