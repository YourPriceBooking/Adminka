import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from 'App/store';
import { selectActiveLanguageId } from './languageSlice';
import { languagesInitState, languagesAdapter } from './languagesAdapter';
import { selectLanguagesResult } from './languagesApi';

/** Creates memoized selector
 * @returns normalized state object with ids and entities */
const selectLanguagesData = createSelector(selectLanguagesResult, result => result.data);

/** getSelectors creates selectors and we rename them with aliases using destructuring */
export const {
  selectEntities: selectLanguagesEntities,
  selectById: selectLanguageById,
  selectIds: selectLanguagesIds,
} = languagesAdapter.getSelectors<RootState>(
  state => selectLanguagesData(state) ?? languagesInitState
);

export const selectActiveLanguage = createSelector(
  selectLanguagesEntities,
  selectActiveLanguageId,
  (languages, id) => (id ? languages[id] : undefined)
);

export const selectActiveLangCode = createSelector(
  selectActiveLanguage,
  activeLanguage => activeLanguage?.code
);

export const selectActiveLangLang = createSelector(
  selectActiveLanguage,
  activeLanguage => activeLanguage?.lang
);

export const selectIsEnglishActiveLang = createSelector(
  selectActiveLangCode,
  code => code === 'EN'
);

export const selectVisibleCountriesIds = createSelector(selectActiveLanguage, activeLanguage =>
  activeLanguage?.countries?.map(({ _id }) => _id)
);
