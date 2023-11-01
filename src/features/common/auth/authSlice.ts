import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'App/store';

type AuthState = {
  isLoggedIn: boolean;
  access: string[]
};
const initialState: AuthState = {
  isLoggedIn: false,
  access: []
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, { payload }: PayloadAction<string>) {
      if (payload !== '') {
          state.isLoggedIn = true;
      }
    },

    setAccess(state, { payload }: PayloadAction<string[]>) {
      state.access = payload
    },

    logout(state) {
      state.isLoggedIn = false;
      state.access = []
    },
  },
});

export const { login, logout,setAccess } = authSlice.actions;
export const authReducer = authSlice.reducer;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const haveAccess = (state: RootState) => state.auth.access
