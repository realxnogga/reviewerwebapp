



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// export const registerSlice = createSlice({
//     name: 'registerSliceName',
//     initialState: {
//         isLogged: false,
//       },
//       reducers: {},
// })

// export const { logout } = registerSlice.actions;
// export const loginReducer = registerSlice.reducer;
// export const loginCookieTemp = state => state.registerSliceName.isLogged;



export const registration = createAsyncThunk(
    'authentication/registration',
    async ({udata, file}) => {
      try {
        const formData = new FormData();
        formData.append('registerData', JSON.stringify(udata));
        formData.append('file', file);
  
        const res = await fetch("http://localhost/simple_web_in_react/server/register.php?action=putData", {
          method: 'POST',
          body: formData,
        });
  
       const data = await res.json();
       return data;
      } catch (error) {
        console.log('Error', error);
      }
  
    }
  );