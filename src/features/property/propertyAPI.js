import api from "../../services/api";
import { endpoints } from "../../utils/endpoints/endpoints";

export const creatProperty = async (payload) => {
  try {
    const response = await api.post(endpoints.createProperty, payload);
    return response.data;
  } catch (error) {
    if (error?.status !== 401) {
      throw (
        error?.response?.data?.message ||
        "Failed to create property, please try again later."
      );
    } else {
      throw (
        error?.message || "Failed to create property, please try again later."
      );
    }
  }
};

export const getAllUserProperty = async (
  page,
  limit,
  searchFilters = {},
  sort_by = "",
  features
) => {
  try {
    const cleanedFilters = Object.fromEntries(
      Object.entries(searchFilters).filter(([_, value]) => Boolean(value))
    );

    const queryParams = new URLSearchParams({
      page,
      limit,
      ...cleanedFilters,
    });

    const response = await api.get(
      `${
        endpoints.getUsersAllProperty
      }?${queryParams.toString()}&sort_by=${sort_by}&features=${features}`
    );
    return response.data;
  } catch (error) {
    if (error?.status !== 401) {
      throw (
        error?.response?.data?.message ||
        "Failed to get property, please try again later."
      );
    } else {
      throw error?.message || "Failed to get property, please try again later.";
    }
  }
};

export const getPropertyDetails = async (id) => {
  try {
    const response = await api.get(endpoints.getProperty + `/${id}`);
    return response.data;
  } catch (error) {
    if (error?.status !== 401) {
      throw (
        error?.response?.data?.message ||
        "Failed to get property, please try again later."
      );
    } else {
      throw error?.message || "Failed to get property, please try again later.";
    }
  }
};

export const getAllProperty = async (
  page,
  limit,
  searchFilters = {},
  sort_by = "",
  features = ""
) => {
  try {
    const cleanedFilters = Object.fromEntries(
      Object.entries(searchFilters).filter(([_, value]) => Boolean(value))
    );

    const queryParams = new URLSearchParams({
      page,
      limit,
      ...cleanedFilters,
    });

    const response = await api.get(
      `${
        endpoints.getAllPropertyForUser
      }?${queryParams.toString()}&sort_by=${sort_by}&features=${features}`
    );
    return response.data;
  } catch (error) {
    if (error?.status !== 401) {
      throw (
        error?.response?.data?.message ||
        "Failed to get property, please try again later."
      );
    } else {
      throw error?.message || "Failed to get property, please try again later.";
    }
  }
};

export const updateProperty = async (id, payload) => {
  try {
    const response = await api.put(
      endpoints.updatePropertyForUser + `/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    if (error?.status !== 401) {
      throw (
        error?.response?.data?.message ||
        "Failed to create property, please try again later."
      );
    } else {
      throw (
        error?.message || "Failed to create property, please try again later."
      );
    }
  }
};

export const deleteProperty = async (id) => {
  try {
    const response = await api.delete(
      endpoints.deletePropertyByUser + `/${id}`
    );
    return response.data;
  } catch (error) {
    if (error?.status !== 401) {
      throw (
        error?.response?.data?.message ||
        "delete faild property, please try again later."
      );
    } else {
      throw (
        error?.message || "Failed to delete property, please try again later."
      );
    }
  }
};

export const addOrRemoveFavouriteProperty = async (id) => {
  try {
    const response = await api.post(endpoints.addToFavouriteProperty + `/${id}`);
    return response.data;
  } catch (error) {
    if (error?.status !== 401) {
      throw (
        error?.response?.data?.message ||
        "Failed to add or remove property, please try again later."
      );
    } else {
      throw (
        error?.message ||
        "Failed to add or remove property, please try again later."
      );
    }
  }
};

export const trackPropertyViews = async (id) => {
  try {
    const response = await api.put(endpoints.trackPropertyViews + `/${id}`);
    return response.data;
  } catch (error) {
    if (error?.status !== 401) {
      throw (
        error?.response?.data?.message ||
        "Failed to view, please try again later."
      );
    } else {
      throw (
        error?.message ||
        "Failed to view, please try again later."
      );
    }
  }
};

export const getSimilarProperties = async (id) => {
  try {
    const response = await api.get(endpoints.getSimilarProperties + `/${id}`);
    return response.data;
  } catch (error) {
    if (error?.status !== 401) {
      throw (
        error?.response?.data?.message ||
        "Failed to get, please try again later."
      );
    } else {
      throw (
        error?.message ||
        "Failed to get, please try again later."
      );
    }
  }
};
