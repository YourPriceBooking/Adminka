import type {
  AddLanguage,
  DeleteLanguage,
  GetLanguage,
  ManyLanguages,
  MaybeLanguagesEntity,
} from 'types/apis';
import { api, endpoints, OneLanguageInArray, tag, tagList } from 'features/api';
import { saveOneLanguage, removeLanguage, saveManyLanguages } from './languagesAdapter';

export const languagesApi = api.injectEndpoints({
  endpoints: build => ({
    getLanguages: build.query<MaybeLanguagesEntity, void>({
      query: () => endpoints.languages,
      transformResponse: (result?: ManyLanguages) => saveManyLanguages(result),
      providesTags: result => tagList(result, 'Language'),
    }),

    getLanguage: build.query<MaybeLanguagesEntity, GetLanguage>({
      query: id => `${endpoints.languages}/${id}`,
      transformResponse: (result?: OneLanguageInArray) => saveOneLanguage(result),
      providesTags: (_, __, id) => tag(id, 'Language'),

      // pessimistic updates https://redux-toolkit.js.org/rtk-query/usage/manual-cache-updates#pessimistic-updates
      // onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
      //   let patchResult;
      //   try {
      //     const { data } = await queryFulfilled;
      //     console.log({ data });
      //     const lang = await isLanguage(data);
      //     console.log({ lang });
      //     if (!data || !lang) return;

      //     patchResult = dispatch(
      //       languagesApi.util.updateQueryData('getLanguages', undefined, draft => {
      //         if (draft) {
      //           console.log('onQueryStarted: ~ draft', draft);
      //           const newLanguage = data.entities[id];
      //           console.log('onQueryStarted: ~ newLanguage', newLanguage);
      //           if (newLanguage) {
      //             const patched = languagesAdapter.addOne(draft, newLanguage);
      //             console.log('onQueryStarted: ~ patched', patched);
      //           }
      //         }
      //       })
      //     );
      //     console.log('onQueryStarted: ~ patchResult', patchResult);
      //   } catch {
      //     if (!patchResult?.inversePatches) return;
      //     dispatch(
      //       languagesApi.util.patchQueryData('getLanguages', undefined, patchResult.inversePatches)
      //     );
      //   }
      // },
    }),

    addLanguage: build.mutation<MaybeLanguagesEntity, AddLanguage>({
      query: body => ({
        url: endpoints.languages,
        method: 'POST',
        body,
      }),
      transformResponse: (result?: OneLanguageInArray) => saveOneLanguage(result),
      // invalidatesTags: () => tag('LIST', 'Language'),
    }),

    deleteLanguage: build.mutation<MaybeLanguagesEntity, DeleteLanguage>({
      query: id => ({
        url: `${endpoints.languages}/${id}`,
        method: 'DELETE',
        body: { _id: id },
      }),
      transformResponse: (result?: OneLanguageInArray) => removeLanguage(result),
      invalidatesTags: (_, __, id) => tag(id, 'Language'),
    }),
  }),
});

export const {
  useGetLanguagesQuery,
  useLazyGetLanguagesQuery,
  useLazyGetLanguageQuery,
  useAddLanguageMutation,
  useDeleteLanguageMutation,
} = languagesApi;

/** returns the query result object */
export const selectLanguagesResult = languagesApi.endpoints.getLanguages.select();

/*
POST one ->
{
  "status": "success",
  "message": "language create",
  "code": 201,
  "data": {
    "language": [
      {
        "_id": "63024c9159419b487ba8da0c",
        "lang": "NewLangK2",
        "code": "NK",
        "countries": [
          {
            "_id": "63024c9159419b487ba8da19",
            "international": "USA",
            "country": "USA",
            "langCode": "EN",
            "dbLangCode": "NK",
            "states": [
              {
                "_id": "63024c9159419b487ba8da35",
                "stateName": "Texas State",
                "stateInternational": "Texas State",
                "stateCode": "Texas",
                "international": "USA",
                "langCode": "EN",
                "dbLangCode": "NK",
                "statePhotoURL": "https://Texas.states.ua/photos/lviv-state.webp",
                "countryId": "63024c9159419b487ba8da19",
                "cities": [
                  {
                    "_id": "63024c9159419b487ba8da13",
                    "stateId": "63024c9159419b487ba8da35",
                    "cityName": "Austin",
                    "cityInternational": "Austin",
                    "cityCode": "Austin",
                    "cityPhotoURL": "https://Austin.city.ua/photos/kyiv-city.webp",
                    "langCode": "EN",
                    "dbLangCode": "NK",
                    "stateInternational": "Texas State",
                    "state": "63024c9159419b487ba8da35",
                    "districts": [],
                    "updatedAt": "2022-08-21T15:17:37.934Z",
                    "createdAt": "2022-08-06T19:56:50.125Z"
                  },
                  {
                    "_id": "63024c9159419b487ba8da1b",
                    "stateId": "63024c9159419b487ba8da35",
                    "cityName": "Houston",
                    "cityInternational": "Houston",
                    "cityCode": "Houston",
                    "cityPhotoURL": "https://Houston.city.ua/photos/kyiv-city.webp",
                    "langCode": "EN",
                    "dbLangCode": "NK",
                    "stateInternational": "Texas State",
                    "state": "63024c9159419b487ba8da35",
                    "districts": [],
                    "updatedAt": "2022-08-21T15:17:37.934Z",
                    "createdAt": "2022-08-06T19:57:34.653Z"
                  }
                ],
                "updatedAt": "2022-08-21T15:17:38.736Z",
                "createdAt": "2022-08-06T19:38:02.261Z"
              },
              {
                "_id": "63024c9159419b487ba8da3b",
                "stateName": "California State",
                "stateInternational": "California State",
                "stateCode": "California",
                "international": "USA",
                "langCode": "EN",
                "dbLangCode": "NK",
                "statePhotoURL": "https://California.states.ua/photos/lviv-state.webp",
                "countryId": "63024c9159419b487ba8da19",
                "cities": [
                  {
                    "_id": "63024c9159419b487ba8da21",
                    "stateId": "63024c9159419b487ba8da3b",
                    "cityName": "Los Angeles",
                    "cityInternational": "Los Angeles",
                    "cityCode": "Los Angeles",
                    "cityPhotoURL": "https://Los Angeles.city.ua/photos/kyiv-city.webp",
                    "langCode": "EN",
                    "dbLangCode": "NK",
                    "stateInternational": "California State",
                    "state": "63024c9159419b487ba8da3b",
                    "districts": [],
                    "updatedAt": "2022-08-21T15:17:38.001Z",
                    "createdAt": "2022-08-06T19:59:16.414Z"
                  },
                  {
                    "_id": "63024c9159419b487ba8da29",
                    "stateId": "63024c9159419b487ba8da3b",
                    "cityName": "Napa",
                    "cityInternational": "Napa",
                    "cityCode": "Napa",
                    "cityPhotoURL": "https://Napa.city.ua/photos/kyiv-city.webp",
                    "langCode": "EN",
                    "dbLangCode": "NK",
                    "stateInternational": "California State",
                    "state": "63024c9159419b487ba8da3b",
                    "districts": [],
                    "updatedAt": "2022-08-21T15:17:38.001Z",
                    "createdAt": "2022-08-06T19:59:37.581Z"
                  }
                ],
                "updatedAt": "2022-08-21T15:17:38.856Z",
                "createdAt": "2022-08-06T19:38:32.102Z"
              },
              {
                "_id": "63024c9159419b487ba8da41",
                "stateName": "Neveda State",
                "stateInternational": "Neveda State",
                "stateCode": "Neveda",
                "international": "USA",
                "langCode": "EN",
                "dbLangCode": "NK",
                "statePhotoURL": "https://Neveda.states.ua/photos/lviv-state.webp",
                "countryId": "63024c9159419b487ba8da19",
                "cities": [
                  {
                    "_id": "63024c9159419b487ba8da31",
                    "stateId": "63024c9159419b487ba8da41",
                    "cityName": "Beatty",
                    "cityInternational": "Beatty",
                    "cityCode": "Beatty",
                    "cityPhotoURL": "https://Beatty.city.ua/photos/kyiv-city.webp",
                    "langCode": "EN",
                    "dbLangCode": "NK",
                    "stateInternational": "Neveda State",
                    "state": "63024c9159419b487ba8da41",
                    "districts": [],
                    "updatedAt": "2022-08-21T15:17:38.077Z",
                    "createdAt": "2022-08-06T20:01:10.818Z"
                  },
                  {
                    "_id": "63024c9159419b487ba8da37",
                    "stateId": "63024c9159419b487ba8da41",
                    "cityName": "Tonopah",
                    "cityInternational": "Tonopah",
                    "cityCode": "Tonopah",
                    "cityPhotoURL": "https://Tonopah.city.ua/photos/kyiv-city.webp",
                    "langCode": "EN",
                    "dbLangCode": "NK",
                    "stateInternational": "Neveda State",
                    "state": "63024c9159419b487ba8da41",
                    "districts": [
                      {
                        "_id": "63024c9159419b487ba8da1f",
                        "districtName": "Central",
                        "districtInternational": "Central",
                        "districtCode": "CN",
                        "districtPhotoURL": "https://Central.district.ua/photos/kyiv-podil.webp",
                        "cityInternational": "Tonopah",
                        "langCode": "EN",
                        "dbLangCode": "NK",
                        "createdAt": "2022-08-21T15:17:37.258Z",
                        "updatedAt": "2022-08-21T15:17:38.925Z",
                        "cityId": "63024c9159419b487ba8da37",
                        "stateId": "63024c9159419b487ba8da41"
                      }
                    ],
                    "updatedAt": "2022-08-21T15:17:39.171Z",
                    "createdAt": "2022-08-06T20:01:29.873Z"
                  }
                ],
                "updatedAt": "2022-08-21T15:17:38.983Z",
                "createdAt": "2022-08-06T19:41:08.799Z"
              },
              {
                "_id": "63024c9159419b487ba8da47",
                "stateName": "Florida State",
                "stateInternational": "Florida State",
                "stateCode": "Florida",
                "international": "USA",
                "langCode": "EN",
                "dbLangCode": "NK",
                "statePhotoURL": "https://Florida.states.ua/photos/lviv-state.webp",
                "countryId": "63024c9159419b487ba8da19",
                "cities": [
                  {
                    "_id": "63024c9159419b487ba8da3d",
                    "stateId": "63024c9159419b487ba8da47",
                    "cityName": "Miami",
                    "cityInternational": "Miami",
                    "cityCode": "Miami",
                    "cityPhotoURL": "https://Miami.city.ua/photos/kyiv-city.webp",
                    "langCode": "EN",
                    "dbLangCode": "NK",
                    "stateInternational": "Florida State",
                    "state": "63024c9159419b487ba8da47",
                    "districts": [
                      {
                        "_id": "63024c9159419b487ba8da17",
                        "districtName": "Central",
                        "districtInternational": "Central",
                        "districtCode": "CN",
                        "districtPhotoURL": "https://Miami.district.ua/photos/kyiv-podil.webp",
                        "cityInternational": "Miami",
                        "langCode": "EN",
                        "dbLangCode": "NK",
                        "createdAt": "2022-08-21T15:17:37.223Z",
                        "updatedAt": "2022-08-21T15:17:38.968Z",
                        "cityId": "63024c9159419b487ba8da3d",
                        "stateId": "63024c9159419b487ba8da47"
                      }
                    ],
                    "updatedAt": "2022-08-21T15:17:39.253Z",
                    "createdAt": "2022-08-06T20:03:01.167Z"
                  },
                  {
                    "_id": "63024c9159419b487ba8da43",
                    "stateId": "63024c9159419b487ba8da47",
                    "cityName": "Orlando",
                    "cityInternational": "Orlando",
                    "cityCode": "Orlando",
                    "cityPhotoURL": "https://Orlando.city.ua/photos/kyiv-city.webp",
                    "langCode": "EN",
                    "dbLangCode": "NK",
                    "stateInternational": "Florida State",
                    "state": "63024c9159419b487ba8da47",
                    "districts": [
                      {
                        "_id": "63024c9159419b487ba8da27",
                        "districtName": "Central",
                        "districtInternational": "Central",
                        "districtCode": "CN",
                        "districtPhotoURL": "https://Central.district.ua/photos/kyiv-podil.webp",
                        "cityInternational": "Orlando",
                        "langCode": "EN",
                        "dbLangCode": "NK",
                        "createdAt": "2022-08-21T15:17:37.289Z",
                        "updatedAt": "2022-08-21T15:17:39.017Z",
                        "cityId": "63024c9159419b487ba8da43",
                        "stateId": "63024c9159419b487ba8da47"
                      }
                    ],
                    "updatedAt": "2022-08-21T15:17:39.328Z",
                    "createdAt": "2022-08-06T20:03:23.019Z"
                  }
                ],
                "updatedAt": "2022-08-21T15:17:39.125Z",
                "createdAt": "2022-08-06T19:41:46.890Z"
              }
            ],
            "createdAt": "2022-08-21T15:17:37.225Z",
            "updatedAt": "2022-08-21T15:17:38.287Z"
          },
          {
            "_id": "63024c9159419b487ba8da23",
            "international": "Ukraine",
            "country": "Ukraine",
            "langCode": "EN",
            "dbLangCode": "NK",
            "states": [
              {
                "_id": "63024c9159419b487ba8da15",
                "stateName": "Kiev State",
                "stateInternational": "Kiev State",
                "stateCode": "Kiev",
                "international": "Ukraine",
                "langCode": "EN",
                "dbLangCode": "NK",
                "statePhotoURL": "https://Kiev.states.ua/photos/lviv-state.webp",
                "countryId": "63024c9159419b487ba8da23",
                "cities": [
                  {
                    "_id": "63024c9159419b487ba8da49",
                    "stateId": "63024c9159419b487ba8da15",
                    "cityName": "Irpen",
                    "cityInternational": "Irpen",
                    "cityCode": "Irpen",
                    "cityPhotoURL": "https://Irpen.city.ua/photos/kyiv-city.webp",
                    "langCode": "EN",
                    "dbLangCode": "NK",
                    "stateInternational": "Kiev State",
                    "state": "63024c9159419b487ba8da15",
                    "districts": [],
                    "updatedAt": "2022-08-21T15:17:37.723Z",
                    "createdAt": "2022-08-06T20:04:02.273Z"
                  },
                  {
                    "_id": "63024c9159419b487ba8da4f",
                    "stateId": "63024c9159419b487ba8da15",
                    "cityName": "Bucha",
                    "cityInternational": "Bucha",
                    "cityCode": "Bucha",
                    "cityPhotoURL": "https://Bucha.city.ua/photos/kyiv-city.webp",
                    "langCode": "EN",
                    "dbLangCode": "NK",
                    "stateInternational": "Kiev State",
                    "state": "63024c9159419b487ba8da15",
                    "districts": [],
                    "updatedAt": "2022-08-21T15:17:37.723Z",
                    "createdAt": "2022-08-06T20:04:15.285Z"
                  }
                ],
                "updatedAt": "2022-08-21T15:17:38.541Z",
                "createdAt": "2022-08-06T19:36:24.511Z"
              },
              {
                "_id": "63024c9159419b487ba8da1d",
                "stateName": "Dnipropetrovsk State",
                "stateInternational": "Dnipropetrovsk State",
                "stateCode": "Dnipropetrovsk",
                "international": "Ukraine",
                "langCode": "EN",
                "dbLangCode": "NK",
                "statePhotoURL": "https://Dnipropetrovsk.states.ua/photos/lviv-state.webp",
                "countryId": "63024c9159419b487ba8da23",
                "cities": [
                  {
                    "_id": "63024c9159419b487ba8da52",
                    "stateId": "63024c9159419b487ba8da1d",
                    "cityName": "Dnipro",
                    "cityInternational": "Dnipro",
                    "cityCode": "Dnipro",
                    "cityPhotoURL": "https://Dnipro.city.ua/photos/kyiv-city.webp",
                    "langCode": "EN",
                    "dbLangCode": "NK",
                    "stateInternational": "Dnipropetrovsk State",
                    "state": "63024c9159419b487ba8da1d",
                    "districts": [],
                    "updatedAt": "2022-08-21T15:17:37.793Z",
                    "createdAt": "2022-08-06T20:04:47.527Z"
                  },
                  {
                    "_id": "63024c9159419b487ba8da57",
                    "stateId": "63024c9159419b487ba8da1d",
                    "cityName": "Kamenskoe",
                    "cityInternational": "Kamenskoe",
                    "cityCode": "Kamenskoe",
                    "cityPhotoURL": "https://Kamenskoe.city.ua/photos/kyiv-city.webp",
                    "langCode": "EN",
                    "dbLangCode": "NK",
                    "stateInternational": "Dnipropetrovsk State",
                    "state": "63024c9159419b487ba8da1d",
                    "districts": [],
                    "updatedAt": "2022-08-21T15:17:37.793Z",
                    "createdAt": "2022-08-06T20:06:40.207Z"
                  }
                ],
                "updatedAt": "2022-08-21T15:17:38.541Z",
                "createdAt": "2022-08-06T19:36:53.491Z"
              },
              {
                "_id": "63024c9159419b487ba8da25",
                "stateName": "Odessa State",
                "stateInternational": "Odessa State",
                "stateCode": "Odessa",
                "international": "Ukraine",
                "langCode": "EN",
                "dbLangCode": "NK",
                "statePhotoURL": "https://Odessa.states.ua/photos/lviv-state.webp",
                "countryId": "63024c9159419b487ba8da23",
                "cities": [
                  {
                    "_id": "63024c9159419b487ba8da5c",
                    "stateId": "63024c9159419b487ba8da25",
                    "cityName": "Odessa",
                    "cityInternational": "Odessa",
                    "cityCode": "Odessa",
                    "cityPhotoURL": "https://Odessa.city.ua/photos/kyiv-city.webp",
                    "langCode": "EN",
                    "dbLangCode": "NK",
                    "stateInternational": "Odessa State",
                    "state": "63024c9159419b487ba8da25",
                    "districts": [],
                    "updatedAt": "2022-08-21T15:17:37.827Z",
                    "createdAt": "2022-08-06T20:08:44.082Z"
                  }
                ],
                "updatedAt": "2022-08-21T15:17:38.541Z",
                "createdAt": "2022-08-06T19:37:12.083Z"
              },
              {
                "_id": "63024c9159419b487ba8da2d",
                "stateName": "Lviv State",
                "stateInternational": "Lviv State",
                "stateCode": "Lviv",
                "international": "Ukraine",
                "langCode": "EN",
                "dbLangCode": "NK",
                "statePhotoURL": "https://Lviv.states.ua/photos/lviv-state.webp",
                "countryId": "63024c9159419b487ba8da23",
                "cities": [
                  {
                    "_id": "63024c9159419b487ba8da61",
                    "stateId": "63024c9159419b487ba8da2d",
                    "cityName": "Lviv",
                    "cityInternational": "Lviv",
                    "cityCode": "Lviv",
                    "cityPhotoURL": "https://Lviv.city.ua/photos/kyiv-city.webp",
                    "langCode": "EN",
                    "dbLangCode": "NK",
                    "stateInternational": "Lviv State",
                    "state": "63024c9159419b487ba8da2d",
                    "districts": [],
                    "updatedAt": "2022-08-21T15:17:37.863Z",
                    "createdAt": "2022-08-06T20:10:00.228Z"
                  }
                ],
                "updatedAt": "2022-08-21T15:17:38.591Z",
                "createdAt": "2022-08-06T19:37:24.249Z"
              }
            ],
            "createdAt": "2022-08-21T15:17:37.267Z",
            "updatedAt": "2022-08-21T15:17:38.579Z"
          },
          {
            "_id": "63024c9159419b487ba8da2b",
            "international": "Poland",
            "country": "Poland",
            "langCode": "EN",
            "dbLangCode": "NK",
            "states": [
              {
                "_id": "63024c9159419b487ba8da4d",
                "stateName": "Masovian State",
                "stateInternational": "Masovian State",
                "stateCode": "Masovian",
                "international": "Poland",
                "langCode": "EN",
                "dbLangCode": "NK",
                "statePhotoURL": "https://Masovian.states.ua/photos/lviv-state.webp",
                "countryId": "63024c9159419b487ba8da2b",
                "cities": [],
                "updatedAt": "2022-08-21T15:17:38.918Z",
                "createdAt": "2022-08-06T19:45:19.257Z"
              },
              {
                "_id": "63024c9159419b487ba8da54",
                "stateName": "Lublin State",
                "stateInternational": "Lublin State",
                "stateCode": "Lublin",
                "international": "Poland",
                "langCode": "EN",
                "dbLangCode": "NK",
                "statePhotoURL": "https://Lublin.states.ua/photos/lviv-state.webp",
                "countryId": "63024c9159419b487ba8da2b",
                "cities": [],
                "updatedAt": "2022-08-21T15:17:38.918Z",
                "createdAt": "2022-08-06T19:45:49.193Z"
              },
              {
                "_id": "63024c9159419b487ba8da59",
                "stateName": "Lodz State",
                "stateInternational": "Lodz State",
                "stateCode": "Lodz",
                "international": "Poland",
                "langCode": "EN",
                "dbLangCode": "NK",
                "statePhotoURL": "https://Lodz.states.ua/photos/lviv-state.webp",
                "countryId": "63024c9159419b487ba8da2b",
                "cities": [],
                "updatedAt": "2022-08-21T15:17:38.918Z",
                "createdAt": "2022-08-06T19:46:03.924Z"
              },
              {
                "_id": "63024c9159419b487ba8da5e",
                "stateName": "Opole State",
                "stateInternational": "Opole State",
                "stateCode": "Opole",
                "international": "Poland",
                "langCode": "EN",
                "dbLangCode": "NK",
                "statePhotoURL": "https://Opole.states.ua/photos/lviv-state.webp",
                "countryId": "63024c9159419b487ba8da2b",
                "cities": [],
                "updatedAt": "2022-08-21T15:17:38.918Z",
                "createdAt": "2022-08-06T19:46:44.341Z"
              },
              {
                "_id": "63024c9159419b487ba8da63",
                "stateName": "Lubusz State",
                "stateInternational": "Lubusz State",
                "stateCode": "Lubusz",
                "international": "Poland",
                "langCode": "EN",
                "dbLangCode": "NK",
                "statePhotoURL": "https://Lubusz.states.ua/photos/lviv-state.webp",
                "countryId": "63024c9159419b487ba8da2b",
                "cities": [],
                "updatedAt": "2022-08-21T15:17:38.918Z",
                "createdAt": "2022-08-06T19:47:31.252Z"
              }
            ],
            "createdAt": "2022-08-21T15:17:37.300Z",
            "updatedAt": "2022-08-21T15:17:38.963Z"
          },
          {
            "_id": "63024c9159419b487ba8da33",
            "international": "Germany",
            "country": "Germany",
            "langCode": "EN",
            "dbLangCode": "NK",
            "states": [
              {
                "_id": "63024c9159419b487ba8da67",
                "stateName": "Bavaria State",
                "stateInternational": "Bavaria State",
                "stateCode": "Bavaria",
                "international": "Germany",
                "langCode": "EN",
                "dbLangCode": "NK",
                "statePhotoURL": "https://Bavaria.states.ua/photos/lviv-state.webp",
                "countryId": "63024c9159419b487ba8da33",
                "cities": [],
                "updatedAt": "2022-08-21T15:17:39.149Z",
                "createdAt": "2022-08-06T19:48:59.856Z"
              },
              {
                "_id": "63024c9159419b487ba8da6b",
                "stateName": "Saxony State",
                "stateInternational": "Saxony State",
                "stateCode": "Saxony",
                "international": "Germany",
                "langCode": "EN",
                "dbLangCode": "NK",
                "statePhotoURL": "https://Saxony.states.ua/photos/lviv-state.webp",
                "countryId": "63024c9159419b487ba8da33",
                "cities": [],
                "updatedAt": "2022-08-21T15:17:39.149Z",
                "createdAt": "2022-08-06T19:49:15.381Z"
              },
              {
                "_id": "63024c9159419b487ba8da6f",
                "stateName": "Hessen State",
                "stateInternational": "Hessen State",
                "stateCode": "Hessen",
                "international": "Germany",
                "langCode": "EN",
                "dbLangCode": "NK",
                "statePhotoURL": "https://Hessen.states.ua/photos/lviv-state.webp",
                "countryId": "63024c9159419b487ba8da33",
                "cities": [],
                "updatedAt": "2022-08-21T15:17:39.149Z",
                "createdAt": "2022-08-06T19:49:35.262Z"
              }
            ],
            "createdAt": "2022-08-21T15:17:37.331Z",
            "updatedAt": "2022-08-21T15:17:39.187Z"
          },
          {
            "_id": "63024c9159419b487ba8da39",
            "international": "Canada",
            "country": "Canada",
            "langCode": "EN",
            "dbLangCode": "NK",
            "states": [
              {
                "_id": "63024c9159419b487ba8da80",
                "stateName": "Alberta State",
                "stateInternational": "Alberta State",
                "stateCode": "Alberta",
                "international": "Canada",
                "langCode": "EN",
                "dbLangCode": "NK",
                "statePhotoURL": "https://Alberta.states.ua/photos/lviv-state.webp",
                "countryId": "63024c9159419b487ba8da39",
                "cities": [],
                "updatedAt": "2022-08-21T15:17:39.371Z",
                "createdAt": "2022-08-06T19:53:06.418Z"
              },
              {
                "_id": "63024c9159419b487ba8da83",
                "stateName": "Manitoba State",
                "stateInternational": "Manitoba State",
                "stateCode": "Manitoba",
                "international": "Canada",
                "langCode": "EN",
                "dbLangCode": "NK",
                "statePhotoURL": "https://Manitoba.states.ua/photos/lviv-state.webp",
                "countryId": "63024c9159419b487ba8da39",
                "cities": [],
                "updatedAt": "2022-08-21T15:17:39.371Z",
                "createdAt": "2022-08-06T19:53:21.564Z"
              },
              {
                "_id": "63024c9159419b487ba8da86",
                "stateName": "Ontario State",
                "stateInternational": "Ontario State",
                "stateCode": "Ontario",
                "international": "Canada",
                "langCode": "EN",
                "dbLangCode": "NK",
                "statePhotoURL": "https://Ontario.states.ua/photos/lviv-state.webp",
                "countryId": "63024c9159419b487ba8da39",
                "cities": [],
                "updatedAt": "2022-08-21T15:17:39.371Z",
                "createdAt": "2022-08-06T19:53:42.464Z"
              }
            ],
            "createdAt": "2022-08-21T15:17:37.363Z",
            "updatedAt": "2022-08-21T15:17:39.411Z"
          },
          {
            "_id": "63024c9159419b487ba8da3f",
            "international": "Tailand",
            "country": "Tailand",
            "langCode": "EN",
            "dbLangCode": "NK",
            "states": [],
            "createdAt": "2022-08-21T15:17:37.396Z",
            "updatedAt": "2022-08-21T15:17:37.396Z"
          },
          {
            "_id": "63024c9159419b487ba8da45",
            "international": "Japan",
            "country": "Japan",
            "langCode": "EN",
            "dbLangCode": "NK",
            "states": [
              {
                "_id": "63024c9159419b487ba8da89",
                "stateName": "Kanto State",
                "stateInternational": "Kanto State",
                "stateCode": "Kanto",
                "international": "Japan",
                "langCode": "EN",
                "dbLangCode": "NK",
                "statePhotoURL": "https://Kanto.states.ua/photos/lviv-state.webp",
                "countryId": "63024c9159419b487ba8da45",
                "cities": [
                  {
                    "_id": "63012f2e536f29ef3020904e",
                    "stateId": "63012e98536f29ef30209015",
                    "cityName": "Tokyo",
                    "cityInternational": "Tokyo",
                    "cityCode": "Tokyo",
                    "cityPhotoURL": "https://Tokyo.city.ua/photos/kyiv-city.webp",
                    "langCode": "EN",
                    "stateInternational": "Kanto State",
                    "state": "63012e98536f29ef30209015",
                    "districts": [
                      {
                        "_id": "63012fa8536f29ef30209089",
                        "stateId": "63012e98536f29ef30209015",
                        "cityId": "63012f2e536f29ef3020904e",
                        "districtName": "Central",
                        "districtInternational": "Central",
                        "districtCode": "CN",
                        "districtPhotoURL": "https://Central.district.ua/photos/kyiv-podil.webp",
                        "cityInternational": "Tokyo",
                        "langCode": "EN",
                        "dbLangCode": "EN",
                        "createdAt": "2022-08-20T19:02:00.614Z",
                        "updatedAt": "2022-08-20T19:02:00.614Z"
                      }
                    ],
                    "createdAt": "2022-08-20T18:59:58.180Z",
                    "updatedAt": "2022-08-20T19:02:03.711Z"
                  }
                ],
                "updatedAt": "2022-08-21T15:17:39.443Z",
                "createdAt": "2022-08-20T18:57:28.012Z"
              }
            ],
            "createdAt": "2022-08-21T15:17:37.432Z",
            "updatedAt": "2022-08-21T15:17:39.483Z"
          },
          {
            "_id": "63024c9159419b487ba8da4b",
            "international": "NewCountry08211724",
            "country": "NewCountry08211724",
            "langCode": "EN",
            "dbLangCode": "NK",
            "states": [],
            "createdAt": "2022-08-21T15:17:37.465Z",
            "updatedAt": "2022-08-21T15:17:37.465Z"
          }
        ],
        "createdAt": "2022-08-21T15:17:37.127Z",
        "updatedAt": "2022-08-21T15:19:33.527Z"
      },
      {
        "_id": "63024dca59419b487ba8db17",
        "lang": "NewLang5",
        "code": "NK",
        "countries": [],
        "createdAt": "2022-08-21T15:22:50.513Z",
        "updatedAt": "2022-08-21T15:22:50.513Z"
      }
    ]
  }
}
*/
