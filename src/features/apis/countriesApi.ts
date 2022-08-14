import {
  /*  createEntityAdapter, createSelector, type EntityId,  */
  nanoid,
} from '@reduxjs/toolkit';
// import type { RootState } from 'redux/store';
import type {
  AddCountry,
  /*   CountriesResponse, */
  Country,
  /*   CountriesAdapter, */
  EditCountry,
  DeleteCountry,
  // InitCountriesResponse,
  // InitCountryResponse,
} from 'types/apis';
import { api /* emptyArray */ } from './api';
import { languagesApi } from './languagesApi';

// const countriesAdapter = createEntityAdapter<Country>({
//   selectId: country => country._id,
//   sortComparer: (a, b) => b.createdAt?.localeCompare(a.createdAt),
// });

// const countriesAdapterInitialState = countriesAdapter.getInitialState();

export const countriesApi = api.injectEndpoints({
  endpoints: builder => ({
    // getCountries: builder.query<CountriesResponse, void>({
    // getCountries: builder.query<CountriesAdapter, void>({
    //   query: () => '/countries',
    //   keepUnusedDataFor: 300,
    //   // transformResponse: (result: InitCountriesResponse) => result?.data?.result,
    //   transformResponse: (countries: CountriesResponse) => {
    //     const loadedCountries = countries ?? emptyArray;

    //     return countriesAdapter.setAll(countriesAdapterInitialState, loadedCountries);
    //   },
    //   providesTags: result => [
    //     { type: 'Country', id: 'LIST' },
    //     ...(result ? result.ids.map(id => ({ type: 'Country' as const, id })) : []),
    //   ],
    // }),

    // getCountry: builder.query<CountriesAdapter, EntityId>({
    //   query: _id => `/countries/${_id}`,
    //   // query: _id => `/countries/?_id=${_id}`,
    //   keepUnusedDataFor: 300,
    //   // transformResponse: (result: InitCountryResponse) => result?.data?.country,
    //   transformResponse: (country: Country) => {
    //     const loadedCountry = country ?? emptyArray;
    //     return countriesAdapter.setOne(countriesAdapterInitialState, loadedCountry);
    //   },
    //   providesTags: (result, error, id) => [{ type: 'Country', id }],
    // }),

    // addCountryEng: builder.mutation<CountryResponse, AddCountry>({
    addCountryEng: builder.mutation<Country, AddCountry>({
      query: ({ country, international }) => {
        const id = nanoid();

        return {
          url: '/countries',
          method: 'POST',
          // body: { country, international, langCode: 'EN', dbLangCode: 'EN' }
          body: {
            country,
            international,
            langCode: 'EN',
            dbLangCode: 'EN',
            _id: id,
            id,
          },
        };
      },
      // transformResponse: (result: AddCountryResponse) => result.data.country,
      transformResponse: (country: Country) => country,
      invalidatesTags: ['Country'],
    }),

    /**
     * Редагування країн:
     * PUT api/countries/id
     *   очікує {
     *     "international": "Ukraine",
     *     "country":"Україна",
     *     "langCode":"UA"
     *   }
     */

    // editCountry: builder.mutation<CountryResponse, EditCountry>({
    editCountry: builder.mutation<Country, EditCountry>({
      query: ({ _id, country, langCode, international }) => ({
        url: `/countries/${_id}`,
        method: 'PATCH',
        body: { country, langCode, international },
      }),
      // transformResponse: (result: { data: { result: Country } }) => result.data.result,
      transformResponse: (country: Country) => country,

      // optimistic updates
      async onQueryStarted({ _id, activeLangId, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          languagesApi.util.updateQueryData('getLanguages', undefined, draft => {
            const editedCountry = draft.entities[activeLangId]?.countries?.find(
              country => country._id === _id
            );

            if (editedCountry) {
              Object.assign(editedCountry, patch);
            }
          })
        );

        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            languagesApi.util.patchQueryData('getLanguages', undefined, patchResult.inversePatches)
          );
        }
      },

      // no need invalidatesTags for optimistic updates
      // invalidatesTags: (result, error, { _id }) => [{ type: 'Country', id: _id }],
    }),

    deleteCountry: builder.mutation<void, DeleteCountry>({
      query: ({ _id }) => ({
        url: `/countries/${_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { _id }) => [{ type: 'Country', id: _id }],
    }),
  }),
});

export const {
  // useGetCountriesQuery,
  // useGetCountryQuery,
  useAddCountryEngMutation,
  useEditCountryMutation,
  useDeleteCountryMutation,
} = countriesApi;

// Creates memoized selector
// const selectCountriesData = createSelector(
//   selectCountriesResult,
//   countriesResult => countriesResult.data // normalized state object with ids and entities
// );

// getSelectors creates these selectors and we rename them with aliases using destructuring
// export const {
//   selectAll: selectAllCountries,
//   selectById: selectCountryById,
//   selectIds: selectCountryIds,
// } = countriesAdapter.getSelectors<RootState>(
//   (state) => selectCountriesData(state) ?? countriesAdapterInitialState
// );
