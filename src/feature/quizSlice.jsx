
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const QuizSlice = createSlice({
    name: 'QuizSliceName',
    initialState: {
        isQuizDataInserted: null,
        quizData: [],
    },
    reducers: { 
        ClearIsQuizDataInsertedState: (state) => {
            state.isQuizDataInserted = null;
        },
    
    },
    extraReducers: builder => {
        builder
            .addCase(InsertQuizThunk.fulfilled, (state, action) => {
                state.isQuizDataInserted = action.payload;
            }) 
            .addCase(GetQuizThunk.fulfilled, (state, action) => {
                state.quizData = action.payload;
            })
    }

})

export const { ClearIsQuizDataInsertedState } = QuizSlice.actions;
export const quizDataTemp = state => state.QuizSliceName.quizData;
export const isQuizDataInsertedTemp = state => state.QuizSliceName.isQuizDataInserted;
export const QuizSliceReducer = QuizSlice.reducer;

export const InsertQuizThunk = createAsyncThunk(
    "QuizSliceName/InsertQuizThunk",
    async ({ quizdatatemp }) => {
        try {
            const formData = new FormData();
            formData.append('quizdatatemp', JSON.stringify(quizdatatemp));

            const res = await fetch("http://localhost/simple_web_in_react/server/quizexam.php?action=putquizdata", {
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

export const GetQuizThunk = createAsyncThunk(
    "QuizSliceName/GetQuizThunk",
    async ( quiztaker ) => {
        try {
            const formData = new FormData();
            formData.append('quiztaker', JSON.stringify(quiztaker));

            const res = await fetch("http://localhost/simple_web_in_react/server/quizexam.php?action=getquizdata", {
                method: 'POST',
                body: formData,
            })
            const data = await res.json();
            return data;

        } catch (error) {
            console.log('Error:', error);
        }
    }
)