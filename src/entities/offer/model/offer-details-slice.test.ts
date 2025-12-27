import { describe, it, expect } from 'vitest';
import {
  offerDetailsReducer,
  clearOfferDetails,
  fetchOfferDetails,
  fetchNearbyOffers,
} from './offer-details-slice';
import { toggleFavorite } from '@/entities/favorites';
import { makeFakeOffer, makeFakeFullOffer } from '@/shared/lib/test-utils';

describe('offerDetailsSlice', () => {
  const initialState = {
    offer: null,
    nearbyOffers: [],
    isLoading: false,
    error: null,
  };

  describe('initial state', () => {
    it('should return initial state with empty action', () => {
      const emptyAction = { type: '' };
      const result = offerDetailsReducer(undefined, emptyAction);

      expect(result).toEqual(initialState);
    });
  });

  describe('clearOfferDetails', () => {
    it('should clear offer details', () => {
      const stateWithOffer = {
        ...initialState,
        offer: makeFakeFullOffer(),
        nearbyOffers: [makeFakeOffer()],
        error: 'Some error',
      };

      const result = offerDetailsReducer(stateWithOffer, clearOfferDetails());

      expect(result.offer).toBeNull();
      expect(result.nearbyOffers).toEqual([]);
      expect(result.error).toBeNull();
    });
  });

  describe('fetchOfferDetails', () => {
    it('should set isLoading to true on pending', () => {
      const result = offerDetailsReducer(
        initialState,
        fetchOfferDetails.pending('', 'test-id')
      );

      expect(result.isLoading).toBe(true);
      expect(result.error).toBeNull();
    });

    it('should set offer and isLoading to false on fulfilled', () => {
      const mockOffer = makeFakeFullOffer();
      const result = offerDetailsReducer(
        { ...initialState, isLoading: true },
        fetchOfferDetails.fulfilled(mockOffer, '', 'test-id')
      );

      expect(result.isLoading).toBe(false);
      expect(result.offer).toEqual(mockOffer);
    });

    it('should set error and isLoading to false on rejected', () => {
      const result = offerDetailsReducer(
        { ...initialState, isLoading: true },
        fetchOfferDetails.rejected(null, '', 'test-id', 'Offer not found')
      );

      expect(result.isLoading).toBe(false);
      expect(result.error).toBe('Offer not found');
    });
  });

  describe('fetchNearbyOffers', () => {
    it('should set nearbyOffers on fulfilled', () => {
      const mockNearbyOffers = [makeFakeOffer(), makeFakeOffer()];
      const result = offerDetailsReducer(
        initialState,
        fetchNearbyOffers.fulfilled(mockNearbyOffers, '', 'test-id')
      );

      expect(result.nearbyOffers).toEqual(mockNearbyOffers);
    });
  });

  describe('toggleFavorite.fulfilled', () => {
    it('should update isFavorite status for main offer', () => {
      const offer = makeFakeFullOffer();
      offer.isFavorite = false;
      const stateWithOffer = {
        ...initialState,
        offer,
      };

      const updatedOffer = { ...offer, isFavorite: true };
      const result = offerDetailsReducer(
        stateWithOffer,
        toggleFavorite.fulfilled(updatedOffer, '', { offerId: offer.id, status: 1 })
      );

      expect(result.offer?.isFavorite).toBe(true);
    });

    it('should update isFavorite status for nearby offer', () => {
      const nearbyOffer = makeFakeOffer();
      nearbyOffer.isFavorite = false;
      const stateWithNearbyOffers = {
        ...initialState,
        nearbyOffers: [nearbyOffer],
      };

      const updatedOffer = { ...nearbyOffer, isFavorite: true };
      const result = offerDetailsReducer(
        stateWithNearbyOffers,
        toggleFavorite.fulfilled(updatedOffer, '', { offerId: nearbyOffer.id, status: 1 })
      );

      expect(result.nearbyOffers[0].isFavorite).toBe(true);
    });

    it('should not modify state if offer is not found', () => {
      const offer = makeFakeFullOffer();
      const anotherOffer = makeFakeOffer();
      const stateWithOffer = {
        ...initialState,
        offer,
        nearbyOffers: [],
      };

      const result = offerDetailsReducer(
        stateWithOffer,
        toggleFavorite.fulfilled(anotherOffer, '', { offerId: anotherOffer.id, status: 1 })
      );

      expect(result.offer?.isFavorite).toBe(offer.isFavorite);
    });
  });
});
