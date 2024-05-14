
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const QuizSlice = createSlice({
    name: 'QuizSliceName',
    initialState: {

    },
    reducers: { 
    
    },

})

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