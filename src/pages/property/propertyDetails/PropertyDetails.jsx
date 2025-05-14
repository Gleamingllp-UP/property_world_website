import React, { useState } from "react";
import {
  email,
  facebook,
  g_email,
  propert1,
  propert2,
  propert3,
  propert4,
  propert5,
  propert6,
  twitter,
} from "@/assets/images";

function PropertyDetails() {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="container">
      <div id="gallery" className="photos-grid-container gallery">
        <div className="main-photo img-box">
          <a href={propert2} className="glightbox" data-glightbox="type: image">
            <img src={propert2} alt="image" />
          </a>
          <div className="share_post ">
            <button>
              <i className="ri-heart-line" />
            </button>
            <button className="toggle" onClick={() => setIsVisible(!isVisible)}>
              <i className="ri-share-line" /> Share
            </button>
            <div
              id="target"
              style={{
                display: isVisible ? "block" : "none",
              }}
            >
              <ul>
                <li>
                  <a href="#">
                    <img src={facebook} /> Facebook
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={twitter} /> Twitter{" "}
                  </a>{" "}
                </li>
                <li>
                  <a href="#">
                    <img src={facebook} /> Whatsapp
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={g_email} /> Send via Gmail
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={email} /> Send via Email
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <div className="sub">
            <div className="img-box">
              <a
                href={propert1}
                className="glightbox"
                data-glightbox="type: image"
              >
                <img src={propert1} alt="image" />
              </a>
            </div>
            <div className="img-box">
              <a
                href={propert3}
                className="glightbox"
                data-glightbox="type: image"
              >
                <img src={propert3} alt="image" />
              </a>
            </div>
            <div className="img-box">
              <a
                href={propert4}
                className="glightbox"
                data-glightbox="type: image"
              >
                <img src={propert4} alt="image" />
              </a>
            </div>
            <div id="multi-link" className="img-box">
              <a
                href={propert5}
                className="glightbox"
                data-glightbox="type: image"
              >
                <img src={propert5} alt="image" />
                <div className="transparent-box">
                  <div className="caption">+3</div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div id="more-img" className="extra-images-container hide-element">
          <a href={propert6} className="glightbox" data-glightbox="type: image">
            <img src={propert6} alt="image" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;
