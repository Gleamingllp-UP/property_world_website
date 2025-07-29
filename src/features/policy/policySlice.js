import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPolicyByType, getBotContent } from "./policyAPI";

export const fetchPolicyByTypeThunk = createAsyncThunk(
  "policy/getbytype",
  async ({ type }) => {
    return await getPolicyByType(type);
  }
);

export const getBotContentTypeThunk = createAsyncThunk(
  "policy/getBotContent",
  async ({ type }) => {
    return await getBotContent(type);
  }
);

const PolicySlice = createSlice({
  name: "Policy",
  initialState: {
    policies: [],
    botContent: {},
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
      })

      // Get getBotContentTypeThunk
      .addCase(getBotContentTypeThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBotContentTypeThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.botContent = action.payload.data;
      })
      .addCase(getBotContentTypeThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.botContent = {};
        state.error = action.error.message;
      });
  },
});

export const { clearPolicies } = PolicySlice.actions;

export default PolicySlice.reducer;
