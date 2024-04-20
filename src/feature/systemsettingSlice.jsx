
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const SystemSettingSlice = createSlice({
    name: 'SystemSettingSliceName',
    initialState: {
        systemData: [],
        isSystemNameUpdated: null,
    },
    reducers: {
        clearIsSystemNameUpdatedState: (state) => {
            state.isSystemNameUpdated = null;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(GetSettingDataThunk.fulfilled, (state, action) => {
                state.systemData = action.payload[0];
            })  
            .addCase(EditSettingDataThunk.fulfilled, (state, action) => {
                state.isSystemNameUpdated = action.payload;
            })  
    }
})

export const {clearIsSystemNameUpdatedState} = SystemSettingSlice.actions;
export const systemDataTemp = state => state.SystemSettingSliceName.systemData;
export const isSystemNameUpdatedTemp = state => state.SystemSettingSliceName.isSystemNameUpdated;
export const systemSettingSliceReducer = SystemSettingSlice.reducer;


export const EditSettingDataThunk = createAsyncThunk(
    "SystemSettingSliceName/EditSettingDataThunk",
    async ({systemSettingTemp}) => {
        try {
        
        const res = await fetch("http://localhost/simple_web_in_react/server/systemsetting.php?action=editSystemSetting", {
            method: 'POST',
            header: {'Content-Type' : 'application/json'},
            body: JSON.stringify(systemSettingTemp)
        })
        const data = await res.json();
        return data.success;
            
        } catch (error) {
          console.log('Error', error);  
        }
    }
)


export const GetSettingDataThunk = createAsyncThunk(
    "SystemSettingSliceName/GetSettingDataThunk",
    async (systemsettinguser) => {
        try {
        
        const res = await fetch("http://localhost/simple_web_in_react/server/systemsetting.php?action=getSystemSetting", {
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


export const InsertSettingDataThunk = createAsyncThunk(
    "SystemSettingSliceName/SystemSettingThunk",
    async (systemsettinguser) => {
        try {
            const formData = new FormData();
            formData.append('systemsettinguser', JSON.stringify(systemsettinguser));

            const res = await fetch("http://localhost/simple_web_in_react/server/systemsetting.php?action=insertSystemSetting", {
               method: "POST",
               body: formData
            })
            
        } catch (error) {
           console.log("Error", error); 
        }
    }
)