import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';
import { baseApi } from './apis';
import { rootReducer } from './reducers/rootReducer';

const rootPersistConfig = {
  key: 'root',
  version: 1,
  storage: sessionStorage,
  blacklist: [baseApi.reducerPath],
};

export const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const ignoredActions = [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER];
