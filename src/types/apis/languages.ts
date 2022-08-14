import type { EntityState } from '@reduxjs/toolkit';
import type { Country } from './countries';

export type SelectLanguageType = {
  _id: string;
  lang: string;
  code: string;
  dbLangCode: string;
  createdAt: string;
  updatedAt: string;
};
export type LanguageWithoutCountries = SelectLanguageType[];

export type SelectLangType = (arg: SelectLanguageType) => void;

export type Language = SelectLanguageType & {
  countries: Country[];
};

export type LanguagesAdapter = EntityState<Language>;

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
