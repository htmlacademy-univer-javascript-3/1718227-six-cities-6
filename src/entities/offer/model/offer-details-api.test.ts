import { describe, it, expect, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchOfferDetails, fetchNearbyOffers, offerDetailsReducer } from './offer-details-slice';
import { makeFakeFullOffer, makeFakeOffer } from '@/shared/lib/test-utils';

describe('offerDetails async actions', () => {
  const api = axios.create();
  const mockApi = new MockAdapter(api);

  const createTestStore = () =>
    configureStore({
      reducer: { offerDetails: offerDetailsReducer },
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

  describe('fetchOfferDetails', () => {
    it('should dispatch pending and fulfilled when server responds 200', async () => {
      const mockOffer = makeFakeFullOffer();
      const offerId = 'test-id';
      mockApi.onGet(`/offers/${offerId}`).reply(200, mockOffer);

      const store = createTestStore();
      await store.dispatch(fetchOfferDetails(offerId));

      const state = store.getState();
      expect(state.offerDetails.offer).toEqual(mockOffer);
      expect(state.offerDetails.isLoading).toBe(false);
      expect(state.offerDetails.error).toBeNull();
    });

    it('should set isLoading to true while pending', async () => {
      const mockOffer = makeFakeFullOffer();
      const offerId = 'test-id';
      mockApi.onGet(`/offers/${offerId}`).reply(200, mockOffer);

      const store = createTestStore();
      const promise = store.dispatch(fetchOfferDetails(offerId));

      expect(store.getState().offerDetails.isLoading).toBe(true);

      await promise;

      expect(store.getState().offerDetails.isLoading).toBe(false);
    });

    it('should dispatch rejected with "Offer not found" when server responds with error', async () => {
      const offerId = 'non-existent-id';
      mockApi.onGet(`/offers/${offerId}`).reply(404);

      const store = createTestStore();
      await store.dispatch(fetchOfferDetails(offerId));

      const state = store.getState();
      expect(state.offerDetails.offer).toBeNull();
      expect(state.offerDetails.isLoading).toBe(false);
      expect(state.offerDetails.error).toBe('Offer not found');
    });
  });

  describe('fetchNearbyOffers', () => {
    it('should dispatch fulfilled with nearby offers when server responds 200', async () => {
      const mockNearbyOffers = [makeFakeOffer(), makeFakeOffer()];
      const offerId = 'test-id';
      mockApi.onGet(`/offers/${offerId}/nearby`).reply(200, mockNearbyOffers);

      const store = createTestStore();
      await store.dispatch(fetchNearbyOffers(offerId));

      const state = store.getState();
      expect(state.offerDetails.nearbyOffers).toEqual(mockNearbyOffers);
    });

    it('should dispatch rejected when server responds with error', async () => {
      const offerId = 'test-id';
      mockApi.onGet(`/offers/${offerId}/nearby`).reply(500);

      const store = createTestStore();
      const result = await store.dispatch(fetchNearbyOffers(offerId));

      expect(result.type).toBe('offerDetails/fetchNearbyOffers/rejected');
    });
  });
});
