import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from '@reduxjs/toolkit';
import { loginSliceReducer } from './feature/account/loginSlice';
import { getUserDataSliceReducer } from './feature/data/userdataSlice';
import { registerSliceReducer } from './feature/account/registrationSlice';
import { deleteAccountSliceReducer } from './feature/account/deleteaccountSlice';
import { editUserSliceReducer } from './feature/account/editaccountSlice';
import { openSidebarSliceReducer } from './feature/opensidebarSlice';
import { insertResourceDataSliceReducer } from './feature/insertresourcedataSlice';
import { themeSliceReducer } from './feature/themeSlice';
import { OpenToggleNoteFlashcardReducer } from './feature/opentogglenoteflashcardSlice';
import { noteSliceReducer } from './feature/noteSlice';
import { systemSettingSliceReducer } from './feature/systemsettingSlice';
import { flashcardSliceReducer } from './feature/flashcardSlice';

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  LoginSliceName: loginSliceReducer,
  GetUserDataSliceName: getUserDataSliceReducer,
  RegisterSliceName: registerSliceReducer,
  DeleteAccountSliceName: deleteAccountSliceReducer,
  EditUserSliceName: editUserSliceReducer,
  OpenSidebarSliceName: openSidebarSliceReducer,
  InsertResourceDataSliceName: insertResourceDataSliceReducer,
  ThemeSliceName: themeSliceReducer,
  OpenToggleNoteFlashcardSliceName: OpenToggleNoteFlashcardReducer,
  NoteSliceName: noteSliceReducer,
  SystemSettingSliceName: systemSettingSliceReducer,
  FlashcardSliceName: flashcardSliceReducer,
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
