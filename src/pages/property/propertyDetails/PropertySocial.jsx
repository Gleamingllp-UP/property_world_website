import React, { useState } from "react";
import { email, facebook, g_email, twitter } from "../../../assets/images";

const PropertySocial = () => {
  // STEP 1: Define state to toggle visibility
  const [showSocials, setShowSocials] = useState(false);

  // STEP 2: Toggle function
  const handleShareClick = () => {
    setShowSocials(!showSocials);
  };

  return (
    <div className="col-lg-3">
      <div className="share_post">
        {/* Heart Button (optional) */}
        <button>
          <i className="ri-heart-line" />
        </button>

        {/* STEP 3: Share Button with onClick */}
        <button className="toggle" onClick={handleShareClick}>
          <i className="ri-share-line" /> Share
        </button>

        {/* STEP 4: Show/hide this block based on state */}
        <div
          id="target"
          style={{ display: showSocials ? "block" : "none", marginTop: "10px" }}
        >
          <ul>
            <li>
              <a href="#">
                <img src={facebook} alt="Facebook" /> Facebook
              </a>
            </li>
            <li>
              <a href="#">
                <img src={twitter} alt="Twitter" /> Twitter
              </a>
            </li>
            <li>
              <a href="#">
                <img src={facebook} alt="Whatsapp" /> Whatsapp
              </a>
            </li>
            <li>
              <a href="#">
                <img src={g_email} alt="Gmail" /> Send via Gmail
              </a>
            </li>
            <li>
              <a href="#">
                <img src={email} alt="Email" /> Send via Email
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PropertySocial;
