import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addGetIntouch } from "./getintouchAPI";

export const initiateGetInTouchThunk = createAsyncThunk(
  "getInTouch/addGetIntouch",
  async (payload) => {
    return await addGetIntouch(payload);
  }
);

const usersSlice = createSlice({
  name: "Inquiry",
  initialState: {
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Initiate Signup
      .addCase(initiateGetInTouchThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(initiateGetInTouchThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(initiateGetInTouchThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

      
  },
});

export const { getUserFormData, removeUserFormDataToken } = usersSlice.actions;
export default usersSlice.reducer;