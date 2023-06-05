import { combineReducers } from '@reduxjs/toolkit';
import { api } from 'features/api';
import { authReducer, modalSliceReducer, themeReducer } from 'features/common';
import { languagesReducer } from 'features/languages';
import { countryReducer } from 'features/countries';
import { accessReducer } from 'features/access/accessSlice';

export const rootReducer = combineReducers({
  // server state
  [api.reducerPath]: api.reducer,

  // global app state
  auth: authReducer,
  modal: modalSliceReducer,
  theme: themeReducer,
  language: languagesReducer,
  country: countryReducer,
  access: accessReducer,
});
