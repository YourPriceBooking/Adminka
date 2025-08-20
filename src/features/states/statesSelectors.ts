import type { EntityId } from '@reduxjs/toolkit';
import type { RootState } from 'App/store';
import { createSelector } from '@reduxjs/toolkit';
import { selectActiveCountryInternational } from 'features/countries';
import { selectActiveDbLangCode } from 'features/languages';
import { statesAdapter, statesInitialState } from './statesAdapter';
import { statesApi } from './statesApi';

const selectStatesData = (state: RootState) => {
  const international = selectActiveCountryInternational(state);
  const dbLangCode = selectActiveDbLangCode(state)?.toLowerCase();
  const args = international && dbLangCode ? { international, dbLangCode } : undefined;
  const result = statesApi.endpoints.getStates.select(args)(state);
  return result.data;
};

export const {
  selectEntities: selectStatesEntities,
  selectById: selectStateById,
  selectIds: selectStatesIds,
} = statesAdapter.getSelectors<RootState>(state => selectStatesData(state) ?? statesInitialState);

export const makeSelectStateInternational = (stateId: EntityId) =>
  createSelector(selectStatesEntities, statesEntities =>
    stateId ? statesEntities[stateId]?.stateInternational : undefined
  );

export const selectStatesFromActiveCountry = createSelector(
  selectActiveCountryInternational,
  selectStatesEntities,
  (international, statesEntities) => {
    if (!international) return undefined;

    const ids: EntityId[] = Object.values(statesEntities)
      .filter((s): s is NonNullable<typeof s> => Boolean(s))
      .filter(state => state.international === international)
      .map(state => state._id);

    return ids;
  }
);
