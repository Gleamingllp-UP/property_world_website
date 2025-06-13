import React, { useState } from "react";
import { email, facebook, g_email, twitter } from "../../../assets/images";

const PropertySocial = () => {
  const [showSocials, setShowSocials] = useState(false);
  const handleShareClick = () => {
    setShowSocials(!showSocials);
  };

  const shareUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent("Check out this amazing property!");

  return (
    <div className="col-lg-3">
      <div className="share_post">
        <button>
          <i className="ri-heart-line" />
        </button>
        <button className="toggle" onClick={handleShareClick}>
          <i className="ri-share-line" /> Share
        </button>
        <div
          id="target"
          style={{ display: showSocials ? "block" : "none", marginTop: "10px" }}
        >
          <ul>
            <li>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={facebook} alt="Facebook" /> Facebook
              </a>
            </li>
            <li>
              <a
                href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={twitter} alt="Twitter" /> Twitter
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/?text=${shareText}%20${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={facebook} alt="Whatsapp" /> Whatsapp
              </a>
            </li>
            <li>
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=&su=${shareText}&body=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={g_email} alt="Gmail" /> Send via Gmail
              </a>
            </li>
            <li>
              <a href={`mailto:?subject=${shareText}&body=${shareUrl}`}>
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
