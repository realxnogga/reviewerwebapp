
import { createSlice } from "@reduxjs/toolkit";

export const OpenToggleNoteFlashcardSlice = createSlice({
    name: 'OpenToggleNoteFlashcardSliceName',
    initialState: {
        isToggleNoteFlashCardOpen: false,
        whatIsClickToggleNoteflashCard: 'note'
    },
    reducers: {
        isToggleNoteFlashCardOpenState: (state) => {
            state.isToggleNoteFlashCardOpen = true;
        },
        whatIsClickToggleNoteflashCardState: (state, action) => {
            state.whatIsClickToggleNoteflashCard = action.payload;
        },

        clearWhatIsClickToggleNoteflashCardState: (state) => {
            state.whatIsClickToggleNoteflashCard = 'note';
        },

        clearIsToggleNoteFlashCardOpenState: (state) => {
            state.isToggleNoteFlashCardOpen = false;
        },


    },
})

export const { isToggleNoteFlashCardOpenState, clearIsToggleNoteFlashCardOpenState,whatIsClickToggleNoteflashCardState, clearWhatIsClickToggleNoteflashCardState } = OpenToggleNoteFlashcardSlice.actions;

export const isToggleNoteFlashcardOpenTemp = state => state.OpenToggleNoteFlashcardSliceName.isToggleNoteFlashCardOpen;

export const whatIsClickToggleNoteflashCardTemp = state => state.OpenToggleNoteFlashcardSliceName.whatIsClickToggleNoteflashCard;

export const OpenToggleNoteFlashcardReducer = OpenToggleNoteFlashcardSlice.reducer;