import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'redux/store';
import type { ActiveCountry } from 'types/apis';

type CountryState = {
  activeCountry: ActiveCountry | null;
  showDev: boolean;
};

const initialState: CountryState = {
  activeCountry: null,
  showDev: false,
};

const countriesSlice = createSlice({
  name: 'countries',

  initialState,

  reducers: {
    setActiveCountry(state, { payload }: PayloadAction<ActiveCountry>) {
      state.activeCountry = payload;
    },

    toggleDev(state) {
      state.showDev = !state.showDev;
    },

    // addCountry: {
    //   reducer: (state, action: PayloadAction<CountryInterface>) =>
    //     void state.entities.push(action.payload),
    //   prepare: ({ name }: { name: string }) => ({ payload: { id: nanoid(), name } }),
    // },

    // editCountry(state, { payload }: PayloadAction<CountryInterface>) {
    //   state.entities = state.entities.map(country =>
    //     country.id === payload.id ? { ...country, ...payload } : country
    //   );
    // },
  },
});

export const { setActiveCountry, toggleDev } = countriesSlice.actions;
export const countriesReducer = countriesSlice.reducer;
export const selectActiveCountryId = (state: RootState) => state.countries.activeCountry?._id ?? '';

export const selectActiveCountryName = (state: RootState) => state.countries.activeCountry?.country;
export const selectActiveCountryInternational = (state: RootState) =>
  state.countries.activeCountry?.international;

export const selectActiveCountry = (state: RootState) => state.countries.activeCountry;
export const selectDev = (state: RootState) => state.countries.showDev;
