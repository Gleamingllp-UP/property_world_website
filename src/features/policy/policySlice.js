import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPolicyByType } from "./policyAPI";

export const fetchPolicyByTypeThunk = createAsyncThunk(
  "policy/getbytype",
  async ({ type }) => {
    return await getPolicyByType(type);
  }
);

const PolicySlice = createSlice({
  name: "Policy",
  initialState: {
    policies: [],
    loading: false,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearPolicies: (state) => {
      state.policies = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Policy
      .addCase(fetchPolicyByTypeThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPolicyByTypeThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.policies = action.payload.data;
      })
      .addCase(fetchPolicyByTypeThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearPolicies } = PolicySlice.actions;

export default PolicySlice.reducer;
