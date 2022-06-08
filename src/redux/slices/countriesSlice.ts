import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'redux/store';

export interface CountryInterface {
  id: string;
  name: string;
}

const countriesSlice = createSlice({
  name: 'countries',

  initialState: {
    activeCountry: { id: '1', name: 'Ukraine' },
    entities: [
      { id: '0', name: 'USA' },
      { id: '1', name: 'Ukraine' },
      { id: '2', name: 'Poland' },
    ],
  },

  reducers: {
    setActiveCountry(state, { payload }: PayloadAction<CountryInterface>) {
      state.activeCountry = payload;
    },

    addCountry: {
      reducer: (state, action: PayloadAction<CountryInterface>) =>
        void state.entities.push(action.payload),
      prepare: ({ name }: { name: string }) => ({ payload: { id: nanoid(), name } }),
    },

    editCountry(state, { payload }: PayloadAction<CountryInterface>) {
      state.entities = state.entities.map(country =>
        country.id === payload.id ? { ...country, ...payload } : country
      );
    },
  },
});

export const { setActiveCountry, addCountry, editCountry } = countriesSlice.actions;
export const countriesReducer = countriesSlice.reducer;
export const selectActiveCountryId = (state: RootState) => state.countries.activeCountry.id;
export const selectActiveCountryName = (state: RootState) => state.countries.activeCountry.name;
export const selectActiveCountry = (state: RootState) => state.countries.activeCountry;
export const selectCountries = (state: RootState) => state.countries.entities;
