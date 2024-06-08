import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetUserDataSlice = createSlice({
    name: 'GetUserDataSliceName',
    initialState: {
      userdata: [],
    },
    reducers: {
      clearRegisterState: (state) => {
        state.userdata = [];
      },
    },

    extraReducers: builder => {
      builder
        .addCase(getUserDataThunk.fulfilled, (state, action) => {
          state.userdata = action.payload[0];
        })
    }
  });

export const { clearRegisterState } = GetUserDataSlice.actions;
export const userdataTemp = state => state.GetUserDataSliceName.userdata;
export const getUserDataSliceReducer = GetUserDataSlice.reducer;

export const getUserDataThunk = createAsyncThunk(
    'GetUserDataSliceName/getUserDataThunk',
    async (userid) => {
      try {
        const res = await fetch("http://localhost/reviewerwebapp/server/register.php?action=getData", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userid),
        });
        const data = await res.json();
        return data;
  
      } catch (error) {
        console.log('Error', error);
      }
    }
  );