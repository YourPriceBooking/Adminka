import { baseApi } from './baseApi';

import type {
  AddLanguage,
  DeleteLanguage,
  InitLanguagesResponse,
  Language,
  LanguagesResponse,
} from 'types/apis';

const LANGUAGES = { type: 'Languages' as const };
const ID_LIST = { id: 'LIST' as const };
const LANGUAGES_LIST = { ...LANGUAGES, ...ID_LIST };

export const languagesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getLanguages: builder.query<LanguagesResponse, void>({
      query: () => '/languages',
      keepUnusedDataFor: 300,
      transformResponse: (result: InitLanguagesResponse) => result.data.result,
      providesTags: result =>
        result
          ? [
              ...result.map(({ _id }: { _id: string }) => ({
                ...LANGUAGES,
                id: _id,
              })),
              LANGUAGES_LIST,
            ]
          : [LANGUAGES_LIST],
    }),

    addLanguage: builder.mutation<Language, AddLanguage>({
      query: ({ lang, code }) => ({
        url: '/languages',
        method: 'POST',
        body: { lang, code, countries: [] },
      }),
      invalidatesTags: [LANGUAGES_LIST],
    }),

    deleteLanguage: builder.mutation<Language, DeleteLanguage>({
      query: ({ _id }) => ({
        url: `/languages/${_id}`,
        method: 'DELETE',
        body: { _id },
      }),
      invalidatesTags: [LANGUAGES_LIST],
    }),
  }),
});

export const { useGetLanguagesQuery, useAddLanguageMutation, useDeleteLanguageMutation } =
  languagesApi;

/*
Редагування країн:
PUT api/countries/id
  очікує {
    "international": "NEW",
    "country":"New",
    "langCode":"UA"
  }

Можна додавати нову мову, та отримати правильний об'єкт з масивом країн (нові id):
Додавання нової мови:
POST api/languages
  очікує {
    "lang": "Українська",
    "code": "UA",
    "countries": []
  }
  */
