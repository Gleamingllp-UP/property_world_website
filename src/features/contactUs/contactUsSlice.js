import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllContactUs } from "./contactUsAPI";

export const getAllContactUsThunk = createAsyncThunk(
  "contactUs/getall",
  async () => {
    return await getAllContactUs();
  }
);

const ContactUsSlice = createSlice({
  name: "ContactUs",
  initialState: {
    contactUs: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get ContactUs
      .addCase(getAllContactUsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllContactUsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contactUs = action.payload.data;
      })
      .addCase(getAllContactUsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default ContactUsSlice.reducer;
