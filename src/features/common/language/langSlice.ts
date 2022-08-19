import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { languagesApi } from 'redux/apis';
import type { SelectLanguageType } from 'types/apis';
import type { RootState } from 'App/store';

type LanguageState = {
  activeLangId: SelectLanguageType;
};

const initialState: LanguageState = {
  activeLangId: undefined,
};

export const langSlice = createSlice({
  name: 'lang',
  initialState,

  reducers: {
    setActiveLangId(state, action: PayloadAction<SelectLanguageType>) {
      state.activeLangId = action.payload;
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

export const { setActiveLangId } = langSlice.actions;
export const langReducer = langSlice.reducer;

export const selectActiveLangId = (state: RootState) => state.lang.activeLangId;
