
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HelperFormDataFunction } from "../utils/helperformdatafunction";
import { HelperThunkFunction } from "../utils/helperthunkfunction";

export const QuizSlice = createSlice({
    name: 'QuizSliceName',
    initialState: {
        isQuizDataInserted: null,
        quizData: [],
        isUserPerformanceExist: false,
        userPerformanceQuizData: [],
        userPerformanceInfo: [],
    },
    reducers: {
        ClearIsQuizDataInsertedState: (state) => {
            state.isQuizDataInserted = null;
        },
        ClearIsUserPerformanceExist: (state) => {
            state.isUserPerformanceExist = false;
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
            .addCase(CheckUserPerformanceExistThunk.fulfilled, (state, action) => {
                state.isUserPerformanceExist = action.payload;
            })
            .addCase(GetUserPerformanceThunk.fulfilled, (state, action) => {     
                state.userPerformanceQuizData = action.payload.userPerformance;
                state.userPerformanceInfo = action.payload.userInfo;
            })
    }

})

export const { ClearIsQuizDataInsertedState, ClearIsUserPerformanceExist } = QuizSlice.actions;
export const quizDataTemp = state => state.QuizSliceName.quizData;
export const isQuizDataInsertedTemp = state => state.QuizSliceName.isQuizDataInserted;
export const isUserPerformanceExistTemp = state => state.QuizSliceName.isUserPerformanceExist;
export const userPerformanceQuizDataTemp = state => state.QuizSliceName.userPerformanceQuizData;
export const userPerformanceInfoTemp = state => state.QuizSliceName.userPerformanceInfo;

export const QuizSliceReducer = QuizSlice.reducer;


export const GetUserPerformanceThunk = createAsyncThunk(
    "QuizSliceName/GetUserPerformanceThunk",
    async (quiztaker) => {

        return HelperThunkFunction('quizexam.php?action=getUserPerformance', 'POST', quiztaker, false);
        
    }
)

export const CheckUserPerformanceExistThunk = createAsyncThunk(
    "QuizSliceName/CheckUserPerformanceExistThunk",
    async (quiztaker) => {

        return HelperThunkFunction('quizexam.php?action=checkUserPerformanceExist', 'POST', quiztaker, false);

    }
)

export const DeleteQuizThunk = createAsyncThunk(
    "QuizSliceName/DeleteQuizThunk",
    async (user) => {

        return HelperThunkFunction('quizexam.php?action=deleteQuizData', 'POST', user, false);

    }
)

export const UpdateQuizUserThunk = createAsyncThunk(
    "QuizSliceName/UpdateQuizUserThunk",
    async ({ datatobeupdated }) => {
        
        const formData = HelperFormDataFunction(datatobeupdated);
        return HelperThunkFunction('quizexam.php?action=updateQuizUser', 'POST', formData, true);

    }
)

export const InsertQuizThunk = createAsyncThunk(
    "QuizSliceName/InsertQuizThunk",
    async ({ quizdatatemp }) => {

        const formData = HelperFormDataFunction(quizdatatemp);
        return HelperThunkFunction('quizexam.php?action=putQuizData', 'POST', formData, true);

    }
)

export const GetQuizThunk = createAsyncThunk(
    "QuizSliceName/GetQuizThunk",
    async (quiztaker) => {

        return HelperThunkFunction('quizexam.php?action=getquizdata', 'POST', quiztaker, false);

    }
)