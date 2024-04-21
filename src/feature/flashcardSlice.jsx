
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const FlashcardSlice = createSlice({
    name: "FlashcardSliceName",
    initialState: {
      isFlashcardDataInserted: null, 
      flashcardData: [],
      isFlashcardItemInserted: null,
      flashcardItem: [],
    },
    reducers: {
        clearIsFlashcardDataInserted: (state) => {
            state.isFlashcardDataInserted = null;
        },
        clearIsFlashcardItemInserted: (state) => {
            state.isFlashcardItemInserted = null;
        }
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
            })  
    }

})

export const { clearIsFlashcardDataInserted, clearIsFlashcardItemInserted } = FlashcardSlice.actions;
export const flashcardDataTemp = state => state.FlashcardSliceName.flashcardData; 
export const isFlashcardDataInsertedTemp = state => state.FlashcardSliceName.isFlashcardDataInserted;
export const isFlashcardItemInsertedTemp = state => state.FlashcardSliceName.isFlashcardItemInserted;
export const flashcardItemTemp = state => state.FlashcardSliceName.flashcardItem; 
export const flashcardSliceReducer = FlashcardSlice.reducer;


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