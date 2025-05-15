import { configureStore } from "@reduxjs/toolkit";
import userTypeReducer from "../features/userTypes/userTypesSlice";

export const store = configureStore({
  reducer: {
    usersType: userTypeReducer,
  },
});
