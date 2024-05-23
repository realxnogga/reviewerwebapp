import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session'; // Use sessionStorage
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
import { flashcardSliceReducer } from './feature/flashcardSlice';
import { OpenToggleQuizExamReducer } from './feature/opentogglequizexamSlice';
import { QuizSliceReducer } from './feature/quizSlice';
import { insertSystemSettingDataSliceReducer } from './feature/sytemsettingSlice';
import { systemSettingSliceReducer } from './feature/sytemsettingSlice';

const persistConfig = {
  key: 'root',
  storage: storageSession, // Use sessionStorage
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
  FlashcardSliceName: flashcardSliceReducer,
  OpenToggleQuizExamSliceName: OpenToggleQuizExamReducer,
  QuizSliceName: QuizSliceReducer,
  SystemSettingSliceName: systemSettingSliceReducer,
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
