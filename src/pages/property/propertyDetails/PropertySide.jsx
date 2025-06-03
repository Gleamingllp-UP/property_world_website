import React from "react";
import { ads_banner, ads_banner2, property_world_logo, user } from "../../../assets/images";

const PropertySide = () => {
  return (
    <>
      <div className="col-lg-3">
        <div className="agent">
          <img src={property_world_logo} className="img-fluid agent_logo" />
          <h5>Property Finders Real Estate</h5>
          <hr />
          <div className="agent_info">
            <a href="agent-info.php">
              <img src={user} className="img-fluid john" />
            </a>
            <p>
              <b>
                <a href="agent-info.php">John Smith</a>
              </b>
            </p>
            <p className="mt-2 mb-3">Agent: Property Finders</p>
            <small>
              With a passion for helping people find the perfect place to call
              home...
            </small>
          </div>
        </div>
        <div className="get_in_touch">
          <h5>
            Get in touch <br />
            for more information
          </h5>
          <a href="#" className="call_us2">
            <i className="ri-phone-line" /> Call{" "}
          </a>
          <a href="#" className="email_area">
            <i className="ri-mail-open-line" /> Email{" "}
          </a>
          <a href="#" className="whats_aap">
            <i className="ri-whatsapp-line" /> WhatsApp{" "}
          </a>
        </div>
        <div className="recommended_s">
          <h5>
            <b>Recommended Searches</b>
          </h5>
          <hr />
          <ul>
            <li>
              <a href="#">The Community Sports Arena</a>
            </li>
            <li>
              <a href="#">Highly Accessible Spacious</a>
            </li>
            <li>
              <a href="#">Office for Rent in Al Qiyadah</a>
            </li>
            <li>
              <a href="#">Office for Rent in Al Qiyadah</a>
            </li>
          </ul>
        </div>
        <div className="recommended_s trending_s">
          <h5>
            <b>Trending Searches</b>
          </h5>
          <hr />
          <ul>
            <li>
              <a href="#">The Community Sports Arena</a>
            </li>
            <li>
              <a href="#">Highly Accessible | Spacious</a>
            </li>
            <li>
              <a href="#">Office for Rent in Al Qiyadah</a>
            </li>
            <li>
              <a href="#">Office for Rent in Al Qiyadah</a>
            </li>
          </ul>
        </div>
        <div className="new_adss">
          <a href="#">
            <img src={ads_banner} className="img-fluid" />
          </a>
        </div>
        <div className="new_adss">
          <a href="#">
            <img src={ads_banner2} className="img-fluid" />
          </a>
        </div>
      </div>
    </>
  );
};

export default PropertySide;
