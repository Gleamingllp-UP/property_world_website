import { GoHome } from "react-icons/go";
import { lazy } from "react";
import { pageRoutes } from "./pageRoutes";

const Login = lazy(() => import("../pages/auth/Login"));
const MainHomePage = lazy(() => import("@/pages/home/MainHomePage"));
const MainPropertyDetails = lazy(() => import("@/pages/property/MainPropertyDetails"));
const AboutMain = lazy(() => import("@/pages/aboutus/AboutMain"));
const BuyerMain = lazy(() => import("@/pages/buyerguide/BuyerMain"));
const ContactMain = lazy(() => import("@/pages/contactus/ContactMain"));
const MainBlog = lazy(() => import("@/pages/blog/MainBlog"));


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
    {
    id: 4,
    isPrivate: true,
    name: "About Us",
    path: pageRoutes?.ABOUT_US,
    Component: AboutMain,
  },
     {
    id: 5,
    isPrivate: true,
    name: "Contact Us",
    path: pageRoutes?.CONTACT_US,
    Component: ContactMain,
  },
     {
    id: 6,
    isPrivate: true,
    name: "Blog",
    path: pageRoutes?.BLOG,
    Component: MainBlog,
  },
     {
    id: 7,
    isPrivate: true,
    name: "Buyer Guide",
    path: pageRoutes?.BUYERGUIDE,
    Component: BuyerMain,
  },
];
export { routes };
