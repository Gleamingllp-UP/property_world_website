import React from "react";
import { seller_guide } from "../../assets/images";

function PrivacyAndPolicyBanner() {
  return (
    <>
      <div
        className="inner_banner"
        style={{ backgroundImage: `url(${seller_guide})` }}
      >
        <div className="container">
          <div className="buyer_d">
            <h1>Privacy Policy</h1>
            <p></p>
          </div>
        </div>
      </div>

      <div className="arrow_section">
        <div className="container">
          <div className="arrow_box">
            <a href="#down">
              <i className="ri-arrow-down-long-line"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default PrivacyAndPolicyBanner;
