import { configureStore } from "@reduxjs/toolkit";
import userTypeReducer from "../features/userTypes/userTypesSlice";
import userReducer from "../features/user/userSlice";
import activeDataReducer from "../features/activeData/activeDataSlice";

export const store = configureStore({
  reducer: {
    usersType: userTypeReducer,
    user: userReducer,
    activeData: activeDataReducer,
  },
});
