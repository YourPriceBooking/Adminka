import { baseApi } from './baseApi';
import { AddLanguage, LanguagesResponse } from 'types/apis';

const LANGUAGES = { type: 'Languages' as const };
const ID_LIST = { id: 'LIST' as const };
const LANGUAGES_LIST = { ...LANGUAGES, ...ID_LIST };

export const languagesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getLanguages: builder.query<LanguagesResponse | any, void>({
      query: () => '/languages',
      keepUnusedDataFor: 300,
      transformResponse: (result: LanguagesResponse | any) => result.data.result,
      providesTags: result =>
        result
          ? [
              ...result.map(({ _id }: { _id: string }) => ({ ...LANGUAGES, id: _id })),
              LANGUAGES_LIST,
            ]
          : [LANGUAGES_LIST],
    }),

    addLanguage: builder.mutation<LanguagesResponse, AddLanguage>({
      query: ({ lang, code }) => ({
        url: '/languages',
        method: 'POST',
        body: { lang, code },
      }),
      invalidatesTags: [LANGUAGES_LIST],
    }),
  }),
});

export const { useGetLanguagesQuery, useAddLanguageMutation } = languagesApi;
