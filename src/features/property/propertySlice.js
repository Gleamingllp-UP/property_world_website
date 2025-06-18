import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  creatProperty,
  getAllUserProperty,
  getAllProperty,
  getPropertyDetails,
  updateProperty,
  deleteProperty
} from "./propertyAPI";

export const creatPropertyThunk = createAsyncThunk(
  "property/creatProperty",
  async (payload) => {
    return await creatProperty(payload);
  }
);

export const updatePropertyThunk = createAsyncThunk(
  "property/updateProperty",
  async (payload) => {
    return await updateProperty(payload);
  }
);
export const deletePropertyThunk = createAsyncThunk(
  "property/deleteProperty",
  async (id) => {
    return await deleteProperty(id);
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
  async ({ page, limit, searchFilters = {}, sort_by = "", features = "" }) => {
    return await getAllUserProperty(
      page,
      limit,
      searchFilters,
      sort_by,
      features
    );
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

      //update property
      .addCase(updatePropertyThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePropertyThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updatePropertyThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      //delete property
      .addCase(deletePropertyThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePropertyThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deletePropertyThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //Fetch property details
      .addCase(getPropertyDetailsThunk.pending, (state) => {
        state.isLoading = true;
        state.propertyDetails = [];
      })
      .addCase(getPropertyDetailsThunk.fulfilled, (state, action) => {
        state.propertyDetails = action.payload.data[0];
        state.pagination = action.payload.pagination;
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
        state.pagination = action.payload.pagination;
        state.propertyData = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getAllUserPropertyThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(getAllPropertyThunk.pending, (state) => {
        state.isLoading = true;
        state.propertyData = [];
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
