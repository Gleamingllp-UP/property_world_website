import { configureStore } from "@reduxjs/toolkit";
import userTypeReducer from "../features/userTypes/userTypesSlice";
import userReducer from "../features/user/userSlice";
import activeDataReducer from "../features/activeData/activeDataSlice";
import blogReducer from "../features/blog/blogSlice";
import policyReducer from "../features/policy/policySlice";
import aboutUsReducer from "../features/aboutUs/aboutUsSlice";
import bannerReducer from "../features/banner/bannerSlice";

export const store = configureStore({
  reducer: {
    usersType: userTypeReducer,
    user: userReducer,
    activeData: activeDataReducer,
    blog: blogReducer,
    policy: policyReducer,
    aboutUs: aboutUsReducer,
    banner: bannerReducer,
  },
});
