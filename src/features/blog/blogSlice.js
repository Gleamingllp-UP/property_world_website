import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllblogForUser,
  getBlogByIdForUser,
  getBlogCategoryWithCount,
} from "./blogAPI";

export const getAllBlogsThunk = createAsyncThunk(
  "blog/getall",
  async ({ page, limit }) => {
    return await getAllblogForUser(page, limit);
  }
);
export const getBlogsByIdThunk = createAsyncThunk(
  "blog/getblogbyid",
  async (id) => {
    return await getBlogByIdForUser(id);
  }
);
export const getBlogCategoryWithCountThunk = createAsyncThunk(
  "blog/getBlogCategoryWithCount",
  async () => {
    return await getBlogCategoryWithCount();
  }
);

const BlogSlice = createSlice({
  name: "Blog",
  initialState: {
    blogs: [],
    blogDetails: {},
    blogsCategory: [],
    pagination: {},
    loading: false,
    isLoading: false,
    isLoading2: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Blogs
      .addCase(getAllBlogsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBlogsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogs = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(getAllBlogsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Get Blog by id
      .addCase(getBlogsByIdThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogsByIdThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogDetails = action.payload.data;
      })
      .addCase(getBlogsByIdThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Get Blog Category With Count
      .addCase(getBlogCategoryWithCountThunk.pending, (state) => {
        state.isLoading2 = true;
      })
      .addCase(getBlogCategoryWithCountThunk.fulfilled, (state, action) => {
        state.isLoading2 = false;
        state.blogsCategory = action.payload.data;
      })
      .addCase(getBlogCategoryWithCountThunk.rejected, (state, action) => {
        state.isLoading2 = false;
        state.error = action.error.message;
      });
  },
});

export default BlogSlice.reducer;
