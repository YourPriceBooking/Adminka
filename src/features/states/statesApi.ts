import { createEntityAdapter, createSelector, type EntityId } from '@reduxjs/toolkit';
import type { RootState } from 'App/store';
import { logRender } from 'common/utils';

import type {
  AddState,
  DeleteState,
  EditState,
  State,
  MaybeStatesEntity,
  StatesResponse,
} from 'types/apis';
import { api, endpoints, frozenArr } from '../api/api';

const statesAdapter = createEntityAdapter<State>({
  selectId: state => state._id,
  sortComparer: (a, b) => b.createdAt?.localeCompare(a.createdAt),
});

const initialState = statesAdapter.getInitialState();

export const statesApi = api.injectEndpoints({
  endpoints: builder => ({
    getStates: builder.query<MaybeStatesEntity, void>({
      query: () => endpoints.locationState,
      // transformResponse: (result: { data: { state: State } }) => {
      transformResponse: (states?: StatesResponse) => {
        // const loadedStates = result?.data?.state;
        const savedStatesAdapter = statesAdapter.upsertMany(initialState, states ?? frozenArr);
        logRender('getStates', { savedStatesAdapter }, true);
        return savedStatesAdapter;
      },

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
      transformResponse: (data?: State) => {
        // const loadedState = result?.data?.state;
        if (!data) return undefined;

        const savedStateAdapter = statesAdapter.upsertOne(initialState, data);
        logRender('getStates', { data, savedStateAdapter }, true);

        return savedStateAdapter;
      },

      providesTags: (_, __, id) => [{ type: 'State', id }],
    }),

    addState: builder.mutation<MaybeStatesEntity, AddState>({
      query: body => ({
        url: endpoints.locationState,
        method: 'POST',
        // body: { state, stateInternational, langCode: 'EN' },
        body,
      }),

      // transformResponse: (result: { data: { state: State } }) => {
      transformResponse: (data: State) => {
        // const loadedState = result?.data?.state;
        if (!data) return undefined;

        const savedStateAdapter = statesAdapter.addOne(initialState, data);
        logRender('getStates', { data, savedStateAdapter }, true);
        return savedStateAdapter;
      },

      invalidatesTags: [{ type: 'State', id: 'LIST' }],
    }),

    editState: builder.mutation<MaybeStatesEntity, EditState>({
      query: ({ _id, stateName, statePhotoURL }) => ({
        url: `${endpoints.locationState}/${_id}`,
        method: 'PUT',
        body: { stateName, statePhotoURL },
      }),

      // transformResponse: (result: { data: { state: State } }) => {
      transformResponse: (data: State) => {
        // const loadedState = result?.data?.state;
        const savedStateAdapter = statesAdapter.upsertOne(initialState, data);
        logRender('getStates', { data, savedStateAdapter }, true);
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
      transformResponse: (_, __, id) => {
        // const removedState = result?.data?.state;
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
