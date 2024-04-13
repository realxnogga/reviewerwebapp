
import { createSlice } from "@reduxjs/toolkit";

export const ThemeSlice = createSlice({
    name: 'ThemeSliceName',
    initialState: {
        themeHolder: {
           colorbg1: '',
           colorbg2: '',
           colorbg3: '',
           colortxt1: '',
           colortxt2: '',
        },
    },
    reducers: {
        changeThemeState: (state, action) => {

            const whatThemeIsClicked = action.payload;

            if (whatThemeIsClicked === 'firstColor') {
                state.themeHolder.colorbg1 = '!bg-gray-900 duration-200';
                state.themeHolder.colorbg2 = '!bg-gray-800 duration-200';
                state.themeHolder.colorbg3 = '!bg-gray-700 duration-200';
                state.themeHolder.colortxt1 = '!text-gray-300 duration-200';
                state.themeHolder.colortxt2 = '!text-gray-800 duration-200';
            }

            if (whatThemeIsClicked === 'secondColor') {               
                state.themeHolder.colorbg1 = '!bg-[#256D85] duration-200';   
                state.themeHolder.colorbg2 = '!bg-[#2DA4CC] duration-200';
                state.themeHolder.colorbg3 = '!bg-gray-100 duration-200';
                state.themeHolder.colortxt1 = '!text-gray-800 duration-200';
                state.themeHolder.colortxt2 = '!text-gray-300 duration-200';
            }
        }

    }
})

export const { changeThemeState } = ThemeSlice.actions;
export const themeHolderTemp = state => state.ThemeSliceName.themeHolder;
export const themeSliceReducer = ThemeSlice.reducer;