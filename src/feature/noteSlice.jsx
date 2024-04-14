

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const NoteSlice = createSlice({
    name: 'NoteSliceName',
    initialState: {
        isNoteDataInserted: null,
        isNoteDataDeleted: null,
        noteData: [],
        whatIsClickedInNoteTab: 'all',
    },
    reducers: { 
        ClearIsNoteDataInsertedState: (state) => {
            state.isNoteDataInserted = null;
        },
        ClearIsNoteDataDeletedState: (state) => {
            state.isNoteDataDeleted = null;
        },
        whatIsClickedInNoteTabState: (state, action) => {
            state.whatIsClickedInNoteTab = action.payload;
        },
        ClearWhatIsClickedInNoteTabState: (state, action) => {
            state.whatIsClickedInNoteTab = 'all';
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


export const { ClearIsNoteDataInsertedState, ClearIsNoteDataDeletedState, whatIsClickedInNoteTabState, ClearWhatIsClickedInNoteTabState } = NoteSlice.actions;
export const whatIsClickedInNoteTabTemp = state => state.NoteSliceName.whatIsClickedInNoteTab;
export const noteDataTemp = state => state.NoteSliceName.noteData;
export const isNoteDataInsertedTemp = state => state.NoteSliceName.isNoteDataInserted;
export const isNoteDataDeletedTemp = state => state.NoteSliceName.isNoteDataDeleted;
export const noteSliceReducer = NoteSlice.reducer;

export const GetNoteThunk = createAsyncThunk(
    "NoteSliceName/GetNoteThunk",
    async (username) => {
        try {
            const res = await fetch("http://localhost/simple_web_in_react/server/learningmaterial.php?action=getNoteData", {
               method: 'POST',
               headers: {'Content-Type' : 'application/json'},
               body: JSON.stringify(username),           
            })
            const data = await res.json();
            return data;
            
        } catch (error) {
          console.log('Error:', error);  
        }
    }
)



export const InsertNoteThunk = createAsyncThunk(
    "NoteSliceName/NoteThunk",
    async ({ noteDataTemp }) => {
        try {
            const formData = new FormData();
            formData.append('noteDataTemp', JSON.stringify(noteDataTemp));

            const res = await fetch("http://localhost/simple_web_in_react/server/learningmaterial.php?action=putNoteData", {
                method: 'POST',
                body: formData,
            })
            const data = await res.json();
            return data.success;

        } catch (error) {
            console.log('Error:', error);
        }
    }
)

export const DeleteNoteThunk = createAsyncThunk(
    "NoteSliceName/DeleteNoteThunk",
     async (noteID) => {
        try {
            
            const res = await fetch("http://localhost/simple_web_in_react/server/learningmaterial.php?action=deleteNoteData", {
              method: 'POST',
              headers: {'Content-Type' : 'application/json'},
              body: JSON.stringify(noteID),
            })
            const data = await res.json();
            return data.success;
            
        } catch (error) {
          console.log('Error:', error);  
        }
     }
)