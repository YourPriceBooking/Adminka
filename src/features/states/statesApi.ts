import { type EntityId } from '@reduxjs/toolkit';
import type {
  AddState,
  DeleteState,
  EditState,
  ManyStates,
  MaybeStatesEntity,
  OneState,
} from 'types/apis';
import { api, endpoints, tag, tagList } from '../api/api';
import { removeState, saveOneState, saveManyStates } from './statesAdapter';

export const statesApi = api.injectEndpoints({
  endpoints: builder => ({
    getStates: builder.query<MaybeStatesEntity, void>({
      query: () => endpoints.locationState,
      transformResponse: (result?: ManyStates) => saveManyStates(result),
      providesTags: result => tagList(result, 'State'),
    }),

    getState: builder.query<MaybeStatesEntity, EntityId>({
      query: _id => ({
        url: `${endpoints.locationState}/${_id}`,
        method: 'GET',
      }),
      transformResponse: (result?: OneState) => saveOneState(result),
      providesTags: (_, __, id) => tag(id, 'State'),
    }),

    addState: builder.mutation<MaybeStatesEntity, AddState>({
      query: body => ({
        url: endpoints.locationState,
        method: 'POST',
        body,
      }),
      transformResponse: (result?: OneState) => saveOneState(result),
      // invalidatesTags: () => tag('LIST', 'State'),
    }),

    editState: builder.mutation<MaybeStatesEntity, EditState>({
      query: ({ _id, ...body }) => ({
        url: `${endpoints.locationState}/${_id}`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (result?: OneState) => saveOneState(result),
      invalidatesTags: (_, __, { _id }) => tag(_id, 'State'),
    }),

    deleteState: builder.mutation<MaybeStatesEntity, DeleteState>({
      query: id => ({
        url: `${endpoints.locationState}/${id}`,
        method: 'DELETE',
        body: { _id: id },
      }),
      transformResponse: (result?: OneState) => removeState(result),
      invalidatesTags: (_, __, id) => tag(id, 'State'),
    }),
  }),
});

export const {
  useLazyGetStatesQuery,
  useAddStateMutation,
  useEditStateMutation,
  useDeleteStateMutation,
} = statesApi;

export const selectStatesResult = statesApi.endpoints.getStates.select();
