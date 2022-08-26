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

    // pessimistic updates https://redux-toolkit.js.org/rtk-query/usage/manual-cache-updates#pessimistic-updates
    // onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
    //   let patchResult;
    //   try {
    //     const { data } = await queryFulfilled;
    //     console.log({ data });
    //     const lang = await isLanguage(data);
    //     console.log({ lang });
    //     if (!data || !lang) return;

    //     patchResult = dispatch(
    //       languagesApi.util.updateQueryData('getLanguages', undefined, draft => {
    //         if (draft) {
    //           console.log('onQueryStarted: ~ draft', draft);
    //           const newLanguage = data.entities[id];
    //           console.log('onQueryStarted: ~ newLanguage', newLanguage);
    //           if (newLanguage) {
    //             const patched = languagesAdapter.addOne(draft, newLanguage);
    //             console.log('onQueryStarted: ~ patched', patched);
    //           }
    //         }
    //       })
    //     );
    //     console.log('onQueryStarted: ~ patchResult', patchResult);
    //   } catch {
    //     if (!patchResult?.inversePatches) return;
    //     dispatch(
    //       languagesApi.util.patchQueryData('getLanguages', undefined, patchResult.inversePatches)
    //     );
    //   }
    // },
    // }),

    addLanguage: build.mutation<MaybeLanguagesEntity, AddLanguage>({
      query: body => ({
        url: endpoints.languages,
        method: 'POST',
        body,
      }),
      transformResponse: (result?: OneLanguageInArray) => saveOneLanguage(result),
      // invalidatesTags: () => tag('LIST', 'Language'),
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
// useLazyGetCountriesQuery;
export const {
  useGetLanguagesQuery,
  useLazyGetLanguagesQuery,
  // useLazyGetLanguageQuery,
  useAddLanguageMutation,
  useDeleteLanguageMutation,
} = languagesApi;

/** returns the query result object */
export const selectLanguagesResult = languagesApi.endpoints.getLanguages.select();
