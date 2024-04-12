
import { createSlice } from "@reduxjs/toolkit";

export const OpenSidebarSlice = createSlice({
    name: 'OpenSidebarSliceName',
    initialState: {
         isSideBarOpen: true,
         whatIsClicked: 'dashboard',
      },
      reducers: {
        isSidebarOpenState: (state) => {
          state.isSideBarOpen = !state.isSideBarOpen;
        }, 
        whatIsClickedState: (state, action) => {
          state.whatIsClicked = action.payload;
        },
        clearIsSidebarOpenState: (state) => {
          state.isSideBarOpen = true;
        }, 
        clearWhatIsClickedState: (state, action) => {
          state.whatIsClicked = 'dashboard';
        }, 

      },
})

export const { isSidebarOpenState, whatIsClickedState, clearIsSidebarOpenState, clearWhatIsClickedState } = OpenSidebarSlice.actions;
export const isSideBarOpenTemp = state => state.OpenSidebarSliceName.isSideBarOpen;
export const whatIsClickedTemp = state => state.OpenSidebarSliceName.whatIsClicked;
export const isSidebarOpenReducer = OpenSidebarSlice.reducer;