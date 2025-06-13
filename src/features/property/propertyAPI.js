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
