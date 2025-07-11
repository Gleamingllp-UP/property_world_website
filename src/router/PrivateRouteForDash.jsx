import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { pageRoutes } from "./pageRoutes";

export default function PrivateRouteForDash({ children }) {
  const { userData } = useSelector((store) => store.user);
  let isAuthenticated;
  const token = localStorage.getItem("userToken");
  if (token) {
    isAuthenticated = true;
  }
  if (
    !userData ||
    !userData.role ||
    userData.role === "guest" ||
    !isAuthenticated
  ) {
    return <Navigate to={pageRoutes.HOME_PAGE} replace />;
  }

  return children;
}
