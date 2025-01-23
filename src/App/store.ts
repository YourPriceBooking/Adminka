import { configureStore } from '@reduxjs/toolkit';
import { api } from 'features/api/api';
import persistStore from 'redux-persist/es/persistStore';
import { tokenExpiredMiddleware } from 'features/common/auth/tokenExpiredMiddleware';
import { ignoredActions, persistedReducer } from './persist';

export const store = configureStore({
  reducer: persistedReducer,

  middleware: getDefaultMiddlewares =>
    getDefaultMiddlewares({
      serializableCheck: {
        ignoredActions,
      },
    })
      .concat(api.middleware)
      .concat(tokenExpiredMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
