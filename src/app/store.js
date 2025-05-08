import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../features/admin/adminSlice";
import userTypeReducer from "../features/usersTypes/usersTypeSlice";
import categoryReducer from "../features/category/categorySlice";
import subCategoryReducer from "../features/subCategory/subCategorySlice";
import locationReducer from "../features/location/locationSlice";
import userReducer from "../features/users/userSlice";
import blogReducer from "../features/blog/blogSlice";
import subPropertyTypeReducer from "../features/subPropertyType/subPropertyTypeSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    usersType: userTypeReducer,
    category: categoryReducer,
    subcategory: subCategoryReducer,
    subPropertyType: subPropertyTypeReducer,
    location: locationReducer,
    users: userReducer,
    blog: blogReducer,
  },
});
