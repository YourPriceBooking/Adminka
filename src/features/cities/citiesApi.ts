import { type EntityId } from '@reduxjs/toolkit';
import { api, endpoints, tag, tagList } from 'features/api';
import type {
  AddCity,
  EditCity,
  MaybeCitiesEntity,
  DeleteCity,
  ManyCities,
  OneCity,
} from 'types/apis';
import { removeCity, saveManyCities, saveOneCity } from './citiesAdapter';

export const citiesApi = api.injectEndpoints({
  endpoints: build => ({
    getCities: build.query<MaybeCitiesEntity, void>({
      query: () => endpoints.locationCity,
      transformResponse: (result: ManyCities) => saveManyCities(result),
      providesTags: result => tagList(result, 'City'),
    }),

    getCity: build.query<MaybeCitiesEntity, EntityId>({
      query: id => `${endpoints.locationCity}/${id}`,
      transformResponse: (result: OneCity) => saveOneCity(result),
      providesTags: (_, __, id) => tag(id, 'City'),
    }),

    addCity: build.mutation<MaybeCitiesEntity, AddCity>({
      query: body => ({
        url: endpoints.locationCity,
        method: 'POST',
        body,
      }),
      transformResponse: (result: OneCity) => saveOneCity(result),
      invalidatesTags: tag('LIST', 'City'),
    }),

    editCity: build.mutation<MaybeCitiesEntity, EditCity>({
      query: ({ _id, ...body }) => ({
        url: `${endpoints.locationCity}/${_id}`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (result: OneCity) => saveOneCity(result),
      invalidatesTags: (_, __, { _id }) => tag(_id, 'City'),
    }),

    deleteCity: build.mutation<MaybeCitiesEntity, DeleteCity>({
      query: id => ({
        url: `${endpoints.locationCity}/${id}`,
        method: 'DELETE',
        body: { _id: id },
      }),
      transformResponse: (result: OneCity) => removeCity(result),
      invalidatesTags: (_, __, id) => tag(id, 'City'),
    }),
  }),
});

export const { useAddCityMutation, useEditCityMutation, useDeleteCityMutation } = citiesApi;

export const selectCitiesResult = citiesApi.endpoints.getCities.select();
