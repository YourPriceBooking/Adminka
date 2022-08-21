import { createSelector, EntityId } from '@reduxjs/toolkit';
import type { RootState } from 'App/store';
import { statesAdapter, statesInitialState } from './statesAdapter';
import { selectStatesResult } from './statesApi';

const selectStatesData = createSelector(selectStatesResult, result => result.data);

export const {
  selectEntities: selectStatesEntities,
  selectById: selectStateById,
  selectIds: selectStatesIds,
} = statesAdapter.getSelectors<RootState>(state => selectStatesData(state) ?? statesInitialState);

statesAdapter.removeAll(statesAdapter.getInitialState());

export const makeSelectStateInternational = (stateId: EntityId) =>
  createSelector(selectStatesEntities, statesEntities =>
    stateId ? statesEntities?.[stateId]?.stateInternational : undefined
  );
