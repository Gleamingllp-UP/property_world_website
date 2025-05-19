import React from "react";
import about_banner from "../../assets/images/common/Buyer-Guide-Photo.jpg";
const BlogBanner = ({ scrollRef }) => {
  const scroll = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <div
        className="inner_banner"
        style={{ backgroundImage: `url(${about_banner})` }}
      >
        <div className="container">
          <div className="buyer_d">
            <h1>News & Blogs</h1>
            <p>Latest Articles</p>
          </div>
        </div>
      </div>
      <div className="arrow_section">
        <div className="container">
          <div className="arrow_box">
            <a onClick={scroll}>
              <i className="ri-arrow-down-long-line" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(BlogBanner);
