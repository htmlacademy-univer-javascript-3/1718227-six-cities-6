import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { City, Offer } from '@/shared/types/offer';
import { CITIES } from '@/shared/mocks/cities';

interface OfferState {
  city: City;
  offers: Offer[];
}

const initialState: OfferState = {
  city: CITIES[0],
  offers: [],
};

const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
    setOffers: (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    },
  },
});

export const { setCity, setOffers } = offerSlice.actions;
export const offerReducer = offerSlice.reducer;
