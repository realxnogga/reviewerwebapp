

import { createSlice } from "@reduxjs/toolkit";

export const OpenToggleQuizExamSlice = createSlice({
    name: 'OpenToggleQuizExamSliceName',
    initialState: {
        isToggleQuizExamOpen: false,
        whatIsClickToggleQuizExam: 'none'
    },
    reducers: {
        isToggleQuizExamOpenState: (state) => {
            state.isToggleQuizExamOpen = true;
        },

        clearIsToggleQuizExamOpenState: (state) => {
            state.isToggleQuizExamOpen = false;
        },

        whatIsClickToggleQuizExamState: (state, action) => {
            state.whatIsClickToggleQuizExam = action.payload;
        },
        clearWhatIsClickToggleQuizExamState: (state, action) => {
            state.whatIsClickToggleQuizExam = 'none';
        }


    },
})

export const {isToggleQuizExamOpenState, clearIsToggleQuizExamOpenState, whatIsClickToggleQuizExamState, clearWhatIsClickToggleQuizExamState} = OpenToggleQuizExamSlice.actions;

export const whatIsClickToggleQuizExamTemp = state => state.OpenToggleQuizExamSliceName.whatIsClickToggleQuizExam;
export const isToggleQuizExamOpenTemp = state => state.OpenToggleQuizExamSliceName.isToggleQuizExamOpen;
export const OpenToggleQuizExamReducer = OpenToggleQuizExamSlice.reducer;
