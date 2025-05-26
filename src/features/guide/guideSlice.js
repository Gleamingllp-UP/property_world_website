import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getGuideByType } from "./guideAPI";

export const getGuideByTypeThunk = createAsyncThunk(
  "guide/getbytype",
  async ({ type }) => {
    return await getGuideByType(type);
  }
);

const GuideSlice = createSlice({
  name: "Guide",
  initialState: {
    guides: [],
    loading: false,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearGuides: (state) => {
      state.guides = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Guide
      .addCase(getGuideByTypeThunk.pending, (state) => {
        state.isLoading = true;
        state.guides = null;
      })
      .addCase(getGuideByTypeThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.guides = action.payload.data;
      })
      .addCase(getGuideByTypeThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.guides = null;
        state.error = action.error.message;
      });
  },
});

export const { clearGuides } = GuideSlice.actions;

export default GuideSlice.reducer;
