import api from "../../services/api";
import { endpoints } from "../../utils/endpoints/endpoints";

export const getAllblogForUser = async (page, limit) => {
  try {
    const response = await api.get(
      endpoints.getAllblogForUser + `?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    if (error?.status !== 401) {
      throw (
        error?.response?.data?.message ||
        "Failed to get blog, please try again later."
      );
    } else {
      throw error?.message || "Failed to get blog, please try again later.";
    }
  }
};
export const getBlogByIdForUser = async (id) => {
  try {
    const response = await api.get(endpoints.getblogForUser + `/${id}`);
    return response.data;
  } catch (error) {
    if (error?.status !== 401) {
      throw (
        error?.response?.data?.message ||
        "Failed to get blog, please try again later."
      );
    } else {
      throw error?.message || "Failed to get blog, please try again later.";
    }
  }
};

export const getBlogCategoryWithCount = async () => {
  try {
    const response = await api.get(endpoints.getBlogCategoryWithCount);
    return response.data;
  } catch (error) {
    if (error?.status !== 401) {
      throw (
        error?.response?.data?.message ||
        "Failed to get blog, please try again later."
      );
    } else {
      throw error?.message || "Failed to get blog, please try again later.";
    }
  }
};
