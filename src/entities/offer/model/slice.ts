import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { City, Offer } from '@/shared/types/offer';
import { CITIES } from '@/shared/mocks/cities';
import { SortType } from './types';

interface OfferState {
  city: City;
  offers: Offer[];
  sortType: SortType;
}

const initialState: OfferState = {
  city: CITIES[0],
  offers: [],
  sortType: SortType.Popular,
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
    setSortType: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
    },
  },
});

export const { setCity, setOffers, setSortType } = offerSlice.actions;
export const offerReducer = offerSlice.reducer;
