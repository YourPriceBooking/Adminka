import { type EntityId } from '@reduxjs/toolkit';
import type { AddState, EditState, ManyStates, MaybeStatesEntity, OneState } from 'types/apis';
import { api, endpoints, tag, tagList } from '../api/api';
import { saveOneState, saveManyStates } from './statesAdapter';

export const statesApi = api.injectEndpoints({
  endpoints: builder => ({
    getStates: builder.query<
      MaybeStatesEntity,
      { international: string; dbLangCode: string } | void
    >({
      query: args => {
        if (!args) return endpoints.locationState;
        const { international, dbLangCode } = args;
        const params = new URLSearchParams({ international, dbLangCode });
        return `${endpoints.locationStateRegister}?${params.toString()}`;
      },
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
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    addDirHotelier: builder.mutation<MaybeStatesEntity, any>({
      query: body => ({
        url: `${endpoints.addDirHotelier}`,
        method: 'POST',
        body,
      }),
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
  }),
});

export const {
  useGetStatesQuery,
  useLazyGetStatesQuery,
  useAddStateMutation,
  useEditStateMutation,
  useAddDirHotelierMutation,
} = statesApi;

export const selectStatesResult = statesApi.endpoints.getStates.select();
