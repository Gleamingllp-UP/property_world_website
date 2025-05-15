import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsersTypes } from "./userTypesAPI";

export const fetchAllUserTypes = createAsyncThunk(
  "Users/getallUserTypes",
  async () => {
    return await getAllUsersTypes();
  }
);

const UsersSlice = createSlice({
  name: "Users",
  initialState: {
    userTypes: [],
    pagination: {},
    selectedUserType: null,
    loading: false,
    isLoading: false,
    error: null,
  },
  reducers: {
    setSelectedUserType: (state, action) => {
      state.selectedUserType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Userss
      .addCase(fetchAllUserTypes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllUserTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userTypes = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchAllUserTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedUserType } = UsersSlice.actions;

export default UsersSlice.reducer;
