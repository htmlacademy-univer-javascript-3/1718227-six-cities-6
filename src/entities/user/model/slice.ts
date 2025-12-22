import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AuthorizationStatus, AuthInfo, LoginData } from './types';
import { saveToken, dropToken } from '@/shared/lib/token';

interface UserState {
  authorizationStatus: AuthorizationStatus;
  userInfo: AuthInfo | null;
}

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: null,
};

export const checkAuth = createAsyncThunk<
  AuthInfo,
  undefined,
  { extra: AxiosInstance }
>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<AuthInfo>('/login');
    return data;
  }
);

export const login = createAsyncThunk<
  AuthInfo,
  LoginData,
  { extra: AxiosInstance }
>(
  'user/login',
  async (loginData, { extra: api }) => {
    const { data } = await api.post<AuthInfo>('/login', loginData);
    saveToken(data.token);
    return data;
  }
);

export const logout = createAsyncThunk<
  void,
  undefined,
  { extra: AxiosInstance }
>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete('/logout');
    dropToken();
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userInfo = action.payload;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userInfo = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userInfo = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logout.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userInfo = null;
      });
  },
});

export const userReducer = userSlice.reducer;
