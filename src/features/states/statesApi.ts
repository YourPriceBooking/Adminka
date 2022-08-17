import { createEntityAdapter, EntityId } from '@reduxjs/toolkit';
import type { AddState, EditState, State, StatesAdapter, StatesResponse } from 'types/apis';
import { api } from '../api/api';

const statesAdapter = createEntityAdapter<State>({
  selectId: state => state._id,
  sortComparer: (a, b) => b.createdAt?.localeCompare(a.createdAt),
});

const initialState = statesAdapter.getInitialState();

export const statesApi = api.injectEndpoints({
  endpoints: builder => ({
    getState: builder.query<StatesAdapter, EntityId>({
      query: _id => ({
        url: `/location-state/${_id}`,
        method: 'GET',
        // body: { state, stateInternational, langCode: 'EN' },
      }),
      // transformResponse: (result: { data: { state: State } }) => {
      transformResponse: (state: State) => {
        console.log('state', state);
        // const states = result?.data?.state;
        const adapter = statesAdapter.setOne(initialState, state);
        console.log(adapter, statesAdapter);
        return adapter;
      },

      providesTags: (_, __, id) => [{ type: 'State', id }],
    }),

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
