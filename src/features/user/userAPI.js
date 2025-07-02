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

export const getAllUserForWeb = async (
  service_need,
  search,
  nationality,
  language,
  user_type,
  page,
  limit
) => {
  try {
    const response = await api.get(
      endpoints.getAllUserForWeb +
        `/?page=${page}&limit=${limit}
        &user_type=${user_type?.trim()}
        &service_need=${service_need}
      &search=${search}&nationality=${nationality}&language=${language}`
    );
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

export const getLikedProperties = async (page, limit) => {
  try {
    const response = await api.get(
      endpoints.getLikedProperties + `/?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    if (error?.status !== 401) {
      throw (
        error?.response?.data?.message ||
        "Failed to fetch, please try again later."
      );
    } else {
      throw error?.message || "Failed to fetch, please try again later.";
    }
  }
};

export const getUserAllDetailsForWebWithProperties = async (
  id,
  page,
  limit,
  sort_by
) => {
  try {
    const response = await api.get(
      endpoints.getUserAllDetailsForWebWithProperties +
        `/${id}/?page=${page}&limit=${limit}&sort_by=${sort_by}`
    );
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

export const sendOtpToPhoneNumber = async (phone_number) => {
  try {
    const response = await api.post(endpoints.sendOtpToPhoneNumber, {
      phone_number,
    });
    return response.data;
  } catch (error) {
    if (error?.status !== 401) {
      throw (
        error?.response?.data?.message ||
        "Failed to send, please try again later."
      );
    } else {
      throw error?.message || "Failed to send, please try again later.";
    }
  }
};

export const verifyOtpForPhoneNumber = async (phone_number, code) => {
  try {
    const response = await api.put(endpoints.verifyOtpForPhoneNumber, {
      phone_number,
      code,
    });
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

export const sendOtpToEmail = async (email) => {
  try {
    const response = await api.post(endpoints.sendOtpToEmail, {
      email,
    });
    return response.data;
  } catch (error) {
    if (error?.status !== 401) {
      throw (
        error?.response?.data?.message ||
        "Failed to send, please try again later."
      );
    } else {
      throw error?.message || "Failed to send, please try again later.";
    }
  }
};

export const verifyOtpForEmail = async (email, code) => {
  try {
    const response = await api.put(endpoints.verifyOtpToEmail, {
      email,
      code,
    });
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

export const updatePassword = async (current_password, new_password) => {
  try {
    const response = await api.put(endpoints.updatePassword, {
      current_password,
      new_password,
    });
    return response.data;
  } catch (error) {
    if (error?.status !== 401) {
      throw (
        error?.response?.data?.message ||
        "Failed to update, please try again later."
      );
    } else {
      throw error?.message || "Failed to update, please try again later.";
    }
  }
};

export const forgetPassword = async (email) => {
  try {
    const response = await api.post(endpoints.forgetPassword, {
      email,
    });
    return response.data;
  } catch (error) {
    if (error?.status !== 401) {
      throw (
        error?.response?.data?.message ||
        "Failed to send, please try again later."
      );
    } else {
      throw error?.message || "Failed to send, please try again later.";
    }
  }
};

export const resetPassword = async (token, new_password) => {
  try {
    const response = await api.put(endpoints.resetPassword, {
      token,
      new_password,
    });
    return response.data;
  } catch (error) {
    if (error?.status !== 401) {
      throw (
        error?.response?.data?.message ||
        "Failed to send, please try again later."
      );
    } else {
      throw error?.message || "Failed to send, please try again later.";
    }
  }
};

export const createVisitors = async () => {
  try {
    const alreadyTracked = sessionStorage.getItem("visitTracked");
    if (!alreadyTracked) {
      const response = await api.post(endpoints.createVisitors);
      return response.data;
    }
  } catch (error) {
    if (error?.status !== 401) {
      throw (
        error?.response?.data?.message ||
        "Failed to send, please try again later."
      );
    } else {
      throw error?.message || "Failed to send, please try again later.";
    }
  }
};
