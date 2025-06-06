import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogsThunk } from "../../../features/blog/blogSlice";
import { format } from "date-fns";
import ImageWithLoader from "../../../Custom_Components/ImageWithLoader";
import { Link } from "react-router-dom";
import { pageRoutes } from "../../../router/pageRoutes";

function HomeNewsBlog() {
  const { blogs, isLoading } = useSelector((store) => store?.blog);
  const dispatch = useDispatch();
  const page = 1;
  const limit = 5;

  useEffect(() => {
    dispatch(getAllBlogsThunk({ page, limit }));
  }, [dispatch]);

  return (
    <section className="blogs">
      <div className="container">
        <div className="text-center title_area">
          <h2>News &amp; Blogs</h2>
        </div>
        <div className="row">
          {isLoading
            ? [...Array(4)].map((_, i) => {
                return (
                  <div className="col-lg-3" key={i}>
                    <div className="position-relative overflow-hidden rounded-4 mb-4 bg-white border shadow-sm">
                    
                      <div
                        className="bg-light-subtle placeholder-glow w-100"
                        style={{ height: 410 }}
                      />
                      
                      <div className="position-absolute bottom-0 start-50 translate-middle-x w-100 px-3 pb-3">
                        
                        <span
                          className="placeholder placeholder-glow d-inline-block bg-secondary-subtle rounded px-2 py-1 mb-2"
                          style={{ width: 120, height: 20 }}
                        />

                     
                        <div className="placeholder-glow mb-2">
                          <span
                            className="placeholder bg-secondary-subtle rounded col-10 d-block mb-1"
                            style={{ height: 20 }}
                          />
                          <span
                            className="placeholder bg-secondary-subtle rounded col-7 d-block"
                            style={{ height: 20 }}
                          />
                        </div>
                        
                        <div className="placeholder-glow">
                          <span
                            className="placeholder bg-secondary-subtle rounded col-8 d-block"
                            style={{ height: 14 }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : blogs &&
              blogs?.slice(0,4)?.map((item, index) => {
                return (
                  <div className="col-lg-3" key={index}>
                    <div className="blogs_area">
                      <div className="blogs_post">
                        <Link
                          to={
                            pageRoutes?.BLOG_DETAILS + `/?blog_id=${item?._id}`
                          }
                        >
                          <ImageWithLoader
                            src={item?.coverImg}
                            alt="Blog_img"
                          />
                          <span className="blog-plus" />
                        </Link>
                        <div className="blog_content">
                          <span>
                            {format(item?.createdAt, "MMMM dd, yyyy")}
                          </span>
                          <h3>
                            <Link
                              to={
                                pageRoutes?.BLOG_DETAILS +
                                `/?blog_id=${item?._id}`
                              }
                            >
                              {item?.title}
                            </Link>
                          </h3>
                          <p>
                            {item?.author || "N/A"} |{" "}
                            <a>{item?.blogCategory?.name || "N/A"}</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
        {blogs?.length > 4 && (
          <div className="col-12 text-center">
            <Link to={pageRoutes?.BLOG} className="action_btn mt20">
              View All Blogs <i className="ri-arrow-right-up-long-line" />
            </Link>
          </div>
        )}
    
      </div>
    </section>
  );
}

export default HomeNewsBlog;
