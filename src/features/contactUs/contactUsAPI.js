import api from "../../services/api";
import { endpoints } from "../../utils/endpoints/endpoints";



export const getAllContactUs = async () => {
  try {
    const response = await api.get(endpoints.getAllContactUsForUser);
    return response.data;
  } catch (error) {
    if (error?.status !== 401) {
      throw (
        error?.response?.data?.message ||
        "Failed to add Contact Us, please try again later."
      );
    } else {
      throw (
        error?.message || "Failed to add Contact Us, please try again later."
      );
    }
  }
};
