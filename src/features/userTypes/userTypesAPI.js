import api from "../../services/api";
import { endpoints } from "../../utils/endpoints/endpoints";

export const getAllUsersTypes = async () => {
  try {
    const response = await api.get(endpoints.getAllActiveUserType);
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
