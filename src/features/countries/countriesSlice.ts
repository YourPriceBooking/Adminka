import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'App/store';
import type { SelectCountryType } from 'types/apis';

type CountryState = {
  activeCountryId: SelectCountryType;
  addDirHotelier: {
    lang: string | undefined;
    status: boolean;
  }[];
};

const initialState: CountryState = {
  activeCountryId: undefined,
  addDirHotelier: [],
};

const countriesSlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    setActiveCountryId(state, { payload }: PayloadAction<SelectCountryType>) {
      state.activeCountryId = payload;
    },
    setAddDirHotelier(
      state,
      { payload }: PayloadAction<{ lang: string | undefined; status: boolean }>
    ) {
      state.addDirHotelier.push({ lang: payload.lang, status: payload.status });
    },
  },
});

export const { setActiveCountryId, setAddDirHotelier } = countriesSlice.actions;
export const countryReducer = countriesSlice.reducer;
export const selectActiveCountryId = (state: RootState) => state.country.activeCountryId;
