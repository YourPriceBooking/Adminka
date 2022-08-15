import { combineReducers } from '@reduxjs/toolkit';
import { api } from 'features/api';
import { authReducer, counterSliceReducer, modalSliceReducer, themeReducer } from 'features/common';
import { countriesReducer } from 'features/countries';
import { langReducer } from 'features/languages';

export const rootReducer = combineReducers({
  // server state
  [api.reducerPath]: api.reducer,

  // global app state
  auth: authReducer,
  counter: counterSliceReducer,
  modal: modalSliceReducer,
  theme: themeReducer,

  lang: langReducer,
  countries: countriesReducer,
});
