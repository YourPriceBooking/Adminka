import type { EntityId, EntityState } from '@reduxjs/toolkit';
import { ChangeTypeOfKeys } from './cities';
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

export type LanguagesState = EntityState<Language>;
export type MaybeLanguagesState = LanguagesState | undefined;
export type NormalizedLanguage = ChangeTypeOfKeys<Language, 'countries', EntityId[]>;

export type LanguagesResponse = Language[] | [];
export type ManyLanguages = { data?: { languages?: Language[] } };
export type OneLanguage = { language?: Language };

export type AddLanguage = Pick<Language, 'lang' | 'code'>;
export type EditLanguage = Pick<Language, '_id' | 'lang' | 'code'>;

export type GetLanguage = EntityId;
export type DeleteLanguage = EntityId;
