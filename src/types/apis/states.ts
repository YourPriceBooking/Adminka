import type { EntityId, EntityState } from '@reduxjs/toolkit';
import type { ChangeTypeOfKeys, City } from './cities';

export type State = {
  countryId: EntityId; //+
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

export type AddState = Omit<State, '_id' | 'cities' | 'createdAt' | 'updatedAt'>;
export type EditState = Omit<State, 'cities'>;

export type StatesAdapter = EntityState<State>;
export type NormalizedState = ChangeTypeOfKeys<State, 'cities', EntityId[]>;

export type ManyStates = { data?: { states?: State[] } };
export type OneState = { state?: State };

export type DeleteState = EntityId;

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
