import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from 'App/store';
import { statesAdapter, statesInitialState } from './statesAdapter';
import { selectStatesResult } from './statesApi';

const selectStatesData = createSelector(selectStatesResult, result => result.data);

export const {
  //
  selectById: selectStateById,
  selectIds: selectStatesIds,
} = statesAdapter.getSelectors<RootState>(state => selectStatesData(state) ?? statesInitialState);

statesAdapter.removeAll(statesAdapter.getInitialState());
