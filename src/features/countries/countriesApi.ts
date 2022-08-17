import { createEntityAdapter, createSelector, EntityId, nanoid } from '@reduxjs/toolkit';
import { api, frozenArr, selectEntityId, selectState } from 'features/api';
import { countrySchema } from 'models';
import { normalize } from 'normalizr';

import type { RootState } from 'App/store';

import type {
  AddCountry,
  CountriesResponse,
  Country,
  CountriesAdapter,
  EditCountry,
  DeleteCountry,
  // InitCountriesResponse,
  // InitCountryResponse,
} from 'types/apis';

import { useAppSelector } from 'App';
import { logRender } from 'common/utils';
import { useMemo } from 'react';
import { languagesApi } from '../languages/languagesApi';
import { selectActiveCountryId } from './countriesSlice';

const countriesAdapter = createEntityAdapter<Country>({
  selectId: country => country._id,
  sortComparer: (a, b) => b.createdAt?.localeCompare(a.createdAt),
});

const initialState = countriesAdapter.getInitialState();

export const countriesApi = api.injectEndpoints({
  endpoints: builder => ({
    // getCountries: builder.query<CountriesResponse, void>({
    getCountries: builder.query<CountriesAdapter, void>({
      query: () => '/countries',
      // transformResponse: (result: InitCountriesResponse) => result?.data?.result,
      transformResponse: (countries: CountriesResponse) => {
        const loadedCountries = countries ?? frozenArr;

        const normalizedCountries = normalize(countries, countrySchema);

        const savedCountries = countriesAdapter.upsertMany(initialState, loadedCountries);

        console.log({ loadedCountries, normalizedCountries, savedCountries });

        return savedCountries;
      },
      providesTags: result => [
        { type: 'Country', id: 'LIST' },
        ...(result ? result.ids.map(id => ({ type: 'Country' as const, id })) : []),
      ],
    }),

    getCountry: builder.query<CountriesAdapter, EntityId>({
      query: _id => `/countries/${_id}`,
      // transformResponse: (result: InitCountryResponse) => result?.data?.country,
      transformResponse: (country: Country) => {
        const loadedCountry = country ?? frozenArr;

        const normalizedCountry = normalize(loadedCountry, countrySchema);

        const savedCountry = countriesAdapter.upsertOne(initialState, loadedCountry);
        console.log({ loadedCountry, normalizedCountry, savedCountry });

        return savedCountry;
      },
      providesTags: (result, error, _id) => [{ type: 'Country', id: _id }],
    }),

    // addCountryEng: builder.mutation<CountryResponse, AddCountry>({
    addCountryEng: builder.mutation<CountriesAdapter, AddCountry>({
      query: ({ country, international }) => ({
        url: '/countries',
        method: 'POST',
        // body: { country, international, langCode: 'EN', dbLangCode: 'EN' }
        body: {
          country,
          international,
          langCode: 'EN',
          dbLangCode: 'EN',
          _id: nanoid(),
        },
      }),
      // transformResponse: (result: AddCountryResponse) => result.data.country,
      transformResponse: (country: Country) => {
        const loadedCountry = country ?? frozenArr;

        const normalizedCountry = normalize(loadedCountry, countrySchema);

        const savedCountry = countriesAdapter.upsertOne(initialState, loadedCountry);
        console.log({ loadedCountry, normalizedCountry, savedCountry });

        return savedCountry;
      },
      invalidatesTags: [{ type: 'Country', id: 'LIST' }],
    }),

    // editCountry: builder.mutation<CountryResponse, EditCountry>({
    editCountry: builder.mutation<CountriesAdapter, EditCountry>({
      query: ({ _id, country, langCode, international }) => ({
        url: `/countries/${_id}`,
        method: 'PATCH',
        body: { country, langCode, international },
      }),
      // transformResponse: (result: { data: { result: Country } }) => result.data.result,
      transformResponse: (country: Country) => {
        const loadedCountry = country ?? frozenArr;

        const normalizedCountry = normalize(loadedCountry, countrySchema);

        const savedCountry = countriesAdapter.upsertOne(initialState, loadedCountry);
        console.log({ loadedCountry, normalizedCountry, savedCountry });

        return savedCountry;
      },

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
  useGetCountriesQuery,
  useGetCountryQuery,
  useAddCountryEngMutation,
  useEditCountryMutation,
  useDeleteCountryMutation,
} = countriesApi;

const selectCountriesResult = countriesApi.endpoints.getCountries.select();

// Creates memoized selector
const selectCountriesData = createSelector(selectCountriesResult, result => result.data); // normalized state object with ids and entities

export const {
  selectAll: selectAllCountries,
  selectById: selectCountryById,
  selectIds: selectCountriesIds,
} = countriesAdapter.getSelectors<RootState>(state => selectCountriesData(state) ?? initialState);

export const useSelectCountriesIds = () => {
  const countriesIds = useAppSelector(selectCountriesIds);
  logRender('useSelectCountriesIds', countriesIds);
  return countriesIds;
};

const makeSelectCountryById = () =>
  createSelector([selectState, selectEntityId], (state, id) => {
    const country = selectCountryById(state, id);
    logRender('makeSelectCountryById - outputSelector', country);
    return country;
  });

// each call will return separate instance of memoized selector
export const useSelectCountryById = (countryId: EntityId) => {
  const countrySelector = useMemo(makeSelectCountryById, []);
  const country = useAppSelector(state => countrySelector(state, countryId));
  logRender('useSelectCountryById', country);
  return country;
};

const selectActiveCountry = createSelector(
  [selectState, selectActiveCountryId],
  (state, activeCountryId) => {
    if (!activeCountryId) return undefined;
    return selectCountryById(state, activeCountryId);
  }
);
export const selectActiveCountryName = createSelector(
  selectActiveCountry,
  country => country?.country
);
export const selectActiveCountryInternational = createSelector(
  selectActiveCountry,
  country => country?.international
);
// export const selectActiv = createSelector(
//   selectActiveCountry,
//   country => country?.
// );
