import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { City, Offer } from '@/shared/types/offer';
import { CITIES } from '@/shared/const/cities';
import { SortType } from './types';

interface OfferState {
  city: City;
  offers: Offer[];
  sortType: SortType;
  isLoading: boolean;
  error: string | null;
}

const initialState: OfferState = {
  city: CITIES[0],
  offers: [],
  sortType: SortType.Popular,
  isLoading: false,
  error: null,
};

export const fetchOffers = createAsyncThunk<
  Offer[],
  undefined,
  { extra: AxiosInstance }
>(
  'offer/fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offer[]>('/offers');
    return data;
  }
);

const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
    setSortType: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch offers';
      });
  },
});

export const { setCity, setSortType } = offerSlice.actions;
export const offerReducer = offerSlice.reducer;
