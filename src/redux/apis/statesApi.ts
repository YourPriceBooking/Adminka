import type { AddState, EditState, State, StatesResponse } from 'types/apis';
import { baseApi } from './baseApi';

export const statesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    addState: builder.mutation<State, AddState>({
      query: ({ state, stateInternational }) => ({
        url: '/location-state',
        method: 'POST',
        body: { state, stateInternational, langCode: 'EN' },
      }),
      // invalidatesTags: ['State'],
    }),

    updateState: builder.mutation<StatesResponse, EditState>({
      query: ({ _id, stateCode, stateName, statePhotoURL, stateInternational }) => ({
        url: `/location-state/${_id}`,
        method: 'PUT',
        body: { stateCode, stateName, statePhotoURL, stateInternational },
      }),
      // invalidatesTags: (result, error, _id) => [{ type: 'State', _id }],
    }),
  }),
});
