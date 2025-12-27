import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Review, CommentData } from './types';

interface ReviewState {
  reviews: Review[];
  isLoading: boolean;
  isPosting: boolean;
  error: string | null;
}

const initialState: ReviewState = {
  reviews: [],
  isLoading: false,
  isPosting: false,
  error: null,
};

export const fetchReviews = createAsyncThunk<
  Review[],
  string,
  { extra: AxiosInstance }
>(
  'review/fetchReviews',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Review[]>(`/comments/${offerId}`);
    return data;
  }
);

export const postReview = createAsyncThunk<
  Review,
  { offerId: string; commentData: CommentData },
  { extra: AxiosInstance }
>(
  'review/postReview',
  async ({ offerId, commentData }, { extra: api }) => {
    const { data } = await api.post<Review>(`/comments/${offerId}`, commentData);
    return data;
  }
);

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    clearReviews: (state) => {
      state.reviews = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch reviews';
      })
      .addCase(postReview.pending, (state) => {
        state.isPosting = true;
      })
      .addCase(postReview.fulfilled, (state, action) => {
        state.isPosting = false;
        state.reviews.push(action.payload);
      })
      .addCase(postReview.rejected, (state) => {
        state.isPosting = false;
      });
  },
});

export const { clearReviews } = reviewSlice.actions;
export const reviewReducer = reviewSlice.reducer;
