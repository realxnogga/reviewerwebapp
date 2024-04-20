
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const RegisterSlice = createSlice({
    name: 'RegisterSliceName',
    initialState: {
        isUserAlreadyExist: null,
      },
      reducers: {
        clearRegistrationState: (state) => {
          state.isUserAlreadyExist = null;
        },
      },
      extraReducers: builder => {
        builder
          .addCase(RegistrationThunk.fulfilled, (state, action) => {
            state.isUserAlreadyExist = action.payload;
          })
      }
})

export const { clearRegistrationState } = RegisterSlice.actions;
export const registerSliceReducer = RegisterSlice.reducer;
export const isUserAlreadyExistTemp = state => state.RegisterSliceName.isUserAlreadyExist;



export const RegistrationThunk = createAsyncThunk(
    'RegisterSliceName/RegistrationThunk',
    async ({userdata, file}) => {
      try {
        const formData = new FormData();
        formData.append('registerData', JSON.stringify(userdata));
        formData.append('file', file);
  
        const res = await fetch("http://localhost/simple_web_in_react/server/register.php?action=putData", {
          method: 'POST',
          body: formData,
        });
       const data = await res.json();
       console.log(data.success)
       return data.success;
      } catch (error) {
        console.log('Error', error);
      }
  
    }
  );