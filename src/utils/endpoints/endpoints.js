const endpoints = {
  //User types
  getAllActiveUserType: "/user-type/getall-active-user-type",

  //user register
  initiateSignup: "/user/initiate-signup/",
  verifyCode: "/user/verify-code/",
  userLogin: "/user/login-user/",
  setPassword: "/user/set-password/",
  getUserAllDetails: "/user/get-user-all-details",
  guestUserLogin: "/user/guest-user-login",

  //Filter
  getAllActiveCategory: "/category/getall-active-category",
  getAllActiveSubCategory: "/sub-category/getall-active-subCategory",
  getAllActivesubSubCategory: "/sub-sub-category/getall-active-subSubCategory",

  //Blogs
  getblogForUser: "/blog/get-blog-user",
  getAllblogForUser: "/blog/getall-blog-user",
  getBlogCategoryWithCount: "/blog-category/getall-blog-count",
};

export { endpoints };
