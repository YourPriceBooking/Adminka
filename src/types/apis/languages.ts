import type { Country } from './countries';

export type Language = {
  _id: string;
  lang: string;
  code: string;
  createdAt: string;
  updatedAt: string;
  countries: Country[];
};

export type InitLanguagesResponse = { data: { result: Language[] } };
export type LanguagesResponse = Language[];

export type AddLanguage = {
  lang: string;
  code: string;
};

export type EditLanguage = {
  _id: string;
  lang: string;
  code: string;
};

export type DeleteLanguage = {
  _id: string;
};
