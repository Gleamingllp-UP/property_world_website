import React from "react";
import { floor1, floor2 } from "@/assets/images";
import Features from "./Features";
import { useSelector } from "react-redux";
import { formatDate } from "../../../helper/formateDate/formatedDate";
import PropertySide from "./PropertySide";
import SimlarProperty from "./SimlarProperty";

import PropertySocial from "./PropertySocial";
function PropertyAllInfo() {
  const { propertyDetails } = useSelector((store) => store?.property);

  return (
    <section className="property_all_info">
      <div className="container">
        <div className="row">
          <div className="col-lg-9">
            <div className="left_area">
              <div className="row">
                <div className="col-lg-9">
                  <div className="tag">
                    For {propertyDetails?.categoryData?.name || "N/A"}
                  </div>
                  <h2 className="the_comm">
                    {propertyDetails?.title || "N/A"}
                  </h2>
                  <div className="price_d">
                    AED {propertyDetails?.price || "0"}
                  </div>
                </div>
                <PropertySocial />
              </div>
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
                <i className="ri-map-pin-line" /> Location :
                {propertyDetails?.address ||
                  propertyDetails?.locationData?.name}
              </p>
              <hr />
              <div className="key_feature">
                <p>Key Property Features</p>
                <ul>
                  {propertyDetails?.bedrooms && (
                    <li>
                      <i className="ri-hotel-bed-line" /> Bedrooms:{" "}
                      {propertyDetails.bedrooms}
                    </li>
                  )}

                  {propertyDetails?.bathrooms && (
                    <li>
                      <i className="fa fa-bath" aria-hidden="true" /> Bathrooms:{" "}
                      {propertyDetails.bathrooms}
                    </li>
                  )}

                  {propertyDetails?.area && (
                    <li>
                      <i className="ri-ruler-line" /> Size:{" "}
                      {propertyDetails.area} sqft
                    </li>
                  )}
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
                          <i className="ri-calendar-2-line" />{' '}{formatDate(propertyDetails?.createdAt, "date")} 
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
              <Features />
              <hr />
              <div className="key_feature">
                <p>Map </p>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28908.384151605973!2d55.11929978065527!3d25.083304028174492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6b5402c126e3%3A0xb9511e6655c46d7c!2sDubai%20Marina%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1744286420425!5m2!1sen!2sin"
                  width="100%"
                  height={350}
                  style={{ border: 0 }}
                  allowFullScreen
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
                  allowFullScreen
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
              <SimlarProperty />
              <hr />
              <div className="key_feature regulatory">
                <p>Regulatory Information</p>
                <ul>
                  <li>
                    <i className="ri-file-list-3-line" />{" "}
                    <span>RERA Permit No.</span>{" "}
                    {propertyDetails?.unit_number || "N/A"}
                  </li>
                  <li>
                    <i className="ri-user-line" /> <span>Listed by:</span>{" "}
                    Property Finders Real Estate
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <PropertySide />
        </div>
      </div>
    </section>
  );
}

export default PropertyAllInfo;
