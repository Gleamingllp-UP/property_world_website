import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { creatProperty, getPropertyDetails } from "./propertyAPI";

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
const propertySlice = createSlice({
  name: "property",
  initialState: {
    propertyData: [],
    propertyDetails: {},
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
      })
      .addCase(getPropertyDetailsThunk.fulfilled, (state, action) => {
        state.propertyDetails = action.payload.data[0];
        state.isLoading = false;
      })
      .addCase(getPropertyDetailsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default propertySlice.reducer;
