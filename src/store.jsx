import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from '@reduxjs/toolkit';
import { loginReducer } from './feature/account/loginSlice';
import { getdataReducer } from './feature/data/userdataSlice';
import { registrationReducer } from './feature/account/registrationSlice';
import { deleteaccountReducer } from './feature/account/deleteaccountSlice';
import { editUserReducer } from './feature/account/editaccountSlice';
import { isSidebarOpenReducer } from './feature/opensidebarSlice';
import { insertResourceDataSliceReducer } from './feature/insertresourcedataSlice';
import { themeSliceReducer } from './feature/themeSlice';
import { isToggleNoteFlashCardOpenReducer } from './feature/opentogglenoteflashcardSlice';

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  LoginSliceName: loginReducer,
  GetUserDataName: getdataReducer,
  RegisterSliceName: registrationReducer,
  DeleteAccountSliceName: deleteaccountReducer,
  EditUserSliceName: editUserReducer,
  OpenSidebarSliceName: isSidebarOpenReducer,
  InsertResourceDataSliceName: insertResourceDataSliceReducer,
  ThemeSliceName: themeSliceReducer,
  OpenToggleNoteFlashcardSliceName: isToggleNoteFlashCardOpenReducer,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const Store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(Store);

// import { configureStore } from '@reduxjs/toolkit';
// import { authenticationReducer } from './feature/authenticationSlice';

// export const Store = configureStore({
//   reducer: {
//     authentication: authenticationReducer
//   }
// });
