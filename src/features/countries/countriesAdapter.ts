import { createEntityAdapter } from '@reduxjs/toolkit';

import type { NormalizedCountry, ManyCountries, OneCountry } from 'types/apis';

export const countriesAdapter = createEntityAdapter<NormalizedCountry>({
  selectId: country => country._id,
  sortComparer: (a, b) => b.createdAt?.localeCompare(a.createdAt),
});

export const countriesInitialState = countriesAdapter.getInitialState();

/** @returns Saved to redux countries from countriesAdapter */
export const saveCountries = (result?: ManyCountries) => {
  const countries = result?.data?.countries;
  if (!countries) return undefined;
  return countriesAdapter.setAll(countriesInitialState, countries);
};

/** @returns Saved to redux countries from countriesAdapter */
export const saveCountry = (result?: OneCountry) => {
  const country = result?.country;
  if (!country) return undefined;
  return countriesAdapter.upsertOne(countriesInitialState, country);
};

/** @returns Saved to redux countries from countriesAdapter */
export const removeCountry = (result?: OneCountry) => {
  const deletedId = result?.country?._id;
  if (!deletedId) return undefined;
  return countriesAdapter.removeOne(countriesInitialState, deletedId);
};
