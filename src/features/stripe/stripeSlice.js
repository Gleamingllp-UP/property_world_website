import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createStripeCheckoutSession, verifyPaymentSession } from "./stripeAPI";

export const createStripeCheckoutSessionThunk = createAsyncThunk(
  "payment/createStripeCheckoutSession",
  async ({ name, amount, user_id, plan_id }) => {
    return await createStripeCheckoutSession(name, amount, user_id, plan_id);
  }
);
export const verifyPaymentSessionThunk = createAsyncThunk(
  "payment/verifyPaymentSession",
  async ({ session_id }) => {
    return await verifyPaymentSession(session_id);
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    loading: false,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // createStripeCheckoutSessionThunk
      .addCase(createStripeCheckoutSessionThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createStripeCheckoutSessionThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createStripeCheckoutSessionThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // createStripeCheckoutSessionThunk
      .addCase(verifyPaymentSessionThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyPaymentSessionThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifyPaymentSessionThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default paymentSlice.reducer;
