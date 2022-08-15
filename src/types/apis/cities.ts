import type { District } from './district';

export type AddCity = {
  stateId: string;
  stateInternational: string;

  cityName: string;
  cityInternational: string;
  cityCode: string;
  cityPhotoURL: string;

  langCode: string;
};

export type City = {
  stateId: string;
  stateInternational: string;

  _id: string;
  cityName: string;
  cityInternational: string;
  cityCode: string;
  cityPhotoURL: string;

  langCode: string;

  districts: District[];
  createdAt: string;
  updatedAt: string;
};

export type CitiesArray = City[];
export type InitCitiesResponse = { data: { cities: City[] } };

export type EditCity = City;

export type DeleteCity = {
  _id: string;
  stateId: string;
};

export type FindCity = { stateId: string };
