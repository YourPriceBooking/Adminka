import { FormEvent } from 'react';
import type { EntityState } from '@reduxjs/toolkit';
import type { State } from './states';

export type OnSubmitFormType = { onSubmit: (e: FormEvent<HTMLFormElement>) => void };
export type OnSubmitType = (e: FormEvent<HTMLFormElement>) => void;

export type ActiveCountry = {
  _id: string;
  international: string;
  country: string;

  langCode: string;
  dbLangCode: string;

  createdAt: string;
  updatedAt: string;
};

export type Country = {
  _id: string;
  international: string;
  country: string;

  langCode: string;
  dbLangCode: string;

  states: State[];
  createdAt: string;
  updatedAt: string;
};

export type InitCountriesResponse = { data: { result: Country[] } };
export type InitCountryResponse = { data: { country: Country } };
export type CountriesResponse = Country[] | [];
export type ActiveCountryResponse = ActiveCountry[] | [];

export type CountriesAdapter = EntityState<Country>;

export type AddCountry = {
  country: string;
  international: string;
};

export type EditCountry = {
  _id: string;
  country: string;
  langCode: string;
  international: string;
  activeLangId: string;
};

export type DeleteCountry = {
  _id: string;
};
