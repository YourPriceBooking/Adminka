import { FormEvent } from 'react';
export type onSubmitFormType = { onSubmit: (e: FormEvent<HTMLFormElement>) => void };

export type Country = {
  _id: string;
  country: string;
  langCode: string;
  createdAt: string;
  updatedAt: string;
};

export type InitCountriesResponse = { data: { result: Country[] } };
export type CountriesResponse = Country[];

export type AddCountry = {
  country: string;
};

export type AddCountryNotEng = {
  country: string;
  langCode: string;
};

export type EditCountry = {
  _id: string;
  country?: string;
  langCode?: string;
};
