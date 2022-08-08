import type { Country } from './countries';

export type Language = {
  _id: string;
  lang: string;
  code: string;
  dbLangCode: string;
  countries: Country[];
  createdAt: string;
  updatedAt: string;
};

export type InitLanguagesResponse = { data: { languages: Language[] } };

export type LanguagesResponse = Language[];

export type AddLanguage = {
  lang: string;
  code: string;
};
export type AddLanguageResponse = { data: { languages: Language } };

export type EditLanguage = {
  _id: string;
  lang: string;
  code: string;
};

export type DeleteLanguage = {
  _id: string;
};
