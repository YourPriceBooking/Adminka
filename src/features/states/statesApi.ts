import { createEntityAdapter, createSelector, type EntityId } from '@reduxjs/toolkit';
import type { RootState } from 'App/store';
import { logRender } from 'common/utils';

import type {
  AddState,
  DeleteState,
  EditState,
  State,
  MaybeStatesEntity,
  ManyStates,
  OneState,
} from 'types/apis';

import { api, endpoints, frozenArr } from '../api/api';

const statesAdapter = createEntityAdapter<State>({
  selectId: state => state._id,
  sortComparer: (a, b) => b.createdAt?.localeCompare(a.createdAt),
});

const initialState = statesAdapter.getInitialState();

export const saveStates = (result?: ManyStates) => {
  const states = result?.data?.states ?? frozenArr;
  if (!states) return undefined;
  return statesAdapter.setAll(initialState, states);
};

export const saveState = (result?: OneState) => {
  const state = result?.state;
  if (!state) return undefined;
  return statesAdapter.upsertOne(initialState, state);
};

export const statesApi = api.injectEndpoints({
  endpoints: builder => ({
    getStates: builder.query<MaybeStatesEntity, void>({
      query: () => endpoints.locationState,
      transformResponse: (result?: ManyStates) => saveStates(result),

      providesTags: result => [
        { type: 'State', id: 'LIST' },
        ...(result ? result.ids.map(id => ({ type: 'State' as const, id })) : []),
      ],
    }),

    getState: builder.query<MaybeStatesEntity, EntityId>({
      query: _id => ({
        url: `${endpoints.locationState}/${_id}`,
        method: 'GET',
      }),
      // transformResponse: (result: { data: { state: State } }) => {
      transformResponse: (result?: OneState) => {
        const state = result?.state;
        if (!state) return undefined;

        const savedStateAdapter = statesAdapter.upsertOne(initialState, state);
        logRender('getStates', { state, savedStateAdapter }, true);

        return savedStateAdapter;
      },

      providesTags: (_, __, id) => [{ type: 'State', id }],
    }),

    addState: builder.mutation<MaybeStatesEntity, AddState>({
      query: ({ stateName, stateInternational, stateCode, statePhotoURL }) => ({
        url: endpoints.locationState,
        method: 'POST',
        body: { stateName, stateInternational, stateCode, statePhotoURL, langCode: 'EN' },
      }),

      // transformResponse: (result: { data: { state: State } }) => {
      transformResponse: (result?: OneState) => {
        const state = result?.state;
        if (!state) return undefined;

        const savedStateAdapter = statesAdapter.addOne(initialState, state);
        logRender('getStates', { state, savedStateAdapter }, true);
        return savedStateAdapter;
      },

      invalidatesTags: [{ type: 'State', id: 'LIST' }],
    }),

    editState: builder.mutation<MaybeStatesEntity, EditState>({
      query: ({ _id, ...body }) => ({
        url: `${endpoints.locationState}/${_id}`,
        method: 'PATCH',
        body,
      }),

      transformResponse: (result?: OneState) => {
        const state = result?.state;
        if (!state) return undefined;
        const savedStateAdapter = statesAdapter.upsertOne(initialState, state);
        logRender('getStates', { state, savedStateAdapter }, true);
        return savedStateAdapter;
      },

      invalidatesTags: (_, __, { _id }) => [{ type: 'State', id: _id }],
    }),

    deleteState: builder.mutation<MaybeStatesEntity, DeleteState>({
      query: id => ({
        url: `${endpoints.locationState}/${id}`,
        method: 'DELETE',
        body: { _id: id },
      }),

      // transformResponse: (result: { data: { state: State } }) => {
      transformResponse: (data, __, id) => {
        // const removedState = result?.data?.state;
        if (!data) return undefined;

        const savedStateAdapter = statesAdapter.removeOne(initialState, id);
        logRender('getStates', { id, savedStateAdapter }, true);
        return savedStateAdapter;
      },

      invalidatesTags: (result, error, id) => [{ type: 'State', id }],
    }),
  }),
});

const selectStatesResult = statesApi.endpoints.getStates.select();

const selectStatesData = createSelector(selectStatesResult, result => result.data);

export const {
  //
  selectById: selectStateById,
  selectIds: selectStatesIds,
} = statesAdapter.getSelectors<RootState>(state => selectStatesData(state) ?? initialState);

export const {
  useGetStatesQuery,
  useAddStateMutation,
  useEditStateMutation,
  useDeleteStateMutation,
} = statesApi;

statesAdapter.removeAll(statesAdapter.getInitialState());
