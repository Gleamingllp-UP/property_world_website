import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";

import { useDispatch, useSelector } from "react-redux";
import { getAllBlogsThunk } from "../../features/blog/blogSlice";
import ImageWithLoader from "../../Custom_Components/ImageWithLoader";
import { format } from "date-fns";
import { pageRoutes } from "../../router/pageRoutes";
import { Link } from "react-router-dom";
import BigBlogSkeleton, {
  BlogPostSkeleton,
} from "../../Custom_Components/Skeleton/BigBlogSkeleton";
import { CustomPagination } from "../../Custom_Components/CustomPagination";

const Blog = ({ innerRef }) => {
   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { blogs, isLoading, pagination } = useSelector((store) => store?.blog);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const limit = 7;

  useEffect(() => {
    dispatch(getAllBlogsThunk({ page, limit }));
  }, [dispatch, page]);

  return (
    <>
      <div className="col-lg-8">
        <div className="row">
          {isLoading ? (
            <BigBlogSkeleton />
          ) : (
            <>
              {blogs &&
                blogs?.slice(0, 1)?.map((item, index) => {
                  return (
                    <div className="col-lg-12" key={index} ref={innerRef}>
                      <div className="big_blog">
                        <div className="img_boxx">
                          <Link
                            to={
                              pageRoutes?.BLOG_DETAILS +
                              `/?blog_id=${item?._id}`
                            }
                          >
                            <ImageWithLoader src={item?.coverImg} />
                          </Link>
                          <span>
                            {format(item?.createdAt, "MMMM dd, yyyy")}
                          </span>
                        </div>
                        <div className="big_content">
                          <p>
                            {item?.author || "N/A"} |{" "}
                            <a className="text-danger">{item?.blogCategory?.name || "N/A"}</a>
                          </p>
                          <h2>
                            <Link
                              to={
                                pageRoutes?.BLOG_DETAILS +
                                `/?blog_id=${item?._id}`
                              }
                            >
                              {item?.title || "N/A"}
                            </Link>
                          </h2>
                          {/* <p>{item?.content || "N/A"}</p> */}
                          <div className="content-ellipse"
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                item?.content || "N/A"
                              ),
                            }}
                          />

                          <Link
                            to={
                              pageRoutes?.BLOG_DETAILS +
                              `/?blog_id=${item?._id}`
                            }
                          >
                            Read More <i className="ri-arrow-right-up-line" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </>
          )}
          <div className="col-lg-12">
            <hr />
          </div>

          {isLoading
            ? [...Array(4)]?.map((_, i) => {
                return (
                  <React.Fragment key={i}>
                    <BlogPostSkeleton />
                  </React.Fragment>
                );
              })
            : blogs &&
              blogs?.slice(1)?.map((item, index) => {
                return (
                  <div className="col-lg-6" key={index}>
                    <div className="blogs_area">
                      <div className="blogs_post">
                        <Link
                          to={
                            pageRoutes?.BLOG_DETAILS + `/?blog_id=${item?._id}`
                          }
                        >
                          <ImageWithLoader src={item?.coverImg} />
                        </Link>

                        <span className="blog-plus" />
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
                              {item?.title || "N/A"}
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

        <CustomPagination
          total={pagination?.total}
          page={page}
          limit={limit}
          onPageChange={(newPage) => setPage(newPage)}
          className="your-optional-custom-class"
        />
        {/* <div className="col-12 text-center mt-5">
          <ul className="pagination">
            <li className="page-item disabled">
              <a className="page-link">Previous</a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item active" aria-current="page">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                4
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                5
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                6
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                Next
              </a>
            </li>
          </ul>
        </div> */}
      </div>
    </>
  );
};

export default React.memo(Blog);
