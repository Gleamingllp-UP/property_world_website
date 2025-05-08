import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addUsers,
  deleteUsers,
  getAllUsers,
  updateUsers,
  updateUsersStatusWithKey,
} from "./usersAPI";

export const addingUsers = createAsyncThunk("Users/add", async (payload) => {
  return await addUsers(payload);
});

export const fetchAllUser = createAsyncThunk(
  "Users/getall",
  async ({ UserTypeId, page, limit,activeSubTab }) => {
    return await getAllUsers(UserTypeId, page, limit,activeSubTab);
  }
);

export const editUsers = createAsyncThunk("Users/edit", async (payload) => {
  return await updateUsers(payload?.id, payload);
});

export const removeUsers = createAsyncThunk("Users/remove", async (payload) => {
  return await deleteUsers(payload);
});

export const toggleUserstatusWithKey = createAsyncThunk(
  "Users/updateStatus",
  async ({ id, key }) => {
    return await updateUsersStatusWithKey(id, key);
  }
);

const UsersSlice = createSlice({
  name: "Users",
  initialState: {
    Users: [],
    pagination: {},
    loading: false,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Userss
      .addCase(fetchAllUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.Users = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchAllUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Add Users
      .addCase(addingUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(addingUsers.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addingUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Edit Users
      .addCase(editUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(editUsers.fulfilled, (state, action) => {
        const updatedUsers = action.payload.data;
        const index = state.Users.findIndex((u) => u._id === updatedUsers?._id);
        if (index !== -1) {
          state.Users[index] = updatedUsers;
        }
        state.loading = false;
      })
      .addCase(editUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Remove Users
      .addCase(removeUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeUsers.fulfilled, (state, action) => {
        const removedUsersId = action.payload.id;
        state.Users = state.Users.filter(
          (Users) => Users._id !== removedUsersId
        );
        state.loading = false;
      })
      .addCase(removeUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //update status
      .addCase(toggleUserstatusWithKey.fulfilled, (state, action) => {
        const updatedUsersId = action.payload.id;
        const updatedUsersKey = action.payload.key;
        const updatedStatus = action.payload.data[action.payload.key];

        const UsersIndex = state.Users.findIndex(
          (Users) => Users._id === updatedUsersId
        );
        if (UsersIndex !== -1) {
          state.Users[UsersIndex][updatedUsersKey] = updatedStatus;
        }
      });
  },
});

export default UsersSlice.reducer;
