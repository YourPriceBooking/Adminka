import type {
  AddCountry,
  CountriesResponse,
  Country,
  DeleteCountry,
  EditCountry,
  // InitCountriesResponse,
} from 'types/apis';
import { baseApi } from './baseApi';

export const countriesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    // getCountries: builder.query<CountriesResponse, void>({
    //   query: () => '/countries',
    //   keepUnusedDataFor: 300,
    //   transformResponse: (result: InitCountriesResponse) => result?.data?.result,
    //   providesTags: result =>
    //     result
    //       ? [...result.map(({ _id }) => ({ type: 'Country' as const, _id })), "Country"]
    //       : ["Country"],
    // }),

    addCountryEng: builder.mutation<Country, AddCountry>({
      query: ({ country, international }) => ({
        url: '/countries',
        method: 'POST',
        body: { country, international, langCode: 'EN', dbLangCode: 'EN' },
      }),
      transformResponse: (result: { data: { country: Country } }) => result.data.country,
      // invalidatesTags: ['Country'],
    }),

    editCountry: builder.mutation<Country, EditCountry>({
      query: ({ _id, country, langCode, international }) => ({
        url: `/countries/${_id}`,
        method: 'PUT',
        body: { country, langCode, international },
      }),
      transformResponse: (result: { data: { result: Country } }) => result.data.result,
      // invalidatesTags: (result, error, _id) => [{ type: 'Country', _id }],
    }),

    deleteCountry: builder.mutation<CountriesResponse, DeleteCountry>({
      query: ({ _id }) => ({
        url: `/countries/${_id}`,
        method: 'DELETE',
        body: { _id },
      }),
      // invalidatesTags: ['Country'],
    }),
  }),
});

export const {
  // useGetCountriesQuery,
  useAddCountryEngMutation,
  useEditCountryMutation,
  useDeleteCountryMutation,
} = countriesApi;

/*
Це адрес по languages (add, update, del та get всіх )
 https://your-price-booking.herokuapp.com/api/languages.

На беку чекаємо метод (GET, POST, PUT. DEL).
Ця інфа для Кості щоб міг вже отримувати данні з БД.
Для
*/

/*
GET ()
POST ('lang': "English", code: "EN"),
PUT (id, 'lang': "English", code: "EN"),
DEL (id)
*/

// "country": "Ukraine",
// "langCode": "en",
