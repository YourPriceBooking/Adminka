import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { SelectLanguageType } from 'types/apis';
import type { RootState } from 'App/store';

type LanguageState = {
  activeLangId: SelectLanguageType;
};

const initialState: LanguageState = {
  activeLangId: undefined,
};

export const langSlice = createSlice({
  name: 'lang',
  initialState,

  reducers: {
    setActiveLangId(state, action: PayloadAction<SelectLanguageType>) {
      state.activeLangId = action.payload;
    },
  },
});

export const { setActiveLangId } = langSlice.actions;
export const langReducer = langSlice.reducer;

export const selectActiveLangId = (state: RootState) => state.global.lang.activeLangId;
