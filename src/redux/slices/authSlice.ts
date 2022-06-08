import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'redux/store';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
  },
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
