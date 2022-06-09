import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'redux/store';

type Lang = {
  landTex: string;
  language: string;
};

export const langSlice = createSlice({
  name: 'lang',
  initialState: {
    activeLang: [
      {
        landTex: 'English',
        language: 'EN',
      },
    ],
  },

  reducers: {
    setLang(state, action: PayloadAction<Lang>) {
      state.activeLang[0] = action.payload;
    },
  },
});

export const { setLang } = langSlice.actions;
export const langReducer = langSlice.reducer;
export const selectActiveLang = (state: RootState) => state.lang.activeLang;
