import { endpoints } from "@/utils/endpoints/expoints";
import api from "../../services/api";

export const addUsers = async (payload) => {
  try {
    const response = await api.post(endpoints.createUser, payload);
    return response.data;
  } catch (error) {
    throw (
      error?.response?.data?.message ||
      error?.message ||
      "Failed to add user, please try again later."
    );
  }
};

export const getAllUsers = async (UserTypeId, page, limit, activeSubTab) => {
  try {
    const response = await api.get(
      endpoints.getAllUser +
        `?user_type=${UserTypeId}&page=${page}&limit=${limit}&type=${activeSubTab}`
    );
    return response.data;
  } catch (error) {
    throw (
      error?.response?.data?.message ||
      error?.message ||
      "Failed to get user, please try again later."
    );
  }
};

export const updateUsers = async (id, payload) => {
  try {
    const { id, ...cleanedPayload } = payload;
    const response = await api.put(
      `${endpoints.updateUser}/${id}`,
      cleanedPayload
    );
    return response.data;
  } catch (error) {
    throw (
      error?.response?.data?.message ||
      error?.message ||
      "Failed to update user, please try again later."
    );
  }
};

export const deleteUsers = async (id) => {
  try {
    const response = await api.delete(`${endpoints.deleteUser}/${id}`);
    return response.data;
  } catch (error) {
    throw (
      error?.message ||
      error?.response?.data?.message ||
      "Failed to delete user, please try again later."
    );
  }
};

export const updateUsersStatusWithKey = async (id, key) => {
  try {
    const response = await api.put(
      `${endpoints.updateUserStatusWithKey}/${id}`,
      { key }
    );
    return response.data;
  } catch (error) {
    console.log("first----q", error);
    throw (
      error?.response?.data?.message ||
      error?.message ||
      "Failed to update status, please try again later."
    );
  }
};
