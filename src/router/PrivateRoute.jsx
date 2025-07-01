import React from "react";
import { Navigate } from "react-router-dom";
import { pageRoutes } from "./pageRoutes";

function PrivateRoute({ children }) {
  let isAuthenticated;
  const token = localStorage.getItem("userToken") || true;
  if (token) {
    isAuthenticated = true;
  }
  return isAuthenticated ? children : <Navigate to={pageRoutes.HOME_PAGE} />;
}

export default PrivateRoute;
