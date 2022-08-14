import { combineReducers } from '@reduxjs/toolkit';
import {
  langReducer,
  themeReducer,
  countriesReducer,
  authReducer,
  modalSliceReducer,
} from 'redux/slices';
import { api } from 'redux/apis';
import { counterSliceReducer } from 'redux/slices/counterSlice';

export const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer,
  lang: langReducer,
  theme: themeReducer,
  modal: modalSliceReducer,
  countries: countriesReducer,
  counter: counterSliceReducer,
});
