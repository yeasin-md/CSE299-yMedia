import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import videoReducer from './videoRedux';
import catReducer from './categoryRedux';
import bannerReducer from './bannerRedux';
import userReducer from './userRedux';
import themeReducer from './themeRedux'; // Import theme reducer for theme management
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  video: videoReducer,
  cat: catReducer,
  banner: bannerReducer,
  user: userReducer,
  theme: themeReducer, // Add theme reducer to store - theme preferences will be persisted
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export let persistor = persistStore(store);
