

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HelperThunkFunction } from "../utils/helperthunkfunction";
import { HelperFormDataFunction } from "../utils/helperformdatafunction";

export const NoteSlice = createSlice({
    name: 'NoteSliceName',
    initialState: {
        isNoteDataInserted: null,
        isNoteDataDeleted: null,
        noteData: [],
    },
    reducers: { 
        ClearIsNoteDataInsertedState: (state) => {
            state.isNoteDataInserted = null;
        },
        ClearIsNoteDataDeletedState: (state) => {
            state.isNoteDataDeleted = null;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(InsertNoteThunk.fulfilled, (state, action) => {
                state.isNoteDataInserted = action.payload;
            })
            .addCase(GetNoteThunk.fulfilled, (state, action) => {
                state.noteData = action.payload;
            })
            .addCase(DeleteNoteThunk.fulfilled, (state, action) => {
                state.isNoteDataDeleted = action.payload;
            })     
    }

})

export const { ClearIsNoteDataInsertedState, ClearIsNoteDataDeletedState } = NoteSlice.actions;
export const noteDataTemp = state => state.NoteSliceName.noteData;
export const isNoteDataInsertedTemp = state => state.NoteSliceName.isNoteDataInserted;
export const isNoteDataDeletedTemp = state => state.NoteSliceName.isNoteDataDeleted;
export const noteSliceReducer = NoteSlice.reducer;

export const GetNoteThunk = createAsyncThunk(
    "NoteSliceName/GetNoteThunk",
    async (username) => {

        return HelperThunkFunction('learningmaterial.php?action=getNoteData', 'POST', username, false);

    }
)

export const UpdateNoteUserThunk = createAsyncThunk(
    "NoteSliceName/UpdateNoteUserThunk",
    async ({ datatobeupdated }) => {

        const formData = HelperFormDataFunction(datatobeupdated);
        return HelperThunkFunction('learningmaterial.php?action=updateNoteUser', 'POST', formData, true);

    }
)

export const InsertNoteThunk = createAsyncThunk(
    "NoteSliceName/InsertNoteThunk",
    async ({ noteDataTemp }) => {

        const formData = HelperFormDataFunction(noteDataTemp);
        return HelperThunkFunction('learningmaterial.php?action=putNoteData', 'POST', formData, true);

    }
)

export const DeleteNoteThunk = createAsyncThunk(
    "NoteSliceName/DeleteNoteThunk",
     async (noteID) => {

        return HelperThunkFunction('learningmaterial.php?action=deleteNoteData', 'POST', noteID, false);

     }
)

export const DeleteAllNoteThunk = createAsyncThunk(
    "NoteSliceName/DeleteAllNoteThunk",
    async (noteUser) => {

        return HelperThunkFunction('learningmaterial.php?action=deleteAllNoteData', 'POST', noteUser, false);

    }
)