import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllSocialMedia } from "./socialMediaAPI";

export const getAllSocialMediaThunk = createAsyncThunk(
  "socialMedia/getall",
  async ({ page, limit }) => {
    return await getAllSocialMedia(page, limit);
  }
);

const SocialMediaSlice = createSlice({
  name: "SocialMedia",
  initialState: {
    socialMedias: [],
    pagination: {},
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get SocialMedia
      .addCase(getAllSocialMediaThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllSocialMediaThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.socialMedias = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(getAllSocialMediaThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default SocialMediaSlice.reducer;
