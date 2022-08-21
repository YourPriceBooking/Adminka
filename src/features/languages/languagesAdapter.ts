import { createEntityAdapter } from '@reduxjs/toolkit';

import type { Language, ManyLanguages, OneLanguage, RemoveOneLanguage } from 'types/apis';

export const languagesAdapter = createEntityAdapter<Language>({
  selectId: language => language._id,
  sortComparer: (a, b) => b.createdAt?.localeCompare(a.createdAt),
});

export const langInitState = languagesAdapter.getInitialState();

/** @returns object { ids; entities } saved to RTK Query endpoint via languagesAdapter.setAll */
export const saveLanguages = (result?: ManyLanguages) => {
  const languages = result?.data?.languages;
  return languages ? languagesAdapter?.setAll(langInitState, languages) : undefined;
};

/** @returns object { ids; entities } saved to RTK Query endpoint via languagesAdapter.upsertOne */
export const saveLanguage = (result?: OneLanguage) => {
  const language = result?.language;
  return language ? languagesAdapter.upsertOne(langInitState, language) : undefined;
};

/** @returns object { ids; entities } saved to RTK Query endpoint via languagesAdapter.removeOne */
export const removeLanguage = (result?: RemoveOneLanguage) => {
  const id = result?.language?._id;
  return id ? languagesAdapter.removeOne(langInitState, id) : undefined;
};
