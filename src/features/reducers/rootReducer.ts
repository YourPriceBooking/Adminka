import { combineReducers } from '@reduxjs/toolkit';
import {
  langReducer,
  themeReducer,
  countriesReducer,
  authReducer,
  modalSliceReducer,
} from 'features/slices';
import { api } from 'features/apis';
import { counterSliceReducer } from 'features/slices/counterSlice';

export const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer,
  lang: langReducer,
  theme: themeReducer,
  modal: modalSliceReducer,
  countries: countriesReducer,
  counter: counterSliceReducer,
});
