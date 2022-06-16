import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'redux/store';
import type { Country } from 'types/apis';

type CountryState = {
  activeCountry: Country | null;
};

const initialState: CountryState = {
  activeCountry: null,
};

const countriesSlice = createSlice({
  name: 'countries',

  initialState,

  reducers: {
    setActiveCountry(state, { payload }: PayloadAction<Country>) {
      state.activeCountry = payload;
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

export const { setActiveCountry } = countriesSlice.actions;
export const countriesReducer = countriesSlice.reducer;
export const selectActiveCountryId = (state: RootState) => state.countries.activeCountry?._id;

export const selectActiveCountryName = (state: RootState) => state.countries.activeCountry?.country;

export const selectActiveCountry = (state: RootState) => state.countries.activeCountry;
