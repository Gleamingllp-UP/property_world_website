import React from "react";
import { seller_guide } from "../../assets/images";
const TermBanner = ({ scrollRef }) => {
  const scroll = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <div
        className="inner_banner"
        style={{ backgroundImage: `url(${seller_guide})` }}
      >
        <div className="container">
          <div className="buyer_d">
            <h1>Terms &amp; Conditions</h1>
            <p />
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

export default React.memo(TermBanner);
