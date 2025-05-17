import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllActiveCategory,
  getAllActiveSubCategory,
  getAllActivesubSubCategory,
} from "./activeDataAPI";

export const getAllActiveCategoryThunk = createAsyncThunk(
  "users/getAllActiveCategory",
  async (payload) => {
    return await getAllActiveCategory(payload);
  }
);
export const getAllActiveSubCategoryThunk = createAsyncThunk(
  "users/getAllActiveSubCategory",
  async ({categoryId}) => {
    return await getAllActiveSubCategory(categoryId);
  }
);
export const getAllActivesubSubCategoryThunk = createAsyncThunk(
  "users/getAllActivesubSubCategory",
  async ({subCategoryId}) => {
    return await getAllActivesubSubCategory(subCategoryId);
  }
);

// Initial State
const initialState = {
  categories: [],
  subCategories: [],
  subSubCategories: [],
  loading: false,
  error: null,
};

const activeDataSlice = createSlice({
  name: "activeData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Category
      .addCase(getAllActiveCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllActiveCategoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.data || [];
      })
      .addCase(getAllActiveCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Subcategory
      .addCase(getAllActiveSubCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllActiveSubCategoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.subCategories = action.payload.data || [];
      })
      .addCase(getAllActiveSubCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Sub-Subcategory
      .addCase(getAllActivesubSubCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllActivesubSubCategoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.subSubCategories = action.payload.data || [];
      })
      .addCase(getAllActivesubSubCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default activeDataSlice.reducer;
