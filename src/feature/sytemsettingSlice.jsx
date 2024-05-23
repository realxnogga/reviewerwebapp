

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const SystemSettingSlice = createSlice({
    name: 'SystemSettingSliceName',
    initialState: {
        systemData: [],
        isSystemNameUpdated: null,
        systemName: '',
    },
    reducers: {  
        clearIsSystemNameUpdatedState: (state) => {
            state.isSystemNameUpdated = null;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(EditSystemSettingNameThunk.fulfilled, (state, action) => {
                state.isSystemNameUpdated = action.payload;
            })   
            .addCase(GetSystemSettingNameThunk.fulfilled, (state, action) => {
                state.systemName = action.payload;
            })   
    }

})

export const { clearIsSystemNameUpdatedState } = SystemSettingSlice.actions;
export const systemNameTemp = state => state.SystemSettingSliceName.systemName;
export const isSystemNameUpdatedTemp = state => state.SystemSettingSliceName.isSystemNameUpdated;
export const systemSettingSliceReducer = SystemSettingSlice.reducer;


export const GetSystemSettingNameThunk = createAsyncThunk(
    "SystemSettingSliceName/GetSystemSettingNameThunk",
    async (systemsettinguser) => {
        try {
        
        const res = await fetch("http://localhost/simple_web_in_react/server/systemsetting.php?action=getSystemSettingName", {
            method: 'POST',
            header: {'Content-Type' : 'application/json'},
            body: JSON.stringify(systemsettinguser)
        })
        const data = await res.json();
        return data;
            
        } catch (error) {
          console.log('Error', error);  
        }
    }
)


// to edit the Reviewer App text
export const UpdateSystemSettingUserThunk = createAsyncThunk(
    "SystemSettingSliceName/UpdateSystemSettingUserThunk",
    async ({ datatobeupdated }) => {
        try {
            const formData = new FormData();
            formData.append('datatobeupdated', JSON.stringify(datatobeupdated));

            const res = await fetch("http://localhost/simple_web_in_react/server/systemsetting.php?action=updateSystemSettingUser", {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();
            return data.success;

        } catch (error) {
            console.log('Error:', error);
        }
    }
)


// delete system name if the user deletes their account
export const DeleteSettingDataThunk = createAsyncThunk(
    "SystemSettingSliceName/DeleteSettingDataThunk",
    async (systemsettinguser) => {
        try {
        const res = await fetch("http://localhost/simple_web_in_react/server/systemsetting.php?action=deleteSystemSetting", {
            method: 'POST',
            header: {'Content-Type' : 'application/json'},
            body: JSON.stringify(systemsettinguser)
        })
            
        } catch (error) {
          console.log('Error:', error);
        }
    }
)

// to edit the Reviewer App text
export const EditSystemSettingNameThunk = createAsyncThunk(
    "SystemSettingSliceName/EditSystemSettingNameThunk",
    async ({ systemSettingDataTemp }) => {
        try {
            const formData = new FormData();
            formData.append('systemSettingDataTemp', JSON.stringify(systemSettingDataTemp));

            const res = await fetch("http://localhost/simple_web_in_react/server/systemsetting.php?action=editSystemSettingName", {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();
            return data.success;

        } catch (error) {
            console.log('Error:', error);
        }
    }
)

export const InsertSystemSettingDataThunk = createAsyncThunk(
    "SystemSettingSliceName/InsertSystemSettingDataThunk",
    async ({ systemSettingDataTemp }) => {
        try {
            const formData = new FormData();
            formData.append('systemSettingDataTemp', JSON.stringify(systemSettingDataTemp));

            const res = await fetch("http://localhost/simple_web_in_react/server/systemsetting.php?action=putSystemSettingData", {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();
            return data;

        } catch (error) {
            console.log('Error:', error);
        }
    }
)