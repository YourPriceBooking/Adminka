import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { api } from 'features/api';

import type { RootState } from 'App/store';

import type {
  AddCountry,
  CountriesResponse,
  Country,
  EditCountry,
  DeleteCountry,
  GetCountry,
  MaybeCountriesState,
} from 'types/apis';

import { logRender } from 'common/utils';

const countriesAdapter = createEntityAdapter<Country>({
  selectId: country => country._id,
  sortComparer: (a, b) => b.createdAt?.localeCompare(a.createdAt),
});

const initialState = countriesAdapter.getInitialState();

/** @returns Saved to redux countries from countriesAdapter */
export const saveManyCountries = (data?: CountriesResponse) => {
  if (!data) return undefined;
  return countriesAdapter.setAll(initialState, data);
};

/** @returns Saved to redux country from countriesAdapter */
export const saveCountry = (data?: Country) => {
  if (!data) return undefined;
  return countriesAdapter.upsertOne(initialState, data);
};

export const countriesApi = api.injectEndpoints({
  endpoints: build => ({
    // getCountries: build.query<MaybeCountriesState, void>({
    getCountries: build.query<MaybeCountriesState, void>({
      query: () => '/countries',
      // transformResponse: (result: InitCountriesResponse) => result?.data?.countries,
      transformResponse: (data?: CountriesResponse) => saveManyCountries(data),
      providesTags: result => [
        { type: 'Country', id: 'LIST' },
        ...(result ? result.ids.map(id => ({ type: 'Country' as const, id })) : []),
      ],
    }),

    getCountry: build.query<MaybeCountriesState, GetCountry>({
      query: id => `/countries/${id}`,
      // transformResponse: (result: InitCountryResponse) => result?.data?.country,
      transformResponse: (country: Country) => saveCountry(country),
      providesTags: (result, error, id) => [{ type: 'Country', id }],
    }),

    // addCountryEng: build.mutation<MaybeCountriesState, AddCountry>({
    addCountryEng: build.mutation<MaybeCountriesState, AddCountry>({
      query: ({ country, international }) => ({
        url: '/countries',
        method: 'POST',
        // body: { country, international, langCode: 'EN', dbLangCode: 'EN' }
        body: {
          country,
          international,
          langCode: 'EN',
          dbLangCode: 'EN',
        },
      }),
      // transformResponse: (result: AddCountryResponse) => result.data.country,
      transformResponse: (country: Country) => saveCountry(country),
      invalidatesTags: [{ type: 'Country', id: 'LIST' }],
    }),

    // editCountry: build.mutation<MaybeCountriesState, EditCountry>({
    editCountry: build.mutation<MaybeCountriesState, EditCountry>({
      query: ({ _id, country, langCode }) => ({
        url: `/countries/${_id}`,
        method: 'PATCH',
        body: { country, langCode },
      }),
      // transformResponse: (result: { data: { result: Country } }) => result.data.result,
      transformResponse: (country: Country) => saveCountry(country),

      // optimistic updates
      // photURL + name country
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

    deleteCountry: build.mutation<MaybeCountriesState, DeleteCountry>({
      query: id => ({
        url: `/countries/${id}`,
        method: 'DELETE',
      }),

      transformResponse(_, __, id) {
        // const deletedCountry = result.data.country ?? frozenArr;
        const deletedCountry = id;

        const savedCountryAdapter = countriesAdapter.removeOne(initialState, deletedCountry);
        logRender('editCountry', { deletedCountry, savedCountryAdapter }, true);

        return savedCountryAdapter;
      },
      invalidatesTags: (result, error, id) => [{ type: 'Country', id }],
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

const selectCountriesResult = countriesApi.endpoints.getCountries.select();

// Creates memoized selector
const selectCountriesData = createSelector(selectCountriesResult, result => result.data);
// normalized state object with ids and entities

export const {
  selectAll: selectAllCountries,
  selectById: selectCountryById,
  selectIds: selectCountriesIds,
} = countriesAdapter.getSelectors<RootState>(state => selectCountriesData(state) ?? initialState);
