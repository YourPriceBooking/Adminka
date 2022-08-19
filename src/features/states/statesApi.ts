import { createEntityAdapter, EntityId } from '@reduxjs/toolkit';
import { logRender } from 'common/utils';
import { stateSchema, statesListSchema } from 'models';
import { normalize } from 'normalizr';
import type {
  AddState,
  DeleteState,
  EditState,
  State,
  StatesAdapter,
  StatesResponse,
} from 'types/apis';
import { api } from '../api/api';

const statesAdapter = createEntityAdapter<State>({
  selectId: state => state._id,
  sortComparer: (a, b) => b.createdAt?.localeCompare(a.createdAt),
});

const initialState = statesAdapter.getInitialState();

export const statesApi = api.injectEndpoints({
  endpoints: builder => ({
    getStates: builder.query<StatesAdapter, void>({
      query: () => 'location-state',
      // transformResponse: (result: { data: { state: State } }) => {
      transformResponse: (states: StatesResponse) => {
        // const loadedStates = result?.data?.state;
        const loadedStates = states;

        const normalizedStates = normalize(loadedStates, statesListSchema);

        const savedStatesAdapter = statesAdapter.upsertMany(initialState, states);

        logRender('getStates', { loadedStates, normalizedStates, savedStatesAdapter });

        return savedStatesAdapter;
      },

      providesTags: result => [
        { type: 'State', id: 'LIST' },
        ...(result ? result.ids.map(id => ({ type: 'State' as const, id })) : []),
      ],
    }),

    getState: builder.query<StatesAdapter, EntityId>({
      query: _id => ({
        url: `/location-state/${_id}`,
        method: 'GET',
        // body: { state, stateInternational, langCode: 'EN' },
      }),
      // transformResponse: (result: { data: { state: State } }) => {
      transformResponse: (state: State) => {
        console.log('state', state);
        // const loadedState = result?.data?.state;
        const loadedState = state;

        const normalizedState = normalize(loadedState, stateSchema);

        const savedStateAdapter = statesAdapter.upsertOne(initialState, loadedState);

        logRender('getStates', { loadedState, normalizedState, savedStateAdapter });

        return savedStateAdapter;
      },

      providesTags: (_, __, id) => [{ type: 'State', id }],
    }),

    addState: builder.mutation<StatesAdapter, AddState>({
      query: body => ({
        url: '/location-state',
        method: 'POST',
        // body: { state, stateInternational, langCode: 'EN' },
        body,
      }),

      // transformResponse: (result: { data: { state: State } }) => {
      transformResponse: (state: State) => {
        console.log('state', state);
        // const loadedState = result?.data?.state;
        const loadedState = state;

        const normalizedState = normalize(loadedState, stateSchema);

        const savedStateAdapter = statesAdapter.upsertOne(initialState, loadedState);

        logRender('getStates', { loadedState, normalizedState, savedStateAdapter });

        return savedStateAdapter;
      },

      invalidatesTags: [{ type: 'State', id: 'LIST' }],
    }),

    editState: builder.mutation<StatesAdapter, EditState>({
      query: ({ _id, stateCode, stateName, statePhotoURL, stateInternational }) => ({
        url: `/location-state/${_id}`,
        method: 'PUT',
        body: { stateCode, stateName, statePhotoURL, stateInternational },
      }),

      // transformResponse: (result: { data: { state: State } }) => {
      transformResponse: (state: State) => {
        console.log('state', state);
        // const loadedState = result?.data?.state;
        const loadedState = state;

        const normalizedState = normalize(loadedState, stateSchema);

        const savedStateAdapter = statesAdapter.upsertOne(initialState, loadedState);

        logRender('getStates', { loadedState, normalizedState, savedStateAdapter });

        return savedStateAdapter;
      },

      invalidatesTags: (_, __, { _id }) => [{ type: 'State', id: _id }],
    }),

    deleteState: builder.mutation<StatesAdapter, DeleteState>({
      query: id => ({
        url: `/location-state/${id}`,
        method: 'DELETE',
      }),

      // transformResponse: (result: { data: { state: State } }) => {
      transformResponse: (_, __, id) => {
        // const removedState = result?.data?.state;
        const removedState = id;

        const savedStateAdapter = statesAdapter.removeOne(initialState, removedState);

        logRender('getStates', { removedState, savedStateAdapter });

        return savedStateAdapter;
      },

      invalidatesTags: (result, error, id) => [{ type: 'State', id }],
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
