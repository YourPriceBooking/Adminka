import type { EntityId, EntityState } from '@reduxjs/toolkit';
import type { District } from './district';

export type AddCity = {
  stateId: EntityId;

  cityName: string;
  cityInternational: string;
  cityCode: string;
  cityPhotoURL: string;

  languageId: EntityId;
  langCode: string;
};

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

export type CitiesResponse = City[] | [];
export type InitCitiesResponse = { data: { cities: City[] } };
export type AddCityResponse = { data: { city: City } };

export type CitiesAdapter = EntityState<City>;

export type EditCity = {
  stateId: EntityId;

  _id: EntityId;
  cityName: string;
  cityInternational: string;
  cityCode: string;
  cityPhotoURL: string;

  langCode: string;

  createdAt: string;
  updatedAt: string;
};

export type DeleteCity = {
  _id: string;
  stateId: string;
};

export type FindCity = { stateId: string };
