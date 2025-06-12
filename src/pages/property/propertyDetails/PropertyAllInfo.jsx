import { useEffect } from "react";
import Features from "./Features";
import { useSelector } from "react-redux";
import { formatDate } from "../../../helper/formateDate/formatedDate";
import PropertySide from "./PropertySide";
import SimlarProperty from "./SimlarProperty";

import PropertySocial from "./PropertySocial";
import MediaWithLoader from "../../../Custom_Components/MediaWithLoader";
import ImageWithLoader from "../../../Custom_Components/ImageWithLoader";

import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.css";
import { formatPrice } from "../../../helper/function/formatPrice";
import Propertymap from "./Propertymap";
function PropertyAllInfo() {
  const { propertyDetails } = useSelector((store) => store?.property);

  useEffect(() => {
    const lightbox2 = GLightbox({
      selector: ".lightbox",
    });

    return () => {
      lightbox2.destroy();
    };
  }, [propertyDetails?.floor_plan]);

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
                    {formatPrice(propertyDetails?.price)}
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
              {(propertyDetails?.bedrooms != null ||
                propertyDetails?.bathrooms != null ||
                propertyDetails?.area > 0) && (
                <>
                  <div className="key_feature">
                    <p>Key Property Features</p>
                    <ul>
                      {propertyDetails?.bedrooms != null && (
                        <li>
                          <i className="ri-hotel-bed-line" /> Bedrooms:{" "}
                          {propertyDetails?.bedrooms}
                        </li>
                      )}
                      {propertyDetails?.bathrooms != null && (
                        <li>
                          <i className="fa fa-bath" aria-hidden="true" />{" "}
                          Bathrooms: {propertyDetails?.bathrooms}
                        </li>
                      )}
                      {propertyDetails?.area > 0 && (
                        <li>
                          <i className="ri-ruler-line" /> Size:{" "}
                          {propertyDetails?.area} sqft
                        </li>
                      )}
                    </ul>
                  </div>
                  <hr />
                </>
              )}

              <div className="key_feature">
                <p>Property Information </p>
                <div className="pro_info">
                  <table className="table">
                    <tbody>
                      <tr>
                        <td>Type</td>
                        <td>
                          {propertyDetails?.subSubCategoryData?.name || ""}
                        </td>
                      </tr>
                      <tr>
                        <td>Purpose</td>
                        <td>For {propertyDetails?.categoryData?.name || ""}</td>
                      </tr>
                      <tr>
                        <td>Reference</td>
                        <td>Ref - 105235-Fc3aqd</td>
                      </tr>
                      <tr>
                        <td>Added on</td>
                        <td>
                          <i className="ri-calendar-2-line" />{" "}
                          {formatDate(propertyDetails?.createdAt, "date")}
                        </td>
                      </tr>
                      <tr>
                        <td>Ownership</td>
                        <td>
                          <i className="ri-verified-badge-fill verified" />{" "}
                          {propertyDetails?.ownership_status || ""}
                        </td>
                      </tr>
                      <tr>
                        <td>Built-up Area </td>
                        <td>
                          <i className="ri-ruler-line" />{" "}
                          {propertyDetails?.area || 0} sqft
                        </td>
                      </tr>
                      <tr>
                        <td>Usage</td>
                        <td>{propertyDetails?.subCategoryData?.name || ""}</td>
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
                    <i className="ri-building-line" /> Building Name:{" "}
                    {propertyDetails?.building_name || "Al Matter"} Building
                  </li>
                  <li>
                    <i className="ri-building-4-line" /> Total Floors:{" "}
                    {propertyDetails?.total_floors || 0}
                  </li>
                </ul>
              </div>
              <Features />
              <Propertymap
                lat={propertyDetails?.locationData?.latitude}
                lng={propertyDetails?.locationData?.longitude}
              />
              <hr />
              <div className="key_feature">
                <p>Virtual Tour </p>
                <MediaWithLoader
                  src={
                    propertyDetails?.virtual_tour ||
                    "https://www.youtube.com/embed/B4o8PvcqHC4?si=oneK1BnR6P_P9GxA"
                  }
                  height={415}
                  className="rounded"
                  fallbackText="Virtual tour not uploaded"
                />
                {/* {propertyDetails?.virtual_tour ? (
                  <iframe
                    key={propertyDetails.virtual_tour}
                    width="100%"
                    height={415}
                    src={propertyDetails.virtual_tour}
                    title="YouTube video player"
                    frameBorder={0}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                ) : (
                  <p>Loading virtual tour...</p>
                )} */}
              </div>
              <hr />
              <div className="key_feature">
                <p>Floor Plan</p>
                <div className="floor_pll">
                  <ul className="row gx-3 gy-4">
                    {propertyDetails?.floor_plan?.length > 0 ? (
                      propertyDetails.floor_plan.map((floor, index) => (
                        <li key={index} className="col-12 col-sm-6 col-lg-4">
                          <div className="border rounded shadow-sm overflow-hidden h-100">
                            <a
                              href={floor}
                              className="d-block lightbox"
                              data-glightbox="type: image"
                            >
                              <ImageWithLoader
                                src={floor}
                                className="img-fluid w-100"
                                alt={`Floor Plan ${index + 1}`}
                              />
                            </a>
                          </div>
                        </li>
                      ))
                    ) : (
                      <div className="col-12">
                        <div className="text-center border border-light-subtle rounded py-5 bg-light text-muted fw-medium">
                          No floor plans available
                        </div>
                      </div>
                    )}
                  </ul>
                </div>
              </div>
              <SimlarProperty />
              <hr />
              <div className="key_feature regulatory">
                <p>Regulatory Information</p>
                <ul>
                  <li>
                    <i className="ri-file-list-3-line" />{" "}
                    <span>RERA Permit No.</span>{" "}
                    {propertyDetails?.permit_number || "N/A"}
                  </li>
                  <li>
                    <i className="ri-user-line" /> <span>Listed by:</span>{" "}
                    {/* {propertyDetails?.userData?.first_name ||
                    propertyDetails?.userData?.last_name
                      ? `${propertyDetails?.userData?.first_name || ""} ${
                          propertyDetails?.userData?.last_name || ""
                        }`.trim()
                      : "Property Finders Real Estate"} */}
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
