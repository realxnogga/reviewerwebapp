import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const isAuth = createAsyncThunk(
  'authentication/isAuth',
  async (passedLoginCredentials) => {
    try {
      const res = await fetch('http://localhost/simple_web_in_react/server/register.php?action=checkExist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(passedLoginCredentials),
      });
      const data = await res.json();
      return data.success; // equals true
    } catch (error) {
      console.log('Error', error);
    }
  }
);

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


export const getUserData = createAsyncThunk(
  'authentication/getUserData',
  async (getUserCredentials) => {
    try {
      const res = await fetch("http://localhost/simple_web_in_react/server/register.php?action=getData", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(getUserCredentials),
      });
      const data = await res.json();
      return data;

    } catch (error) {
      console.log('Error', error);
    }
  }
);


export const Authentication = createSlice({
  name: 'authentication',
  initialState: {
    isRegistered: false,
    getData: [],
  },
  reducers: {
    logout: (state) => {
      state.isRegistered = false;
    },
    // login: (state) =>

  },
  extraReducers: builder => {
    builder
      .addCase(isAuth.fulfilled, (state, action) => {
        state.isRegistered = action.payload;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.getData = action.payload;
      })
  }
});

export const { logout } = Authentication.actions;
export const fakeCookie = state => state.authentication.isRegistered;
export const userdata = state => state.authentication.getData;
export const authenticationReducer = Authentication.reducer;
