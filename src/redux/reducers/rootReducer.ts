import { combineReducers } from '@reduxjs/toolkit';
import {
  langReducer,
  themeReducer,
  countriesReducer,
  authReducer,
  locationsReducer,
  modalSliceReducer,
} from 'redux/slices';
import { baseApi } from 'redux/apis';
// import { counterSliceReducer } from 'redux/slices/counterSlice';
// counter: counterSliceReducer,

export const rootReducer = combineReducers({
  auth: authReducer,
  lang: langReducer,
  theme: themeReducer,
  modal: modalSliceReducer,
  countries: countriesReducer,
  locations: locationsReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});
