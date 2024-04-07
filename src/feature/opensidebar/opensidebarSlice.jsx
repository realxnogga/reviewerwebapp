
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

      },
})

export const { isSidebarOpenState, whatIsClickedState } = OpenSidebarSlice.actions;
export const isSideBarOpenTemp = state => state.OpenSidebarSliceName.isSideBarOpen;
export const whatIsClickedTemp = state => state.OpenSidebarSliceName.whatIsClicked;
export const isSidebarOpenReducer = OpenSidebarSlice.reducer;