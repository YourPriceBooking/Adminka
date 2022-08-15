import type { AddCity, EditCity, CitiesArray } from 'types/apis';
import { api } from '../api/api';

export const statesApi = api.injectEndpoints({
  endpoints: builder => ({
    addCity: builder.mutation<CitiesArray, AddCity>({
      query: body => ({
        url: '/location-city',
        method: 'POST',
        // body: { state, stateInternational, langCode: 'EN' },
        body,
      }),

      invalidatesTags: [{ type: 'City', id: 'LIST' }],
    }),

    editCity: builder.mutation<CitiesArray, EditCity>({
      query: ({ _id, ...body }) => ({
        url: `/location-city/${_id}`,
        method: 'PATCH',
        body,
      }),

      invalidatesTags: (result, error, { _id }) => [{ type: 'City', id: _id }],
    }),

    deleteCity: builder.mutation<CitiesArray, EditCity>({
      query: ({ _id }) => ({
        url: `/location-city/${_id}`,
        method: 'DELETE',
        body: { _id },
      }),

      invalidatesTags: (result, error, { _id }) => [{ type: 'City', id: _id }],
    }),
  }),
});

// {
//   stateName: 'Tomato State',
//   stateInternational: 'Tomato State',
//   stateCode: 'Tomato',
//   international: 'Potrugeese',
//   statePhotoURL: 'https://Tomato.states.ua/photos/lviv-state.webp',
//   langCode: 'EN',
//   countryId: '62ed6c467958f1e97fd32cc7',
// }

export const { useAddCityMutation, useEditCityMutation, useDeleteCityMutation } = statesApi;
