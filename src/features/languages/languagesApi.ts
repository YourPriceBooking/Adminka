import type {
  AddLanguage,
  DeleteLanguage,
  GetLanguage,
  ManyLanguages,
  MaybeLanguagesEntity,
  OneLanguage,
} from 'types/apis';
import { api, endpoints, tag, tagList } from 'features/api';
import { saveLanguage, removeLanguage, saveLanguages } from './languagesAdapter';

export const languagesApi = api.injectEndpoints({
  endpoints: build => ({
    getLanguages: build.query<MaybeLanguagesEntity, void>({
      query: () => endpoints.languages,
      transformResponse: (result?: ManyLanguages) => saveLanguages(result),
      providesTags: result => tagList(result, 'Language'),
    }),

    getLanguage: build.query<MaybeLanguagesEntity, GetLanguage>({
      query: id => `${endpoints.languages}/${id}`,
      transformResponse: (result?: OneLanguage) => saveLanguage(result),
      providesTags: (_, __, id) => tag(id, 'Language'),
    }),

    addLanguage: build.mutation<MaybeLanguagesEntity, AddLanguage>({
      query: ({ lang, code }) => ({
        url: endpoints.languages,
        method: 'POST',
        body: { lang, code },
      }),
      transformResponse: (result?: OneLanguage) => saveLanguage(result),
      invalidatesTags: () => tag('LIST', 'Language'),
    }),

    deleteLanguage: build.mutation<MaybeLanguagesEntity, DeleteLanguage>({
      query: id => ({
        url: `${endpoints.languages}/${id}`,
        method: 'DELETE',
        body: { _id: id },
      }),
      transformResponse: (result?: OneLanguage) => removeLanguage(result),
      invalidatesTags: (_, __, id) => tag(id, 'Language'),
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
export const selectLanguagesResult = languagesApi.endpoints.getLanguages.select();
