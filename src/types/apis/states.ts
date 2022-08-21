import type { EntityId, EntityState } from '@reduxjs/toolkit';

export type State = {
  countryId: EntityId; //+
  international: string;

  _id: EntityId;
  stateName: string;
  stateInternational: string;
  stateCode: string;
  statePhotoURL: string;

  cities: EntityId[];
  langCode: string;
  dbLangCode: string;

  createdAt: string;
  updatedAt: string;
};

export type AddState = Pick<
  State,
  | 'countryId'
  | 'international'
  | 'stateName'
  | 'stateInternational'
  | 'stateCode'
  | 'statePhotoURL'
  | 'langCode'
>;

export type EditState = Pick<
  State,
  | 'countryId'
  | '_id'
  | 'stateName'
  | 'statePhotoURL'
  | 'langCode'
  | 'stateInternational'
  | 'stateCode'
  | 'international'
>;

export type MaybeStatesEntity = EntityState<State> | undefined;
export type DeleteState = EntityId;
