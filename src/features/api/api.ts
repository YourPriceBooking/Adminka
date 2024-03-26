import type { EntityId } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from 'App/store';
import type {
  MaybeCitiesEntity,
  MaybeCountriesEntity,
  MaybeDistrictsEntity,
  MaybeLanguagesEntity,
  MaybeStatesEntity,
} from 'types/apis';

/**
 * 11. GET  `/api/language/${_id}`
 * 12. GET  `/api/country/${_id}`
 * 13. GET  `/api/location-state/${_id}`
 * 14. GET  `/api/location-city/${_id}`
 * 15. GET  `/api/location-district/${_id}`
 */
const config = {
  backend: {
    heroku: 'https://ypbooking.chost.com.ua/api' as const,
    localhost: 'http://localhost:3500' as const,
  },
  qty: { one: 'one' as const, many: 'many' as const },
};

export const baseUrl = config.backend.heroku; // config.backend.localhost;
export const blogBaseUrl = 'https://ypbooking.chost.com.ua/blog/api';
// export const blogBaseUrl = 'https://blog-yourpricebooking-backend.onrender.com/blog/api';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl,

    //  TODO: 'ADD authorization'
    // prepareHeaders: (headers, { getState }) => {
    //   const token = getState().auth.token;
    //   if (token) {
    //     headers.set('Authorization', `Bearer ${token}`);
    //   }

    //   return headers;
    // },
  }),
  keepUnusedDataFor: 300,
  tagTypes: ['Language', 'Country', 'State', 'City', 'District', 'AddLocation'],
  endpoints: () => ({}),
});

export const endpoints = {
  locationDistrict: '/location-district',
  locationCity: '/location-city',
  locationState: '/location-state',
  countries: '/countries',
  languages: '/languages',
  catalogForHotelier: '/catalogForHotelier',
  hotels: '/hotels',
  hoteliers: '/get-all-hotelier',
  bonus: '/add-bonus',
  financeStatistic: '/get-statistic',
  statistic: '/statistic',
  addDirHotelier: '/catalogForHotelier',
  amountObjectInCountry: '/get-amount-object-in-country',
  verificationObjects: '/get-earlier-object',
  getObjectTypes: '/get-objects',
  addPointToMap: '/hotels-verification/add-point-on-the-map',
  getIdVerificationObject: '/hotels-verification/get-document',
  deleteVerification: '/hotels-verification/delete-verification',
  deleteAddedObject: '/hotels-verification/delete-object',
  addYouTubeLink: '/hotels-verification/add-you-tube-link',
  finishVerification: '/hotels-verification/finish-verification',
} as const;

export const frozenArr = Object.freeze([]);

export const selectEntityId = (_: RootState, id: EntityId) => id;

export type Result =
  | MaybeLanguagesEntity
  | MaybeCountriesEntity
  | MaybeStatesEntity
  | MaybeCitiesEntity
  | MaybeDistrictsEntity;

export type Type = 'Language' | 'Country' | 'State' | 'City' | 'District';
export type KeysSelect = 'languages' | 'countries' | 'states' | 'cities' | 'districts';
export enum Keys {
  languages = 'languages',
  countries = 'countries',
  states = 'states',
  cities = 'cities',
  districts = 'districts',
}

export const tagList = (result: Result, type: Type) => [
  { type, id: 'LIST' },
  ...(result ? result.ids.map((id: any) => ({ type, id })) : []),
];

export const tag = (id: EntityId | 'LIST', type: Type) => [{ type, id }];
