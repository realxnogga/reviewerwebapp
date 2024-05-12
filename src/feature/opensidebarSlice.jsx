
import { createSlice } from "@reduxjs/toolkit";

export const OpenSidebarSlice = createSlice({
    name: 'OpenSidebarSliceName',
    initialState: {
         isSideBarOpen: false,
         minimizeSidebar: false,
         whatIsClicked: 'dashboard',
      },
      reducers: {
        isSidebarOpenState: (state) => {
          state.isSideBarOpen = !state.isSideBarOpen;
        }, 
        minimizeSidebarState: (state) => {
          state.minimizeSidebar = !state.minimizeSidebar;
        }, 
        whatIsClickedState: (state, action) => {
          state.whatIsClicked = action.payload;
        },
        clearIsSidebarOpenState: (state) => {
          state.isSideBarOpen = false;
        }, 
        clearMinimizeSidebarState: (state) => {
          state.minimizeSidebar = false;
        },
        clearWhatIsClickedState: (state, action) => {
          state.whatIsClicked = 'dashboard';
        }, 

      },
})

export const { isSidebarOpenState, whatIsClickedState, clearIsSidebarOpenState, clearMinimizeSidebarState, clearWhatIsClickedState, minimizeSidebarState } = OpenSidebarSlice.actions;
export const isSideBarOpenTemp = state => state.OpenSidebarSliceName.isSideBarOpen;
export const minimizeSidebarTemp = state => state.OpenSidebarSliceName.minimizeSidebar;
export const whatIsClickedTemp = state => state.OpenSidebarSliceName.whatIsClicked;
export const openSidebarSliceReducer = OpenSidebarSlice.reducer;