import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  creatProperty,
  getAllUserProperty,
  getAllProperty,
  getPropertyDetails,
  updateProperty,
  deleteProperty,
  addOrRemoveFavouriteProperty,
  trackPropertyViews,
  getSimilarProperties,
  getPopularSearchProperties,
} from "./propertyAPI";

export const creatPropertyThunk = createAsyncThunk(
  "property/creatProperty",
  async (payload) => {
    return await creatProperty(payload);
  }
);

export const addOrRemoveFavouritePropertyThunk = createAsyncThunk(
  "property/addOrRemoveFavouriteProperty",
  async (payload) => {
    return await addOrRemoveFavouriteProperty(payload);
  }
);

export const getSimilarPropertiesThunk = createAsyncThunk(
  "property/getSimilarProperties",
  async ({ id }) => {
    return await getSimilarProperties(id);
  }
);

export const getPopularSearchPropertiesThunk = createAsyncThunk(
  "property/getPopularSearchProperties",
  async () => {
    return await getPopularSearchProperties();
  }
);

export const trackPropertyViewsThunk = createAsyncThunk(
  "property/trackPropertyViews",
  async ({ id }) => {
    return await trackPropertyViews(id);
  }
);

export const updatePropertyThunk = createAsyncThunk(
  "property/updateProperty",
  async ({ id, formData }) => {
    return await updateProperty(id, formData);
  }
);
export const deletePropertyThunk = createAsyncThunk(
  "property/deleteProperty",
  async (id) => {
    return await deleteProperty(id);
  }
);

export const getPropertyDetailsThunk = createAsyncThunk(
  "property/getPropertyDetails",
  async ({ id }) => {
    return await getPropertyDetails(id);
  }
);

export const getAllUserPropertyThunk = createAsyncThunk(
  "property/getAllUserProperty",
  async ({ page, limit, searchFilters = {}, sort_by = "", features = "" }) => {
    return await getAllUserProperty(
      page,
      limit,
      searchFilters,
      sort_by,
      features
    );
  }
);

export const getAllFeaturePropertyThunk = createAsyncThunk(
  "property/getAllFeatureProperty",
  async ({ page, limit, searchFilters = {}, sort_by = "", features = "" }) => {
    return await getAllProperty(page, limit, searchFilters, sort_by, features);
  }
);

export const getAllPropertyThunk = createAsyncThunk(
  "property/getAllProperty",
  async ({ page, limit, searchFilters, sort_by, features }) => {
    return await getAllProperty(page, limit, searchFilters, sort_by, features);
  }
);

const propertySlice = createSlice({
  name: "property",
  initialState: {
    propertyData: [],
    featuredPropertyData: [],
    similarPropertyData: [],
    popularPropertyData: [],
    propertyDetails: {},
    hoveredProperty: [],
    pagination: null,
    loading: false,
    isLoading: false,
    isLoadingForSimilar: false,
    isLoadingForPopular: false,
    error: null,
  },
  reducers: {
    setHoveredProperty(state, action) {
      state.hoveredProperty = action.payload;
    },
    clearHoveredProperty(state) {
      state.hoveredProperty = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //Create property
      .addCase(creatPropertyThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(creatPropertyThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(creatPropertyThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //update property
      .addCase(updatePropertyThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePropertyThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updatePropertyThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //Fetch Similar property data
      .addCase(getSimilarPropertiesThunk.pending, (state) => {
        state.isLoadingForSimilar = true;
        state.similarPropertyData = [];
      })
      .addCase(getSimilarPropertiesThunk.fulfilled, (state, action) => {
        state.similarPropertyData = action.payload.data;
        state.isLoadingForSimilar = false;
      })
      .addCase(getSimilarPropertiesThunk.rejected, (state, action) => {
        state.isLoadingForSimilar = false;
        state.error = action.error.message;
        state.similarPropertyData = null;
      })

      //Fetch getPopularSearchPropertiesThunk property data
      .addCase(getPopularSearchPropertiesThunk.pending, (state) => {
        state.isLoadingForPopular = true;
        state.popularPropertyData = [];
      })
      .addCase(getPopularSearchPropertiesThunk.fulfilled, (state, action) => {
        state.popularPropertyData = action.payload.data;
        state.isLoadingForPopular = false;
      })
      .addCase(getPopularSearchPropertiesThunk.rejected, (state, action) => {
        state.isLoadingForPopular = false;
        state.error = action.error.message;
        state.popularPropertyData = null;
      })

      //addOrRemoveFavouriteProperty
      .addCase(addOrRemoveFavouritePropertyThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(addOrRemoveFavouritePropertyThunk.fulfilled, (state, action) => {
        state.loading = false;

        const propertyId = action?.meta?.arg;

        state.propertyData = state?.propertyData?.map((property) =>
          property?._id === propertyId
            ? { ...property, is_liked: !property?.is_liked }
            : property
        );
      })
      .addCase(addOrRemoveFavouritePropertyThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //delete property
      .addCase(deletePropertyThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePropertyThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deletePropertyThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //Fetch property details
      .addCase(getPropertyDetailsThunk.pending, (state) => {
        state.isLoading = true;
        state.propertyDetails = [];
      })
      .addCase(getPropertyDetailsThunk.fulfilled, (state, action) => {
        state.propertyDetails = action.payload.data[0];
        state.pagination = action.payload.pagination;
        state.isLoading = false;
      })
      .addCase(getPropertyDetailsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.propertyDetails = null;
      })

      //Feature property details
      .addCase(getAllFeaturePropertyThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllFeaturePropertyThunk.fulfilled, (state, action) => {
        state.featuredPropertyData = action.payload.data;
        state.pagination = action.payload.pagination;
        state.isLoading = false;
      })
      .addCase(getAllFeaturePropertyThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.featuredPropertyData = null;
      })

      .addCase(getAllUserPropertyThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUserPropertyThunk.fulfilled, (state, action) => {
        state.pagination = action.payload.pagination;
        state.propertyData = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getAllUserPropertyThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.propertyData = null;
      })

      .addCase(getAllPropertyThunk.pending, (state) => {
        state.isLoading = true;
        state.propertyData = [];
      })
      .addCase(getAllPropertyThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.propertyData = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(getAllPropertyThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.propertyData = null;
      });
  },
});

export const { setHoveredProperty, clearHoveredProperty } = propertySlice.actions;

export default propertySlice.reducer;
