import type { EntityId, EntityState } from '@reduxjs/toolkit';

export type City = {
  stateId: EntityId;
  stateInternational: string;

  _id: EntityId;
  cityName: string;
  cityInternational: string;
  cityCode: string;
  cityPhotoURL: string;

  langCode: string;

  districts: EntityId[];
  createdAt: string;
  updatedAt: string;
};
export type AddCity = Pick<
  City,
  | 'stateId'
  | 'cityName'
  | 'cityInternational'
  | 'cityCode'
  | 'cityPhotoURL'
  | 'langCode'
  | 'stateInternational'
>;

export type EditCity = Pick<City, '_id' | 'cityName' | 'cityPhotoURL' | 'langCode'>;
export type DeleteCity = EntityId;

export type CitiesResponse = City[] | [];

export type MaybeCitiesEntity = EntityState<City> | undefined;

export type FindCity = { stateId: string };
