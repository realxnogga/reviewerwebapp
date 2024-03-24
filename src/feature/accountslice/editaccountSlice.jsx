

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const EditUserSlice = createSlice({
    name: 'EditUserSliceName',
    initialState: {
        isUserEdited: null,
      },
      reducers: {
        clearEditDataState: (state) => {
          state.isUserEdited = null;
        },
      },
      extraReducers: builder => {
        builder
          .addCase(EditUserThunk.fulfilled, (state, action) => {
            state.isUserEdited = action.payload;
          })
      }
})

export const { clearEditDataState } = EditUserSlice.actions;
export const editUserReducer = EditUserSlice.reducer;
export const isUserEditedTemp = state => state.EditUserSliceName.isUserEdited;


export const EditUserThunk = createAsyncThunk(
    'EditUserSliceName/EditUserThunk',
    async ({editdata, editfile}) => {
      try {
        const formData = new FormData();     
        formData.append('editUserData', JSON.stringify(editdata));
        formData.append('editUserfile', editfile);
  
        const res = await fetch("http://localhost/simple_web_in_react/server/register.php?action=editData", {
          method: 'POST',
          body: formData,
        });
       const data = await res.json();
       return data.success;
      } catch (error) {
        console.log('Error : ', error);
      }
  
    }
  );