import { combineReducers } from '@reduxjs/toolkit';
import { api } from 'features/api';
import { authReducer, counterSliceReducer, modalSliceReducer, themeReducer } from 'features/common';
import { languagesReducer } from 'features/languages';
import { countryReducer } from 'features/countries';

export const rootReducer = combineReducers({
  // server state
  [api.reducerPath]: api.reducer,

  // global app state
  auth: authReducer,
  counter: counterSliceReducer,
  modal: modalSliceReducer,
  theme: themeReducer,
  language: languagesReducer,
  country: countryReducer,
});
