import { combineReducers } from '@reduxjs/toolkit';
import { api } from 'features/api';
import { authReducer, counterSliceReducer, modalSliceReducer, themeReducer } from 'features/common';
import { countryReducer } from 'features/countries';
import { languagesReducer } from 'features/languages';

const globalReducer = combineReducers({
  auth: authReducer,
  counter: counterSliceReducer,
  modal: modalSliceReducer,
  theme: themeReducer,
  language: languagesReducer,
  country: countryReducer,
});

export const rootReducer = combineReducers({
  // server state
  [api.reducerPath]: api.reducer,

  // global app state
  global: globalReducer,
});
