
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HelperThunkFunction } from "../utils/helperthunkfunction";
import { HelperFormDataFunction } from "../utils/helperformdatafunction";

export const FlashcardSlice = createSlice({
    name: "FlashcardSliceName",
    initialState: {
      isFlashcardDataInserted: null, 
      flashcardData: [],
      isFlashcardItemInserted: null,
      flashcardItem: [],
      isFlashcardDataDeleted: null,
      isGetFlashcardItemPending: false,

    },
    reducers: {
        clearIsFlashcardDataInserted: (state) => {
            state.isFlashcardDataInserted = null;
        },
        clearIsFlashcardItemInserted: (state) => {
            state.isFlashcardItemInserted = null;
        },
        clearIsFlashcardDataDeleted: (state) => {
            state.isFlashcardDataDeleted = null;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(InsertFlashcardThunk.fulfilled, (state, action) => {
                state.isFlashcardDataInserted = action.payload;
            })  
            .addCase(GetFlashcardThunk.fulfilled, (state, action) => {
                state.flashcardData = action.payload;
            })
            .addCase(InsertFlashCardItemThunk.fulfilled, (state, action) => {
                state.isFlashcardItemInserted = action.payload;
            })  
            .addCase(GetFlashcardItemThunk.fulfilled, (state, action) => {
                state.flashcardItem = action.payload;
                state.isGetFlashcardItemPending = false;
            })  
            .addCase(GetFlashcardItemThunk.pending, (state) => {
                state.isGetFlashcardItemPending = true;
            }) 
            .addCase(DeleteFlashCardDataThunk.fulfilled, (state, action) => {
                state.isFlashcardDataDeleted = action.payload;
            }) 
   
    }

})

export const { clearIsFlashcardDataInserted, clearIsFlashcardItemInserted, clearIsFlashcardDataDeleted } = FlashcardSlice.actions;
export const flashcardDataTemp = state => state.FlashcardSliceName.flashcardData; 
export const isFlashcardDataInsertedTemp = state => state.FlashcardSliceName.isFlashcardDataInserted;
export const isFlashcardItemInsertedTemp = state => state.FlashcardSliceName.isFlashcardItemInserted;
export const isFlashcardDataDeletedTemp = state => state.FlashcardSliceName.isFlashcardDataDeleted;
export const flashcardItemTemp = state => state.FlashcardSliceName.flashcardItem; 
export const isGetFlashcardItemPendingTemp = state => state.FlashcardSliceName.isGetFlashcardItemPending;
export const flashcardSliceReducer = FlashcardSlice.reducer;


export const UpdateFlashcardItemUserThunk = createAsyncThunk(
    "NoteSliceName/UpdateFlashcardItemUserThunk",
    async ({ datatobeupdated }) => {

        const formData = HelperFormDataFunction(datatobeupdated);
        return HelperThunkFunction('learningmaterial.php?action=updateFlashcardItemUser', 'POST', formData, true);

    }
)

export const UpdateFlashcardUserThunk = createAsyncThunk(
    "NoteSliceName/UpdateFlashcardUserThunk",
    async ({ datatobeupdated }) => {

        const formData = HelperFormDataFunction(datatobeupdated);
        return HelperThunkFunction('learningmaterial.php?action=updateFlashcardUser', 'POST', formData, true);

    }
)

// to delete all flashcard item  based on username
export const DeleteAllFlashCardDataThunk = createAsyncThunk(
    "FlashcardSliceName/DeleteAllFlashCardDataThunk",
    async (flashcarduser) => { 
        
        return HelperThunkFunction('learningmaterial.php?action=deleteAllFlashcardData', 'POST', flashcarduser, false);

    }
)

// to delete all flashcard item  based on username
export const DeleteAllFlashCardItemThunk = createAsyncThunk(
    "FlashcardSliceName/DeleteAllFlashCardItemThunk",
    async (flashcarduser) => {

        return HelperThunkFunction('learningmaterial.php?action=deleteAllFlashcardItem', 'POST', flashcarduser, false);

    }
)

// to delete flashcard based on ID
export const DeleteFlashCardDataThunk = createAsyncThunk(
    "FlashcardSliceName/DeleteFlashCardItemThunk",
    async (flashcardID) => {

        return HelperThunkFunction('learningmaterial.php?action=deleteFlashcardItemData', 'POST', flashcardID, false);

    }
)

// to delete flashcard item based on ID
export const DeleteFlashCardItemByIDThunk = createAsyncThunk(
    "FlashcardSliceName/DeleteFlashCardItemByIDThunk",
    async (flashcarditemID) => {
       
        return HelperThunkFunction('learningmaterial.php?action=deleteFlashcardItemById', 'POST', flashcarditemID, false);

    }
)

export const GetFlashcardItemThunk = createAsyncThunk(
    "FlashcardSliceName/GetFlashcardItemThunk",
    async (flashcardID) => {

        return HelperThunkFunction('learningmaterial.php?action=getFlashcardItemData', 'POST', flashcardID, false);

    }

)

export const InsertFlashCardItemThunk = createAsyncThunk(
    "FlashcardSliceName/GetFlashCardItemThunk",
    async ({flashcardItemTemp}) => {

        const formData = HelperFormDataFunction(flashcardItemTemp);
        return HelperThunkFunction('learningmaterial.php?action=insertFlashcardItemData', 'POST', formData, true);

    }
)

export const GetFlashcardThunk = createAsyncThunk(
    "FlashcardSliceName/GetFlashcardThunk",
    async (flashcarduser) => {

        return HelperThunkFunction('learningmaterial.php?action=getFlashcardData', 'POST', flashcarduser, false);

    }
)

export const InsertFlashcardThunk = createAsyncThunk(
    "FlashcardSliceName/InsertFlashcardThunk",
    async ({flashcardDataTemp}) => {

        const formData = HelperFormDataFunction(flashcardDataTemp);
        return HelperThunkFunction('learningmaterial.php?action=insertFlashcardData', 'POST', formData, true);

    }
)