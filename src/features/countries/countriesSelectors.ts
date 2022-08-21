import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'App/store';

import { countriesAdapter, countriesInitialState } from './countriesAdapter';
import { selectCountriesResult } from './countriesApi';
import { selectActiveCountryId } from './countriesSlice';

// Creates memoized selector
const selectCountriesData = createSelector(selectCountriesResult, result => result.data);
// normalized state object with ids and entities

export const {
  selectEntities: selectCountriesEntities,
  selectById: selectCountryById,
  selectIds: selectCountriesIds,
} = countriesAdapter.getSelectors<RootState>(
  state => selectCountriesData(state) ?? countriesInitialState
);

export const selectActiveCountry = createSelector(
  selectCountriesEntities,
  selectActiveCountryId,
  (countriesEntities, id) => (id ? countriesEntities[id] : undefined)
);

export const selectActiveCountryName = createSelector(
  selectActiveCountry,
  activeCountry => activeCountry?.country
);

// export const selectActiveCountryLangCode = createSelector(
//   selectActiveCountry,
//   activeCountry => activeCountry?.langCode
// );

// export const selectVisibleCountriesIds = createSelector(
//   selectActiveCountry,
//   activeCountry => activeCountry?.states
// );
