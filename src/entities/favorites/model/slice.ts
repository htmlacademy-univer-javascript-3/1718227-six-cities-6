import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Offer } from '@/shared/types/offer';

interface FavoritesState {
  favorites: Offer[];
  isLoading: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  favorites: [],
  isLoading: false,
  error: null,
};

export const fetchFavorites = createAsyncThunk<
  Offer[],
  undefined,
  { extra: AxiosInstance }
>(
  'favorites/fetchFavorites',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offer[]>('/favorite');
    return data;
  }
);

export const toggleFavorite = createAsyncThunk<
  Offer,
  { offerId: string; status: 0 | 1 },
  { extra: AxiosInstance; rejectValue: string }
>(
  'favorites/toggleFavorite',
  async ({ offerId, status }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<Offer>(`/favorite/${offerId}/${status}`);
      return data;
    } catch {
      return rejectWithValue('Failed to toggle favorite');
    }
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    clearFavorites: (state) => {
      state.favorites = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorites = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch favorites';
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        if (updatedOffer.isFavorite) {
          const exists = state.favorites.some((offer) => offer.id === updatedOffer.id);
          if (!exists) {
            state.favorites.push(updatedOffer);
          }
        } else {
          state.favorites = state.favorites.filter(
            (offer) => offer.id !== updatedOffer.id
          );
        }
      });
  },
});

export const { clearFavorites } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
