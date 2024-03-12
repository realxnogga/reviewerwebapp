import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { authenticationReducer } from './feature/authenticationSlice';

const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, authenticationReducer);

export const Store = configureStore({
  reducer: {
   authentication: persistedReducer,
  }
});

export const persistor = persistStore(Store);

// import { configureStore } from '@reduxjs/toolkit';
// import { authenticationReducer } from './feature/authenticationSlice';

// export const Store = configureStore({
//   reducer: {
//     authentication: authenticationReducer
//   }
// });
