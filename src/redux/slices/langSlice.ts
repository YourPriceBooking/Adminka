import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { countriesApi, languagesApi } from 'redux/apis';
import type { RootState } from 'redux/store';
import type { CountriesResponse, Language, LanguagesResponse } from 'types/apis';

// type LanguageWithCountries = {
//   _id: string;
//   lang: string;
//   code: string;
//   createdAt: string;
//   updatedAt: string;
//   countries: CountriesResponse;
// };

/*
   languagesWithCountries: [
      { code: 'UA', counties: [] },
      { code: 'EN', counties: [] },
      { code: 'PL', counties: [] },
      { code: 'DE', counties: [] },
    ],
*/

export const langSlice = createSlice({
  name: 'lang',
  initialState: {
    activeLang: {
      _id: '6295c6021ae198a10eee3731',
      lang: 'English',
      code: 'EN',
      createdAt: '2022-05-31T07:38:42.273Z',
      updatedAt: '2022-05-31T07:38:42.273Z',
    },

    languagesWithEditedCountries: [
      { code: 'EN', editedCountries: [''] },
      { code: 'UA', editedCountries: [''] },
      { code: 'PL', editedCountries: [''] },
      { code: 'DE', editedCountries: [''] },
    ],

    languages: [
      {
        _id: '6295c6021ae198a10eee3731',
        lang: 'English',
        code: 'EN',
        createdAt: '2022-05-31T07:38:42.273Z',
        updatedAt: '2022-05-31T07:38:42.273Z',
      },

      {
        _id: '6295c6251ae198a10eee3733',
        lang: 'Українська',
        code: 'UA',
        createdAt: '2022-05-31T07:39:17.046Z',
        updatedAt: '2022-05-31T07:39:17.046Z',
      },

      {
        _id: '6295c6651ae198a10eee3735',
        lang: 'Polski',
        code: 'PL',
        createdAt: '2022-05-31T07:40:21.301Z',
        updatedAt: '2022-05-31T11:46:48.150Z',
      },

      {
        _id: '62a33745b82327fd30e38407',
        lang: 'Deutsch',
        code: 'DE',
        createdAt: '2022-06-10T12:21:25.388Z',
        updatedAt: '2022-06-10T12:21:25.388Z',
      },
    ],

    countries: [
      {
        _id: '62a19f010ddb7bc00249b80b',
        country: 'Germany',
        langCode: 'EN',
        createdAt: '2022-06-09T07:19:29.994Z',
        updatedAt: '2022-06-09T07:19:29.994Z',
      },
    ],
  },

  reducers: {
    setActiveLang(state, action: PayloadAction<Language>) {
      state.activeLang = action.payload;
    },
  },

  extraReducers: builder =>
    builder
      .addMatcher(
        countriesApi.endpoints.getCountries.matchFulfilled,
        (state, action: PayloadAction<CountriesResponse>) => {
          state.countries = action.payload;
        }
      )
      .addMatcher(
        languagesApi.endpoints.getLanguages.matchFulfilled,
        (state, action: PayloadAction<LanguagesResponse>) => {
          state.languages = action.payload;
        }
      ),
});

export const { setActiveLang } = langSlice.actions;
export const langReducer = langSlice.reducer;
export const selectActiveLang = (state: RootState) => state.lang.activeLang;
export const selectActiveLangCode = (state: RootState) => state.lang.activeLang.code;
export const selectIsEnglishActiveLang = (state: RootState) => state.lang.activeLang.code === 'EN';
export const selectAllCountriesFromLanguageObject = (state: RootState) => state.lang.countries;

export const selectCountriesForActiveLanguage = (state: RootState) => {
  const allCountries = selectAllCountriesFromLanguageObject(state);
  const activeLang = selectActiveLang(state);
  const filteredCountries = allCountries.filter(
    ({ langCode }) => langCode === activeLang.code || langCode === 'EN'
  );
  return filteredCountries;
};
