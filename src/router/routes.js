import { GoHome } from "react-icons/go";
import { lazy } from "react";
import { pageRoutes } from "./pageRoutes";

// const Login = lazy(() => import("../pages/auth/Login"));

//Auth
const SignUp = lazy(() => import("@/pages/auth/signUp/SignUp"));

const MainHomePage = lazy(() => import("@/pages/home/MainHomePage"));
const MainPropertyDetails = lazy(() =>
  import("@/pages/property/MainPropertyDetails")
);
const AboutMain = lazy(() => import("@/pages/aboutus/AboutMain"));
const BuyerMain = lazy(() => import("@/pages/buyerguide/BuyerMain"));
const MainSellerGuide = lazy(() =>
  import("../pages/sellerGuide/MainSellerGuide")
);
const ContactMain = lazy(() => import("@/pages/contactus/ContactMain"));
const MainBlog = lazy(() => import("@/pages/blog/MainBlog"));
const Maintermsconditionimport = lazy(() =>
  import("@/pages/termsandconditions/Maintermscondition")
);
const MainPrivacyAndPolicy = lazy(() =>
  import("@/pages/privacyAndPolicy/MainPrivacyAndPolicy")
);
const CookiesPolicyMain = lazy(() =>
  import("../pages/cookiespolicy/CookiesPolicyMain")
);
const MainAgents = lazy(() =>
  import("@/pages//agentsAndAgencies/agents/MainAgents")
);
const MainAgencies = lazy(() =>
  import("@/pages/agentsAndAgencies/agencies/MainAgencies")
);

const BlogDetails = lazy(() => import("../pages/blog/BlogDetails"));

const TenantMain = lazy(() => import("../pages/tenantGuide/TenantMain"));
const LandLoardMain = lazy(() =>
  import("../pages/landLordGuide/LandLoardMain")
);

const routes = [
  // {
  //   id: 1,
  //   isPrivate: true,
  //   name: "Login",
  //   path: pageRoutes?.LOGIN,
  //   Component: Login,
  // },
  {
    id: 1,
    isPrivate: true,
    name: "Sign up",
    path: pageRoutes?.SIGN_UP,
    Component: SignUp,
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
    id: 11,
    isPrivate: true,
    name: "Cookies & policy",
    path: pageRoutes?.COOKIES_POLICY,
    Component: CookiesPolicyMain,
  },
  {
    id: 12,
    isPrivate: true,
    name: "Agents",
    path: pageRoutes?.AGENTS,
    Component: MainAgents,
  },
  {
    id: 13,
    isPrivate: true,
    name: "Agencies",
    path: pageRoutes?.AGENCIES,
    Component: MainAgencies,
  },
  {
    id: 14,
    isPrivate: true,
    name: "Blog Details",
    path: pageRoutes?.BLOG_DETAILS,
    Component: BlogDetails,
  },
  {
    id: 15,
    isPrivate: true,
    name: "Seller Guide",
    path: pageRoutes?.SELLER_GUIDE,
    Component: MainSellerGuide,
  },
  {
    id: 16,
    isPrivate: true,
    name: "Tenant Guide",
    path: pageRoutes?.TENANT_GUIDE,
    Component: TenantMain,
  },
  {
    id: 17,
    isPrivate: true,
    name: "LandLord Guide",
    path: pageRoutes?.LANDLORD_GUIDE,
    Component: LandLoardMain,
  },
];
export { routes };
