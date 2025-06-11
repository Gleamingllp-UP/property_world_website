import api from "../../services/api";
import { endpoints } from "../../utils/endpoints/endpoints";

export const addGetIntouch = async (payload) => {
  try {
    const response = await api.post(endpoints.createGetInTouch, payload);
    return response.data;
  } catch (error) {
    if (error?.status !== 401) {
      throw (
        error?.response?.data?.message ||
        "Failed to register, please try again later."
      );
    } else {
      throw error?.message || "Failed to register, please try again later.";
    }
  }
};