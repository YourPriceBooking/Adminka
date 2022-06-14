import { combineReducers } from '@reduxjs/toolkit';
import { langReducer, themeReducer, countriesReducer, authReducer } from 'redux/slices';
import { baseApi } from 'redux/apis';
import { locationsReducer } from 'redux/slices';

export const rootReducer = combineReducers({
  auth: authReducer,
  lang: langReducer,
  theme: themeReducer,
  countries: countriesReducer,
  locations: locationsReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});
