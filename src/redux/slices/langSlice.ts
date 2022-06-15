import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { languagesApi } from 'redux/apis';
import type { RootState } from 'redux/store';
import type { Language } from 'types/apis';

type LanguageState = {
  activeLang: Language;
};

const initialState: LanguageState = {
  activeLang: {
    _id: '6295c6021ae198a10eee3731',
    lang: 'English',
    code: 'EN',
    createdAt: '2022-05-31T07:38:42.273Z',
    updatedAt: '2022-05-31T07:38:42.273Z',
    countries: [
      {
        _id: '62a5ab55ffbdefb643b24150',
        international: 'Ukraine',
        country: 'Ukraine',
        langCode: 'EN',
        __v: 0,
      },
    ],
  },
};

export const langSlice = createSlice({
  name: 'lang',
  initialState,

  reducers: {
    setActiveLang(state, action: PayloadAction<Language>) {
      state.activeLang = action.payload;
    },
  },

  extraReducers: builder => builder,
  // .addMatcher(
  //   countriesApi.endpoints.getCountries.matchFulfilled,
  //   (state, action: PayloadAction<CountriesResponse>) => {
  //     // Фронт приймає назви країн з ID
  //     // if (!action.payload) {
  //     //   return
  //     // }

  //     state.countries = action.payload;
  //   }
  // )

  // .addMatcher(
  //   languagesApi.endpoints.addLanguage.matchFulfilled,
  //   (state, action: PayloadAction<Language>) => {
  //     state.newLanguages.push({
  //       ...action.payload,

  //       // І кладе їх в масив Назви Країн в НОВІЙ мові,
  //       countries: state.countries
  //         .filter(language => language.langCode === 'EN')
  //         // та ставить помітку, що не редаговані.
  //         .map(language => ({ ...language, edited: 0 })),
  //     });
  //   }
  // ),
});

export const { setActiveLang } = langSlice.actions;
export const langReducer = langSlice.reducer;
export const selectActiveLang = (state: RootState) => state.lang.activeLang;
export const selectActiveLangCode = (state: RootState) => state.lang.activeLang.code;
export const selectIsEnglishActiveLang = (state: RootState) => state.lang.activeLang.code === 'EN';
const langFactory = languagesApi.endpoints.getLanguages.select();
export const selectCountriesForActiveLanguage = (state: RootState) => {
  const data = langFactory(state)?.data;

  return !data
    ? []
    : data.find(language => language.code === state.lang.activeLang.code)?.countries;
};
