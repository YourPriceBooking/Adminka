import type { AddState, EditState, State, StatesResponse } from 'types/apis';
import { api } from './api';

export const statesApi = api.injectEndpoints({
  endpoints: builder => ({
    addState: builder.mutation<State, AddState>({
      query: body => ({
        url: '/location-state',
        method: 'POST',
        // body: { state, stateInternational, langCode: 'EN' },
        body,
      }),

      invalidatesTags: [{ type: 'State', id: 'LIST' }],
    }),

    editState: builder.mutation<StatesResponse, EditState>({
      query: ({ _id, stateCode, stateName, statePhotoURL, stateInternational }) => ({
        url: `/location-state/${_id}`,
        method: 'PUT',
        body: { stateCode, stateName, statePhotoURL, stateInternational },
      }),

      invalidatesTags: (result, error, { _id }) => [{ type: 'State', id: _id }],
    }),

    deleteState: builder.mutation<StatesResponse, EditState>({
      query: ({ _id }) => ({
        url: `/location-state/${_id}`,
        method: 'DELETE',
        body: { _id },
      }),

      invalidatesTags: (result, error, { _id }) => [{ type: 'State', id: _id }],
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

export const { useAddStateMutation, useEditStateMutation, useDeleteStateMutation } = statesApi;
