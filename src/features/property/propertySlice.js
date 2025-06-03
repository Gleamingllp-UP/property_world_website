import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  creatProperty,
  getAllUserProperty,
  getAllProperty,
  getPropertyDetails,
} from "./propertyAPI";

export const creatPropertyThunk = createAsyncThunk(
  "property/creatProperty",
  async (payload) => {
    return await creatProperty(payload);
  }
);
export const getPropertyDetailsThunk = createAsyncThunk(
  "property/getPropertyDetails",
  async ({ id }) => {
    return await getPropertyDetails(id);
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
  async ({ page, limit, searchFilters, sort_by, features }) => {
    return await getAllProperty(page, limit, searchFilters, sort_by, features);
  }
);

const propertySlice = createSlice({
  name: "property",
  initialState: {
    propertyData: [],
    propertyDetails: {},
    pagination: null,
    loading: false,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Create property
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

      //Fetch property details
      .addCase(getPropertyDetailsThunk.pending, (state) => {
        state.isLoading = true;
        state.propertyDetails = null;
      })
      .addCase(getPropertyDetailsThunk.fulfilled, (state, action) => {
        state.propertyDetails = action.payload.data[0];
        state.isLoading = false;
      })
      .addCase(getPropertyDetailsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.propertyDetails = null;
      })

      .addCase(getAllUserPropertyThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUserPropertyThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.propertyData = action.payload.data;
      })
      .addCase(getAllUserPropertyThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(getAllPropertyThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPropertyThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.propertyData = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(getAllPropertyThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default propertySlice.reducer;
