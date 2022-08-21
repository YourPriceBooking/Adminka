import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'App/store';
import { citiesAdapter, citiesInitState } from './citiesAdapter';
import { selectCitiesResult } from './citiesApi';

const selectCitiesData = createSelector(selectCitiesResult, result => result.data);

export const {
  selectEntities: selectCitiesEntities,
  selectById: selectCityById,
  selectIds: selectCitiesIds,
} = citiesAdapter.getSelectors<RootState>(state => selectCitiesData(state) ?? citiesInitState);
