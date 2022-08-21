import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'App/store';
import type { SelectCountryType } from 'types/apis';

type CountryState = {
  activeCountryId: SelectCountryType;
  showDev: boolean;
};

const initialState: CountryState = {
  activeCountryId: undefined,
  showDev: false,
};

const countriesSlice = createSlice({
  name: 'country',

  initialState,

  reducers: {
    setActiveCountryId(state, { payload }: PayloadAction<SelectCountryType>) {
      state.activeCountryId = payload;
    },

    toggleDev(state) {
      state.showDev = !state.showDev;
    },
  },
});

export const { setActiveCountryId, toggleDev } = countriesSlice.actions;
export const countryReducer = countriesSlice.reducer;
export const selectActiveCountryId = (state: RootState) => state.global.country.activeCountryId;
export const selectDev = (state: RootState) => state.global.country.showDev;
