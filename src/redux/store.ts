import { configureStore } from '@reduxjs/toolkit';
import { authReducer, langReducer, themeReducer } from './slices';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    lang: langReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
