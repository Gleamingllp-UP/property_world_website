import React from 'react'
import { email, facebook, g_email, twitter } from "../../../assets/images";
const PropertySocial = () => {
  return (
    <>
      <div className="col-lg-3">
                  <div className="share_post ">
                    <button>
                      <i className="ri-heart-line" />
                    </button>
                    <button className="toggle">
                      <i className="ri-share-line" /> Share
                    </button>
                    <div id="target">
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
    </>
  )
}

export default PropertySocial