import React, { useCallback, useEffect } from "react";
import DOMPurify from "dompurify";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBlogsByIdThunk } from "../../features/blog/blogSlice";
import ImageWithLoader from "../../Custom_Components/ImageWithLoader";
import { formatDate } from "../../helper/formateDate/formatedDate";
import { BlogDetailsSkeleton } from "../../Custom_Components/Skeleton/BigBlogSkeleton";

export default function BlogDetails() {
  const { search } = useLocation();
  const { blog_id } = Object.fromEntries(new URLSearchParams(search));
  const { blogDetails, isLoading } = useSelector((store) => store?.blog);
  const dispatch = useDispatch();

  const fetchBlogDetails = useCallback(
    async (id) => {
      dispatch(getBlogsByIdThunk(id));
    },
    [dispatch]
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (blog_id) {
      fetchBlogDetails(blog_id);
    }
  }, [blog_id, fetchBlogDetails]);

  return isLoading ? (
    <>
      <BlogDetailsSkeleton />
    </>
  ) : (
    <section className="content_area full_blog">
      <div className="container">
        <div className="row justify-content-center ">
          <div className="col-lg-10 ">
            <div className="text-center">
              <h1 className="h-1">{blogDetails?.title || "N/A"}</h1>
              <p className="uer_inn">
                <i className="ri-calendar-2-line" />{" "}
                {formatDate(blogDetails?.createdAt, "date")} |{" "}
                <i className="ri-user-line" /> {blogDetails?.author} | Category
                : {blogDetails?.blogCategory?.name}
              </p>
            </div>
            <ImageWithLoader src={blogDetails?.coverImg} />
            {/* <div className="my_blog_full"> */}
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(blogDetails?.content || ""),
              }}
            />
            {/* </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
