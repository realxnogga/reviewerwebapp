
import { createSlice } from "@reduxjs/toolkit";

export const OpenSidebarSlice = createSlice({
    name: 'OpenSidebarSliceName',
    initialState: {
         isSideBarOpen: true,
      },
      reducers: {
        isSidebarOpenState: (state) => {
          state.isSideBarOpen = !state.isSideBarOpen;
        },   
      },
})

export const { isSidebarOpenState } = OpenSidebarSlice.actions;
export const isSideBarOpenTemp = state => state.OpenSidebarSliceName.isSideBarOpen;
export const isSidebarOpenReducer = OpenSidebarSlice.reducer;