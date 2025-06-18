import api from "../../services/api";
import { endpoints } from "../../utils/endpoints/endpoints";

export const getAllblogForUser = async (page, limit, blog_category_id) => {
  try {
    let query = `?page=${page}&limit=${limit}`;

    if (blog_category_id) {
      query += `&blog_category_id=${blog_category_id}`;
    }

    const response = await api.get(endpoints.getAllblogForUser + query);

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
