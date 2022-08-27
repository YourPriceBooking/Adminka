import type { AddLanguage, DeleteLanguage, ManyLanguages, MaybeLanguagesEntity } from 'types/apis';
import { api, endpoints, OneLanguageInArray, tag, tagList } from 'features/api';
import { saveOneLanguage, removeLanguage, saveManyLanguages } from './languagesAdapter';

export const languagesApi = api.injectEndpoints({
  endpoints: build => ({
    getLanguages: build.query<MaybeLanguagesEntity, void>({
      query: () => endpoints.languages,
      transformResponse: (result?: ManyLanguages) => saveManyLanguages(result),
      providesTags: result => tagList(result, 'Language'),
    }),

    // getLanguage: build.query<MaybeLanguagesEntity, GetLanguage>({
    //   query: id => `${endpoints.languages}/${id}`,
    //   transformResponse: (result?: OneLanguageInArray) => saveOneLanguage(result),
    //   providesTags: (_, __, id) => tag(id, 'Language'),

    addLanguage: build.mutation<MaybeLanguagesEntity, AddLanguage>({
      query: body => ({
        url: endpoints.languages,
        method: 'POST',
        body,
      }),
      transformResponse: (result?: OneLanguageInArray) => saveOneLanguage(result),
    }),

    deleteLanguage: build.mutation<MaybeLanguagesEntity, DeleteLanguage>({
      query: id => ({
        url: `${endpoints.languages}/${id}`,
        method: 'DELETE',
        body: { _id: id },
      }),
      transformResponse: (result?: OneLanguageInArray) => removeLanguage(result),
      invalidatesTags: (_, __, id) => tag(id, 'Language'),
    }),
  }),
});

export const {
  useGetLanguagesQuery,
  useLazyGetLanguagesQuery,
  useAddLanguageMutation,
  useDeleteLanguageMutation,
} = languagesApi;

/** returns the query result object */
export const selectLanguagesResult = languagesApi.endpoints.getLanguages.select();
