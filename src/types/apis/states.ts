import type { EntityId, EntityState } from '@reduxjs/toolkit';
import type { City } from './cities';

export type AddState = {
  countryId: EntityId;
  international: string;

  stateName: string;
  stateInternational: string;
  stateCode: string;
  statePhotoURL: string;

  langCode: string;
  dbLangCode: string;
};

export type EditState = {
  countryId: EntityId;
  international: string;

  _id: EntityId;
  stateName: string;
  stateInternational: string;
  stateCode: string;
  statePhotoURL: string;

  langCode: string;
  dbLangCode: string;

  createdAt: string;
  updatedAt: string;
};

export type NewStateWithOutId = {
  countryId: EntityId;
  international: string;

  stateName: string;
  stateInternational: string;
  stateCode: string;
  statePhotoURL: string;

  langCode: string;
  dbLangCode: string;
};

export type State = {
  countryId: EntityId;
  international: string;

  _id: EntityId;
  stateName: string;
  stateInternational: string;
  stateCode: string;
  statePhotoURL: string;

  cities: City[];
  langCode: string;
  dbLangCode: string;

  createdAt: string;
  updatedAt: string;
};

export type StatesAdapter = EntityState<State>;

export type DeleteState = {
  _id: EntityId;
};

export type StatesResponse = State[] | [];
/**
     * {
       "stateId": "62e15c9739727a5c277dd2e1",
       "cityName": "Nokia",
       "cityInternational": "Nokia",
       "cityCode": "Nokia",
       "cityPhotoURL": "https://Nokian.city.ua/photos/kyiv-city.webp",
       "stateInternational": "Hanto2 State",
       "langCode": "EN"
     }
     */
