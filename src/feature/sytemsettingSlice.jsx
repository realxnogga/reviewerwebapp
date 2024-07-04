

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HelperFormDataFunction } from "../utils/helperformdatafunction";
import { HelperThunkFunction } from "../utils/helperthunkfunction";

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

        return HelperThunkFunction('systemsetting.php?action=getSystemSettingName', 'POST', systemsettinguser, false);

    }
)


// to edit the Reviewer App text
export const UpdateSystemSettingUserThunk = createAsyncThunk(
    "SystemSettingSliceName/UpdateSystemSettingUserThunk",
    async ({ datatobeupdated }) => {

        const formData = HelperFormDataFunction(datatobeupdated);
        return HelperThunkFunction('systemsetting.php?action=updateSystemSettingUser', 'POST', formData, true);

    }
)


// delete system name if the user deletes their account
export const DeleteSettingDataThunk = createAsyncThunk(
    "SystemSettingSliceName/DeleteSettingDataThunk",
    async (systemsettinguser) => {

        return HelperThunkFunction('systemsetting.php?action=deleteSystemSetting', 'POST', systemsettinguser, false);

    }
)

// to edit the Reviewer App text
export const EditSystemSettingNameThunk = createAsyncThunk(
    "SystemSettingSliceName/EditSystemSettingNameThunk",
    async ({ systemSettingDataTemp }) => {

        const formData = HelperFormDataFunction(systemSettingDataTemp);
        return HelperThunkFunction('systemsetting.php?action=editSystemSettingName', 'POST', formData, true);

    }
)

export const InsertSystemSettingDataThunk = createAsyncThunk(
    "SystemSettingSliceName/InsertSystemSettingDataThunk",
    async ({ systemSettingDataTemp }) => {

        const formData = HelperFormDataFunction(systemSettingDataTemp);
        return HelperThunkFunction('systemsetting.php?action=putSystemSettingData', 'POST', formData, true);

    }
)