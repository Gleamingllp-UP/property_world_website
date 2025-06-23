import api from "../../services/api";
import { endpoints } from "../../utils/endpoints/endpoints";

export const getAllPlanForUser = async (page, limit, user_type) => {
  try {
    const response = await api.get(
      endpoints.getAllPlanForUser +
        `/?page=${page}&limit=${limit}&user_type=${user_type}`
    );
    return response.data;
  } catch (error) {
    if (error?.status !== 401) {
      throw (
        error?.response?.data?.message ||
        "Failed to get, please try again later."
      );
    } else {
      throw error?.message || "Failed to get, please try again later.";
    }
  }
};
