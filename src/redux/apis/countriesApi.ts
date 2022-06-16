import { baseApi } from './baseApi';
import type {
  AddCountry,
  CountriesResponse,
  Country,
  DeleteCountry,
  EditCountry,
  InitCountriesResponse,
} from 'types/apis';

const COUNTRIES = { type: 'Countries' as const };
const ID_LIST = { id: 'LIST' as const };
const COUNTRIES_LIST = { ...COUNTRIES, ...ID_LIST };

export const countriesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCountries: builder.query<CountriesResponse, void>({
      query: () => '/countries',
      keepUnusedDataFor: 300,
      transformResponse: (result: InitCountriesResponse) => result?.data?.result,
      providesTags: result =>
        result
          ? [
              ...result.map(({ _id }: { _id: string }) => ({ ...COUNTRIES, id: _id })),
              COUNTRIES_LIST,
            ]
          : [COUNTRIES_LIST],
    }),

    addCountryEng: builder.mutation<Country, AddCountry>({
      query: ({ country, international }) => ({
        url: '/countries',
        method: 'POST',
        body: { country, international, langCode: 'EN', dbLangCode: 'EN' },
      }),
      invalidatesTags: [COUNTRIES_LIST],
    }),

    editCountry: builder.mutation<Country, EditCountry>({
      query: ({ _id, country, langCode, international }) => ({
        url: `/countries/${_id}`,
        method: 'PUT',
        body: { country, langCode, international },
      }),
      invalidatesTags: [COUNTRIES_LIST],
    }),

    deleteCountry: builder.mutation<CountriesResponse, DeleteCountry>({
      query: ({ _id }) => ({
        url: `/countries/${_id}`,
        method: 'DELETE',
        body: { _id },
      }),
      invalidatesTags: [COUNTRIES_LIST],
    }),
  }),
});

export const {
  useGetCountriesQuery,
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
