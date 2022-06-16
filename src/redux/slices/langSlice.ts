import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { languagesApi } from 'redux/apis';
import type { RootState } from 'redux/store';
import type { Language } from 'types/apis';

type LanguageState = {
  activeLang: Language;
};

const initialState: LanguageState = {
  activeLang: {
    _id: '62aafec23f300ab5a1e54d08',
    lang: 'English',
    code: 'EN',
    countries: [
      {
        international: 'Poland',
        country: 'Poland',
        langCode: 'EN',
        dbLangCode: 'EN',
        _id: '62aafec13f300ab5a1e54d04',
        __v: 0,
      },
      {
        international: 'Ukraine',
        country: 'Ukraine',
        langCode: 'EN',
        dbLangCode: 'EN',
        _id: '62aafec13f300ab5a1e54d05',
        __v: 0,
      },
      {
        international: 'USA',
        country: 'USA',
        langCode: 'EN',
        dbLangCode: 'EN',
        _id: '62aafec13f300ab5a1e54d06',
        __v: 0,
      },
    ],
    createdAt: '2022-06-16T09:58:26.046Z',
    updatedAt: '2022-06-16T09:58:26.046Z',
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
export const selectActiveLangId = (state: RootState) => selectActiveLang(state)._id;
export const selectActiveLangCode = (state: RootState) => selectActiveLang(state).code;
export const selectIsEnglishActiveLang = (state: RootState) => selectActiveLangCode(state) === 'EN';

// const langFactory = languagesApi.endpoints.getLanguages.select();

// const emptyArray = Object.freeze([]);

// export const selectCountriesForActiveLanguage = (state: RootState) => {
//   const { data: languages } = langFactory(state);
//   const activeLangId = selectActiveLangId(state) ?? '';

//   if (!languages && !activeLangId) return emptyArray;
//   if (languages && !activeLangId) return languages[0];

//   return languages?.find(language => language._id === activeLangId)?.countries ?? emptyArray;
// };
