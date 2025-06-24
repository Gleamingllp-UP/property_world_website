import api from "../../services/api";
import { endpoints } from "../../utils/endpoints/endpoints";

export const createStripeCheckoutSession = async (
  name,
  amount,
  user_id,
  plan_id
) => {
  try {
    const response = await api.post(endpoints.createStripeCheckoutSession, {
      name,
      amount,
      user_id,
      plan_id,
    });

    return response.data;
  } catch (error) {
    if (error?.status !== 401) {
      throw (
        error?.response?.data?.message || "Unable to start payment session."
      );
    } else {
      throw error?.message || "Unable to start payment session.";
    }
  }
};

export const verifyPaymentSession = async (session_id) => {
  try {
    const response = await api.post(endpoints.verifyPaymentSession + `/${session_id}`);

    return response.data;
  } catch (error) {
    if (error?.status !== 401) {
      throw (
        error?.response?.data?.message || "Unable to start payment session."
      );
    } else {
      throw error?.message || "Unable to start payment session.";
    }
  }
};
