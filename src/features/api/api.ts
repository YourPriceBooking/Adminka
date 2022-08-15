import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import './draft';

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
  tagTypes: ['Language', 'Country', 'State', 'City', 'District'],
  endpoints: () => ({}),
});

export const frozenArr = Object.freeze([]);
