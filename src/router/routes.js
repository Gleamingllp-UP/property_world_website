import { GoHome } from "react-icons/go";
import { lazy } from "react";
import { pageRoutes } from "./pageRoutes";

const Login = lazy(() => import("../pages/auth/Login"));
const MainHomePage = lazy(() => import("@/pages/home/MainHomePage"));
const MainPropertyDetails = lazy(() =>
  import("@/pages/property/MainPropertyDetails")
);
const AboutMain = lazy(() => import("@/pages/aboutus/AboutMain"));
const BuyerMain = lazy(() => import("@/pages/buyerguide/BuyerMain"));
const ContactMain = lazy(() => import("@/pages/contactus/ContactMain"));
const MainBlog = lazy(() => import("@/pages/blog/MainBlog"));
const Maintermsconditionimport = lazy(() =>
  import("@/pages/termsandconditions/Maintermscondition")
);
const MainPrivacyAndPolicy = lazy(() =>
  import("@/pages/privacyAndPolicy/MainPrivacyAndPolicy")
);
const MainAgents = lazy(() =>
  import("@/pages//agentsAndAgencies/agents/MainAgents")
);
const MainAgencies = lazy(() =>
  import("@/pages/agentsAndAgencies/agencies/MainAgencies")
);

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
    path: pageRoutes?.BUYER_GUIDE,
    Component: BuyerMain,
  },
  {
    id: 8,
    isPrivate: true,
    name: "Terms & Conditions",
    path: pageRoutes?.TERM_CONDITIONS,
    Component: Maintermsconditionimport,
  },
  {
    id: 9,
    isPrivate: true,
    name: "Privacy & policy",
    path: pageRoutes?.PRIVACY_POLICY,
    Component: MainPrivacyAndPolicy,
  },
  {
    id: 10,
    isPrivate: true,
    name: "Agents",
    path: pageRoutes?.AGENTS,
    Component: MainAgents,
  },
  {
    id: 10,
    isPrivate: true,
    name: "Agencies",
    path: pageRoutes?.AGENCIES,
    Component: MainAgencies,
  },
];
export { routes };
