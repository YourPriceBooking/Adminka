import { FormEvent } from 'react';
export type onSubmitFormType = { onSubmit: (e: FormEvent<HTMLFormElement>) => void };
export type onSubmitType = (e: FormEvent<HTMLFormElement>) => void;

export type Country = {
  _id: string;
  country: string;
  langCode: string;
  international?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export type InitCountriesResponse = { data: { result: Country[] } };
export type CountriesResponse = Country[];

export type AddCountry = {
  country: string;
};

export type EditCountry = {
  _id: string;
  country: string;
  langCode: string;
};

export type DeleteCountry = {
  _id: string;
};
