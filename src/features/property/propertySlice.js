import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { creatProperty,getAllUserProperty, getAllProperty } from "./propertyAPI";

export const creatPropertyThunk = createAsyncThunk(
  "property/creatProperty",
  async (payload) => {
    return await creatProperty(payload);
  }
);

export const getAllUserPropertyThunk = createAsyncThunk(
  "property/getAllUserProperty",
  async (payload) => {
    return await getAllUserProperty(payload);
  }
);


export const getAllPropertyThunk = createAsyncThunk(
  "property/getAllProperty",
  async ({page,limit,searchFilters}) => {
    
    return await getAllProperty(page,limit,searchFilters);
  }
);

const propertySlice = createSlice({
  name: "property",
  initialState: {
    propertyData: [],
    pagination:null,
    loading: false,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Initiate Signup
      .addCase(creatPropertyThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(creatPropertyThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(creatPropertyThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

        .addCase(getAllUserPropertyThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUserPropertyThunk.fulfilled, (state,action) => {
        state.isLoading = false;
        state.propertyData=action.payload.data
      })
      .addCase(getAllUserPropertyThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

        .addCase(getAllPropertyThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPropertyThunk.fulfilled, (state,action) => {
        state.isLoading = false;
        state.propertyData=action.payload.data
        state.pagination=action.payload.pagination
      })
      .addCase(getAllPropertyThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
  },
});

export default propertySlice.reducer;
