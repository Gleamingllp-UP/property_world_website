import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  let isAuthenticated;
  const token = localStorage.getItem("adminToken") || true;
  if (token) {
    isAuthenticated = true;
  }
  return isAuthenticated ? children : <Navigate to="/" />;
}

export default PrivateRoute;
