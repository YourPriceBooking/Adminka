import type { AddState, EditState, State, StatesResponse } from 'types/apis';
import { baseApi } from './baseApi';
import { LANGUAGES_LIST } from './languagesApi';

const STATES = { type: 'States' as const };
const ID_LIST = { id: 'LIST' as const };
const STATES_LIST = { ...STATES, ...ID_LIST };

export const statesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    addState: builder.mutation<State, AddState>({
      query: ({ state, stateInternational }) => ({
        url: '/location-state',
        method: 'POST',
        body: { state, stateInternational, langCode: 'EN' },
      }),
    }),

    updateState: builder.mutation<StatesResponse, EditState>({
      query: ({ _id, stateCode, stateName, statePhotoURL, stateInternational }) => ({
        url: `/location-state/${_id}`,
        method: 'PUT',
        body: { stateCode, stateName, statePhotoURL, stateInternational },
      }),
      invalidatesTags: [STATES_LIST, LANGUAGES_LIST],
    }),
  }),
});
