import { GoHome } from "react-icons/go";
import { lazy } from "react";
import { pageRoutes } from "./pageRoutes";

const Login = lazy(() => import("../pages/auth/Login"));
const MainHomePage = lazy(() => import("@/pages/home/MainHomePage"));
const MainPropertyDetails = lazy(() => import("@/pages/property/MainPropertyDetails"));

const routes = [
  {
    id: 1,
    isPrivate: true,
    name: "Login",
    path: pageRoutes?.LOGIN,
    Component: Login, 
  },
  {
    id: 2,
    isPrivate: true,
    name: "Home Page",
    path: pageRoutes?.HOME_PAGE,
    Component: MainHomePage, 
  },
  {
    id: 3,
    isPrivate: true,
    name: "Property Page",
    path: pageRoutes?.PROPERTY_DETAILS,
    Component: MainPropertyDetails,
  },
];
export { routes };
