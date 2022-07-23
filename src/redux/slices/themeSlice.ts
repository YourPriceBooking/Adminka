import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'redux/store';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    activeTheme: 'light',
  },
  reducers: {
    setTheme(state, action: PayloadAction<string>) {
      state.activeTheme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
export const selectActiveTheme = (state: RootState) => state.theme.activeTheme;
s;
