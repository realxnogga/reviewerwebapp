
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HelperThunkFunction } from "../utils/helperthunkfunction";
import { HelperFormDataFunction } from "../utils/helperformdatafunction";

export const InsertResourceDataSlice = createSlice({
    name: 'InsertResourceDataSliceName',
    initialState: {
        isResourceDataInserted: null,
        resourceData: [],
        resourceCount: 0,
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
            .addCase(GetResourceCountThunk.fulfilled, (state, action) => {
                state.resourceCount = action.payload;
            })
    }

})

export const { ClearIsResourceDataInsertedState } = InsertResourceDataSlice.actions;
export const resourceCountTemp = state => state.InsertResourceDataSliceName.resourceCount;
export const isResourceDataInsertedTemp = state => state.InsertResourceDataSliceName.isResourceDataInserted;
export const resourceDataTemp = state => state.InsertResourceDataSliceName.resourceData;
export const insertResourceDataSliceReducer = InsertResourceDataSlice.reducer;


export const GetResourceCountThunk = createAsyncThunk(
    "InsertResourceDataSliceName/GetResourceCountThunk",
    async () => {

        return HelperThunkFunction('learningresource.php?action=getLearningResourceCount', 'GET', null, false);

    }
)

export const GetResourceDataThunk = createAsyncThunk(
    "InsertResourceDataSliceName/GetResourceDataThunk",
    async () => {

        return HelperThunkFunction('learningresource.php?action=getLearningResourceData', 'GET', null, false);

    }
)

export const InsertResourceDataThunk = createAsyncThunk(
    "InsertResourceDataSliceName/InsertResourceDataThunk",

    async ({ resourceDataTemp, resourceDataActualFile }) => {

        const formData = HelperFormDataFunction(resourceDataTemp, resourceDataActualFile);
        return HelperThunkFunction('learningresource.php?action=putLearningResourceData', 'POST', formData, true);

    }
)