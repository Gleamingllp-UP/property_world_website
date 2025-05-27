import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { initiateInquiry } from "./inquiryapi";

export const initiateInquiryThunk = createAsyncThunk(
  "Inquiry/initiateSignUp",
  async (payload) => {
    return await initiateInquiry(payload);
  }
)




const usersSlice = createSlice({
  name: "Inquiry",
  initialState: {
  
    isLoading: false,
    error: null,
  },
  reducers: {
   
 },
  extraReducers: (builder) => {
    builder
      // Initiate Signup
      .addCase(initiateInquiryThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(initiateInquiryThunk.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(initiateInquiryThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

   
  },
});

export const { getUserFormData, removeUserFormDataToken } = usersSlice.actions;
export default usersSlice.reducer;
