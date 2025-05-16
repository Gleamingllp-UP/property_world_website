import { configureStore } from "@reduxjs/toolkit";
import userTypeReducer from "../features/userTypes/userTypesSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    usersType: userTypeReducer,
    user: userReducer,
  },
});
