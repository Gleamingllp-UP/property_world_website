import api from "../../services/api";
import { endpoints } from "../../utils/endpoints/endpoints";

export const creatProperty = async (payload) => {
  try {
    const response = await api.post(endpoints.createProperty, payload);
    return response.data;
  } catch (error) {
    console.log(error)
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
