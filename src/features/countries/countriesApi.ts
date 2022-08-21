import type {
  AddCountry,
  EditCountry,
  DeleteCountry,
  GetCountry,
  MaybeCountriesEntity,
  ManyCountries,
  OneCountry,
} from 'types/apis';
import { api, endpoints, tag, tagList } from 'features/api';
import { removeCountry, saveCountries, saveCountry } from './countriesAdapter';

export const countriesApi = api.injectEndpoints({
  endpoints: build => ({
    getCountries: build.query<MaybeCountriesEntity, void>({
      query: () => endpoints.countries,
      transformResponse: (result?: ManyCountries) => saveCountries(result),
      providesTags: result => tagList(result, 'Country'),
    }),

    getCountry: build.query<MaybeCountriesEntity, GetCountry>({
      query: id => `${endpoints.countries}/${id}`,
      transformResponse: (result?: OneCountry) => saveCountry(result),
      providesTags: (_, __, id) => tag(id, 'Country'),
    }),

    addCountryEng: build.mutation<MaybeCountriesEntity, AddCountry>({
      query: ({ country, international }) => ({
        url: endpoints.countries,
        method: 'POST',
        body: { country, international, langCode: 'EN', dbLangCode: 'EN' },
      }),
      transformResponse: (result: OneCountry) => saveCountry(result),
      invalidatesTags: () => tag('LIST', 'Country'),
    }),

    editCountry: build.mutation<MaybeCountriesEntity, EditCountry>({
      query: ({ _id, country, langCode }) => ({
        url: `${endpoints.countries}/${_id}`,
        method: 'PATCH',
        body: { country, langCode },
      }),
      transformResponse: (result?: OneCountry) => saveCountry(result),

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
  useGetCountryQuery,
  useAddCountryEngMutation,
  useEditCountryMutation,
  useDeleteCountryMutation,
} = countriesApi;

export const selectCountriesResult = countriesApi.endpoints.getCountries.select();
