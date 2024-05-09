

import { createSlice } from "@reduxjs/toolkit";

export const OpenToggleQuizExamSlice = createSlice({
    name: 'OpenToggleQuizExamSliceName',
    initialState: {
        isToggleQuizExamOpen: false,
        whatIsClickToggleQuizExam: ''
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
        }


    },
})

export const {isToggleQuizExamOpenState, clearIsToggleQuizExamOpenState, whatIsClickToggleQuizExamState} = OpenToggleQuizExamSlice.actions;

export const whatIsClickToggleQuizExamTemp = state => state.OpenToggleQuizExamSliceName.whatIsClickToggleQuizExam;
export const isToggleQuizExamOpenTemp = state => state.OpenToggleQuizExamSliceName.isToggleQuizExamOpen;
export const OpenToggleQuizExamReducer = OpenToggleQuizExamSlice.reducer;
