import { describe, it, expect } from 'vitest';
import {
  reviewReducer,
  clearReviews,
  fetchReviews,
  postReview,
} from './slice';
import { makeFakeReview } from '@/shared/lib/test-utils';

describe('reviewSlice', () => {
  const initialState = {
    reviews: [],
    isLoading: false,
    isPosting: false,
    error: null,
  };

  describe('initial state', () => {
    it('should return initial state with empty action', () => {
      const emptyAction = { type: '' };
      const result = reviewReducer(undefined, emptyAction);

      expect(result).toEqual(initialState);
    });
  });

  describe('clearReviews', () => {
    it('should clear reviews and error', () => {
      const stateWithReviews = {
        ...initialState,
        reviews: [makeFakeReview(), makeFakeReview()],
        error: 'Some error',
      };

      const result = reviewReducer(stateWithReviews, clearReviews());

      expect(result.reviews).toEqual([]);
      expect(result.error).toBeNull();
    });
  });

  describe('fetchReviews', () => {
    it('should set isLoading to true on pending', () => {
      const result = reviewReducer(
        initialState,
        fetchReviews.pending('', 'test-id')
      );

      expect(result.isLoading).toBe(true);
      expect(result.error).toBeNull();
    });

    it('should set reviews and isLoading to false on fulfilled', () => {
      const mockReviews = [makeFakeReview(), makeFakeReview()];
      const result = reviewReducer(
        { ...initialState, isLoading: true },
        fetchReviews.fulfilled(mockReviews, '', 'test-id')
      );

      expect(result.isLoading).toBe(false);
      expect(result.reviews).toEqual(mockReviews);
    });

    it('should set error and isLoading to false on rejected', () => {
      const error = new Error('Failed to fetch');
      const result = reviewReducer(
        { ...initialState, isLoading: true },
        fetchReviews.rejected(error, '', 'test-id')
      );

      expect(result.isLoading).toBe(false);
      expect(result.error).toBe('Failed to fetch');
    });
  });

  describe('postReview', () => {
    it('should set isPosting to true on pending', () => {
      const result = reviewReducer(
        initialState,
        postReview.pending('', { offerId: 'test-id', commentData: { comment: 'test', rating: 5 } })
      );

      expect(result.isPosting).toBe(true);
    });

    it('should add review and set isPosting to false on fulfilled', () => {
      const mockReview = makeFakeReview();
      const result = reviewReducer(
        { ...initialState, isPosting: true },
        postReview.fulfilled(mockReview, '', { offerId: 'test-id', commentData: { comment: 'test', rating: 5 } })
      );

      expect(result.isPosting).toBe(false);
      expect(result.reviews).toContainEqual(mockReview);
    });

    it('should set isPosting to false on rejected', () => {
      const error = new Error('Failed to post');
      const result = reviewReducer(
        { ...initialState, isPosting: true },
        postReview.rejected(error, '', { offerId: 'test-id', commentData: { comment: 'test', rating: 5 } })
      );

      expect(result.isPosting).toBe(false);
    });
  });
});
