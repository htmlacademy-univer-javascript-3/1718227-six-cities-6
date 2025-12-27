import { describe, it, expect, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchReviews, postReview, reviewReducer } from './slice';
import { makeFakeReview } from '@/shared/lib/test-utils';

describe('review async actions', () => {
  const api = axios.create();
  const mockApi = new MockAdapter(api);

  const createTestStore = () =>
    configureStore({
      reducer: { review: reviewReducer },
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

  describe('fetchReviews', () => {
    it('should dispatch pending and fulfilled when server responds 200', async () => {
      const mockReviews = [makeFakeReview(), makeFakeReview()];
      const offerId = 'test-id';
      mockApi.onGet(`/comments/${offerId}`).reply(200, mockReviews);

      const store = createTestStore();
      await store.dispatch(fetchReviews(offerId));

      const state = store.getState();
      expect(state.review.reviews).toEqual(mockReviews);
      expect(state.review.isLoading).toBe(false);
      expect(state.review.error).toBeNull();
    });

    it('should set isLoading to true while pending', async () => {
      const mockReviews = [makeFakeReview()];
      const offerId = 'test-id';
      mockApi.onGet(`/comments/${offerId}`).reply(200, mockReviews);

      const store = createTestStore();
      const promise = store.dispatch(fetchReviews(offerId));

      expect(store.getState().review.isLoading).toBe(true);

      await promise;

      expect(store.getState().review.isLoading).toBe(false);
    });

    it('should dispatch rejected when server responds with error', async () => {
      const offerId = 'test-id';
      mockApi.onGet(`/comments/${offerId}`).reply(500);

      const store = createTestStore();
      await store.dispatch(fetchReviews(offerId));

      const state = store.getState();
      expect(state.review.reviews).toEqual([]);
      expect(state.review.isLoading).toBe(false);
      expect(state.review.error).toBeTruthy();
    });
  });

  describe('postReview', () => {
    it('should dispatch pending and fulfilled when server responds 200', async () => {
      const mockReview = makeFakeReview();
      const offerId = 'test-id';
      const commentData = { comment: 'Great place!', rating: 5 };
      mockApi.onPost(`/comments/${offerId}`).reply(200, mockReview);

      const store = createTestStore();
      await store.dispatch(postReview({ offerId, commentData }));

      const state = store.getState();
      expect(state.review.reviews).toContainEqual(mockReview);
      expect(state.review.isPosting).toBe(false);
    });

    it('should set isPosting to true while pending', async () => {
      const mockReview = makeFakeReview();
      const offerId = 'test-id';
      const commentData = { comment: 'Great place!', rating: 5 };
      mockApi.onPost(`/comments/${offerId}`).reply(200, mockReview);

      const store = createTestStore();
      const promise = store.dispatch(postReview({ offerId, commentData }));

      expect(store.getState().review.isPosting).toBe(true);

      await promise;

      expect(store.getState().review.isPosting).toBe(false);
    });

    it('should dispatch rejected when server responds with error', async () => {
      const offerId = 'test-id';
      const commentData = { comment: 'Great place!', rating: 5 };
      mockApi.onPost(`/comments/${offerId}`).reply(500);

      const store = createTestStore();
      const result = await store.dispatch(postReview({ offerId, commentData }));

      expect(result.type).toBe('review/postReview/rejected');
      expect(store.getState().review.isPosting).toBe(false);
    });
  });
});
