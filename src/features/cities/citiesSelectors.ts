import type { RootState } from 'App/store';
import {
  selectActiveCountryDbLangCode,
  selectActiveCountryInternational,
} from 'features/countries';
import { citiesApi } from './citiesApi';
import { citiesAdapter, citiesInitState } from './citiesAdapter';

const selectCitiesData = (state: RootState) => {
  const international = selectActiveCountryInternational(state);
  const dbLangCode = selectActiveCountryDbLangCode(state);
  const args = international && dbLangCode ? { international, dbLangCode } : undefined;
  const result = citiesApi.endpoints.getCities.select(args)(state);
  return result.data;
};

export const {
  selectEntities: selectCitiesEntities,
  selectById: selectCityById,
  selectIds: selectCitiesIds,
} = citiesAdapter.getSelectors<RootState>(state => selectCitiesData(state) ?? citiesInitState);
