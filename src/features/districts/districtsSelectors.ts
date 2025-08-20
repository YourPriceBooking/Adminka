import type { RootState } from 'App/store';
import {
  selectActiveCountryDbLangCode,
  selectActiveCountryInternational,
} from 'features/countries';
import { districtsAdapter, districtsInitState } from './districtsAdapter';
import { districtsApi } from './districtsApi';

const selectDistrictsData = (state: RootState) => {
  const international = selectActiveCountryInternational(state);
  const dbLangCode = selectActiveCountryDbLangCode(state);
  const args = international && dbLangCode ? { international, dbLangCode } : undefined;
  const result = districtsApi.endpoints.getDistricts.select(args)(state);
  return result.data;
};

export const {
  selectEntities: selectDistrictsEntities,
  selectById: selectDistrictById,
  selectIds: selectDistrictsIds,
} = districtsAdapter.getSelectors<RootState>(
  state => selectDistrictsData(state) ?? districtsInitState
);
