import React from "react";

const BigBlogSkeleton = () => {
  return (
    <div className="col-lg-12">
      <div className="big_blog bg-white  rounded-3  overflow-hidden mb-4">
        {/* Image Section Skeleton */}
        <div className="img_boxx position-relative">
          <div
            className="placeholder-glow w-100 bg-light rounded-5"
            style={{ height: "400px" }}
          ></div>
          <span
            className="placeholder placeholder-glow bg-danger-subtle text-danger-emphasis rounded px-2 py-1 position-absolute"
            style={{
              bottom: "0px",
              left: "0px",
              width: "120px",
              height: "40px",
            }}
          ></span>
        </div>

        {/* Content Section Skeleton */}
        <div className="big_content p-3">
          {/* Author and Category */}
          <p className="placeholder-glow mb-2">
            <span
              className="placeholder bg-secondary-subtle rounded col-6 d-block"
              style={{ height: "16px" }}
            ></span>
          </p>

          {/* Title */}
          <div className="placeholder-glow mb-3">
            <span
              className="placeholder bg-secondary-subtle rounded col-9 d-block mb-2"
              style={{ height: "24px" }}
            ></span>
          </div>

          {/* Description */}
          <div className="placeholder-glow mb-3">
            <span
              className="placeholder bg-secondary-subtle  rounded col-12 d-block mb-1"
              style={{ height: "14px" }}
            ></span>
            <span
              className="placeholder bg-secondary-subtle  rounded col-11 d-block mb-1"
              style={{ height: "14px" }}
            ></span>
          </div>

          {/* Read More */}
          <div className="placeholder-glow">
            <span
              className="placeholder bg-secondary-subtle rounded col-3 d-block"
              style={{ height: "16px" }}
            ></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const BlogPostSkeleton = () => {
  return (
    <div className="col-lg-6">
      <div className="blogs_area">
        <div className="blogs_post position-relative rounded-4 overflow-hidden mb-4 bg-white border shadow-sm">
          {/* Image Skeleton */}
          <div
            className="placeholder-glow w-100 bg-light"
            style={{ height: "410px" }}
          ></div>

          {/* Overlay + Content Skeleton */}
          <div className="blog_content position-absolute bottom-0 start-50 translate-middle-x w-100 px-3 pb-3">
            {/* Date */}
            <span
              className="placeholder placeholder-glow bg-danger-subtle text-danger-emphasis d-inline-block rounded px-2 py-1 mb-2"
              style={{ width: "120px", height: "30px" }}
            ></span>

            {/* Title */}
            <div className="placeholder-glow mb-2">
              <span
                className="placeholder bg-secondary-subtle rounded col-10 d-block mb-1"
                style={{ height: "20px" }}
              ></span>
              <span
                className="placeholder bg-secondary-subtle rounded col-7 d-block"
                style={{ height: "20px" }}
              ></span>
            </div>

            {/* Meta Info */}
            <div className="placeholder-glow">
              <span
                className="placeholder bg-secondary-subtle rounded col-8 d-block"
                style={{ height: "14px" }}
              ></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const RecentPostSkeleton = () => {
  return (
    <div className="rec_pots d-flex mb-3 p-2 rounded">
    {/* Image Skeleton */}
    <div className="flex-shrink-0 me-2">
      <div className="placeholder-glow">
        <div className="placeholder bg-secondary-subtle rounded" style={{ width: '100px', height: '70px' }}></div>
      </div>
    </div>

    {/* Text Skeleton */}
    <div className="flex-grow-1">
      <div className="placeholder-glow mb-2">
        <span className="placeholder col-6 bg-secondary-subtle rounded d-block" style={{ height: '14px' }}></span>
      </div>
      <div className="placeholder-glow">
        <span className="placeholder col-9 bg-secondary-subtle rounded d-block" style={{ height: '18px' }}></span>
      </div>
    </div>
  </div>
  );
};


export const BlogDetailsSkeleton = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10 placeholder-glow">

          {/* Title */}
          <div className="d-flex flex-column align-items-center mb-4">
            <div className="placeholder col-8 bg-secondary-subtle rounded mb-3" style={{ height: '32px' }}></div>
            <div className="placeholder col-5 bg-secondary-subtle rounded" style={{ height: '16px' }}></div>
          </div>

          {/* Image */}
          <div className="placeholder bg-secondary-subtle rounded mb-4" style={{ height: '300px', width: '100%' }}></div>

          {/* Content Paragraphs */}
          <div className="mb-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="placeholder col-12 bg-secondary-subtle rounded mb-2"
                style={{ height: '16px' }}
              ></div>
            ))}
            <div className="placeholder col-9 bg-secondary-subtle rounded" style={{ height: '16px' }}></div>
          </div>

        </div>
      </div>
    </div>
  );
};


export default BigBlogSkeleton;
