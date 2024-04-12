
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const InsertResourceDataSlice = createSlice({
    name: 'InsertResourceDataSliceName',
    initialState: {
        isResourceDataInserted: null,
        resourceData: [],
    },
    reducers: {
        ClearIsResourceDataInsertedState: (state) => {
            state.isResourceDataInserted = null; 
        }
    },
    extraReducers: builder => {
        builder
          .addCase(InsertResourceDataThunk.fulfilled, (state, action) => {
            state.isResourceDataInserted = action.payload;
 
          })
          .addCase(GetResourceDataThunk.fulfilled, (state, action) => {
            state.resourceData = action.payload;
 
          })
      }

})


export const {ClearIsResourceDataInsertedState} = InsertResourceDataSlice.actions;
export const isResourceDataInsertedTemp = state => state.InsertResourceDataSliceName.isResourceDataInserted;
export const resourceDataTemp = state => state.InsertResourceDataSliceName.resourceData;

export const insertResourceDataSliceReducer = InsertResourceDataSlice.reducer;

export const GetResourceDataThunk = createAsyncThunk(
    "InsertResourceDataSliceName/GetResourceDataThunk",
    async () => {
        try {
            const res = await fetch("http://localhost/simple_web_in_react/server/learningresource.php?action=getLearningResourceData", {
                method: 'GET',
            });
            const data = await res.json();
            return data;

        } catch (error) {
            console.log('Error:', error);
        }
    }
)

export const InsertResourceDataThunk = createAsyncThunk(
    "InsertResourceDataSliceName/InsertResourceDataThunk",

    async ({ resourceDataTemp, resourceDataActualFile }) => {
        try {
            const formData = new FormData();
            formData.append('resourceDataTemp', JSON.stringify(resourceDataTemp));
            formData.append('resourceDataActualFile', resourceDataActualFile);

            const res = await fetch("http://localhost/simple_web_in_react/server/learningresource.php?action=putLearningResourceData", {
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