import { type EntityId } from '@reduxjs/toolkit';
import { api, endpoints, tag, tagList } from 'features/api';
import type { AddCity, EditCity, MaybeCitiesEntity, ManyCities, OneCity } from 'types/apis';
import { saveManyCities, saveOneCity } from './citiesAdapter';

export const citiesApi = api.injectEndpoints({
  endpoints: build => ({
    getCities: build.query<MaybeCitiesEntity, { international: string; dbLangCode: string } | void>(
      {
        query: args => {
          if (!args) return endpoints.locationCity;
          const params = new URLSearchParams(args);
          return `${endpoints.locationStateRegister}?${params.toString()}`;
        },
        transformResponse: (result: any) => {
          const register = result?.data?.register;
          if (Array.isArray(register)) {
            const cities = register.flatMap((state: any) => state?.cities ?? []);
            return saveManyCities({ data: { cities } } as ManyCities);
          }
          return saveManyCities(result as ManyCities);
        },
        providesTags: result => tagList(result, 'City'),
      }
    ),

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
  }),
});

export const { useGetCitiesQuery, useLazyGetCitiesQuery, useAddCityMutation, useEditCityMutation } =
  citiesApi;

export const selectCitiesResult = citiesApi.endpoints.getCities.select();
