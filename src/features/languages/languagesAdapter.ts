import { createEntityAdapter } from '@reduxjs/toolkit';
import type { OneLanguageInArray } from 'features/api';
import { getManyLanguages, getOneLanguage, getOneLanguageId } from 'features/api';
import type { LanguageWithCountriesIds, ManyLanguages } from 'types/apis';

export const languagesAdapter = createEntityAdapter<LanguageWithCountriesIds>({
  selectId: language => language._id,
  sortComparer: (a, b) => {
    const dateA = a.createdAt || '';
    const dateB = b.createdAt || '';
    return dateB.localeCompare(dateA);
  },
});

export const languagesInitState = languagesAdapter.getInitialState();

/** @returns object { ids; entities } saved to RTK Query endpoint via languagesAdapter.setAll */
export const saveManyLanguages = (result?: ManyLanguages) => {
  const languages = getManyLanguages(result);

  const languagesWithoutNestedCountries: LanguageWithCountriesIds[] = languages.map(lang => ({
    ...lang,
    dbLangCode: lang.dbLangCode ?? 'EN',
    createdAt: '2022-08-27T19:58:09.289Z',
    updatedAt: new Date().toISOString(),
    countries: lang.countries,
  }));
  return languagesAdapter.setAll(languagesInitState, languagesWithoutNestedCountries);
};

/** @returns object { ids; entities } saved to RTK Query endpoint via languagesAdapter.upsertOne */
export const saveOneLanguage = (result?: OneLanguageInArray) => {
  const language = getOneLanguage(result);
  return language ? languagesAdapter.upsertOne(languagesInitState, language) : undefined;
};

/** @returns object { ids; entities } saved to RTK Query endpoint via languagesAdapter.removeOne */
export const removeLanguage = (result?: OneLanguageInArray) => {
  const id = getOneLanguageId(result);
  return id ? languagesAdapter.removeOne(languagesInitState, id) : undefined;
};
