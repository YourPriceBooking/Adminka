import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { languagesApi } from 'redux/apis';
import type { SelectLanguageType } from 'types/apis';
import type { RootState } from 'App/store';

type LanguageState = {
  activeLang: SelectLanguageType | null;
};

export const initialState: LanguageState = {
  activeLang: null,
};

export const langSlice = createSlice({
  name: 'lang',
  initialState,

  reducers: {
    setActiveLang(state, action: PayloadAction<SelectLanguageType | null>) {
      state.activeLang = action.payload;
    },
  },

  // extraReducers: builder => builder,
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
export const selectActiveLangId = (state: RootState) => selectActiveLang(state)?._id;
export const selectActiveLangName = (state: RootState) => selectActiveLang(state)?.lang;
export const selectActiveLangCode = (state: RootState) => selectActiveLang(state)?.code;
export const selectActiveDBLangCode = (state: RootState) => selectActiveLang(state)?.dbLangCode;
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
