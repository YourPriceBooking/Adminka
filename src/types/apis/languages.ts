import type { EntityId, EntityState } from '@reduxjs/toolkit';
import type { Country } from './countries';

export type SelectLanguageType = EntityId | undefined;

export type LanguageWithoutCountries = SelectLanguageType[];

export type SelectLangType = (arg: SelectLanguageType) => void;

export type Language = {
  _id: EntityId;
  lang: string;
  code: string;
  dbLangCode: string;

  countries: Country[];
  createdAt: string;
  updatedAt: string;
};

export type LanguagesAdapter = EntityState<Language>;

export type InitLanguagesResponse = { data: { languages: Language[] } };

export type AddLanguage = {
  lang: string;
  code: string;
};
export type AddLanguageResponse = { data: { languages: Language } };

export type EditLanguage = {
  _id: EntityId;
  lang: string;
  code: string;
};

export type DeleteLanguage = {
  _id: EntityId;
};
