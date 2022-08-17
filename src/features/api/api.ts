import type { EntityId } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from 'App/store';
import './draft';

/**
 * 11. GET  `/api/language/${_id}`
 * 12. GET  `/api/country/${_id}`
 * 13. GET  `/api/location-state/${_id}`
 * 14. GET  `/api/location-city/${_id}`
 * 15. GET  `/api/location-district/${_id}`
 */
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'https://your-price-booking.herokuapp.com/api',
    baseUrl: 'http://localhost:3500',
    // http://localhost:3500/countries/?_id=62f559a8edd52743fb6684e6
    // prepareHeaders: (headers, { getState }) => {
    //   const token = getState().auth.token;
    //   if (token) {
    //     headers.set('Authorization', `Bearer ${token}`);
    //   }

    //   return headers;
    // },
  }),
  keepUnusedDataFor: 300,
  tagTypes: ['Language', 'Country', 'State', 'City', 'District'],
  endpoints: () => ({}),
});

export const frozenArr = Object.freeze([]);

export const selectState = (state: RootState) => state;
export const selectEntityId = (_: RootState, id: EntityId) => id;
