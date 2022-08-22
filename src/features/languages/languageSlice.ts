import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { SelectLanguageType } from 'types/apis';
import type { RootState } from 'App/store';

type LanguageState = {
  activeLanguageId: SelectLanguageType;
};

const initialState: LanguageState = {
  activeLanguageId: undefined,
};

export const languageSlice = createSlice({
  name: 'language',
  initialState,

  reducers: {
    setActiveLanguageId(state, { payload }: PayloadAction<SelectLanguageType>) {
      state.activeLanguageId = payload;
    },
  },
});

export const { setActiveLanguageId } = languageSlice.actions;
export const languagesReducer = languageSlice.reducer;

export const selectActiveLanguageId = (state: RootState) => state.language.activeLanguageId;
