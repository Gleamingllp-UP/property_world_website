import { property_world_logo } from "@/assets/images";
import React from "react";

function Copyright() {
  return (
    <div>
      <div className="copyright">
        <div className="container">
          <div className="logo_socal">
            <div className="foot_logo">
              <img src={property_world_logo} className="img-fluid" />
            </div>

            <div className="social_media">
              <ul>
                <li>
                  <a href="#">
                    <i className="ri-facebook-fill"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="ri-twitter-x-fill"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="ri-instagram-line"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="ri-youtube-line"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-3">
            <small>
              We are DED Licensed RERA certified, recognized as the most trusted
              reliable name in the Real Estate sector in Dubai, United Arab
              Emirates. Over the course of more than a decade we have diligently
              built a remarkable reputation for our devoted services, which are
              widely known to add immense value to the Real Estate industry.
            </small>
          </div>
          <hr />
          <div className="text-center mt-3">
            <small>
              Copyright © 2025 Property World. All Rights Reserved.{" "}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Copyright;
