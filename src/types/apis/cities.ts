import type { EntityId, EntityState } from '@reduxjs/toolkit';
import type { District } from './district';

export type City = {
  stateId: EntityId;

  _id: EntityId;
  cityName: string;
  cityInternational: string;
  cityCode: string;
  cityPhotoURL: string;

  langCode: string;

  districts: District[];
  createdAt: string;
  updatedAt: string;
};

export type AddCity = Omit<City, '_id' | 'districts' | 'createdAt' | 'updatedAt'>;
export type EditCity = Omit<City, 'districts'>;
export type DeleteCity = Pick<City, '_id' | 'stateId'>;

/**
 * Change the type of Keys of T from NewType
 */
export type ChangeTypeOfKeys<T extends object, Keys extends keyof T, NewType> = {
  // Loop to every key. We gonna check if the key
  // is assignable to Keys. If yes, change the type.
  // Else, retain the type.
  [key in keyof T]: key extends Keys ? NewType : T[key];
};

export type CitiesResponse = City[] | [];

export type CitiesAdapter = EntityState<City>;
export type NormalizedCity = ChangeTypeOfKeys<City, 'districts', EntityId[]>;

export type ManyCities = { data?: { cities?: City[] } };
export type OneCity = { city?: City };

export type FindCity = { stateId: string };
