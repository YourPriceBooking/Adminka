import type {
  AddLanguage,
  AddLanguageResponse,
  DeleteLanguage,
  InitLanguagesResponse,
  Language,
  LanguagesResponse,
} from 'types/apis';
import { baseApi } from './baseApi';

export const languagesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getLanguages: builder.query<LanguagesResponse, void>({
      query: () => '/languages',
      keepUnusedDataFor: 300,
      transformResponse: (result: InitLanguagesResponse) => result.data.languages,
      providesTags: result =>
        result
          ? [...result.map(({ _id }) => ({ type: 'Language' as const, _id })), 'Language']
          : ['Language'],
    }),

    /**
     * Можна додавати нову мову, та отримати правильний об'єкт з масивом країн (нові id):
     * Додавання нової мови:
     * POST api/languages
     *   очікує {
     *     "lang": "Українська",
     *     "code": "UA",
     *     "countries": []
     *   }
     */
    addLanguage: builder.mutation<Language, AddLanguage>({
      query: ({ lang, code }) => ({
        url: '/languages',
        method: 'POST',
        body: { lang, code, ...(code === 'EN' ? {} : { countries: [] }) },
      }),
      transformResponse: (result: AddLanguageResponse) => result.data.languages,
      invalidatesTags: ['Language'],
    }),

    deleteLanguage: builder.mutation<Language, DeleteLanguage>({
      query: ({ _id }) => ({
        url: `/languages/${_id}`,
        method: 'DELETE',
        body: { _id },
      }),
      invalidatesTags: ['Language'],
    }),
  }),
});

export const { useGetLanguagesQuery, useAddLanguageMutation, useDeleteLanguageMutation } =
  languagesApi;
