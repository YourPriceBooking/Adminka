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

const globalReducer = combineReducers({
  auth: authReducer,
  counter: counterSliceReducer,
  modal: modalSliceReducer,
  theme: themeReducer,
  lang: langReducer,
  countries: countriesReducer,
});

export const rootReducer = combineReducers({
  // server state
  [api.reducerPath]: api.reducer,

  // global app state
  global: globalReducer,
});
