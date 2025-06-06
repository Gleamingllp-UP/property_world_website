// hooks/useInitializeUser.js
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getUserDetailsThunk,
  guestUserLoginThunk,
} from "../../features/user/userSlice";

export const useInitializeUser = () => {
  const dispatch = useDispatch();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const storedUserData = localStorage.getItem("userData");
    let userDetails = null;

    if (storedUserData) {
      try {
        userDetails = JSON.parse(storedUserData);
      } catch (e) {
        console.error("Failed to parse userData from localStorage", e);
      }
    }

    const role = userDetails?.role;

    const initialize = async () => {
      try {
        if (token && role !== "guest") {
          await dispatch(getUserDetailsThunk()).unwrap();
        } else if (!token || role === "guest") {
          await dispatch(guestUserLoginThunk()).unwrap();
        }
      } catch (err) {
        console.error("Initialization failed:", err);
      } finally {
        setIsReady(true);
      }
    };

    initialize();
  }, [dispatch]);

  return isReady;
};
