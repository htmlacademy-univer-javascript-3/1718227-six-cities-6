import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { FullOffer, Offer } from '@/shared/types/offer';

interface OfferDetailsState {
  offer: FullOffer | null;
  nearbyOffers: Offer[];
  isLoading: boolean;
  error: string | null;
}

const initialState: OfferDetailsState = {
  offer: null,
  nearbyOffers: [],
  isLoading: false,
  error: null,
};

export const fetchOfferDetails = createAsyncThunk<
  FullOffer,
  string,
  { extra: AxiosInstance; rejectValue: string }
>(
  'offerDetails/fetchOfferDetails',
  async (offerId, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.get<FullOffer>(`/offers/${offerId}`);
      return data;
    } catch {
      return rejectWithValue('Offer not found');
    }
  }
);

export const fetchNearbyOffers = createAsyncThunk<
  Offer[],
  string,
  { extra: AxiosInstance }
>(
  'offerDetails/fetchNearbyOffers',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Offer[]>(`/offers/${offerId}/nearby`);
    return data;
  }
);

const offerDetailsSlice = createSlice({
  name: 'offerDetails',
  initialState,
  reducers: {
    clearOfferDetails: (state) => {
      state.offer = null;
      state.nearbyOffers = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOfferDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.offer = action.payload;
      })
      .addCase(fetchOfferDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch offer details';
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      });
  },
});

export const { clearOfferDetails } = offerDetailsSlice.actions;
export const offerDetailsReducer = offerDetailsSlice.reducer;
