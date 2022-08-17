import { createEntityAdapter, createSelector, EntityId } from '@reduxjs/toolkit';
import type { RootState } from 'App/store';
import { citySchema } from 'models';
import { normalize } from 'normalizr';
import type { AddCity, EditCity, City, CitiesAdapter } from 'types/apis';
import { api } from '../api/api';

export const citiesAdapter = createEntityAdapter<City>({
  selectId: city => city._id,
  sortComparer: (a, b) => b.createdAt?.localeCompare(a.createdAt),
});

const initialState = citiesAdapter.getInitialState();

export const citiesApi = api.injectEndpoints({
  endpoints: builder => ({
    getCities: builder.query<CitiesAdapter, void>({
      query: () => '/location-city',
      transformResponse: (cities: City[]) => {
        console.log(cities);
        const normalizedCities = normalize(cities, citySchema);
        console.log({ normalizedCities });

        const savedCities = citiesAdapter.upsertMany(initialState, cities);
        console.log({ savedCities });

        return savedCities;
      },
      providesTags: result => [
        'City',
        ...(result ? result.ids.map(id => ({ type: 'City' as const, id })) : []),
      ],
    }),

    getCity: builder.query<CitiesAdapter, EntityId>({
      query: _id => `/location-city/${_id}`,

      transformResponse: (city: City) => {
        console.log(city);
        const normalizedCity = normalize(city, citySchema);
        console.log({ normalizedCity });

        const savedCity = citiesAdapter.upsertOne(initialState, city);
        console.log({ savedCity });

        return savedCity;
      },

      providesTags: (_, __, _id) => [{ type: 'City', id: _id }],
    }),

    addCity: builder.mutation<CitiesAdapter, AddCity>({
      query: body => ({
        url: '/location-city',
        method: 'POST',
        // body: { state, stateInternational, langCode: 'EN' },
        body,
      }),

      // transformResponse: (response: AddCityResponse) => {
      transformResponse: (city: City) => {
        // response?.data?.city;
        console.log(city);
        const normalizedCity = normalize(city, citySchema);
        console.log({ normalizedCity });

        const savedCity = citiesAdapter.upsertOne(initialState, city);
        console.log({ savedCity });

        return savedCity;
      },

      invalidatesTags: [{ type: 'City', id: 'LIST' }],
    }),

    editCity: builder.mutation<CitiesAdapter, EditCity>({
      query: ({ _id, ...body }) => ({
        url: `/location-city/${_id}`,
        method: 'PATCH',
        body,
      }),

      transformResponse: (city: City) => {
        console.log(city);

        const normalizedCity = normalize(city, citySchema);
        console.log({ normalizedCity });

        const savedCity = citiesAdapter.upsertOne(initialState, city);
        console.log({ savedCity });

        return savedCity;
      },

      invalidatesTags: (result, error, { _id }) => [{ type: 'City', id: _id }],
    }),

    deleteCity: builder.mutation<CitiesAdapter, EditCity>({
      query: ({ _id }) => ({
        url: `/location-city/${_id}`,
        method: 'DELETE',
        body: { _id },
      }),

      transformResponse: (city: City) => {
        console.log(city);

        const normalizedDeletedCity = normalize(city, citySchema);
        console.log({ normalizedDeletedCity });

        const adapterWithDeletedCity = citiesAdapter.removeOne(initialState, city._id);
        console.log({ adapterWithDeletedCity });

        return adapterWithDeletedCity;
      },

      invalidatesTags: (result, error, { _id }) => [{ type: 'City', id: _id }],
    }),
  }),
});

export const { useAddCityMutation, useEditCityMutation, useDeleteCityMutation } = citiesApi;

const selectCitiesResult = citiesApi.endpoints.getCities.select();

const selectCitiesData = createSelector(selectCitiesResult, result => result.data);

export const {
  // selectAll: selectAllCities,
  selectById: selectCityById,
  selectIds: selectCitiesIds,
} = citiesAdapter.getSelectors<RootState>(state => selectCitiesData(state) ?? initialState);
