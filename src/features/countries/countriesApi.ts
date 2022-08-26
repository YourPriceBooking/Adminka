import type {
  AddCountry,
  EditCountry,
  DeleteCountry,
  MaybeCountriesEntity,
  ManyCountries,
  OneCountry,
} from 'types/apis';
import { api, endpoints, tag, tagList } from 'features/api';
import { removeCountry, saveManyCountries, saveOneCountry } from './countriesAdapter';

export const countriesApi = api.injectEndpoints({
  endpoints: build => ({
    getCountries: build.query<MaybeCountriesEntity, void>({
      query: () => endpoints.countries,
      transformResponse: (result?: ManyCountries) => saveManyCountries(result),
      providesTags: result => tagList(result, 'Country'),
    }),

    // getCountry: build.query<MaybeCountriesEntity, GetCountry>({
    //   query: id => `${endpoints.countries}/${id}`,
    //   transformResponse: (result?: OneCountry) => saveOneCountry(result),
    //   providesTags: (_, __, id) => tag(id, 'Country'),
    // }),

    addCountryEng: build.mutation<MaybeCountriesEntity, AddCountry>({
      query: body => ({
        url: endpoints.countries,
        method: 'POST',
        body,
      }),
      transformResponse: (result: OneCountry) => saveOneCountry(result),
      invalidatesTags: () => tag('LIST', 'Country'),
    }),

    editCountry: build.mutation<MaybeCountriesEntity, EditCountry>({
      query: ({ _id, ...body }) => ({
        url: `${endpoints.countries}/${_id}`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (result?: OneCountry) => saveOneCountry(result),

      // optimistic updates (country + langCode)
      async onQueryStarted({ _id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          countriesApi.util.updateQueryData('getCountries', undefined, draft => {
            const editedCountry = draft?.entities[_id];

            if (editedCountry) {
              Object.assign(editedCountry, patch);
            }
          })
        );

        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            countriesApi.util.patchQueryData('getCountries', undefined, patchResult.inversePatches)
          );
        }
      },

      // no need invalidatesTags for optimistic updates
      // invalidatesTags: (result, error, { _id }) => [{ type: 'Country', id: _id }],
    }),

    deleteCountry: build.mutation<MaybeCountriesEntity, DeleteCountry>({
      query: id => ({
        url: `${endpoints.countries}/${id}`,
        method: 'DELETE',
        body: { _id: id },
      }),
      transformResponse: (result: OneCountry) => removeCountry(result),
      invalidatesTags: (_, __, id) => tag(id, 'Country'),
    }),
  }),
});

export const {
  useGetCountriesQuery,
  useLazyGetCountriesQuery,
  useAddCountryEngMutation,
  useEditCountryMutation,
  useDeleteCountryMutation,
} = countriesApi;

export const selectCountriesResult = countriesApi.endpoints.getCountries.select();
