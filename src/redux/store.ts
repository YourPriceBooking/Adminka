import { configureStore } from '@reduxjs/toolkit';
import { ignoredActions, persistedReducer } from './persist';
import { baseApi } from './apis';
import persistStore from 'redux-persist/es/persistStore';

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddlewares =>
    getDefaultMiddlewares({
      serializableCheck: {
        ignoredActions,
      },
    }).concat(baseApi.middleware),

  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
