import React from "react";
import {
  ads_banner,
  ruler,
  bed,
  swimming,
  sofa,
  parking,
  floor1,
  floor2,
  gym,
  cctv,
  ads_banner2,
  pop1,
  propert2,
  propert3,
  propert4,
  property_world_logo,
  user,
  bath,
} from "@/assets/images";

function PropertyAllInfo() {
  return (
    <section className="property_all_info">
      <div className="container">
        <div className="row">
          <div className="col-lg-9">
            <div className="left_area">
              <div className="tag">For Rent</div>
              <h2 className="the_comm">The Community Sports Arena</h2>
              <div className="price_d">AED 850,000</div>
              <div className="call_action my_acttn">
                <ul>
                  <li>
                    {" "}
                    <a href="#">
                      <i className="ri-phone-line" /> Call{" "}
                    </a>
                  </li>
                  <li>
                    {" "}
                    <a href="#">
                      <i className="ri-mail-open-line" /> Email{" "}
                    </a>
                  </li>
                  <li>
                    {" "}
                    <a href="#">
                      <i className="ri-whatsapp-line" /> WhatsApp{" "}
                    </a>
                  </li>
                </ul>
              </div>
              <p>
                <i className="ri-map-pin-line" /> Location : Dubai Marina, Dubai
              </p>
              <hr />
              <div className="key_feature">
                <p>Key Property Features</p>
                <ul>
                  <li>
                    <i className="ri-hotel-bed-line" /> Bedrooms: 2
                  </li>
                  <li>
                    <i className="fa fa-bath" aria-hidden="true" /> Bathrooms: 3
                  </li>
                  <li>
                    <i className="ri-ruler-line" /> Size: 817 sqft
                  </li>
                </ul>
              </div>
              <hr />
              <div className="key_feature">
                <p>Property Information </p>
                <div className="pro_info">
                  <table className="table">
                    <tbody>
                      <tr>
                        <td>Type</td>
                        <td>Apartment</td>
                      </tr>
                      <tr>
                        <td>Purpose</td>
                        <td>For rent</td>
                      </tr>
                      <tr>
                        <td>Reference</td>
                        <td>Ref - 105235-Fc3aqd</td>
                      </tr>
                      <tr>
                        <td>Added on</td>
                        <td>
                          <i className="ri-calendar-2-line" /> 6 February 2025
                        </td>
                      </tr>
                      <tr>
                        <td>Ownership</td>
                        <td>
                          <i className="ri-verified-badge-fill verified" />{" "}
                          Freehold
                        </td>
                      </tr>
                      <tr>
                        <td>Built-up Area </td>
                        <td>
                          <i className="ri-ruler-line" /> 817 sqft
                        </td>
                      </tr>
                      <tr>
                        <td>Usage</td>
                        <td>Residential</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <hr />
              <div className="building_info key_feature">
                <p>Building Information</p>
                <ul>
                  <li>
                    <i className="ri-building-line" /> Building Name: Al Matter
                    Building
                  </li>
                  <li>
                    <i className="ri-building-4-line" /> Total Floors: 30
                  </li>
                </ul>
              </div>
              <hr />
              <div className="key_feature amenities">
                <p>Features / Amenities</p>
                <div className="row">
                  <div className="amy_amm">
                    <span>
                      <img src={gym} /> Gym
                    </span>
                  </div>
                  <div className="amy_amm">
                    <span>
                      <img src={swimming} /> Swimming Pool
                    </span>
                  </div>
                  <div className="amy_amm">
                    <span>
                      <img src={parking} /> Parking
                    </span>
                  </div>
                  <div className="amy_amm">
                    <span>
                      <img src={cctv} /> 24/7 Security
                    </span>
                  </div>
                  <div className="amy_amm">
                    <span>
                      <img src={sofa} /> Furnished
                    </span>
                  </div>
                  <div className="amy_amm">
                    <span>
                      <img src={parking} /> Parking
                    </span>
                  </div>
                  <div className="amy_amm">
                    <span>
                      <img src={cctv} /> 24/7 Security
                    </span>
                  </div>
                  <div className="amy_amm">
                    <span>
                      <img src={gym} /> Gym
                    </span>
                  </div>
                  <div className="amy_amm">
                    <span>
                      <img src={swimming} /> Swimming Pool
                    </span>
                  </div>
                  <a href="#" id="loadMore" className="last_amm">
                    {" "}
                    +5 more amenities
                  </a>
                </div>
              </div>
              <hr />
              <div className="key_feature">
                <p>Map </p>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28908.384151605973!2d55.11929978065527!3d25.083304028174492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6b5402c126e3%3A0xb9511e6655c46d7c!2sDubai%20Marina%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1744286420425!5m2!1sen!2sin"
                  width="100%"
                  height={350}
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <p className="mt-3">Nearby Places</p>
                <div className="near_p">
                  <ul>
                    <li>
                      <i className="ri-community-line" /> School: 1.2 km
                    </li>
                    <li>
                      <i className="ri-hospital-line" /> Hospital: 1.5 km
                    </li>
                    <li>
                      <i className="ri-train-line" /> Metro Station: 800 m
                    </li>
                    <li>
                      <i className="ri-shopping-cart-2-line" /> Supermarket: 600
                      m
                    </li>
                  </ul>
                </div>
              </div>
              <hr />
              <div className="key_feature">
                <p>Virtual Tour </p>
                <iframe
                  width="100%"
                  height={415}
                  src="https://www.youtube.com/embed/B4o8PvcqHC4?si=oneK1BnR6P_P9GxA"
                  title="YouTube video player"
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen=""
                />
              </div>
              <hr />
              <div className="key_feature">
                <p>Floor Plan</p>
                <div className="floor_pll">
                  <ul>
                    <li>
                      <a
                        href={floor1}
                        data-toggle="lightbox"
                        data-gallery="example-gallery"
                      >
                        <img src={floor1} className="img-fluid" />
                      </a>
                    </li>
                    <li>
                      <a
                        href={floor2}
                        data-toggle="lightbox"
                        data-gallery="example-gallery"
                      >
                        <img src={floor2} className="img-fluid" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <hr />
              <div className="key_feature">
                <p>Similar Properties</p>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="pop_search light_b">
                      <div className="pop_photo">
                        <a href="property-details.php">
                          <img src={pop1} className="img-fluid" />
                        </a>
                      </div>
                      <div className="pop_data">
                        <h3>2BHK in Dubai Marina</h3>
                        <p>AED 830,000</p>
                        <div className="p_info2">
                          <ul>
                            <li>
                              <img src={bed} /> 1{" "}
                            </li>
                            <li>
                              <img src={bath} />1
                            </li>
                            <li>
                              <img src={ruler} /> 396
                            </li>
                          </ul>
                        </div>
                        <div className="loc">
                          <i className="ri-map-pin-line" /> Dubai Sports City
                        </div>
                        <a href="property-details.php">
                          Explore Now{" "}
                          <i className="ri-arrow-right-up-long-line" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="pop_search light_b">
                      <div className="pop_photo">
                        <a href="property-details.php">
                          <img src={propert2} className="img-fluid" />
                        </a>
                      </div>
                      <div className="pop_data">
                        <h3>1BHK in Al Barsha</h3>
                        <p>AED 830,000</p>
                        <div className="p_info2">
                          <ul>
                            <li>
                              <img src={bed} /> 1{" "}
                            </li>
                            <li>
                              <img src={bath} />1
                            </li>
                            <li>
                              <img src={ruler} /> 396
                            </li>
                          </ul>
                        </div>
                        <div className="loc">
                          <i className="ri-map-pin-line" /> Dubai Sports City
                        </div>
                        <a href="property-details.php">
                          Explore Now{" "}
                          <i className="ri-arrow-right-up-long-line" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="pop_search light_b">
                      <div className="pop_photo">
                        <a href="property-details.php">
                          <img src={propert3} className="img-fluid" />
                        </a>
                      </div>
                      <div className="pop_data">
                        <h3>Apartment in Downtown</h3>
                        <p>AED 950,000</p>
                        <div className="p_info2">
                          <ul>
                            <li>
                              <img src={bed} /> 1{" "}
                            </li>
                            <li>
                              <img src={bath} />1
                            </li>
                            <li>
                              <img src={ruler} /> 396
                            </li>
                          </ul>
                        </div>
                        <div className="loc">
                          <i className="ri-map-pin-line" /> Dubai Sports City
                        </div>
                        <a href="property-details.php">
                          Explore Now{" "}
                          <i className="ri-arrow-right-up-long-line" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="pop_search light_b">
                      <div className="pop_photo">
                        <a href="property-details.php">
                          <img src={propert4} className="img-fluid" />
                        </a>
                      </div>
                      <div className="pop_data">
                        <h3>1BHK in Al Barsha</h3>
                        <p>AED 830,000</p>
                        <div className="p_info2">
                          <ul>
                            <li>
                              <img src={bed} /> 1{" "}
                            </li>
                            <li>
                              <img src={bath} />1
                            </li>
                            <li>
                              <img src={ruler} /> 396
                            </li>
                          </ul>
                        </div>
                        <div className="loc">
                          <i className="ri-map-pin-line" /> Dubai Sports City
                        </div>
                        <a href="property-details.php">
                          Explore Now{" "}
                          <i className="ri-arrow-right-up-long-line" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="key_feature regulatory">
                <p>Regulatory Information</p>
                <ul>
                  <li>
                    <i className="ri-file-list-3-line" />{" "}
                    <span>RERA Permit No.</span> 123456
                  </li>
                  <li>
                    <i className="ri-user-line" /> <span>Listed by:</span>{" "}
                    Property Finders Real Estate
                  </li>
                </ul>
              </div>
            </div>
          </div>
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
                  With a passion for helping people find the perfect place to
                  call home...
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
        </div>
      </div>
    </section>
  );
}

export default PropertyAllInfo;
