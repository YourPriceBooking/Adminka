import { type EntityId, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import type {
  // InitLanguagesResponse,
  // AddLanguageResponse,
  AddLanguage,
  DeleteLanguage,
  // FindCity,
  // FindDistrict,
  Language,
  LanguagesAdapter,
} from 'types/apis';
import type { RootState } from 'App/store';

import { useAppSelector } from 'App';

import { logRender } from 'common/utils';
import { api, frozenArr, selectEntityId, selectState } from 'features/api';
import { normalize } from 'normalizr';
import { languageSchema } from 'models';
import { selectActiveLangId } from 'features/common';
import { useMemo } from 'react';

const languagesAdapter = createEntityAdapter<Language>({
  selectId: language => language._id,
  sortComparer: (a, b) => b.createdAt?.localeCompare(a.createdAt),
});

const initialState = languagesAdapter.getInitialState();

/**
 * https://your-price-booking.herokuapp.com/api/languages
 * На беку: (GET, POST, PUT, DEL) - отримуємо данні з БД
 * GET ()
 * POST ('lang': "English", code: "EN"),
 * PUT (id, 'lang': "English", code: "EN"),
 * DEL (id)
 */
export const languagesApi = api.injectEndpoints({
  endpoints: builder => ({
    getLanguages: builder.query<LanguagesAdapter, void>({
      query: () => '/languages',

      // transformResponse: (result: InitLanguagesResponse) => {
      transformResponse: (languages: Language[]) => {
        // const loadedLanguages = result?.data?.languages ?? frozenArr; // for actual backend api
        const loadedLanguages = languages ?? frozenArr;

        const normalized = normalize(loadedLanguages, languageSchema);

        const savedAdapter = languagesAdapter.upsertMany(initialState, loadedLanguages);
        logRender('getLanguages', { loadedLanguages, normalized, savedAdapter }, true);

        return savedAdapter;
      },

      providesTags: result => [
        'Language',
        ...(result ? result.ids.map(id => ({ type: 'Language' as const, id })) : []),
      ],
    }),

    getLanguage: builder.query<LanguagesAdapter, string>({
      query: _id => `/languages/${_id}`,

      // transformResponse: (result: InitLanguagesResponse) => {
      transformResponse: (languages: Language) => {
        // const loadedLanguage = result?.data?.language ?? frozenArr;
        const loadedLanguage = languages ?? frozenArr;

        return languagesAdapter.upsertOne(languagesAdapter.getInitialState(), loadedLanguage);
      },
      providesTags: (_, __, id) => [{ type: 'Language', id }],
    }),

    addLanguage: builder.mutation<LanguagesAdapter, AddLanguage>({
      query: ({ lang, code }) => ({
        url: '/languages',
        method: 'POST',
        body: { lang, code },
      }),

      // transformResponse: (result: AddLanguageResponse) => result.data.languages,
      transformResponse: (language: Language) => {
        const loadedLanguage = language;

        return languagesAdapter.upsertOne(languagesAdapter.getInitialState(), loadedLanguage);
      },
      invalidatesTags: ['Language'],
    }),

    deleteLanguage: builder.mutation<void, DeleteLanguage>({
      query: ({ _id }) => ({
        url: `/languages/${_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, { _id }) => [{ type: 'Language', id: _id }],
    }),
  }),
});

export const {
  useGetLanguagesQuery,
  useGetLanguageQuery,
  useAddLanguageMutation,
  useDeleteLanguageMutation,
} = languagesApi;

// returns the query result object
const selectLanguagesResult = languagesApi.endpoints.getLanguages.select();

// Creates memoized selector
const selectLanguagesData = createSelector(selectLanguagesResult, result => result.data);
// normalized state object with ids and entities

// getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllLanguages,
  selectById: selectLanguageById,
  selectIds: selectLanguagesIds,
} = languagesAdapter.getSelectors<RootState>(state => selectLanguagesData(state) ?? initialState);

export const useSelectLanguagesIds = () => {
  const languagesIds = useAppSelector(selectLanguagesIds);
  logRender('useSelectLanguagesIds', languagesIds);
  return languagesIds;
};

const makeSelectLanguageById = () =>
  createSelector([selectState, selectEntityId], (state, languageId) => {
    const language = selectLanguageById(state, languageId);
    logRender('makeSelectLanguageById - outputSelector', language);
    return language;
  });

// each call will return separate instance of memoized selector
export const useSelectLanguageById = (languageId: EntityId) => {
  const languageSelector = useMemo(makeSelectLanguageById, []);
  const language = useAppSelector(state => languageSelector(state, languageId));
  logRender('useSelectLanguageById', language);
  return language;
};

const selectActiveLanguage = createSelector(
  [selectState, selectActiveLangId],
  (state, activeLanguageId) => {
    if (!activeLanguageId) return undefined;
    return selectLanguageById(state, activeLanguageId);
  }
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
