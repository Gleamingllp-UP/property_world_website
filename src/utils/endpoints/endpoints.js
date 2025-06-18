const endpoints = {
  //User types
  getAllActiveUserType: "/user-type/getall-active-user-type",

  //user
  initiateSignup: "/user/initiate-signup/",
  verifyCode: "/user/verify-code/",
  userLogin: "/user/login-user/",
  setPassword: "/user/set-password/",
  getUserAllDetails: "/user/get-all-user-details",
  guestUserLogin: "/user/guest-user-login",
  updateUser: "/user/users",
  getAllUserForWeb: "/user/all-users",
  getUserAllDetailsForWeb: "/user/get-all-user-details",
  //Filter
  getAllActiveCategory: "/category/getall-active-category",
  getAllActiveSubCategory: "/sub-category/getall-active-subCategory",
  getAllActivesubSubCategory: "/sub-sub-category/getall-active-subSubCategory",

  //Blogs
  getblogForUser: "/blog/get-blog-user",
  getAllblogForUser: "/blog/getall-blog-user",
  getBlogCategoryWithCount: "/blog-category/getall-blog-count",

  //Policy
  getPolicyByTypeForUser: "/policy/get-user-policy",

  //About US
  getAllAboutUsForUser: "/about-us/getall-user-aboutUs",

  //Contact US
  getAllContactUsForUser: "/contact-us/getall-user-contactUs",

  //Banner
  getBannerByTypeForUser: "/banner/getall-user-banner",

  //Social
  getAllSocialMediaForUser: "/social-media/getall-user-socialMedia",

  //Guide
  getGuideByTypeForUser: "/guide/getall-user-guide",

  //Inquiry
  createEnquiry: "/enquiry/add-enquiry",
  createGetInTouch: "/getInTouch/add-getInTouch",
  //location
  getAllLocation: "/location/getall-user-location",

  //form product
  addproparty: "/property/add-property",

  //Property
  getProperty: "/property/get-property",
  getAllPropertyForUser: "/property/getall-user-property",
  createProperty: "/property/add-property",
  updatePropertyForUser: "/property/update-user-property",
  updatePropertyStatus: "/property/update-property-status",
  getUsersAllProperty: "/property/get-user-property",
  deletePropertyByUser: "/property/delete-user-property",
  //AmenitiesAndFacilities
  getAllAmenitiesAndFacilitiesForUser:
    "/amenities-facilities/getall-user-amenities-facilities",
};

export { endpoints };
