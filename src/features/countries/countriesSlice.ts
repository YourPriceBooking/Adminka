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
  name: 'countries',

  initialState,

  reducers: {
    setActiveCountryId(state, { payload }: PayloadAction<SelectCountryType>) {
      state.activeCountryId = payload;
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

export const { setActiveCountryId, toggleDev } = countriesSlice.actions;
export const countriesReducer = countriesSlice.reducer;
export const selectActiveCountryId = (state: RootState) => state.countries.activeCountryId;
export const selectDev = (state: RootState) => state.countries.showDev;
