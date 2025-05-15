import React from "react";
import { about_banner } from "../../../assets/images";

function SignUpBanner({ scrollRef }) {
  const scroll = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <div
        className="inner_banner "
        style={{ backgroundImage: `url(${about_banner})` }}
      >
        <div className="container">
          <div className="buyer_d sign_up">
            <h1>Sign up</h1>
            <p />
          </div>
        </div>
      </div>
      <div className="arrow_section">
        <div className="container">
          <div className="arrow_box">
            <a onClick={scroll}>
              <i className="ri-arrow-down-long-line"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpBanner;
