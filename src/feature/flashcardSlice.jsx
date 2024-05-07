
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
        try {
            const formData = new FormData();
            formData.append('datatobeupdated', JSON.stringify(datatobeupdated));

            const res = await fetch("http://localhost/simple_web_in_react/server/learningmaterial.php?action=updateFlashcardItemUser", {
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



export const UpdateFlashcardUserThunk = createAsyncThunk(
    "NoteSliceName/UpdateFlashcardUserThunk",
    async ({ datatobeupdated }) => {
        try {
            const formData = new FormData();
            formData.append('datatobeupdated', JSON.stringify(datatobeupdated));

            const res = await fetch("http://localhost/simple_web_in_react/server/learningmaterial.php?action=updateFlashcardUser", {
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


// to delete all flashcard item  based on username
export const DeleteAllFlashCardDataThunk = createAsyncThunk(
    "FlashcardSliceName/DeleteAllFlashCardDataThunk",
    async (flashcarduser) => {
        try {

        const res = await fetch("http://localhost/simple_web_in_react/server/learningmaterial.php?action=deleteAllFlashcardData", {
            method: 'POST',  
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(flashcarduser),
        })
         const data = await res.json();
         return data.success;
        } catch (error) {
        console.log('Error:', error);
        }
    }
)

// to delete all flashcard item  based on username
export const DeleteAllFlashCardItemThunk = createAsyncThunk(
    "FlashcardSliceName/DeleteAllFlashCardItemThunk",
    async (flashcarduser) => {
        try {

        const res = await fetch("http://localhost/simple_web_in_react/server/learningmaterial.php?action=deleteAllFlashcardItem", {
            method: 'POST',  
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(flashcarduser),
        })
         const data = await res.json();
         return data.success;
        } catch (error) {
        console.log('Error:', error);
        }
    }
)


// to delete flashcard based on ID
export const DeleteFlashCardDataThunk = createAsyncThunk(
    "FlashcardSliceName/DeleteFlashCardItemThunk",
    async (flashcardID) => {
        try {

        const res = await fetch("http://localhost/simple_web_in_react/server/learningmaterial.php?action=deleteFlashcardItemData", {
            method: 'POST',  
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(flashcardID),
        })
         const data = await res.json();
         return data.success;
        } catch (error) {
        console.log('Error:', error);
        }
    }
)

// to delete flashcard item based on ID
export const DeleteFlashCardItemByIDThunk = createAsyncThunk(
    "FlashcardSliceName/DeleteFlashCardItemByIDThunk",
    async (flashcarditemID) => {
        try {

        const res = await fetch("http://localhost/simple_web_in_react/server/learningmaterial.php?action=deleteFlashcardItemById", {
            method: 'POST',  
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(flashcarditemID),
        })
         const data = await res.json();
         return data.success;
        } catch (error) {
        console.log('Error:', error);
        }
    }
)

export const GetFlashcardItemThunk = createAsyncThunk(
    "FlashcardSliceName/GetFlashcardItemThunk",
    async (flashcardID) => {
        try {
            const res = await fetch("http://localhost/simple_web_in_react/server/learningmaterial.php?action=getFlashcardItemData", {
             method: 'POST',
             headers: {'Content-Type' : 'application/json'},
             body: JSON.stringify(flashcardID)
            })
            const data = await res.json();
            return data;
            
        } catch (error) {
        console.log('Error:', error); 
        }
    }

)

export const InsertFlashCardItemThunk = createAsyncThunk(
    "FlashcardSliceName/GetFlashCardItemThunk",
    async ({flashcardItemTemp}) => {
        try {

        const formData = new FormData();
        formData.append('flashcardItemTemp', JSON.stringify(flashcardItemTemp))
        const res = await fetch("http://localhost/simple_web_in_react/server/learningmaterial.php?action=insertFlashcardItemData", {
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

export const GetFlashcardThunk = createAsyncThunk(
    "FlashcardSliceName/GetFlashcardThunk",
    async (flashcarduser) => {
        try {

        const res = await fetch("http://localhost/simple_web_in_react/server/learningmaterial.php?action=getFlashcardData", {
            method: 'POST',
            headers: {'Content-Type' : 'application'},
            body: JSON.stringify(flashcarduser)
        })
        const data = await res.json();
        return data;
            
        } catch (error) {
          console.log('Error:', error);  
        }
    }
)


export const InsertFlashcardThunk = createAsyncThunk(
    "FlashcardSliceName/InsertFlashcardThunk",
    async ({flashcardDataTemp}) => {
        try {

            const formData = new FormData();
            formData.append('flashcardDataTemp', JSON.stringify(flashcardDataTemp));

        const res = await fetch("http://localhost/simple_web_in_react/server/learningmaterial.php?action=insertFlashcardData", {
            method: 'POST',
            body: formData
        })
        const data = await res.json();
        return data.success;
            
        } catch (error) {
          console.log('Error:', error);  
        }
    }
)