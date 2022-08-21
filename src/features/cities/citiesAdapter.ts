import { createEntityAdapter } from '@reduxjs/toolkit';
import { getManyCities, getOneCity, getOneCityId } from 'features/api';
import type { City, ManyCities, OneCity } from 'types/apis';

export const citiesAdapter = createEntityAdapter<City>({
  selectId: city => city._id,
  sortComparer: (a, b) => b.createdAt?.localeCompare(a.createdAt),
});

export const citiesInitState = citiesAdapter.getInitialState();

/** @returns object { ids; entities } saved to RTK Query endpoint via citiesAdapter.setAll */
export const saveManyCities = (result?: ManyCities) => {
  const cities = getManyCities(result);
  return cities ? citiesAdapter?.setAll(citiesInitState, cities) : undefined;
};

/** @returns object { ids; entities } saved to RTK Query endpoint via citiesAdapter.upsertOne */
export const saveOneCity = (result?: OneCity) => {
  const city = getOneCity(result);
  return city ? citiesAdapter.upsertOne(citiesInitState, city) : undefined;
};

/** @returns object { ids; entities } saved to RTK Query endpoint via citiesAdapter.removeOne */
export const removeCity = (result?: OneCity) => {
  const id = getOneCityId(result);
  return id ? citiesAdapter.removeOne(citiesInitState, id) : undefined;
};
