import api from "../../services/api";
import { endpoints } from "../../utils/endpoints/endpoints";


export const getAllAboutUs = async (page, limit) => {
  try {
    const response = await api.get(
      endpoints.getAllAboutUsForUser + `?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    if (error?.status !== 401) {
      throw (
        error?.response?.data?.message ||
        "Failed to get About Us, please try again later."
      );
    } else {
      throw error?.message || "Failed to get About Us, please try again later.";
    }
  }
};
