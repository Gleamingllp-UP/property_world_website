import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllPlanForUser, getUserPlan } from "./userPlanAPI";

export const getAllPlanForUserThunk = createAsyncThunk(
  "userplan/getAllPlanForUser",
  async ({ page, limit, user_type }) => {
    return await getAllPlanForUser(page, limit, user_type);
  }
);

export const getUserPlanThunk = createAsyncThunk(
  "userplan/getUserPlan",
  async ({ user_id }) => {
    return await getUserPlan(user_id);
  }
);

const UserPlanSlice = createSlice({
  name: "UsersPlans",
  initialState: {
    plans: [],
    activePlans: {},
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
      })

      // Get active plans
      .addCase(getUserPlanThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserPlanThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.activePlans = action.payload.data;
      })
      .addCase(getUserPlanThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default UserPlanSlice.reducer;
