import api from "../../services/api";
import { endpoints } from "../../utils/endpoints/endpoints";

export const getAllActiveCategory = async () => {
  try {
    const response = await api.get(endpoints.getAllActiveCategory);
    return response.data;
  } catch (error) {
    if (error?.status !== 401) {
      throw (
        error?.response?.data?.message ||
        "Failed to get category, please try again later."
      );
    } else {
      throw error?.message || "Failed to get category, please try again later.";
    }
  }
};

export const getAllActiveSubCategory = async (categoryId) => {
  try {
    const response = await api.get(
      endpoints.getAllActiveSubCategory + `?categoryId=${categoryId}`
    );
    return response.data;
  } catch (error) {
    if (error?.status !== 401) {
      throw (
        error?.response?.data?.message ||
        "Failed to get sub-category, please try again later."
      );
    } else {
      throw (
        error?.message || "Failed to get sub-category, please try again later."
      );
    }
  }
};

export const getAllActivesubSubCategory = async (subCategoryId) => {
  try {
    const response = await api.get(
      endpoints.getAllActivesubSubCategory + `?subCategoryId=${subCategoryId}`
    );
    return response.data;
  } catch (error) {
    if (error?.status !== 401) {
      throw (
        error?.response?.data?.message ||
        "Failed to get sub-sub-category, please try again later."
      );
    } else {
      throw (
        error?.message ||
        "Failed to get sub-sub-category, please try again later."
      );
    }
  }
};

export const getAllActiveLocation = async () => {
  try {
    const response = await api.get(endpoints.getAllLocation);
    return response.data;
  } catch (error) {
    if (error?.status !== 401) {
      throw (
        error?.response?.data?.message ||
        "Failed to get category, please try again later."
      );
    } else {
      throw error?.message || "Failed to get category, please try again later.";
    }
  }
};
export const getAllAmenitiesAndFacilities = async () => {
  try {
    const response = await api.get(
      endpoints.getAllAmenitiesAndFacilitiesForUser
    );
    return response.data;
  } catch (error) {
    if (error?.status !== 401) {
      throw (
        error?.response?.data?.message ||
        "Failed to get AmenitiesAndFacilities, please try again later."
      );
    } else {
      throw error?.message || "Failed to get AmenitiesAndFacilities, please try again later.";
    }
  }
};
