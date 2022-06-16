import { combineReducers } from '@reduxjs/toolkit';
import { langReducer, themeReducer, countriesReducer, authReducer } from 'redux/slices';
import { baseApi } from 'redux/apis';
import { locationsReducer } from 'redux/slices';
import { modalSliceReducer } from 'redux/slices/modalSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  lang: langReducer,
  theme: themeReducer,
  modal: modalSliceReducer,
  countries: countriesReducer,
  locations: locationsReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});
