import { combineReducers } from '@reduxjs/toolkit';
import { langReducer, themeReducer, countriesReducer, authReducer } from 'redux/slices';
import { baseApi } from 'redux/apis';

export const rootReducer = combineReducers({
  auth: authReducer,
  lang: langReducer,
  theme: themeReducer,
  countries: countriesReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});
