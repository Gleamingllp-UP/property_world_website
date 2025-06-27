import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  getAllBlogsThunk,
  getBlogCategoryWithCountThunk,
} from "../../features/blog/blogSlice";
import { Link } from "react-router-dom";
import { pageRoutes } from "../../router/pageRoutes";
import ImageWithLoader from "../../Custom_Components/ImageWithLoader";
import { format } from "date-fns";
import { RecentPostSkeleton } from "../../Custom_Components/Skeleton/BigBlogSkeleton";
import { news_dss } from "../../assets/images";
import { useLocation } from "react-router-dom";
import { debounce } from "lodash";

const BlogCatSec = () => {
  const { blogsCategory, isLoading2, blogs, isLoading } = useSelector(
    (store) => store?.blog
  );
  const [searchText, setSearchText] = useState("");

  const { search } = useLocation();
  const blog_category_id = new URLSearchParams(search).get("blog_category_id");

  const dispatch = useDispatch();
  const page = 1;
  const limit = 7;

  useEffect(() => {
    dispatch(getAllBlogsThunk({ page, limit, blog_category_id }));
  }, [dispatch, page, blog_category_id]);

  useEffect(() => {
    if (!searchText?.trim()) {
      dispatch(getBlogCategoryWithCountThunk({ searchText: "" }));
      return;
    }

    const debouncedFetch = debounce((text) => {
      dispatch(getBlogCategoryWithCountThunk({ searchText: text }));
    }, 1000);

    debouncedFetch(searchText);

    return () => {
      debouncedFetch.cancel();
    };
  }, [searchText, dispatch]);

  useEffect(() => {
    const scriptId = "elfsight-platform-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.src = "/assets/js/platform.js";
      script.async = true;
      script.id = scriptId;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="col-lg-4">
      <div className="blog_right_b">
        {/* Search Form */}
        <form role="search" method="get" className="search_form" action="#">
          <input
            type="text"
            className="search_field"
            placeholder="Search …"
            name="s"
            title="Search for:"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button type="submit" className="search_button">
            <i className="ri-search-line" />
          </button>
        </form>

        <hr />

        <div className="my_catt">
          <p>
            <strong>Categories</strong>
          </p>
          {isLoading2 ? (
            <>
              <ul className="">
                {[...Array(7)].map((_, index) => (
                  <li key={index} className="mb-2">
                    <a className="placeholder-glow ">
                      <span
                        className="placeholder bg-secondary-subtle rounded "
                        style={{
                          width: `${80 + Math.random() * 40}px`,
                        }}
                      ></span>
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            blogsCategory &&
            blogsCategory?.map((item, index) => {
              return (
                <ul key={index}>
                  <li>
                    <Link
                      to={pageRoutes.BLOG + `/?blog_category_id=${item?._id}`}
                      className="Link"
                      style={{
                        borderBottom:
                          index !== blogsCategory?.length - 1
                            ? "1px solid #0b4ca3"
                            : "none",
                      }}
                    >
                      {item?.name || "N/A"} {`(${item?.blog_count || 0})`}
                    </Link>
                  </li>
                </ul>
              );
            })
          )}
        </div>

        <hr />

        <div className="top_story">
          <p>
            <strong>Recent posts</strong>
          </p>

          {isLoading ? (
            <>
              <RecentPostSkeleton />
            </>
          ) : (
            blogs?.slice(0, 4)?.map((item, index) => (
              <div className="rec_pots" key={index}>
                <div>
                  <Link
                    to={pageRoutes?.BLOG_DETAILS + `/?blog_id=${item?._id}`}
                  >
                    <ImageWithLoader src={item?.coverImg} />
                  </Link>
                </div>
                <div>
                  <span> {format(item?.createdAt, "MMMM dd, yyyy")}</span>
                  <h4>
                    <Link
                      to={pageRoutes?.BLOG_DETAILS + `/?blog_id=${item?._id}`}
                    >
                      {item?.title || "N/A"}
                    </Link>
                  </h4>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="insta_feds">
        <h5>Instagram Feeds</h5>
        <div
          className="elfsight-app-57e9270c-e9ad-4b8c-a211-c494dcbf3f9e"
          data-elfsight-app-lazy
        ></div>
      </div>

      <div className="text-center mt-3 m-auto">
        <ImageWithLoader src={news_dss} className="img-fluid m-auto" />
      </div>
    </div>
  );
};

export default React.memo(BlogCatSec);
