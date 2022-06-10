import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'redux/store';
import { Language } from 'types/apis';

export const langSlice = createSlice({
  name: 'lang',
  initialState: {
    activeLang: {
      _id: '6295c6021ae198a10eee3731',
      lang: 'English',
      code: 'EN',
      createdAt: '2022-05-31T07:38:42.273Z',
      updatedAt: '2022-05-31T07:38:42.273Z',
    },
  },

  reducers: {
    setLang(state, action: PayloadAction<Language>) {
      state.activeLang = action.payload;
    },
  },
});

export const { setLang } = langSlice.actions;
export const langReducer = langSlice.reducer;
export const selectActiveLang = (state: RootState) => state.lang.activeLang;
export const selectIsEnglishActiveLang = (state: RootState) => state.lang.activeLang.code === 'EN';
