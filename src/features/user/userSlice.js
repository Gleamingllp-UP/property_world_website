import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { initiateSignup, verifyCode, setPassword } from "./userAPI";

export const initiateSignupThunk = createAsyncThunk(
  "users/initiateSignUp",
  async (payload) => {
    return await initiateSignup(payload);
  }
);
export const verifyCodeThunk = createAsyncThunk(
  "users/verifyCode",
  async (payload) => {
    return await verifyCode(payload);
  }
);
export const setPasswordThunk = createAsyncThunk(
  "users/setPassword",
  async (payload) => {
    return await setPassword(payload);
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    userData: [],
    formData: null,
    loading: false,
    isLoading: false,
    error: null,
  },
  reducers: {
    getUserFormData: (state) => {
      const formData = JSON.parse(localStorage.getItem("formData"));
      state.formData = formData;
    },
    removeUserFormDataToken: (state) => {
      localStorage.removeItem("formData");
      localStorage.removeItem("userToken");
      state.formData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Initiate Signup
      .addCase(initiateSignupThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(initiateSignupThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload.data;
        localStorage.setItem("userToken", action.payload.temporaryToken);
        localStorage.setItem("code", action.payload.code);
      })
      .addCase(initiateSignupThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      //Verify Code
      .addCase(verifyCodeThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyCodeThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(verifyCodeThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      //Set Password
      .addCase(setPasswordThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setPasswordThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload.data;
        localStorage.removeItem("userToken");
        localStorage.removeItem("code");
      })
      .addCase(setPasswordThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { getUserFormData, removeUserFormDataToken } = usersSlice.actions;
export default usersSlice.reducer;
