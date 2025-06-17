import api from "../../services/api";
import { endpoints } from "../../utils/endpoints/endpoints";

export const initiateSignup = async (payload) => {
  try {
    const response = await api.post(endpoints.initiateSignup, payload);
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

export const verifyCode = async (payload) => {
  try {
    const response = await api.post(endpoints.verifyCode, payload);
    return response.data;
  } catch (error) {
    if (error?.status !== 401) {
      throw (
        error?.response?.data?.message ||
        "Failed to verify, please try again later."
      );
    } else {
      throw error?.message || "Failed to verify, please try again later.";
    }
  }
};
export const setPassword = async (payload) => {
  try {
    const response = await api.post(endpoints.setPassword, payload);
    return response.data;
  } catch (error) {
    if (error?.status !== 401) {
      throw (
        error?.response?.data?.message ||
        "Failed to set Password, please try again later."
      );
    } else {
      throw error?.message || "Failed to set Password, please try again later.";
    }
  }
};
export const userLogin = async (payload) => {
  try {
    const response = await api.post(endpoints.userLogin, payload);
    return response.data;
  } catch (error) {
    if (error?.status !== 401) {
      throw (
        error?.response?.data?.message ||
        "Failed to login, please try again later."
      );
    } else {
      throw error?.message || "Failed to login, please try again later.";
    }
  }
};

export const getUserDetails = async () => {
  try {
    const response = await api.get(endpoints.getUserAllDetailsForWeb);
    return response.data;
  } catch (error) {
    if (error?.status !== 401) {
      throw (
        error?.response?.data?.message ||
        "Failed to login, please try again later."
      );
    } else {
      throw error?.message || "Failed to login, please try again later.";
    }
  }
};

export const guestUserLogin = async () => {
  try {
    const response = await api.post(endpoints.guestUserLogin);
    return response.data;
  } catch (error) {
    if (error?.status !== 401) {
      throw (
        error?.response?.data?.message ||
        "Failed to login, please try again later."
      );
    } else {
      throw error?.message || "Failed to login, please try again later.";
    }
  }
};

export const updateUserDetails = async (id, payload) => {
  try {
    const response = await api.put(endpoints.updateUser + `/${id}`, payload);
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



export const getAllUserForWeb = async () => {
  try {
    const response = await api.get(endpoints.getAllUserForWeb);
    return response.data;
  } catch (error) {
    if (error?.status !== 401) {
      throw (
        error?.response?.data?.message ||
        "Failed to login, please try again later."
      );
    } else {
      throw error?.message || "Failed to login, please try again later.";
    }
  }
};