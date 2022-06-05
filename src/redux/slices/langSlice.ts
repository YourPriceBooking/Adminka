import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'redux/store';

export const langSlice = createSlice({
  name: 'lang',
  initialState: {
    activeLang: 'eng',
  },
  reducers: {
    setLang(state, action: PayloadAction<string>) {
      state.activeLang = action.payload;
    },
  },
});

export const { setLang } = langSlice.actions;
export const langReducer = langSlice.reducer;
export const selectActiveLang = (state: RootState) => state.lang.activeLang;
