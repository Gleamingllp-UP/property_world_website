import api from "../../services/api";
import { endpoints } from "../../utils/endpoints/endpoints";

export const getGuideByType = async (type) => {
  try {
    const response = await api.get(endpoints.getGuideByTypeForUser + `?type=${type}`);
    return response.data;
  } catch (error) {
    if (error?.status !== 401) {
      throw (
        error?.response?.data?.message ||
        "Failed to add Guide, please try again later."
      );
    } else {
      throw error?.message || "Failed to add Guide, please try again later.";
    }
  }
};
