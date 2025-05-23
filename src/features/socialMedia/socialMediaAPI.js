import api from "../../services/api";
import { endpoints } from "../../utils/endpoints/endpoints";

export const getAllSocialMedia = async (page, limit) => {
  try {
    const response = await api.get(
      endpoints.getAllSocialMediaForUser + `?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    if (error?.status !== 401) {
      throw (
        error?.response?.data?.message ||
        "Failed to add sub SocialMedia, please try again later."
      );
    } else {
      throw (
        error?.message ||
        "Failed to add sub SocialMedia, please try again later."
      );
    }
  }
};
