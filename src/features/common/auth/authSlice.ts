import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'App/store';

type AuthState = {
  isLoggedIn: boolean;
};
const initialState: AuthState = {
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },

    logout(state) {
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
