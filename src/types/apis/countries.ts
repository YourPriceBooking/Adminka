import { FormEvent } from 'react';
import type { State } from './locations';

export type OnSubmitFormType = { onSubmit: (e: FormEvent<HTMLFormElement>) => void };
export type OnSubmitType = (e: FormEvent<HTMLFormElement>) => void;

export type Country = {
  _id: string;
  international: string;
  country: string;
  langCode: string;
  dbLangCode: string;
  states: State[];
  __v: number;
};

export type ActiveCountry = {
  _id: string;
  international: string;
  country: string;
  langCode: string;
  dbLangCode: string;
  __v: number;
};

export type InitCountriesResponse = { data: { result: Country[] } };
export type CountriesResponse = Country[];

export type AddCountry = {
  country: string;
  international: string;
};

export type EditCountry = {
  _id: string;
  country: string;
  langCode: string;
  international?: string;
};

export type DeleteCountry = {
  _id: string;
};
