import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetUserData = createSlice({
    name: 'GetUserDataName',
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
        .addCase(getUserData.fulfilled, (state, action) => {
          state.userdata = action.payload[0];
        })
    }
  });

export const { clearRegisterState } = GetUserData.actions;
export const userdataTemp = state => state.GetUserDataName.userdata;
export const getdataReducer = GetUserData.reducer;

export const getUserData = createAsyncThunk(
    'GetUserDataName/getUserData',
    async (userid) => {
      try {
        const res = await fetch("http://localhost/simple_web_in_react/server/register.php?action=getData", {
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