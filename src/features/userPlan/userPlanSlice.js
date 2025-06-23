import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllPlanForUser } from "./userPlanAPI";

export const getAllPlanForUserThunk = createAsyncThunk(
  "userplan/getAllPlanForUser",
  async ({ page, limit, user_type }) => {
    return await getAllPlanForUser( page, limit, user_type );
  }
);

const UserPlanSlice = createSlice({
  name: "UsersPlans",
  initialState: {
    plans: [],
    pagination: {},
    loading: false,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Get plans
      .addCase(getAllPlanForUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPlanForUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.plans = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(getAllPlanForUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default UserPlanSlice.reducer;
