import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  initiateSignup,
  verifyCode,
  setPassword,
  userLogin,
  getUserDetails,
  guestUserLogin,
  updateUserDetails,
  getAllUserForWeb,
  getUserAllDetailsForWebWithProperties,
} from "./userAPI";

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
export const userLoginThunk = createAsyncThunk(
  "users/userLogin",
  async (payload) => {
    return await userLogin(payload);
  }
);
export const getUserDetailsThunk = createAsyncThunk(
  "users/getUserDetails",
  async () => {
    return await getUserDetails();
  }
);
// features/user/userSlice.js
export const getAllUserForWebThunk = createAsyncThunk(
  "users/getAllUserForWeb",
  async ({ service_need, search, nationality, language,page,limit }) => {
    return await getAllUserForWeb(service_need, search, nationality, language,page,limit);
  }
);

export const guestUserLoginThunk = createAsyncThunk(
  "users/guestUserLogin",
  async () => {
    return await guestUserLogin();
  }
);

export const updateUserDetailsThunk = createAsyncThunk(
  "users/updateUserDetails",
  async ({ id, formData }) => {
    return await updateUserDetails(id, formData);
  }
);

export const getUserAllDetailsForWebWithPropertiesThunk = createAsyncThunk(
  "users/getUserAllDetailsForWebWithProperties",
  async ({id, page, limit, sort_by=""}) => {
    return await getUserAllDetailsForWebWithProperties(id, page, limit, sort_by);
  }
);


export const logoutUser = createAsyncThunk("users/logout", async () => {
  localStorage.removeItem("userData");
  localStorage.removeItem("userToken");
  return true;
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    userData: [],
    pagination: {},
    agentOrAgencyData: [],
    agentOrAgencyDetails: {},
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
    getUserData: (state) => {
      const userData = JSON.parse(localStorage.getItem("userData"));
      state.userData = userData;
    },
    removeUserFormDataToken: (state) => {
      localStorage.removeItem("formData");
      localStorage.removeItem("userToken");
      state.userData = null;
    },
    userLogOut: (state) => {
      localStorage.removeItem("userData");
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
        state.loading = true;
      })
      .addCase(setPasswordThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload.data;
        localStorage.removeItem("userToken");
        localStorage.removeItem("code");
      })
      .addCase(setPasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //User Login
      .addCase(userLoginThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userLoginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload.data;
        localStorage.setItem("userToken", action.payload.token);
        localStorage.setItem("userData", JSON.stringify(action.payload.data));
      })
      .addCase(userLoginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      //User Logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.userData = [];
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      //Guest User Login
      .addCase(guestUserLoginThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(guestUserLoginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload.data;
        localStorage.setItem("userToken", action.payload.token);
        localStorage.setItem("userData", JSON.stringify(action.payload.data));
      })
      .addCase(guestUserLoginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      //Get User Details
      .addCase(getUserDetailsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserDetailsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload.data;
        localStorage.setItem("userData", JSON.stringify(action.payload.data));
      })
      .addCase(getUserDetailsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      //user Agent and agency  info data  Thunk
      .addCase(getUserAllDetailsForWebWithPropertiesThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserAllDetailsForWebWithPropertiesThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.agentOrAgencyDetails = action.payload.data;
        state.pagination = action.payload.data.pagination;
      })
      .addCase(getUserAllDetailsForWebWithPropertiesThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

//getAllUserForWebThunk
         .addCase(getAllUserForWebThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUserForWebThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.agentOrAgencyData = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(getAllUserForWebThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      //Update User Details
      .addCase(updateUserDetailsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserDetailsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload.data;
        localStorage.setItem("userData", JSON.stringify(action.payload.data));
      })
      .addCase(updateUserDetailsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  getUserFormData,
  removeUserFormDataToken,
  getUserData,
  userLogOut,
} = usersSlice.actions;
export default usersSlice.reducer;
