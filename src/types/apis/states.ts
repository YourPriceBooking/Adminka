import type { City } from './cities';

export type AddState = {
  countryId: string;
  international: string;

  stateName: string;
  stateInternational: string;
  stateCode: string;
  statePhotoURL: string;

  langCode: string;
  dbLangCode: string;
};

export type EditState = {
  countryId: string;
  international: string;

  _id: string;
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
  countryId: string;
  international: string;

  stateName: string;
  stateInternational: string;
  stateCode: string;
  statePhotoURL: string;

  langCode: string;
  dbLangCode: string;
};

export type State = {
  countryId: string;
  international: string;

  _id: string;
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

export type DeleteState = {
  _id: string;
};

export type StatesResponse = State[];
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
