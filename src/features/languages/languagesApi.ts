import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import type {
  AddLanguage,
  DeleteLanguage,
  GetLanguage,
  Language,
  LanguagesResponse,
  MaybeLanguagesState,
} from 'types/apis';
import type { RootState } from 'App/store';
import { logRender } from 'common/utils';
import { api, endpoints, selectState } from 'features/api';
import { selectActiveLangId } from 'features/common';

const languagesAdapter = createEntityAdapter<Language>({
  selectId: language => language._id,
  sortComparer: (a, b) => b.createdAt?.localeCompare(a.createdAt),
});

const initialState = languagesAdapter.getInitialState();

/** @returns Saved to redux languages from languagesAdapter */
export const saveManyLanguages = (data?: LanguagesResponse) => {
  if (!data) return undefined;
  return languagesAdapter.setAll(initialState, data);
};

/** @returns Saved to redux language from languagesAdapter */
export const saveLanguage = (data?: Language) => {
  if (!data) return undefined;
  const savedLanguage = languagesAdapter.upsertOne(initialState, data);
  logRender('save', { savedLanguage }, true);
  return savedLanguage;
};

export const languagesApi = api.injectEndpoints({
  endpoints: build => ({
    getLanguages: build.query<MaybeLanguagesState, void>({
      query: () => endpoints.languages,

      // transformResponse: (data: ManyLanguages) => {
      transformResponse: (data?: LanguagesResponse) => saveManyLanguages(data),
      // const loadedLanguages = data?.data?.result ?? frozenArr; // for actual backend api

      providesTags: result => [
        { type: 'Language', id: 'LIST' },
        ...(result ? result.ids.map(id => ({ type: 'Language' as const, id })) : []),
      ],
    }),

    getLanguage: build.query<MaybeLanguagesState, GetLanguage>({
      query: id => `${endpoints.languages}/${id}`,

      // transformResponse: (result: InitLanguagesResponse) => {
      transformResponse: (data?: Language) => saveLanguage(data),
      // const loadedLanguage = result?.data?.language;

      providesTags: (_, __, id) => [{ type: 'Language', id }],
    }),

    addLanguage: build.mutation<MaybeLanguagesState, AddLanguage>({
      query: ({ lang, code }) => ({
        url: endpoints.languages,
        method: 'POST',
        body: { lang, code },
      }),

      // transformResponse: (data: AddLanguageResponse) => data?.data?.languages,
      transformResponse: (data?: Language) => saveLanguage(data),
      invalidatesTags: [{ type: 'Language', id: 'LIST' }],
    }),

    deleteLanguage: build.mutation<MaybeLanguagesState, DeleteLanguage>({
      query: id => ({
        url: `${endpoints.languages}/${id}`,
        method: 'DELETE',
        body: { _id: id },
      }),

      transformResponse(data, __, id) {
        if (!data) return undefined;
        return languagesAdapter.removeOne(initialState, id);
      },

      invalidatesTags: (_, __, id) => [{ type: 'Language', id }],
    }),
  }),
});

export const {
  useGetLanguagesQuery,
  useGetLanguageQuery,
  useAddLanguageMutation,
  useDeleteLanguageMutation,
} = languagesApi;

/** returns the query result object */
const selectLanguagesResult = languagesApi.endpoints.getLanguages.select();

/** Creates memoized selector
 * @returns normalized state object with ids and entities */
const selectLanguagesData = createSelector(selectLanguagesResult, result => result.data);

/** getSelectors creates selectors and we rename them with aliases using destructuring */
export const {
  //
  selectById: selectLanguageById,
  selectIds: selectLanguagesIds,
} = languagesAdapter.getSelectors<RootState>(state => selectLanguagesData(state) ?? initialState);

const selectActiveLanguage = createSelector(
  [selectState, selectActiveLangId],
  (state, activeLanguageId) => {
    if (!activeLanguageId) return undefined;
    return selectLanguageById(state, activeLanguageId);
  }
);
export const selectVisibleCountriesIds = createSelector(selectActiveLanguage, language =>
  language?.countries.map(({ _id }) => _id)
);
export const selectActiveDBLangCode = createSelector(
  selectActiveLanguage,
  language => language?.dbLangCode
);
export const selectActiveLangLang = createSelector(
  selectActiveLanguage,
  language => language?.lang
);
export const selectActiveLangCode = createSelector(
  selectActiveLanguage,
  language => language?.code
);
export const selectIsEnglishActiveLang = createSelector(
  selectActiveLangCode,
  code => code === 'EN'
);
