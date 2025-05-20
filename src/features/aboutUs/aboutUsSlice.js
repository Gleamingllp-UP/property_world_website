import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllAboutUs } from "./aboutUsAPI";

export const fetchAllAboutUsThunk = createAsyncThunk(
  "aboutUs/getall",
  async ({ page, limit }) => {
    console.log("thunk")
    return await getAllAboutUs(page, limit);
  }
);

const AboutUsSlice = createSlice({
  name: "AboutUs",
  initialState: {
    aboutUs: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get AboutUss
      .addCase(fetchAllAboutUsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAboutUsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.aboutUs = action.payload.data;
      })
      .addCase(fetchAllAboutUsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default AboutUsSlice.reducer;
