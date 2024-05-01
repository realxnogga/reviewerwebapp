

import { createSlice } from "@reduxjs/toolkit";

export const OpenToggleQuizExamSlice = createSlice({
    name: 'OpenToggleQuizExamSliceName',
    initialState: {
        isToggleQuizExamOpen: false,
    },
    reducers: {
        isToggleQuizExamOpenState: (state) => {
            state.isToggleQuizExamOpen = true;
        },

        clearIsToggleQuizExamOpenState: (state) => {
            state.isToggleQuizExamOpen = false;
        },


    },
})

export const {isToggleQuizExamOpenState, clearIsToggleQuizExamOpenState} = OpenToggleQuizExamSlice.actions;
export const isToggleQuizExamOpenTemp = state => state.OpenToggleQuizExamSliceName.isToggleQuizExamOpen;
export const OpenToggleQuizExamReducer = OpenToggleQuizExamSlice.reducer;
