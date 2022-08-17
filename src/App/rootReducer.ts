import { combineReducers } from '@reduxjs/toolkit';
import { api } from 'features/api';
import {
  authReducer,
  counterSliceReducer,
  modalSliceReducer,
  themeReducer,
  langReducer,
} from 'features/common';
import { countriesReducer } from 'features/countries';

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
