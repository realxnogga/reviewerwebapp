


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const DeleteAccountSlice = createSlice({
    name: 'DeleteAccountSliceName',
    initialState: {
        isAccountDeleted: null,
      },
      reducers: {
        clearDeleteAccountState: (state) => {
            state.isAccountDeleted = null;
          },
      },
      extraReducers: builder => {
        builder
          .addCase(DeleteAccountThunk.fulfilled, (state, action) => {
            state.isAccountDeleted = action.payload;
          })
      }
})

export const {clearDeleteAccountState} = DeleteAccountSlice.actions;
export const deleteAccountSliceReducer = DeleteAccountSlice.reducer;
export const isAccountDeletedTemp = state => state.DeleteAccountSliceName.isAccountDeleted;

export const DeleteAccountThunk = createAsyncThunk(
    'DeleteAccountSliceName/DeleteAccountThunk',
    async (dataTobedeleted) => {
        try {
            const res = await fetch('http://localhost/reviewerwebapp/server/register.php?action=deleteAccout', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(dataTobedeleted),
            });
            const data = await res.json();
            return data.success;
          } catch (error) {
            console.log('Error', error);
          }
    }
);