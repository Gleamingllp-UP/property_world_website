import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBannerByType } from "./bannerAPI";

export const getBannerByTypeThunk = createAsyncThunk(
  "banner/getall",
  async (type) => {
    return await getBannerByType(type);
  }
);

const BannerSlice = createSlice({
  name: "Banner",
  initialState: {
    banners: {},
    pagination: {},
    loading: false,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Banners
      .addCase(getBannerByTypeThunk.pending, (state) => {
        state.isLoading = true;
        state.banners = {};
      })
      .addCase(getBannerByTypeThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.banners = action.payload.data;
      })
      .addCase(getBannerByTypeThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default BannerSlice.reducer;
