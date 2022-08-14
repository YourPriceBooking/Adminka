import { createEntityAdapter, createSelector, EntityId } from '@reduxjs/toolkit';
import type {
  // InitLanguagesResponse,
  // AddLanguageResponse,
  AddLanguage,
  DeleteLanguage,
  // FindCity,
  // FindDistrict,
  Language,
  LanguagesAdapter,
  LanguagesResponse,
} from 'types/apis';
import type { RootState } from 'redux/store';

import { useAppSelector } from 'components/App';
import { useMemo } from 'react';
import { selectActiveLangId } from 'redux/slices';
import { logRender } from 'utils';
import { api, frozenArr } from './api';

const languagesAdapter = createEntityAdapter<Language>({
  selectId: language => language._id,
  sortComparer: (a, b) => b.createdAt?.localeCompare(a.createdAt),
});

const languageAdapterInitialState = languagesAdapter.getInitialState();

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
      keepUnusedDataFor: 300,

      // transformResponse: (result: InitLanguagesResponse) => {
      transformResponse: (languages: LanguagesResponse) => {
        // const loadedLanguages = result?.data?.languages ?? frozenArr;  // for actual backend api
        const loadedLanguages = languages ?? frozenArr;

        return languagesAdapter.setAll(languageAdapterInitialState, loadedLanguages);
      },

      providesTags: result => [
        'Language',
        ...(result ? result.ids.map(id => ({ type: 'Language' as const, id })) : []),
      ],
    }),

    getLanguage: builder.query<LanguagesAdapter, EntityId>({
      query: _id => `/languages/${_id}`,
      keepUnusedDataFor: 300,
      // transformResponse: (result: InitLanguagesResponse) => {
      transformResponse: (languages: Language) => {
        // const loadedLanguage = result?.data?.language ?? frozenArr;
        const loadedLanguage = languages ?? frozenArr;

        return languagesAdapter.setOne(languageAdapterInitialState, loadedLanguage);
      },
      providesTags: (result, error, id) => [{ type: 'Language', id }],
    }),

    addLanguage: builder.mutation<Language, AddLanguage>({
      query: ({ lang, code }) => ({
        url: '/languages',
        method: 'POST',
        body: { lang, code },
      }),

      // transformResponse: (result: AddLanguageResponse) => result.data.languages,
      transformResponse: (language: Language) => language,
      invalidatesTags: ['Language'],
    }),

    deleteLanguage: builder.mutation<void, DeleteLanguage>({
      query: ({ _id }) => ({
        url: `/languages/${_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { _id }) => [{ type: 'Language', id: _id }],
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
const selectLanguagesData = createSelector(
  selectLanguagesResult,
  languagesResult => languagesResult.data // normalized state object with ids and entities
);

// getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllLanguages,
  selectById: selectLanguageById,
  selectIds: selectLanguageIds,
} = languagesAdapter.getSelectors(
  (state: RootState) => selectLanguagesData(state) ?? languageAdapterInitialState
);

// const selectCountriesFromActiveLanguage = createSelector(
//   selectLanguagesResult,
//   (activeLanguageId: string) => activeLanguageId,
//   (languages, activeLanguageId) =>
//     languages?.find(language => language._id === activeLanguageId)?.countries
// );

const langWithoutCountries = createSelector([selectAllLanguages], languages => {
  logRender('langWithoutCountries output selector');
  return languages.map(({ countries, ...lang }) => lang);
});

export const useSelectLanguages = () => {
  const allLanguages = useAppSelector(langWithoutCountries);
  console.log('useSelectLanguages ~ allLanguages', allLanguages);
  logRender('useSelectLanguages');
  return allLanguages;
};

export const useSelectCountries = () => {
  const activeLangId = useAppSelector(selectActiveLangId) ?? '';
  const activeLanguage = useAppSelector(state => selectLanguageById(state, activeLangId));
  const countriesForActiveLanguage = activeLanguage?.countries;
  const countriesWithoutStates = useMemo(
    () => countriesForActiveLanguage?.map(({ _id }) => _id),
    [countriesForActiveLanguage]
  );
  console.log('useSelectCountries ~ countriesWithoutStates', countriesWithoutStates);
  logRender('useSelectCountries');
  return countriesWithoutStates;
};
